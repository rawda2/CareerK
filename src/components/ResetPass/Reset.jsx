import React, { useState } from 'react';
import "./Reset.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Left from '../Left/Left';

export default function Reset() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const API=import.meta.env.VITE_API_URL
   
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/password/forgot-password`, { email });
      console.log(response.data);
      console.log("otp sent successfully")
      localStorage.setItem('resetEmail', email);
       
      navigate('/otp'); 
    } catch (error) {
      console.error(error);
      alert('Failed to send OTP. Try again.');
    }
  };

  return (
    <div className="reset px-5">
      <div className="body d-flex w-100 vh-100 ">
        <div className="right">
          <div className="content px-5">
            <h2>Reset Password</h2>
            <p className=' text-muted'>Enter your email to send OTP</p>
            <form onSubmit={handleSendOtp}>
              <label htmlFor="email">Email</label>
              <input 
                type="text" 
                className='rounded-2 py-1 mb-3 ps-2 mt-2' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
              />
              <button type="submit" className='rounded'>Send OTP</button>
            </form>       
          </div>
        </div>
        <Left />
      </div>
    </div>
  );
}
