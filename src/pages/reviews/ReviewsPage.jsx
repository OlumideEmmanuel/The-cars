// src/pages/reviews/ReviewsPage.jsx
import React, { useState } from 'react';
import Footer from '../../components/layout/Footer';
import './ReviewsPage.css';

const allReviews = [
  { id: 1, name: 'Chukwuemeka Obi', role: 'Buyer', location: 'Lagos', rating: 5, date: 'March 2025', category: 'buyer', text: 'Found my Toyota Camry in 3 days. Seller was verified, process was smooth, and the escrow made me feel safe. Absolutely the best car platform in Nigeria.' },
  { id: 2, name: 'Fatima Aliyu', role: 'Seller', location: 'Abuja', rating: 5, date: 'February 2025', category: 'seller', text: 'Listed on Thursday, had 6 serious inquiries by Saturday, sold on Sunday. I will never go back to selling through social media.' },
  { id: 3, name: 'Babatunde Adeyemi', role: 'Buyer', location: 'Port Harcourt', rating: 5, date: 'January 2025', category: 'buyer', text: 'The inspection checklist feature is incredible. I knew exactly what I was buying before I even met the seller. 10 out of 10.' },
  { id: 4, name: 'Ngozi Eze', role: 'Dealer', location: 'Enugu', rating: 5, date: 'March 2025', category: 'seller', text: 'As a dealer with 8 active listings, the dashboard is a lifesaver. I manage everything in one place and the lead tracking is very accurate.' },
  { id: 5, name: 'Emeka Nwosu', role: 'Buyer', location: 'Ibadan', rating: 4, date: 'March 2025', category: 'buyer', text: 'Great platform overall. The filter sidebar is very detailed and helped me narrow down exactly what I wanted. Would appreciate more listings in Ibadan.' },
  { id: 6, name: 'Amina Yusuf', role: 'Seller', location: 'Kano', rating: 5, date: 'February 2025', category: 'seller', text: 'My car sold in 9 days. I was skeptical at first but after the first WhatsApp lead came in within hours of listing, I was convinced.' },
];

const stats = [
  { value: '4.9', label: 'Average Rating', icon: 'bi-star-fill' },
  { value: '2,400+', label: 'Verified Reviews', icon: 'bi-chat-square-text' },
  { value: '98%', label: 'Would Recommend', icon: 'bi-hand-thumbs-up' },
  { value: '4 Days', label: 'Avg. Time to Sell', icon: 'bi-clock' },
];

const ReviewsPage = () => {
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({ name: '', role: 'buyer', rating: 5, text: '' });
  const [submitted, setSubmitted] = useState(false);

  const filtered = filter === 'all' ? allReviews : allReviews.filter(r => r.category === filter);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="reviews-page">

      {/* Hero */}
      <section className="reviews-hero">
        <div className="reviews-hero-inner">
          <p className="section-tag">Real People, Real Experiences</p>
          <h1>What Our Users Say</h1>
          <p>Thousands of Nigerians have bought and sold cars through THE CARS. Read their stories.</p>
          <div className="reviews-stats">
            {stats.map((s, i) => (
              <div className="review-stat" key={i}>
                <i className={`bi ${s.icon}`}></i>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews section */}
      <section className="reviews-section">
        <div className="reviews-container">

          {/* Filter tabs */}
          <div className="reviews-tabs">
            {['all', 'buyer', 'seller'].map(tab => (
              <button
                key={tab}
                className={`reviews-tab ${filter === tab ? 'reviews-tab--active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab === 'all' ? 'All Reviews' : tab === 'buyer' ? 'Buyers' : 'Sellers'}
              </button>
            ))}
          </div>

          {/* Reviews grid */}
          <div className="reviews-grid">
            {filtered.map(review => (
              <div className="review-card" key={review.id}>
                <div className="review-top">
                  <div className="reviewer-avatar">{review.name.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <strong>{review.name}</strong>
                    <span>{review.role} · {review.location}</span>
                  </div>
                  <span className="review-date">{review.date}</span>
                </div>
                <div className="review-stars">
                  {Array(5).fill(0).map((_, i) => (
                    <i key={i} className={`bi ${i < review.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
                  ))}
                </div>
                <p className="review-text">"{review.text}"</p>
              </div>
            ))}
          </div>

          {/* Write a review */}
          <div className="write-review">
            <div className="section-header center">
              <p className="section-tag">Share Your Experience</p>
              <h2 className="section-title">Write a Review</h2>
            </div>

            {submitted ? (
              <div className="review-success">
                <i className="bi bi-check-circle-fill"></i>
                <h3>Thank you for your review!</h3>
                <p>Your review will be published after a quick verification.</p>
                <button onClick={() => setSubmitted(false)}>Write Another</button>
              </div>
            ) : (
              <form className="review-form" onSubmit={handleSubmit}>
                <div className="review-form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>You Are</label>
                    <select
                      value={formData.role}
                      onChange={e => setFormData(p => ({ ...p, role: e.target.value }))}
                    >
                      <option value="buyer">A Buyer</option>
                      <option value="seller">A Seller</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Rating</label>
                  <div className="star-picker">
                    {[1,2,3,4,5].map(s => (
                      <button
                        type="button"
                        key={s}
                        className={s <= formData.rating ? 'star-active' : ''}
                        onClick={() => setFormData(p => ({ ...p, rating: s }))}
                      >
                        <i className="bi bi-star-fill"></i>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Review</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your experience buying or selling on THE CARS..."
                    value={formData.text}
                    onChange={e => setFormData(p => ({ ...p, text: e.target.value }))}
                    required
                  />
                </div>

                <button type="submit" className="review-submit-btn">
                  <i className="bi bi-send"></i> Submit Review
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReviewsPage;