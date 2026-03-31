// src/components/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-the">THE</span>
            <span className="logo-cars">CARS</span>
          </div>
          <p className="footer-desc">
            Nigeria's most trusted car marketplace. Buy and sell verified vehicles with confidence.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
            <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
            <a href="#" aria-label="WhatsApp"><i className="bi bi-whatsapp"></i></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Explore</h3>
          <ul>
            <li><Link to="/browse">Browse Cars</Link></li>
            <li><Link to="/browse?category=SUVs">SUVs</Link></li>
            <li><Link to="/browse?category=Sedans">Sedans</Link></li>
            <li><Link to="/browse?category=Electric">Electric</Link></li>
            <li><Link to="/compare">Compare Cars</Link></li>
          </ul>
        </div>

        {/* Sellers */}
        <div className="footer-links">
          <h3>Sellers</h3>
          <ul>
            <li><Link to="/seller">Sell Your Car</Link></li>
            <li><Link to="/seller/dashboard">Seller Dashboard</Link></li>
            <li><Link to="/signup">Create Account</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-links">
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} THE CARS. All rights reserved.</p>
        <p>Built with care by <span>Olumide Emmanuel</span></p>
      </div>
    </footer>
  );
};

export default Footer;