// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Placeholder – replace with actual auth later
    alert('Login successful! (Auth coming soon)');
    navigate('/');
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* Left side – branding (same as signup) */}
        <div className="login-left">
          <h1>The Cars</h1>
          <p>Your trusted car marketplace. Buy, sell, and discover your next ride.</p>
          <ul>
            <li>✅ Verified sellers</li>
            <li>✅ Thousands of listings</li>
            <li>✅ Safe & secure payments</li>
            <li>✅ Free to browse</li>
          </ul>
        </div>

        {/* Right side – form */}
        <div className="login-right">
          <h2>Welcome back</h2>
          <p className="login-subtitle">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>

          <form onSubmit={handleSubmit} noValidate>

            <div className="form-group">
              <label>Email or Phone Number</label>
              <input
                type="text"
                name="emailOrPhone"
                placeholder="john@email.com or +234 800 000 0000"
                value={formData.emailOrPhone}
                onChange={handleChange}
              />
              {errors.emailOrPhone && <span className="error">{errors.emailOrPhone}</span>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="login-submit-btn">
              Log In
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;