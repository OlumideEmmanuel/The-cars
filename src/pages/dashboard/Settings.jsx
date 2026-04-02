// src/pages/dashboard/Settings.jsx
import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    newMessages: true,
    priceAlerts: true,
    newListings: false,
    weeklyDigest: true,
    smsAlerts: false,
  });

  const [passwordData, setPasswordData] = useState({
    current: '', newPass: '', confirm: ''
  });

  const [saved, setSaved] = useState('');

  const toggleNotif = key =>
    setNotifications(p => ({ ...p, [key]: !p[key] }));

  const saveSection = (section) => {
    setSaved(section);
    setTimeout(() => setSaved(''), 3000);
  };

  return (
    <div className="dashboard-section">
      <div className="section-page-header">
        <div>
          <h2><i className="bi bi-gear-fill"></i> Settings</h2>
          <p>Manage your account preferences</p>
        </div>
      </div>

      <div className="settings-layout">

        {/* Notifications */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div>
              <h3><i className="bi bi-bell"></i> Notifications</h3>
              <p>Control what alerts you receive</p>
            </div>
          </div>
          <div className="settings-card-body">
            {[
              { key: 'newMessages', label: 'New Messages', desc: 'Get notified when sellers reply to your inquiries' },
              { key: 'priceAlerts', label: 'Price Drop Alerts', desc: 'Know when saved cars drop in price' },
              { key: 'newListings', label: 'New Listings', desc: 'Be notified when cars matching your search are listed' },
              { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'A weekly summary of activity and new cars' },
              { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive critical alerts via SMS' },
            ].map(item => (
              <div className="settings-row" key={item.key}>
                <div className="settings-row-info">
                  <strong>{item.label}</strong>
                  <span>{item.desc}</span>
                </div>
                <div
                  className={`toggle-switch ${notifications[item.key] ? 'toggle-switch--on' : ''}`}
                  onClick={() => toggleNotif(item.key)}
                >
                  <div className="toggle-thumb"></div>
                </div>
              </div>
            ))}
            <button className="settings-save-btn" onClick={() => saveSection('notif')}>
              {saved === 'notif' ? <><i className="bi bi-check"></i> Saved!</> : 'Save Preferences'}
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div>
              <h3><i className="bi bi-lock"></i> Change Password</h3>
              <p>Keep your account secure</p>
            </div>
          </div>
          <div className="settings-card-body">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                value={passwordData.current}
                onChange={e => setPasswordData(p => ({ ...p, current: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                value={passwordData.newPass}
                onChange={e => setPasswordData(p => ({ ...p, newPass: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                placeholder="Repeat new password"
                value={passwordData.confirm}
                onChange={e => setPasswordData(p => ({ ...p, confirm: e.target.value }))}
              />
            </div>
            <button className="settings-save-btn" onClick={() => saveSection('pass')}>
              {saved === 'pass' ? <><i className="bi bi-check"></i> Password Updated!</> : 'Update Password'}
            </button>
          </div>
        </div>

        {/* Privacy */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div>
              <h3><i className="bi bi-eye-slash"></i> Privacy</h3>
              <p>Control your visibility and data</p>
            </div>
          </div>
          <div className="settings-card-body">
            {[
              { label: 'Show my profile to sellers', desc: 'Sellers can see your name when you contact them' },
              { label: 'Show my phone number', desc: 'Allow sellers to see your phone number' },
              { label: 'Allow data for personalization', desc: 'We use this to improve your recommendations' },
            ].map((item, i) => (
              <div className="settings-row" key={i}>
                <div className="settings-row-info">
                  <strong>{item.label}</strong>
                  <span>{item.desc}</span>
                </div>
                <div className="toggle-switch toggle-switch--on">
                  <div className="toggle-thumb"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="settings-card settings-card--danger">
          <div className="settings-card-header">
            <div>
              <h3><i className="bi bi-exclamation-triangle"></i> Danger Zone</h3>
              <p>These actions are irreversible</p>
            </div>
          </div>
          <div className="settings-card-body">
            <div className="danger-actions">
              <div className="danger-item">
                <div>
                  <strong>Deactivate Account</strong>
                  <p>Temporarily disable your account. You can reactivate anytime.</p>
                </div>
                <button className="danger-btn danger-btn--soft">Deactivate</button>
              </div>
              <div className="danger-item">
                <div>
                  <strong>Delete Account</strong>
                  <p>Permanently delete your account and all your data. This cannot be undone.</p>
                </div>
                <button className="danger-btn danger-btn--hard">Delete Account</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;