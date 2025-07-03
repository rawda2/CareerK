import { useState, useEffect, useRef } from "react";
import { Card, ListGroup, Spinner, Tooltip, OverlayTrigger } from "react-bootstrap";
import Input from './Input';
import Message from "./Message";
import './Chat.css';
import { io } from "socket.io-client";
import pers1 from './../../assets/pers1.png';
import pers2 from './../../assets/pers2.png';
import pers3 from './../../assets/pers3.png';
import pers4 from './../../assets/pers4.png';
import pers5 from './../../assets/pers5.png';
import pers6 from './../../assets/pers6.png';
import pers7 from './../../assets/pers7.png';
import pers8 from './../../assets/pers8.png';
import av1 from './../../assets/av1.png';
import { useLocation } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const community = location.state?.group;

  const [messages, setMessages] = useState([]);
  const [bufferedMessages, setBufferedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typingUser, setTypingUser] = useState("");

  const chatBodyRef = useRef(null);
  const socketRef = useRef();

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?.id;

  // Fetch old messages from API
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/community/${community.chat_room_id}/messages`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );


      const cleanedMessages = response.data.messages.map((msg) => ({
        id: msg.id,
        text: msg.message,
        fileUrl: msg.file_url,
        fileType: msg.file_type,
        sender: msg.sender_id === currentUserId ? "me" : msg.sender_name,
        createdAt: msg.created_at,
      }));

      setBufferedMessages(cleanedMessages);
      console.log(cleanedMessages)
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // Socket.IO setup
  useEffect(() => {
    socketRef.current = io(API_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    socketRef.current.emit("community:typing", { room: community.chat_room_id });

    socketRef.current.on("community:receive-message", (data) => {
      const newMessage = {
        id: data.id,
        text: data.message,
        sender: data.sender_id === currentUserId ? "me" : data.sender_name,
        createdAt: data.created_at,
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    socketRef.current.on("community:typing", ({ user }) => {
      if (user !== currentUser.name) {
        setTypingUser(user);
        setTimeout(() => setTypingUser(""), 3000);
      }
    });

    return () => socketRef.current.disconnect();
  }, [API_URL, token, community.chat_room_id]);

  useEffect(() => {
    fetchMessages();
  }, [API_URL, token, community.chat_room_id]);

  // Show messages one-by-one like live chat
useEffect(() => {
  if (bufferedMessages.length === 0) return;

  let index = 0;

  const loopMessages = () => {
    const msg = bufferedMessages[index];

    if (msg.sender !== "me") {
      setTypingUser(msg.sender);
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, msg]);
      setTypingUser("");
    }, 5000);

    index++;

    if (index >= bufferedMessages.length) {
      index = 0; // start over
      setMessages([]); // optional: clear messages before repeating
    }

    setTimeout(loopMessages,10000);
  };

  loopMessages(); // start loop

}, [bufferedMessages]);


  // Scroll to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (msgObj) => {
    setMessages((prev) => [...prev, msgObj]);

    const payload = {
      room: community.chat_room_id,
      message: msgObj.text,
      sender_id: currentUserId,
      sender_name: currentUser.name,
    };

    socketRef.current.emit("community:send-message", payload);
  };

  const members = [
    { id: 1, name: "R", image: pers8 },
    { id: 2, name: "F", image: pers2 },
    { id: 3, name: "K", image: pers3 },
    { id: 4, name: "A", image: pers4 },
    { id: 5, name: "L", image: pers5 },
    { id: 6, name: "L", image: pers6 },
    { id: 7, name: "L", image: pers7 },
    { id: 8, name: "L", image: pers1 },
  ];

  return (
    <div className="main d-flex justify-content-center bg-light py-5">
      <div className="shadow-sm chat-window w-80">
        <div className="head py-3 px-3">
          <div className="content w-60 d-flex justify-content-between align-items-center">
            <div className="avatars">
              <div className="ms-auto d-flex align-items-center me-5">
                <div className="members-group">
                  {members.map((member) => (
                    <OverlayTrigger
                      key={member.id}
                      placement="top"
                      overlay={<Tooltip>{member.name}</Tooltip>}
                    >
                      <img src={member.image} alt={member.name} className="member-avatar" />
                    </OverlayTrigger>
                  ))}
                </div>
              </div>
            </div>
            <div className="nav d-flex flex-column text-center text-black">
              <h5 className="mb-0">{community.group_name}</h5>
              <small className="text-muted">
                Online: {Math.floor(Math.random() * 10) + 5} users
              </small>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <div
              ref={chatBodyRef}
              className="chat-body p-3"
              style={{ height: "400px", overflowY: "auto", scrollBehavior: "smooth" }}
            >
              <ListGroup variant="flush">
                {messages.map((msg) => (
                  <div className="d-flex gap-3 fade-in" key={msg.id}>
                    <Message
                      text={msg.text}
                      sender={msg.sender}
                      isMe={msg.sender === "me"}
                      isSystem={msg.sender === "system"}
                    />
                  </div>
                ))}
              </ListGroup>
              {typingUser && (
                <div className="px-4 text-muted small mb-2">{typingUser} is typing...</div>
              )}
            </div>

            <Input
              onSend={handleSendMessage}
              socket={socketRef.current}
              roomId={community.chat_room_id}
              currentUser={currentUser}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
