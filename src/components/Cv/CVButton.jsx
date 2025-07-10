import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMagic } from "react-icons/fa";
import axios from "axios";
import "./CVButton.css";

const CVButton = () => {
  const [hovered, setHovered] = useState(false);
  const [latestID, setLatestId] = useState("");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

const fetchLatestSession = async () => {
  try {
    const response = await axios.get(`${API}/cv-generation/current-session`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });

    const sessionData = response.data;

    if (sessionData?.session_id && sessionData?.data) {
      setLatestId(sessionData.session_id);
      console.log("Session ID:", sessionData.session_id);
      console.log("CV Data:", sessionData.data);

      // Optional: navigate and pass both sessionId + data to /cv
      navigate(`/cv?sessionId=${sessionData.session_id}`, {
        state: { formData: sessionData.data },
      });
    }
  } catch (error) {
    console.error("Error fetching latest session data:", error);
  }
};


  const startNewSession = async () => {
    try {
      const response = await axios.post(
        `${API}/cv-generation/session`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const sessionId = response.data.sessionId;
      navigate(`/cv?sessionId=${sessionId}`);
    } catch (error) {
      console.error("Error starting new session:", error);
    }
  };



  return (
    <div
      className="cv-floating-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="cv-hover-options ">
          <button onClick={startNewSession} className="cv-option-btn new">
            ➕ Create New CV
          </button>
          <button onClick={fetchLatestSession} className="cv-option-btn edit">
            ✏️ Edit Existing CV
          </button>
        </div>
      )}

      <div className="floating-cv-button pulse" title="Generate CV">
        <FaMagic size={35} />
      </div>
    </div>
  );
};

export default CVButton;
