// src/pages/contact/ContactPage.jsx
import React, { useState } from 'react';
import Footer from '../../components/layout/Footer';
import './ContactPage.css';

const contactInfo = [
  { icon: 'bi-envelope-fill', title: 'Email Us', value: 'hello@thecars.ng', sub: 'We reply within 24 hours' },
  { icon: 'bi-telephone-fill', title: 'Call Us', value: '+234 800 000 0000', sub: 'Mon – Sat, 8am – 6pm' },
  { icon: 'bi-whatsapp', title: 'WhatsApp', value: '+234 800 000 0000', sub: 'Chat with us directly' },
  { icon: 'bi-geo-alt-fill', title: 'Visit Us', value: 'Victoria Island, Lagos', sub: 'Nigeria' },
];

const faqs = [
  { q: 'How do I report a suspicious listing?', a: 'Click the "Report Listing" button on any car detail page and fill in the reason. Our team reviews all reports within 6 hours.' },
  { q: 'I paid but did not receive the car. What do I do?', a: 'Contact us immediately via WhatsApp or email. If you used our escrow system, your funds are protected and will be refunded.' },
  { q: 'How do I become a verified seller?', a: 'Create a seller account, submit your ID and proof of address, and our team will verify you within 24 hours.' },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <p className="section-tag">We Are Here to Help</p>
          <h1>Get In Touch With Us</h1>
          <p>Have a question, complaint, or just want to say hello? We are always available.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-container">

          {/* Info cards */}
          <div className="contact-info-grid">
            {contactInfo.map((info, i) => (
              <div className="contact-info-card" key={i}>
                <div className="contact-info-icon">
                  <i className={`bi ${info.icon}`}></i>
                </div>
                <h3>{info.title}</h3>
                <strong>{info.value}</strong>
                <span>{info.sub}</span>
              </div>
            ))}
          </div>

          {/* Form + FAQ */}
          <div className="contact-main">

            {/* Form */}
            <div className="contact-form-wrap">
              <h2>Send Us a Message</h2>
              <p>Fill in the form below and we will get back to you as soon as possible.</p>

              {submitted ? (
                <div className="contact-success">
                  <i className="bi bi-check-circle-fill"></i>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)}>Send Another Message</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-row">
                    <div className="form-group">
                      <label>Your Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select name="subject" value={formData.subject} onChange={handleChange} required>
                      <option value="">Select a subject</option>
                      <option value="buying">Question about buying a car</option>
                      <option value="selling">Question about selling a car</option>
                      <option value="payment">Payment issue</option>
                      <option value="report">Report a listing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="contact-submit-btn">
                    <i className="bi bi-send"></i> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div className="contact-faq">
              <h2>Quick Answers</h2>
              <p>Common questions we get asked.</p>
              <div className="contact-faq-list">
                {faqs.map((faq, i) => (
                  <div className="contact-faq-item" key={i}>
                    <div className="faq-q">
                      <i className="bi bi-question-circle-fill"></i>
                      <strong>{faq.q}</strong>
                    </div>
                    <p>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;