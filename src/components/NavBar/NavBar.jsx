import React, { useState } from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';
import logo from './../../assets/navLogo.png'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow ">
      <div className="container w-100 d-flex justify-content-evenly align-items-center">
        {/* Brand/Logo */}
        <div className="logo ">
        <img src={logo} alt="" />

        </div>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse mt-3 navbar-collapse ${isMenuOpen ? 'show' : ''} ms-5`} id="navbarNav">
          <ul className="navbar-nav  ">
            <li className="nav-item ">
              <Link className="nav-link" to={'/home'}>Home</Link>
            </li>
            <li className="nav-item ms-lg-5">
              <Link className="nav-link" to={'/jops'}>Jobs</Link>
            </li>
            <li className="nav-item ms-lg-5">
              <Link className="nav-link" to={'/courses'}>Courses</Link>
            </li>
            <li className="nav-item ms-lg-5">
              <Link className="nav-link" to={'/roadmaps'}>Road Maps</Link>
            </li>
            <li className="nav-item ms-lg-5">
              <Link className="nav-link" to={''}>Contact Us</Link>
            </li>
           
          </ul>

        </div>
        <div className="icons mt-1">
          <ul className=' list-unstyled d-flex'>
            <li className="icon mt-2 ms-5 d-flex flex-column justify-content-center align-items-center">
            <i className="fa-regular fa-comments"></i>  
            <a className="linkNav" href="/comm">Community</a>
            </li>
            <li className="icon mt-2 ms-5 d-flex flex-column justify-content-center align-items-center">
            <i className="fa-regular fa-bell"></i>      
            <a className="linkNav" href="/notification">Notification</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;