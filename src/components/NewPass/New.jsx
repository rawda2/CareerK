import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Left from '../Left/Left';

export default function New() {
  const [password, setPassword] = useState('');
  const [confirm_password, setconfirm_password] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const email=localStorage.getItem("resetEmail")
    const otp=localStorage.getItem("OTP")


    try {
      const response = await axios.post(
        'https://aedb-197-160-222-137.ngrok-free.app/api/password/reset-password',
        {
          email,
          otp,
          password,
          confirm_password,
        },
        {
          headers: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmFhNjRiMzk5NDYzMjE3NjEyMWZmZSIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc4MjMxNzA2LCJleHAiOjE2ODYwMDc3MDZ9.OxP2pS-D8ub3wk-CCQabA2GtBXaUEvHMnYwOe6XNyEA'
          }
        }
      );

      console.log(response.data);
      // Navigate to login after success
      navigate('/login');
    } catch (error) {
      console.error('Error changing password:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <>
      <div className="new ">
        <div className="body d-flex w-100 vh-100">
          <div className="right">
            <div className="content px-5">
              <h2>Reset Password</h2>
              <p className=' text-muted'>Enter your new password</p>
              <form onSubmit={handleSubmit} className=''>
               
                <div className="part d-flex flex-column">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-2 py-1 rounded"
                  />
                </div>
                <div className="part d-flex flex-column">
                  <label htmlFor="confirm_password">Re-Password</label>
                  <input
                    type="password"
                    id="confirm_password"
                    value={confirm_password}
                    onChange={(e) => setconfirm_password(e.target.value)}
                    className="px-2 py-1 rounded"
                  />
                </div>
                <button type="submit" className="rounded mt-4">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
          <Left />
        </div>
      </div>
    </>
  );
}
