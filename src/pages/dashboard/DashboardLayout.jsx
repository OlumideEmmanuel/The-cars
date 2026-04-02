// src/pages/dashboard/DashboardLayout.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import './DashboardLayout.css';

const buyerNav = [
  { to: '/dashboard', icon: 'bi-grid', label: 'Overview', end: true },
  { to: '/dashboard/wishlist', icon: 'bi-heart', label: 'Wishlist' },
  { to: '/dashboard/recently-viewed', icon: 'bi-clock-history', label: 'Recently Viewed' },
  { to: '/dashboard/compare', icon: 'bi-bar-chart-steps', label: 'Compare Cars' },
  { to: '/dashboard/messages', icon: 'bi-chat-dots', label: 'Messages' },
  { to: '/dashboard/profile', icon: 'bi-person', label: 'My Profile' },
  { to: '/dashboard/settings', icon: 'bi-gear', label: 'Settings' },
];

const sellerNav = [
  { to: '/dashboard', icon: 'bi-grid', label: 'Overview', end: true },
  { to: '/dashboard/listings', icon: 'bi-car-front', label: 'My Listings' },
  { to: '/dashboard/messages', icon: 'bi-chat-dots', label: 'Leads & Messages' },
  { to: '/dashboard/wishlist', icon: 'bi-heart', label: 'Wishlist' },
  { to: '/dashboard/compare', icon: 'bi-bar-chart-steps', label: 'Compare Cars' },
  { to: '/dashboard/profile', icon: 'bi-person', label: 'My Profile' },
  { to: '/dashboard/settings', icon: 'bi-gear', label: 'Settings' },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('buyer'); // toggle for demo
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const nav = role === 'buyer' ? buyerNav : sellerNav;

  return (
    <div className="dashboard-wrapper">

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'dashboard-sidebar--open' : ''}`}>

        {/* Brand */}
        <div className="sidebar-brand" onClick={() => navigate('/')}>
          <span className="logo-the">THE</span>
          <span className="logo-cars">CARS</span>
        </div>

        {/* Role toggle */}
        <div className="role-toggle-wrap">
          <div className="role-toggle">
            <button
              className={role === 'buyer' ? 'active' : ''}
              onClick={() => setRole('buyer')}
            >
              <i className="bi bi-person"></i> Buyer
            </button>
            <button
              className={role === 'seller' ? 'active' : ''}
              onClick={() => setRole('seller')}
            >
              <i className="bi bi-tag"></i> Seller
            </button>
          </div>
        </div>

        {/* User info */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">EO</div>
          <div>
            <strong>Emmanuel O.</strong>
            <span>{role === 'buyer' ? 'Buyer Account' : 'Seller Account'}</span>
          </div>
        </div>

        {/* Nav items */}
        <nav className="sidebar-nav">
          <p className="nav-section-label">Menu</p>
          {nav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? 'sidebar-nav-item--active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="sidebar-bottom">
          <button className="sidebar-browse-btn" onClick={() => navigate('/browse')}>
            <i className="bi bi-search"></i> Browse Cars
          </button>
          <button className="sidebar-logout-btn" onClick={() => navigate('/')}>
            <i className="bi bi-box-arrow-left"></i> Log Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="dashboard-main">

        {/* Top bar */}
        <header className="dashboard-topbar">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="bi bi-list"></i>
          </button>
          <div className="topbar-search">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search cars, messages..." />
          </div>
          <div className="topbar-actions">
            <button className="topbar-action-btn">
              <i className="bi bi-bell"></i>
              <span className="notif-dot"></span>
            </button>
            <button className="topbar-action-btn" onClick={() => navigate('/browse')}>
              <i className="bi bi-plus-circle"></i>
            </button>
            <div className="topbar-avatar" onClick={() => navigate('/dashboard/profile')}>
              EO
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="dashboard-content">
          <Outlet context={{ role }} />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;