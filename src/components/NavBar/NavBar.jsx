import React, { useState } from 'react';
import './NavBar.css'
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow px-lg-3 px-md-5">
      <div className="container d-flex justify-content-center">
        {/* Brand/Logo */}
        <div className="logo ">
        <img src="src\assets\navLogo.png" alt="" />

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
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''} ms-5`} id="navbarNav">
          <ul className="navbar-nav  ">
            <li className="nav-item ">
              <a className="nav-link" href="">Home</a>
            </li>
            <li className="nav-item ms-lg-5">
              <a className="nav-link" href="">Services</a>
            </li>
            <li className="nav-item ms-lg-5">
              <a className="nav-link" href="">About Us</a>
            </li>
            <li className="nav-item ms-lg-5">
              <a className="nav-link" href="">Contact Us</a>
            </li>
           
          </ul>

        </div>
        <div className="icons">
          <ul className=' list-unstyled d-flex'>
            <li className="icon mt-2 ms-5 d-flex flex-column justify-content-center align-items-center">
            <i class="fa-regular fa-comments"></i>  
            <a className="link" href="/community">Community</a>
            </li>
            <li className="icon mt-2 ms-5 d-flex flex-column justify-content-center align-items-center">
            <i class="fa-regular fa-bell"></i>      
            <a className="link" href="/notification">Notification</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;