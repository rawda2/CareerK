import React, { useState } from "react";
import "../ResetPass/Reset.css";
import "./OTP.css";
import Left from "../Left/Left";
import OtpInput from "react-otp-input";
import { useNavigate } from 'react-router-dom';
import Countdown from "../CountDown/CountDown";
import axios from 'axios';

export default function OTP() {
  const [otp, setOtp] = useState("");
  const API=import.meta.env.VITE_API_URL
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    const email = localStorage.getItem('resetEmail'); // <--- get email
    try {
      const response = await axios.post(`${API}/password/verify-otp`, { otp ,email });
      console.log(response.data);
      localStorage.setItem('OTP',otp); 

      navigate('/new'); // Go to New Password page if OTP is correct
    } catch (error) {
      console.error(error);
      alert('Invalid OTP, try again.');
    }
  };

  return (
    <div className="OTP">
      <div className="body d-flex w-100 vh-100 ">
        <div className="right">
          <div className="content">
            <h2>OTP</h2>
            <p className=" text-muted">Enter the code we sent to your email</p>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="otp-separator p-1"></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: '45px',
                    height: '45px',
                    fontSize: '20px',
                    textAlign: 'center',
                    margin: '0 5px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(249, 249, 249, 1)'
                  }}
                />
              )}
            />
            <div className="d-flex justify-content-end mt-3 me-5"><Countdown/></div>
            <button onClick={handleVerifyOtp} className="rounded">Send</button>
            <button className="d-block text-center mt-3 rounded me-4 text-decoration-none" onClick={handleVerifyOtp}>
              Send Again
            </button>
          </div>
        </div>
        <Left />
      </div>
    </div>
  );
}
