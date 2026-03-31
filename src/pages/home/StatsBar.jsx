// src/pages/home/StatsBar.jsx
import React from 'react';
import './StatsBar.css';

const stats = [
  { icon: 'bi-car-front-fill', value: '2,400+', label: 'Cars Listed' },
  { icon: 'bi-shield-check', value: '840+', label: 'Verified Sellers' },
  { icon: 'bi-geo-alt-fill', value: '36', label: 'States Covered' },
  { icon: 'bi-people-fill', value: '12,000+', label: 'Happy Buyers' },
];

const StatsBar = () => {
  return (
    <section className="stats-bar">
      <div className="stats-container">
        {stats.map((stat, i) => (
          <div className="stat-item" key={i}>
            <div className="stat-icon">
              <i className={`bi ${stat.icon}`}></i>
            </div>
            <div className="stat-text">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
            {i < stats.length - 1 && <div className="stat-divider" />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;