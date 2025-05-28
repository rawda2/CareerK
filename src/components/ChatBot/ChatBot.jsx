import React, { useState } from 'react';
import './Chatbot.css';
import bot from './../../assets/bot.png'
import file from './../../assets/file.png'


const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "I'm doing great! how are you today?", sender: 'bot', time: '12:17 PM' },
    { text: "I'm doing great! how are you today?", sender: 'bot', time: '12:17 PM' },
    { text: 'can ou', sender: 'user', time: '12:17 PM' },
    { text: "I'm doing great! how are you today?", sender: 'bot', time: '12:17 PM' },
  ]);

  const [input, setInput] = useState('');

  const handleSend = (customMessage) => {
    const text = customMessage || input.trim();
    if (text) {
      const newMsg = { text, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages([...messages, newMsg]);
      setInput('');
    }
  };

  const [chat, setChat] = useState(false);
  const handleChat = () => {
    setChat(!chat)
  }

  return (
    <>
      <img src={bot} alt="" className='bot' onClick={handleChat} />
      {chat && (<>

        <div className="chatbot-container">
          <div className="chat-header">
            Carrerk AI
            {/* <span onClick={handleChat}>—</span> */}
            <i className=' fa-solid fa-xmark mt-1 ' onClick={handleChat}></i>
          </div>

          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}>
                {msg.text}
                <div className="timestamp">{msg.time}</div>
              </div>
            ))}
            <div className="typing-indicator"></div>
          </div>

          <div className="suggestions">
            <button onClick={() => handleSend("Hi, Bot")}>Hi, Bot</button>
            <button onClick={() => handleSend("Can you help me?")}>Can you help me?</button>
          </div>


          <div className="chat-input">
            <span className="icon"><img src={file} alt="" /></span>
            <input
              type="text"
              placeholder="Aa"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <span className="icon"><i className="fa-regular fa-paper-plane i mx-2"></i></span>
          </div>
        </div>
      </>)}
    </>

  );
};

export default ChatBot;
