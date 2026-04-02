// src/pages/dashboard/Profile.jsx
import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Emmanuel',
    lastName: 'Olumide',
    email: 'emmanuel@email.com',
    phone: '+234 800 000 0000',
    city: 'Lagos',
    state: 'Lagos State',
    bio: 'Car enthusiast and buyer. Looking for the perfect SUV for my family.',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = e =>
    setProfile(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="dashboard-section">
      <div className="section-page-header">
        <div>
          <h2><i className="bi bi-person-fill"></i> My Profile</h2>
          <p>Manage your personal information</p>
        </div>
        {!editing ? (
          <button className="header-action-btn" onClick={() => setEditing(true)}>
            <i className="bi bi-pencil"></i> Edit Profile
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button className="header-action-btn" onClick={handleSave}>
              <i className="bi bi-check-lg"></i> Save Changes
            </button>
            <button className="header-cancel-btn" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {saved && (
        <div className="profile-success-toast">
          <i className="bi bi-check-circle-fill"></i> Profile updated successfully!
        </div>
      )}

      <div className="profile-layout">

        {/* Left - Avatar */}
        <div className="profile-avatar-card">
          <div className="profile-big-avatar">EO</div>
          <h3>{profile.firstName} {profile.lastName}</h3>
          <span>Verified Buyer</span>
          <div className="profile-badges">
            <span className="p-badge"><i className="bi bi-patch-check-fill"></i> Verified</span>
            <span className="p-badge"><i className="bi bi-shield-check"></i> Trusted</span>
          </div>
          {editing && (
            <button className="change-photo-btn">
              <i className="bi bi-camera"></i> Change Photo
            </button>
          )}
          <div className="profile-mini-stats">
            <div><strong>12</strong><span>Saved</span></div>
            <div><strong>34</strong><span>Viewed</span></div>
            <div><strong>3</strong><span>Chats</span></div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="profile-form-card">
          <h3 className="profile-section-title">Personal Information</h3>
          <div className="profile-form">
            <div className="profile-form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>
            <div className="profile-form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>
            <div className="profile-form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                disabled={!editing}
                rows={3}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;