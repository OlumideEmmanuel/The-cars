// src/pages/home/HowItWorks.jsx
import React, { useState } from 'react';
import './HowItWorks.css';

const buyerSteps = [
  {
    icon: 'bi-search',
    title: 'Search & Filter',
    desc: 'Browse thousands of verified listings. Filter by make, model, year, price, and location to find exactly what you want.',
  },
  {
    icon: 'bi-person-check',
    title: 'Contact the Seller',
    desc: 'Reach out directly via WhatsApp or phone call. No middlemen, no delays — just direct communication.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Inspect & Buy',
    desc: 'Arrange a physical inspection, negotiate your price, and complete your purchase safely with our escrow support.',
  },
];

const sellerSteps = [
  {
    icon: 'bi-person-plus',
    title: 'Create an Account',
    desc: 'Sign up as a seller in minutes. Verify your identity and get access to your seller dashboard instantly.',
  },
  {
    icon: 'bi-card-list',
    title: 'List Your Car',
    desc: 'Fill in your car details, upload high-quality photos, set your price, and submit for review.',
  },
  {
    icon: 'bi-cash-coin',
    title: 'Get Paid',
    desc: 'Receive buyer leads directly. Close the deal at your terms and receive your payout securely.',
  },
];

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('buyer');
  const steps = activeTab === 'buyer' ? buyerSteps : sellerSteps;

  return (
    <section className="hiw-section">
      <div className="section-container">

        <div className="section-header center">
          <p className="section-tag">Simple Process</p>
          <h2 className="section-title">How It Works</h2>
          <p className="section-desc">
            Whether you're buying or selling, THE CARS makes it fast, safe, and simple.
          </p>
        </div>

        {/* Tab toggle */}
        <div className="hiw-tabs">
          <button
            className={`hiw-tab ${activeTab === 'buyer' ? 'hiw-tab--active' : ''}`}
            onClick={() => setActiveTab('buyer')}
          >
            <i className="bi bi-person"></i> I'm a Buyer
          </button>
          <button
            className={`hiw-tab ${activeTab === 'seller' ? 'hiw-tab--active' : ''}`}
            onClick={() => setActiveTab('seller')}
          >
            <i className="bi bi-tag"></i> I'm a Seller
          </button>
        </div>

        {/* Steps */}
        <div className="hiw-steps">
          {steps.map((step, i) => (
            <div className="hiw-step" key={i}>
              <div className="hiw-step-number">{String(i + 1).padStart(2, '0')}</div>
              <div className="hiw-icon">
                <i className={`bi ${step.icon}`}></i>
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hiw-connector">
                  <i className="bi bi-arrow-right"></i>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;