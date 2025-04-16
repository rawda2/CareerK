import React from "react";
import { motion } from "motion/react"
import "./Splash.css";
import logo from "./../../assets/logoSh.png";
import splash from "./../../assets/splash.png";

export default function Splash() {
  return (
    <div className="splash d-flex justify-content-between align-items-center vh-100 gap-2 p-5">
      {/* Left Image */}
      <motion.div
        className="left"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img src={splash} alt="splash" />
      </motion.div>

      {/* Right Content */}
      <motion.div
        className="right d-flex flex-column gap-3 justify-content-center align-items-center text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
      >
        <motion.h2
          className="ms-5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Welcome To
        </motion.h2>

        {/* Logo Animation */}
        <motion.img
          src={logo}
          className="shadow-pop-tr"
          alt=""
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1,
            type: "spring",
            stiffness: 100,
          }}
        />

        {/* Description */}
        <p className="text-center">
          An integrated <span>platform</span> offering specialized{" "}
          <span>courses</span> and innovative <span>job</span> opportunities to
          enhance <span>skill</span> development. It leverages <span>AI</span>{" "}
          for personalized learning experiences and interactive{" "}
          <span>chat</span> support for guidance and communication.
        </p>

        {/* Button with hover effect */}
        <motion.button
          className="Btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <a href="./login" className="text-decoration-none">
            Enjoy Your Journey
          </a>
        </motion.button>
      </motion.div>
    </div>
  );
}
