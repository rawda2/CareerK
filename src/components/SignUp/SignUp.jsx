import React from "react";
import "./SignUp.css";
import Left from "../Left/Left";
import SignUpForm from './../SignUpForm/SignUpForm';

export default function SignUp() {


  return (
    <>
      <div className="signup ">
       
        <div className="body d-flex w-100 vh-100 ">
        
        
       <SignUpForm/>
        
       <Left/>

        </div>
      </div>
    </>
  );
}
