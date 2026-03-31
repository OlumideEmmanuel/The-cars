// src/pages/home/Testimonials.jsx
import React, { useState } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Chukwuemeka Obi',
    role: 'Bought a Toyota Camry',
    location: 'Lagos',
    rating: 5,
    text: 'I found my car in less than 3 days. The seller was verified, the process was smooth, and the price was fair. THE CARS is the real deal.',
    initials: 'CO',
  },
  {
    name: 'Fatima Aliyu',
    role: 'Sold her Honda Accord',
    location: 'Abuja',
    rating: 5,
    text: 'Listed my car on a Thursday, had 6 serious inquiries by Saturday, and closed the deal on Sunday. I wish I knew about this platform sooner.',
    initials: 'FA',
  },
  {
    name: 'Babatunde Adeyemi',
    role: 'Bought a Ford Mustang',
    location: 'Port Harcourt',
    rating: 5,
    text: 'The inspection feature gave me so much confidence. I could see the full history, verified specs, and the seller was transparent throughout.',
    initials: 'BA',
  },
  {
    name: 'Ngozi Eze',
    role: 'Sold two vehicles',
    location: 'Enugu',
    rating: 5,
    text: 'As a dealer, the seller dashboard is incredibly useful. I track all my leads, manage listings, and monitor views — all in one place.',
    initials: 'NE',
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive(i => (i + 1) % testimonials.length);

  return (
    <section className="testimonials-section">
      <div className="section-container">

        <div className="section-header center">
          <p className="section-tag">Real Stories</p>
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-desc">
            Thousands of Nigerians have bought and sold cars through THE CARS.
            Here's what some of them have to say.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div
              className={`testimonial-card ${i === active ? 'testimonial-card--active' : ''}`}
              key={i}
            >
              {/* Stars */}
              <div className="t-stars">
                {Array(t.rating).fill(0).map((_, s) => (
                  <i key={s} className="bi bi-star-fill"></i>
                ))}
              </div>

              <p className="t-text">"{t.text}"</p>

              <div className="t-author">
                <div className="t-avatar">{t.initials}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role} · {t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="t-nav">
          <button className="t-nav-btn" onClick={prev}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <div className="t-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`t-dot ${i === active ? 't-dot--active' : ''}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          <button className="t-nav-btn" onClick={next}>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;