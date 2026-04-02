// src/pages/seller/SellerLandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/layout/Footer';
import './SellerLandingPage.css';

const steps = [
  {
    icon: 'bi-person-plus',
    title: 'Create Your Account',
    desc: 'Sign up as a seller in under 2 minutes. Verify your identity and get instant access to your dashboard.',
  },
  {
    icon: 'bi-card-list',
    title: 'List Your Car',
    desc: 'Fill in your car details, upload up to 15 photos, set your asking price, and submit for review.',
  },
  {
    icon: 'bi-bell',
    title: 'Receive Buyer Leads',
    desc: 'Get notified instantly when buyers call, WhatsApp, or save your listing.',
  },
  {
    icon: 'bi-cash-coin',
    title: 'Close the Deal',
    desc: 'Negotiate directly with buyers. Accept payment securely through our escrow system.',
  },
];

const perks = [
  { icon: 'bi-cash', title: 'Zero Listing Fees', desc: 'List your car completely free. No hidden charges.' },
  { icon: 'bi-eye', title: '1M+ Monthly Views', desc: 'Your listing gets seen by thousands of active buyers.' },
  { icon: 'bi-shield-check', title: 'Verified Buyer Network', desc: 'Only serious, verified buyers can contact you.' },
  { icon: 'bi-graph-up', title: 'Listing Analytics', desc: 'See exactly how many people viewed, saved, and clicked your listing.' },
  { icon: 'bi-whatsapp', title: 'Direct WhatsApp Leads', desc: 'Buyers reach you directly — no middlemen, no delays.' },
  { icon: 'bi-headset', title: 'Dedicated Support', desc: 'Our seller success team is available to help you close faster.' },
];

const faqs = [
  { q: 'How much does it cost to list my car?', a: 'Listing your car on THE CARS is completely free. We only charge a small success fee when your car sells.' },
  { q: 'How long does approval take?', a: 'Our team reviews all listings within 24 hours. You will be notified by email once your listing is approved or if changes are needed.' },
  { q: 'Can I list multiple cars?', a: 'Yes. Whether you are an individual seller or a dealer, you can list as many cars as you want from your seller dashboard.' },
  { q: 'What documents do I need?', a: 'You need a valid ID and proof of ownership. For dealers, a CAC registration document is required during onboarding.' },
  { q: 'How do I receive payment?', a: 'Payments are processed securely through our escrow system. Funds are released to you once the buyer confirms receipt of the vehicle.' },
];

const SellerLandingPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="seller-page">

      {/* Hero */}
      <section className="seller-hero">
        <div className="seller-hero-inner">
          <div className="seller-hero-content">
            <span className="seller-hero-tag">
              <i className="bi bi-star-fill"></i> Nigeria's #1 Car Marketplace
            </span>
            <h1>Sell Your Car Faster Than Ever</h1>
            <p>
              Join over 840 verified sellers who list their cars on THE CARS.
              Get real buyer leads, track your listing performance, and close deals safely.
            </p>
            <div className="seller-hero-actions">
              <button className="seller-cta-primary" onClick={() => navigate('/signup')}>
                <i className="bi bi-plus-circle-fill"></i>
                List Your Car for Free
              </button>
              <button className="seller-cta-secondary" onClick={() => navigate('/browse')}>
                <i className="bi bi-eye"></i>
                See Live Listings
              </button>
            </div>
            <div className="seller-hero-stats">
              <div><strong>₦0</strong><span>Listing Fee</span></div>
              <div><strong>24hrs</strong><span>Avg. Approval</span></div>
              <div><strong>4 Days</strong><span>Avg. Time to Sell</span></div>
            </div>
          </div>
          <div className="seller-hero-visual">
            <div className="seller-dashboard-preview">
              <div className="preview-header">
                <span className="preview-dot red"></span>
                <span className="preview-dot yellow"></span>
                <span className="preview-dot green"></span>
                <span className="preview-title">Seller Dashboard</span>
              </div>
              <div className="preview-stats">
                <div className="preview-stat">
                  <i className="bi bi-eye"></i>
                  <strong>1,240</strong>
                  <span>Total Views</span>
                </div>
                <div className="preview-stat">
                  <i className="bi bi-whatsapp"></i>
                  <strong>34</strong>
                  <span>WhatsApp Taps</span>
                </div>
                <div className="preview-stat">
                  <i className="bi bi-heart"></i>
                  <strong>89</strong>
                  <span>Saves</span>
                </div>
                <div className="preview-stat">
                  <i className="bi bi-telephone"></i>
                  <strong>12</strong>
                  <span>Calls</span>
                </div>
              </div>
              <div className="preview-listing">
                <div className="preview-listing-bar active">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Toyota Camry 2020</span>
                  <strong>₦8.5M</strong>
                </div>
                <div className="preview-listing-bar">
                  <i className="bi bi-clock"></i>
                  <span>BMW X5 2019</span>
                  <strong>₦22M</strong>
                </div>
                <div className="preview-listing-bar">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Ford Mustang 2021</span>
                  <strong>₦35M</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="seller-section">
        <div className="seller-container">
          <div className="section-header center">
            <p className="section-tag">Simple Process</p>
            <h2 className="section-title">How Selling Works</h2>
            <p className="section-desc">From listing to payment in 4 simple steps</p>
          </div>
          <div className="seller-steps">
            {steps.map((step, i) => (
              <div className="seller-step" key={i}>
                <div className="seller-step-num">{i + 1}</div>
                <div className="seller-step-icon">
                  <i className={`bi ${step.icon}`}></i>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="seller-section seller-section--dark">
        <div className="seller-container">
          <div className="section-header center">
            <p className="section-tag" style={{ color: '#90c4ff' }}>Why Sellers Choose Us</p>
            <h2 className="section-title" style={{ color: '#fff' }}>Everything You Need to Sell Fast</h2>
          </div>
          <div className="perks-grid">
            {perks.map((perk, i) => (
              <div className="perk-card" key={i}>
                <div className="perk-icon">
                  <i className={`bi ${perk.icon}`}></i>
                </div>
                <h3>{perk.title}</h3>
                <p>{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="seller-section">
        <div className="seller-container">
          <div className="section-header center">
            <p className="section-tag">Got Questions?</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div
                className={`faq-item ${openFaq === i ? 'faq-item--open' : ''}`}
                key={i}
              >
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <i className={`bi ${openFaq === i ? 'bi-dash' : 'bi-plus'}`}></i>
                </button>
                {openFaq === i && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="seller-final-cta">
        <div className="seller-container">
          <h2>Ready to List Your Car?</h2>
          <p>It takes less than 10 minutes and it's completely free to start.</p>
          <button className="seller-cta-primary" onClick={() => navigate('/signup')}>
            <i className="bi bi-arrow-right-circle-fill"></i>
            Get Started Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SellerLandingPage;