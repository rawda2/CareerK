import React from "react";
import "../ResetPass/Reset.css";
import "./OTP.css"
import Left from "../Left/Left";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { NavLink } from 'react-router-dom';

export default function OTP() {
  const [otp, setOtp] = useState("");
  return (
    <>
      <div className="OTP">
        <div className="body d-flex w-100 vh-100 ">
          <div className="right">
            <div className="content">
              <h2>OTP</h2>
              <p>Enter the code we sent to your email</p>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
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
                      borderRadius:'10px',
                      backgroundColor:'rgba(249, 249, 249, 1)'
                    }}
                  />
                
                )}
              />
              <span className="d-flex justify-content-end mt-3 me-5">end in 1:30</span>
            <button className=" rounded"> <NavLink to={"/new"} className={"NavLink"}>Send</NavLink></button>
            <NavLink to={"/newpass"} className="d-block text-center mt-3 me-4 text-decoration-none">Send Again</NavLink>
            </div>
          </div>
          <Left/>

        </div>
      </div>
    </>
  );
}
