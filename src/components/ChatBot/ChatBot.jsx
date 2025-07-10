import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import bot from './../../assets/bot.png';
import file from './../../assets/file.png';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Carrerk AI. How can I assist you with your career today?", sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChat = () => {
    setChat(!chat);
  };
  const API_URL=import.meta.env.VITE_API_URL
  const token=localStorage.getItem("token")

  const handleSend = async (customMessage) => {
    const text = customMessage || input.trim();
    if (!text) return;

    // Add user message
    const userMsg = { 
      text, 
      sender: 'user', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the API
      const response = await axios.post(
        `${API_URL}/chatbot/ask`,
        { prompt: text },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            Authorization: `Bearer ${token}`,

          }
        }
      );

      // Add bot response
      const botMsg = { 
        text: response.data.response, 
        sender: 'bot', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      const errorMsg = { 
        text: "Sorry, I'm having trouble connecting. Please try again later.", 
        sender: 'bot', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <img src={bot} alt="Chatbot" className='bot' onClick={handleChat} />
      
      {chat && (
        <div className="chatbot-container">
          <div className="chat-header">
            Carrerk AI
            <i className='fa-solid fa-xmark mt-1' onClick={handleChat}></i>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}>
                {msg.text}
                <div className="timestamp">{msg.time}</div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <div className="suggestions">
            <button onClick={() => handleSend("What career options suit my skills?")}>
              Career options
            </button>
            <button onClick={() => handleSend("How can I improve my resume?")}>
              Resume help
            </button>
          </div>

          <div className="chat-input">
            
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <span 
              className="icon" 
              onClick={() => handleSend()}
              style={{ cursor: 'pointer' }}
            >
              <i className="fa-regular fa-paper-plane i mx-2"></i>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;