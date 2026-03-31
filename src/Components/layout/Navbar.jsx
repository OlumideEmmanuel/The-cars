// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="nav-container">

        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="logo-the">THE</span>
          <span className="logo-cars">CARS</span>
        </Link>

        {/* Nav Links */}
        <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/browse" onClick={closeMenu}>Browse Cars</NavLink>
          <NavLink to="/seller" onClick={closeMenu}>Sell Your Car</NavLink>
          <NavLink to="/reviews" onClick={closeMenu}>Reviews</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          <div className="nav-auth-mobile">
            <Link to="/login" className="btn-login-mobile" onClick={closeMenu}>Log In</Link>
            <Link to="/signup" className="btn-signup-mobile" onClick={closeMenu}>Sign Up</Link>
          </div>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="nav-auth">
          <Link to="/login" className="btn-login">Log In</Link>
          <Link to="/signup" className="btn-signup">Sign Up</Link>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
        </button>

      </div>
    </header>
  );
};

export default Navbar;