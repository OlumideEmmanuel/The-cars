// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout
import Navbar from './Components/layout/Navbar';

// Pages
import HomePage from './pages/home/HomePage';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import UnderConstruction from './pages/shared/UnderConstruction';

// Global styles
import './styles/global.css';

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<UnderConstruction pageName="About Us" />} />
        <Route path="/reviews" element={<UnderConstruction pageName="Reviews" />} />
        <Route path="/contact" element={<UnderConstruction pageName="Contact Us" />} />
        <Route path="/browse" element={<UnderConstruction pageName="Browse Cars" />} />
        <Route path="/car/:id" element={<UnderConstruction pageName="Car Details" />} />
        <Route path="/wishlist" element={<UnderConstruction pageName="My Wishlist" />} />
        <Route path="/compare" element={<UnderConstruction pageName="Compare Cars" />} />
        <Route path="/seller" element={<UnderConstruction pageName="Sell Your Car" />} />
      </Routes>
    </div>
  );
};

export default App;