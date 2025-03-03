import React from 'react'
import "./Reset.css"
import { NavLink } from 'react-router-dom';
import Left from '../Left/Left';
export default function Reset() {
  return (
    <>
    
    <div className="reset ">
       
       <div className="body d-flex w-100 vh-100 ">
          <div className="right">
            <div className="content">
            <h2>Reset Password</h2>
            <p>Enter your email to send OTP</p>
            <form action="">
                <label htmlFor="">Email</label>
                <input type="text" name="emailReset" id="emailReset" className=' rounded-2 py-1 mb-3 ps-2' />
                <button type="submit" className=' rounded' > <NavLink to={'/otp'} className={"NavLink"}> Send OTP </NavLink></button>
            </form>       
         </div>
          </div>
          <Left/>

       </div>
     </div>
    </>
  )
}
