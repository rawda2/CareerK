import React, { useState } from "react";
import "./CNavBar.css";
import { Link } from "react-router-dom";
import logo from "./../../../assets/navLogo.png";
import note from "./../../../assets/notifi.png";

import { useNavigate } from "react-router-dom";

export default function CNavBar() {

  const navigate = useNavigate()
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showNotif, setShowNoti] = useState(false)
  const handleNotify=()=>{
      setShowNoti(!showNotif)
  }
  const toggleLogoutPopup = () => {
    setShowLogoutPopup(!showLogoutPopup);

  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className=" container-fluid px-5 py-2 d-flex justify-content-between align-items-center">
          <Link className="navbar-brand  mt-3" >
            <img src={logo} alt="Logo" />
          </Link>
          <div className=" w-75 " id="navbarNav">
            <ul className="navbar-nav w-100 d-flex justify-content-center mt-3">
              <li className="nav-item me-5">
                <Link className="nav-link" to={'/Cprofile'}>
                  Home
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link className="nav-link" to={'/postjob'}>
                  Post Job
                </Link>
              </li>
              <li className="nav-item me-5">
                <Link className="nav-link" to={'/postedJobs'}>
                  Posted Jops
                </Link>
              </li>

            </ul>

          </div>
          <div className=" d-flex align-items-center w-15 ms-2">
            <div className="nav-item me-4 d-flex flex-column align-items-center">
              <span className="nav-link " onClick={handleNotify}>
                <i className=" fa-regular fa-bell  mt-3 ms-2 p-2 profile rounded-circle"></i>
              </span>
            </div>
            <div className="nav-item d-flex flex-column align-items-center">
              <Link className="nav-link" to={'/Cprofile'}>
                <i className="fa-regular fa-user  mt-3 ms-2 p-2 profile rounded-circle"></i>
              </Link>
            </div>
            <div className="nav-item d-flex flex-column align-items-center">
              <span onClick={toggleLogoutPopup}>
                <i className="fa-solid fa-right-from-bracket  mt-3 ms-3 p-2 profile rounded-circle"></i>
              </span>
            </div>
          </div>
        </div>
      </nav>
      {showNotif ?
        <>
          <div className="notify p-3 shadow">
            <div className="head d-flex justify-content-between ">
              <Link className=" text-decoration-none i" to={'/Cnotifi'} onClick={handleNotify}><i className=" fa-solid fa-bell"></i> See All Notifications</Link>
              <i className=" fa-solid fa-xmark fa-xl mt-3 text-muted  " onClick={handleNotify}></i>

            </div>
            <div className="notes mt-1">
              <div className="note d-flex align-items-center mb-2 mt-3">
                <div className="note-img">
                  <i className=" fa-solid fa-user  i fa-xl"></i>              </div>
                <div className="caption">
                  <p className=" p mt-3">Lorem ipsum dolor sit amet.</p>              </div>
                <div className="time">
                  <p className=" p mt-3 ms-1">time</p>
                </div>

              </div>
              <div className="note d-flex align-items-center mb-2">
                <div className="note-img">
                  <i className=" fa-solid fa-user  i fa-xl"></i>
                </div>
                <div className="caption">
                  <p className=" p mt-3">Lorem ipsum dolor sit amet.</p>              </div>
                <div className="time">
                  <p className=" p mt-3 ms-1">time</p>
                </div>

              </div>
              <div className="note d-flex align-items-center mb-2">
                <div className="note-img">
                  <i className=" fa-solid fa-user  i fa-xl"></i>
                </div>
                <div className="caption">
                  <p className=" p mt-3">Lorem ipsum dolor sit amet.</p>              </div>
                <div className="time">
                  <p className=" p mt-3 ms-1">time</p>
                </div>

              </div>
              <div className="note d-flex align-items-center mb-2">
                <div className="note-img">
                  <i className=" fa-solid fa-user  i fa-xl"></i>
                </div>
                <div className="caption">
                  <p className=" p mt-3">Lorem ipsum dolor sit amet.</p>              </div>
                <div className="time">
                  <p className=" p mt-3 ms-1">time</p>
                </div>

              </div>
              <div className="note d-flex align-items-center mb-2">
                <div className="note-img">
                  <i className=" fa-solid fa-user  i fa-xl"></i>
                </div>
                <div className="caption">
                  <p className=" p mt-3">Lorem ipsum dolor sit amet.</p>              </div>
                <div className="time">
                  <p className=" p mt-3 ms-1">time</p>
                </div>

              </div>
              <div className="note d-flex align-items-center mb-2">
                <div className="note-img">
                  <i className=" fa-solid fa-user  i fa-xl"></i>
                </div>
                <div className="caption">
                  <p className=" p mt-3">Lorem ipsum dolor sit amet.</p>              </div>
                <div className="time">
                  <p className=" p mt-3 ms-1">time</p>
                </div>


              </div>

            </div>
          </div>

        </> : ""}
      {showLogoutPopup && (
        <div className="overlay">
          <div className="logout-popup p-4 rounded-4 shadow position-relative text-center bg-light">
            <div className="title d-flex justify-content-between">
              <h4>Logout</h4>
              <i className="fa-solid fa-xmark" onClick={toggleLogoutPopup}></i>
            </div>
            <p>Are you sure you want to logout?</p>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-outline-danger"><Link id="link" onClick={handleLogout}>LogOut</Link></button>
              <button className="btn btn-danger" onClick={toggleLogoutPopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>


  );
};

