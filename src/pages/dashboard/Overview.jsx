// src/pages/dashboard/Overview.jsx
import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { carsData } from '../../data/carsData';
import './Overview.css';

const recentActivity = [
  { icon: 'bi-heart-fill', color: '#e53e3e', text: 'You saved Toyota Camry 2024', time: '2 hours ago' },
  { icon: 'bi-eye-fill', color: 'var(--primary)', text: 'You viewed BMW X5 2023', time: '5 hours ago' },
  { icon: 'bi-chat-dots-fill', color: '#16a34a', text: 'New message from seller of Ford Mustang', time: '1 day ago' },
  { icon: 'bi-bar-chart-steps', color: '#7c3aed', text: 'You compared 2 cars', time: '2 days ago' },
];

const buyerStats = [
  { icon: 'bi-heart-fill', label: 'Saved Cars', value: '12', color: '#e53e3e', bg: '#fff5f5' },
  { icon: 'bi-eye-fill', label: 'Recently Viewed', value: '34', color: 'var(--primary)', bg: 'var(--primary-light)' },
  { icon: 'bi-chat-dots-fill', label: 'Active Chats', value: '3', color: '#16a34a', bg: '#f0fdf4' },
  { icon: 'bi-bar-chart-steps', label: 'Comparisons', value: '5', color: '#7c3aed', bg: '#f5f3ff' },
];

const sellerStats = [
  { icon: 'bi-car-front-fill', label: 'Active Listings', value: '4', color: 'var(--primary)', bg: 'var(--primary-light)' },
  { icon: 'bi-eye-fill', label: 'Total Views', value: '1,240', color: '#16a34a', bg: '#f0fdf4' },
  { icon: 'bi-whatsapp', label: 'WhatsApp Leads', value: '34', color: '#25D366', bg: '#f0fdf4' },
  { icon: 'bi-cash-stack', label: 'Cars Sold', value: '2', color: '#f6c90e', bg: '#fffbeb' },
];

const Overview = () => {
  const navigate = useNavigate();
  const { role } = useOutletContext();
  const stats = role === 'buyer' ? buyerStats : sellerStats;
  const featuredCars = carsData.slice(0, 4);

  return (
    <div className="overview-page">

      {/* Welcome banner */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <h1>Welcome back, Emmanuel</h1>
          <p>
            {role === 'buyer'
              ? 'Here is a summary of your activity on THE CARS.'
              : 'Here is how your listings are performing today.'}
          </p>
        </div>
        <div className="welcome-actions">
          {role === 'buyer' ? (
            <button onClick={() => navigate('/browse')}>
              <i className="bi bi-search"></i> Browse Cars
            </button>
          ) : (
            <button onClick={() => navigate('/seller/new-listing')}>
              <i className="bi bi-plus-circle"></i> New Listing
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        {stats.map((stat, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-card-icon" style={{ background: stat.bg }}>
              <i className={`bi ${stat.icon}`} style={{ color: stat.color }}></i>
            </div>
            <div className="stat-card-info">
              <span className="stat-card-value">{stat.value}</span>
              <span className="stat-card-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="overview-grid">

        {/* Recent Activity */}
        <div className="overview-card">
          <div className="overview-card-header">
            <h3><i className="bi bi-clock-history"></i> Recent Activity</h3>
          </div>
          <div className="activity-list">
            {recentActivity.map((item, i) => (
              <div className="activity-item" key={i}>
                <div className="activity-icon" style={{ background: `${item.color}15` }}>
                  <i className={`bi ${item.icon}`} style={{ color: item.color }}></i>
                </div>
                <div className="activity-text">
                  <p>{item.text}</p>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="overview-card">
          <div className="overview-card-header">
            <h3><i className="bi bi-lightning-charge"></i> Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <button onClick={() => navigate('/browse')}>
              <i className="bi bi-search"></i>
              <span>Browse Cars</span>
            </button>
            <button onClick={() => navigate('/dashboard/wishlist')}>
              <i className="bi bi-heart"></i>
              <span>My Wishlist</span>
            </button>
            <button onClick={() => navigate('/dashboard/compare')}>
              <i className="bi bi-bar-chart-steps"></i>
              <span>Compare Cars</span>
            </button>
            <button onClick={() => navigate('/dashboard/messages')}>
              <i className="bi bi-chat-dots"></i>
              <span>Messages</span>
            </button>
            <button onClick={() => navigate('/dashboard/profile')}>
              <i className="bi bi-person"></i>
              <span>My Profile</span>
            </button>
            {role === 'seller' && (
              <button onClick={() => navigate('/seller/new-listing')}>
                <i className="bi bi-plus-circle"></i>
                <span>New Listing</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Recommended cars */}
      <div className="overview-card" style={{ marginTop: '1.5rem' }}>
        <div className="overview-card-header">
          <h3><i className="bi bi-stars"></i> Recommended For You</h3>
          <button className="card-header-link" onClick={() => navigate('/browse')}>
            View All <i className="bi bi-arrow-right"></i>
          </button>
        </div>
        <div className="recommended-grid">
          {featuredCars.map(car => (
            <div
              className="rec-car-card"
              key={car.id}
              onClick={() => navigate(`/car/${car.id}`)}
            >
              <div className="rec-car-img">
                <img src={car.image} alt={car.name} />
              </div>
              <div className="rec-car-info">
                <h4>{car.name}</h4>
                <span className="rec-car-price">{car.price}</span>
                <div className="rec-car-specs">
                  <span><i className="bi bi-calendar3"></i>{car.year}</span>
                  <span><i className="bi bi-fuel-pump"></i>{car.fuel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Overview;