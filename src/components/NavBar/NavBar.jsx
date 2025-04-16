import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import logo from "./../../assets/navLogo.png";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className=" container-fluid px-5 py-2 d-flex justify-content-between align-items-center">
        <Link className="navbar-brand w-10 mt-1" to={'/home'}>
          <img src={logo} alt="Logo" />
        </Link>
        <div className=" w-75 " id="navbarNav">
          <ul className="navbar-nav w-100 d-flex justify-content-center mt-3">
            <li className="nav-item me-5">
              <Link className="nav-link" to={'/home'}>
                Home
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to={'/courses'}>
                Courses
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link"  to={'/jops'}>
                Job Matching
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to={'/roadmaps'}>
                Roadmaps
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to={'/comm'}>
                Community
              </Link>
            </li>
          </ul>
          
        </div>
        <div className="d-flex align-items-center w-15 ms-2">
            <div className="nav-item me-4 d-flex flex-column align-items-center">
              <i className=" fa-regular fa-bell mb-2 p-2 profile rounded-circle"></i> 
              <span className="nav-link">Notifications</span>
            </div>
            <div className="nav-item d-flex flex-column align-items-center">
              <span className=" rounded-circle mb-2  profile p-2">AM</span>
              <Link className="nav-link" to={'/profile'}>Profile</Link>
            </div>
          </div>
      </div>
    </nav>
  );
};

export default NavBar;
