import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
// import logo from '../assets/logo.svg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="nav-container">
         <div className="logo">
          <Link to="/" onClick={closeMenu}>
           </Link>
        </div>

         <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
  
          <NavLink to="/reviews" onClick={closeMenu}>Reviews</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>

           <Link to="/signup" className="signup-btn mobile-btn" onClick={closeMenu}>
            Sign Up
          </Link>
        </nav>

         <div className="cta-btn-container">
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
        </div>

         <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
