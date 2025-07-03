import React from 'react';
import './Footer.css';
import logo from './../../assets/logo (2).png'

export default function Footer() {
    return (
        <footer className="footer mt-5">
            <div className="footer-container container ">
                <div className="footer-section">
                    <div className="logo-section">
                        <img src={logo} alt="Company Logo" className="footer-logo" />
                        <p>Call Now: (319) 555-0115</p>
                        <p>6391 Elgin St. Celina, Delaware 10299, New York, United States of America</p>
                    </div>
                </div>
                <div className="footer-section">
                    <h5 className="footer-heading">Quick Links</h5>
                    <ul className="footer-list">
                        <li><a href="/about">About</a></li>
                        <li><a href="/pricing">Pricing</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/blog">Blog</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h5 className="footer-heading">Candidate</h5>
                    <ul className="footer-list">
                        <li><a href="/saved-jobs">Saved Jobs</a></li>
                        <li><a href="/browse-jobs">Browse Jobs</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h5 className="footer-heading">Contact Us</h5>
                    <ul className="footer-list">
                        <li>Address: Eavalcairo Nasr-city</li>
                        <li>Phone: +91 91813 23 2309</li>
                        <li>Email: support@gmail.com</li>
                    </ul>
                    <div className="social-icons">
                        <a href="https://facebook.com" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                        <a href="https://instagram.com" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                        <a href="https://twitter.com" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                        <a href="https://linkedin.com" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}