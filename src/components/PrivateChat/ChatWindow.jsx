import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { socket } from './socket';
import eventBus from "./eventBus";

const API = import.meta.env.VITE_API_URL;

export default function ChatWindow({ chat }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const chatBodyRef = useRef(null);
  const justSentRef = useRef(false);

  const userId = localStorage.getItem("user_id");

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  // Fetch messages when chat changes
  useEffect(() => {
    if (!chat?.chat_room_id) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${API}/private-chats/${chat.chat_room_id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMessages(response.data.messages || []);
        scrollToBottom();
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    };

    fetchMessages();
  }, [chat]);

  // Scroll to bottom on send
  useEffect(() => {
    if (justSentRef.current) {
      scrollToBottom();
      justSentRef.current = false;
    }
  }, [messages]);

  // Socket real-time receiver
  useEffect(() => {
    if (!socket || !chat?.chat_room_id) return;

    const receiveMessageHandler = (msg) => {
      if (msg.chat_room_id === chat.chat_room_id) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      }
    };

    socket.on("private:receive_message", receiveMessageHandler);

    return () => {
      socket.off("private:receive_message", receiveMessageHandler);
    };
  }, [chat?.chat_room_id]);

  // Send message
  const sendMessage = async () => {
    if (!messageText.trim() || !chat?.chat_room_id) return;

    try {
      const formData = new FormData();
      formData.append("message", messageText);
      formData.append("chat-file", "");

      const response = await axios.post(
        `${API}/private-chats/${chat.chat_room_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newMessage = {
        id: response.data.id || Date.now().toString(),
        chat_room_id: chat.chat_room_id,
        sender_id: userId,
        senderName: "You",
        message: messageText,
        timestamp: new Date().toISOString(),
        senderProfilePicture: "",
        sender_role: "user",
      };

      justSentRef.current = true;
      setMessages((prev) => [...prev, newMessage]);
      setMessageText("");

      // Emit to socket and local event bus
      socket.emit("private:send_message", newMessage);
      eventBus.emit("new_message", newMessage); // ensure matches sidebar's eventBus
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="chat-window d-flex flex-column flex-grow-1">
      {/* Header */}
      <div className="chat-header p-3 border-bottom bg-light d-flex flex-column align-items-center">
        <h6 className="mb-0 text-black">{chat?.user_name}</h6>
        <small className="text-muted">Last seen recently</small>
      </div>

      {/* Chat Body */}
      <div
        ref={chatBodyRef}
        className="chat-body px-3 py-2 bg-white"
        style={{ flexGrow: 1, overflowY: "auto", maxHeight: "calc(80vh - 160px)" }}
      >
        <div className="text-center text-muted small mb-2">Today</div>
        {messages
          .filter((msg) => msg.message)
          .map((msg) => {
            const isMe = msg.sender_id === userId;
            return (
              <div
                key={msg.id}
                className={`message-bubble p-2 my-1 rounded ${
                  isMe ? "text-white ms-auto" : "text-light me-auto"
                }`}
                style={{
                  maxWidth: "60%",
                  backgroundColor: isMe ? "#7D8AC3" : "#384579",
                  color: "white",
                }}
              >
                <div>{msg.message}</div>
                <small
                  className={`text-light d-flex ${
                    isMe ? "flex-row" : "flex-row-reverse"
                  }`}
                  style={{ fontSize: "0.7rem" }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
            );
          })}
      </div>

      {/* Input */}
      <div className="chat-input p-3 pe-5 me-3 border-top bg-light d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Start typing..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="Btn px-3 ms-2 me-5 text-2xl" onClick={sendMessage}>
          <i className="fa-regular fa-paper-plane text-light"></i>
        </button>
      </div>
    </div>
  );
}
