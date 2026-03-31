// src/pages/home/WhyChooseUs.jsx
import React from 'react';
import './WhyChooseUs.css';

const reasons = [
  {
    icon: 'bi-shield-fill-check',
    title: 'Verified Sellers',
    desc: 'Every seller on THE CARS goes through an identity verification process. You deal with real people only.',
  },
  {
    icon: 'bi-lock-fill',
    title: 'Safe Payments',
    desc: 'Our escrow payment system holds funds securely until both parties are satisfied with the transaction.',
  },
  {
    icon: 'bi-lightning-charge-fill',
    title: 'Fast Listings',
    desc: 'List your car in under 10 minutes. Our streamlined form gets your car in front of buyers fast.',
  },
  {
    icon: 'bi-headset',
    title: '24/7 Support',
    desc: 'Our team is always available to resolve disputes, answer questions, and guide you through the process.',
  },
  {
    icon: 'bi-graph-up-arrow',
    title: 'Market Insights',
    desc: 'Get real-time price data and market trends to help you buy or sell at the right price every time.',
  },
  {
    icon: 'bi-geo-alt-fill',
    title: 'Nationwide Coverage',
    desc: 'Listings from all 36 states in Nigeria. Find or sell a car no matter where you are in the country.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-section">
      <div className="section-container">

        <div className="why-inner">

          {/* Left */}
          <div className="why-left">
            <p className="section-tag">Why THE CARS</p>
            <h2 className="section-title">
              The Smarter Way to Buy and Sell Cars in Nigeria
            </h2>
            <p className="section-desc">
              We built THE CARS because buying and selling cars in Nigeria should be
              transparent, fast, and safe. No shady deals. No hidden fees.
            </p>
            <div className="why-cta">
              <button className="why-btn-primary">
                <i className="bi bi-search"></i> Browse Cars
              </button>
              <button className="why-btn-secondary">
                <i className="bi bi-plus-circle"></i> List Your Car
              </button>
            </div>
          </div>

          {/* Right — cards */}
          <div className="why-grid">
            {reasons.map((reason, i) => (
              <div className="why-card" key={i}>
                <div className="why-card-icon">
                  <i className={`bi ${reason.icon}`}></i>
                </div>
                <h3>{reason.title}</h3>
                <p>{reason.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;