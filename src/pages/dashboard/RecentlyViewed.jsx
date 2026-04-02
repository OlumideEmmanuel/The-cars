// src/pages/dashboard/RecentlyViewed.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { carsData } from '../../data/carsData';
import './Wishlist.css';

const RecentlyViewed = () => {
  const navigate = useNavigate();
  const recentlyViewed = carsData.slice(5, 11);

  return (
    <div className="dashboard-section">
      <div className="section-page-header">
        <div>
          <h2><i className="bi bi-clock-history"></i> Recently Viewed</h2>
          <p>{recentlyViewed.length} cars you recently viewed</p>
        </div>
        <button className="header-action-btn" onClick={() => navigate('/browse')}>
          <i className="bi bi-search"></i> Browse More
        </button>
      </div>

      {recentlyViewed.length === 0 ? (
        <div className="empty-dashboard-state">
          <i className="bi bi-clock-history"></i>
          <h3>No recently viewed cars</h3>
          <p>Cars you view will appear here automatically.</p>
          <button onClick={() => navigate('/browse')}>Start Browsing</button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {recentlyViewed.map(car => (
            <div className="wishlist-card" key={car.id}>
              <div className="wishlist-img" onClick={() => navigate(`/car/${car.id}`)}>
                <img src={car.image} alt={car.name} />
                <span className="wishlist-category">{car.category}</span>
              </div>
              <div className="wishlist-body">
                <div className="wishlist-top">
                  <h3 onClick={() => navigate(`/car/${car.id}`)}>{car.name}</h3>
                  <span className="wishlist-price">{car.price}</span>
                </div>
                <div className="card-specs">
                  <span><i className="bi bi-calendar3"></i>{car.year}</span>
                  <span><i className="bi bi-speedometer2"></i>{car.mileage}</span>
                  <span><i className="bi bi-fuel-pump"></i>{car.fuel}</span>
                </div>
                <div className="wishlist-actions">
                  <button className="wishlist-view-btn" onClick={() => navigate(`/car/${car.id}`)}>
                    <i className="bi bi-eye"></i> View Details
                  </button>
                  <button className="wishlist-view-btn" style={{ background: '#fff', border: '1.5px solid #e8e8e8', color: 'var(--text-dark)' }}>
                    <i className="bi bi-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;