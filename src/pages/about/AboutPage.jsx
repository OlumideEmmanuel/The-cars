// src/pages/about/AboutPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/layout/Footer';
import './AboutPage.css';

const team = [
  { name: 'Emmanuel Olumide', role: 'Founder & CEO', initials: 'EO', desc: 'Passionate about making car ownership accessible to every Nigerian.' },
  { name: 'Chioma Okafor', role: 'Head of Product', initials: 'CO', desc: 'Building products that millions of users love and trust.' },
  { name: 'David Akinwale', role: 'Head of Engineering', initials: 'DA', desc: 'Architecting the technology that powers THE CARS platform.' },
  { name: 'Aisha Musa', role: 'Head of Operations', initials: 'AM', desc: 'Ensuring every seller and buyer has a seamless experience.' },
];

const values = [
  { icon: 'bi-shield-check', title: 'Trust', desc: 'We verify every seller and every listing. You deal only with real people.' },
  { icon: 'bi-lightbulb', title: 'Innovation', desc: 'We constantly improve our platform based on what users actually need.' },
  { icon: 'bi-people', title: 'Community', desc: 'We are building the most trusted car community in Nigeria.' },
  { icon: 'bi-transparency', title: 'Transparency', desc: 'No hidden fees, no surprises. Everything is clear from the start.' },
];

const milestones = [
  { year: '2024', title: 'THE CARS Founded', desc: 'Launched with a mission to fix the broken car market in Nigeria.' },
  { year: '2024', title: 'First 100 Listings', desc: 'Reached our first milestone in under 30 days of launch.' },
  { year: '2025', title: '840+ Verified Sellers', desc: 'Our seller network grew across all 36 states of Nigeria.' },
  { year: '2025', title: '12,000+ Happy Buyers', desc: 'Thousands of Nigerians found their perfect car through our platform.' },
];

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <p className="section-tag">Our Story</p>
          <h1>We Are Building the Future of Car Buying in Nigeria</h1>
          <p>
            THE CARS was founded with one mission — to make buying and selling cars in Nigeria
            safe, transparent, and accessible to everyone. No more shady deals. No more guesswork.
          </p>
          <button className="about-cta" onClick={() => navigate('/browse')}>
            <i className="bi bi-car-front"></i> Explore Our Platform
          </button>
        </div>
      </section>

      {/* Mission */}
      <section className="about-section">
        <div className="about-container">
          <div className="mission-grid">
            <div className="mission-content">
              <p className="section-tag">Our Mission</p>
              <h2 className="section-title">Making Every Car Deal Safe and Simple</h2>
              <p className="section-desc">
                The Nigerian car market is worth billions of naira, but it has always been plagued
                with fraud, opacity, and lack of trust. We set out to change that.
              </p>
              <p className="section-desc" style={{ marginTop: '1rem' }}>
                By combining technology with rigorous verification processes, we have created a
                marketplace where buyers know exactly what they are getting, and sellers can reach
                thousands of qualified buyers without leaving their homes.
              </p>
            </div>
            <div className="mission-stats">
              <div className="m-stat"><strong>₦2B+</strong><span>In Car Sales Facilitated</span></div>
              <div className="m-stat"><strong>36</strong><span>States Covered</span></div>
              <div className="m-stat"><strong>98%</strong><span>User Satisfaction Rate</span></div>
              <div className="m-stat"><strong>4 Days</strong><span>Average Time to Sell</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section about-section--grey">
        <div className="about-container">
          <div className="section-header center">
            <p className="section-tag">What Drives Us</p>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card" key={i}>
                <div className="value-icon">
                  <i className={`bi ${v.icon}`}></i>
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-section">
        <div className="about-container">
          <div className="section-header center">
            <p className="section-tag">Our Journey</p>
            <h2 className="section-title">Milestones</h2>
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-section about-section--grey">
        <div className="about-container">
          <div className="section-header center">
            <p className="section-tag">The People Behind THE CARS</p>
            <h2 className="section-title">Meet Our Team</h2>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div className="team-card" key={i}>
                <div className="team-avatar">{member.initials}</div>
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <div className="about-container" style={{ textAlign: 'center' }}>
          <h2>Ready to Experience THE CARS?</h2>
          <p>Join thousands of Nigerians buying and selling cars the right way.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <button className="about-btn-primary" onClick={() => navigate('/browse')}>
              <i className="bi bi-search"></i> Browse Cars
            </button>
            <button className="about-btn-secondary" onClick={() => navigate('/signup')}>
              <i className="bi bi-plus-circle"></i> Sell Your Car
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;