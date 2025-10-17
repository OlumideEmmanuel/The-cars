import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">The Cars</h2>
          <p className="footer-desc">
            Driving innovation and excellence — your trusted car marketplace.
          </p>
          <div className="footer-socials">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Featured Cars</a></li>
            <li><a href="#">Popular Categories</a></li>
            <li><a href="#">Buying Guides</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Resources</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} The Cars. All rights reserved.</p>
        <p>Designed by <span>Emmanuel</span></p>
      </div>
    </footer>
  );
};

export default Footer;
