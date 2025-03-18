import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Chat.css";
import { FaUserCircle } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";

const Chat = () => {
  return (
    <div className="chat-container d-flex">
      {/* Sidebar */}
      <div className="sidebar p-3 border-end">
        <h5 className="mb-3">All</h5>
        <div className="chat-list">
          {["Front End", "Back End", "Cyber Security", "AI", "UI/UX", "Data Analyst", "IT", "System Admin", "Flutter"].map((chat, index) => (
            <div key={index} className="chat-item d-flex align-items-center p-2">
              <FaUserCircle size={30} className="me-2" />
              <div>
                <h6 className="mb-0">{chat}</h6>
                <small className="text-muted">Pre-pinned chat</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="chat-window flex-grow-1 d-flex flex-column">
        <div className="chat-header p-3 border-bottom d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <FaUserCircle size={30} className="me-2" />
            <h5 className="mb-0">Team Unicorns</h5>
          </div>
          <FiMoreHorizontal size={25} />
        </div>

        <div className="chat-messages p-3 flex-grow-1 overflow-auto">
          <div className="message sent">
            <p>Hi team 👋</p>
            <small>11:02 AM</small>
          </div>
          <div className="message sent">
            <p>Anyone on for lunch today?</p>
            <small>11:02 AM</small>
          </div>
          <div className="message received">
            <p>I'm down! Any ideas?</p>
            <small>11:03 AM</small>
          </div>
          <div className="message received">
            <p>I was thinking the cafe downtown</p>
            <small>11:05 AM</small>
          </div>
          <div className="message sent">
            <p>I'm down for whatever!</p>
            <small>11:06 AM</small>
          </div>
          <div className="message sent">
            <p>Agreed</p>
            <small>11:07 AM</small>
          </div>
        </div>

        {/* Chat Input */}
        <div className="chat-input p-3 border-top">
          <input type="text" className="form-control" placeholder="Start typing..." />
        </div>
      </div>
    </div>
  );
};

export default Chat;