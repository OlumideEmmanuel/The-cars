// src/pages/home/CTABanner.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CTABanner.css';

const CTABanner = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-container">

        <div className="cta-content">
          <p className="section-tag">Ready to Start?</p>
          <h2>Have a Car to Sell?</h2>
          <p>
            Join thousands of sellers who list their cars on THE CARS every day.
            It's free, fast, and your next buyer is already waiting.
          </p>
          <div className="cta-actions">
            <button className="cta-btn-primary" onClick={() => navigate('/signup')}>
              <i className="bi bi-plus-circle-fill"></i>
              List Your Car for Free
            </button>
            <button className="cta-btn-secondary" onClick={() => navigate('/browse')}>
              <i className="bi bi-search"></i>
              Browse Cars
            </button>
          </div>
        </div>

        <div className="cta-visual">
          <div className="cta-stat">
            <i className="bi bi-eye-fill"></i>
            <span>1M+ Views Monthly</span>
          </div>
          <div className="cta-stat">
            <i className="bi bi-clock-fill"></i>
            <span>Avg. 4 Days to Sell</span>
          </div>
          <div className="cta-stat">
            <i className="bi bi-cash-stack"></i>
            <span>Zero Listing Fees</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTABanner;