import React from 'react'
import { NavLink } from 'react-router-dom'
import Left from '../Left/Left'
export default function New() {
  return (
    <>
      <div className="new">
       
       <div className="body d-flex w-100 vh-100 ">
          <div className="right">
            <div className="content">
            <h2>Reset Password</h2>
            <p>enter your new password</p>
            <form action="">
            <div className="part d-flex flex-column">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className=' px-2 py-1 rounded'
                
                />
            </div>
            <div className="part d-flex flex-column">
              <label htmlFor="password">Re-Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className=' px-2 py-1 rounded'
                />
            </div>
            <button className=" rounded mt-4"> <NavLink to={"/login"} className={"NavLink"}>Save Changes</NavLink></button>

            </form>       
         </div>
          </div>
          <Left/>

       </div>
     </div>
    
    </>
  )
}
