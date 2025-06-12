// src/components/ChatWindow.jsx
import { useState, useEffect, useRef } from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import Input from './Input';
import Message from "./Message";
import './Chat.css'
import pers1 from './../../assets/pers1.png'
import pers2 from './../../assets/pers2.png'
import pers3 from './../../assets/pers3.png'
import pers4 from './../../assets/pers4.png'
import pers5 from './../../assets/pers5.png'
import pers6 from './../../assets/pers6.png'
import pers7 from './../../assets/pers7.png'
import pers8 from './../../assets/pers8.png'
import av1 from './../../assets/av1.png'
import av2 from './../../assets/av2.png'
import { useParams } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import {communities} from './../community/Comm'
const simulateIncomingMessages = (callback) => {
  
  const responses = [
    "Hello there!",
    "How's it going?",
    "Nice to see you here!",
    "What are you working on?",
    "I agree with that point",
    "Thanks for sharing!"
  ];
  
  const interval = setInterval(() => {
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    callback({
      id: Date.now(),
      text: randomResponse,
      sender: `user${Math.floor(Math.random() * 5) + 1}` // Random user ID
    });
  }, 5000); // Simulate a message every 5 seconds

  return () => clearInterval(interval);
};

const Chat = () => {
    const { id } = useParams();
  const community = communities.find((c) => c.id === parseInt(id));

  const [messages, setMessages] = useState([ ]);
  const [isLoading, setIsLoading] = useState(true);
  const chatBodyRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate loading and incoming messages
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    
    // Setup simulated incoming messages
    const cleanup = simulateIncomingMessages((newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      text,
      sender: "me",
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const members = [
      { id: 1, name: "R", image: pers8},
      { id: 2, name: "F", image: pers2 },
      { id: 3, name: "K", image: pers3 },
      { id: 4, name: "A", image: pers4 },
      { id: 5, name: "L", image: pers5 },
      { id: 6, name: "L", image: pers6 },
      { id: 7, name: "L", image: pers7 },
      { id: 8, name: "L", image: pers1 },
  
    ];
  return (
    <div className="main d-flex justify-content-center bg-light py-5  ">
   <div className="shadow-sm  chat-window w-80  ">
      <div className=" head py-3 px-3 ">
        <div className="content w-60 d-flex justify-content-between align-items-center ">
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
       <h5 className="mb-0">{community.title} Community</h5>
        <small className=" text-muted">Online: {Math.floor(Math.random() * 10) + 5} users</small>

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
            style={{ 
              height: "400px", 
              overflowY: "auto",
              scrollBehavior: "smooth"
            }}
          >
            <ListGroup variant="flush">
              {messages.map((msg) => (
                <>
                 <div className=" d-flex gap-3">
               {msg.sender!="me"?<img src={av1} alt="" className="avatar" />:""} 
                <Message 
                  key={msg.id} 
                  text={msg.text} 
                  sender={msg.sender} 
                  isMe={msg.sender === "me"}
                  isSystem={msg.sender === "system"}
                />
                </div>
                </>
               
                
              ))}
            </ListGroup>
          </div>
          
          <Input onSend={handleSendMessage} />
        </>
      )}
    </div>
    </div>
 
  );
};

export default Chat;