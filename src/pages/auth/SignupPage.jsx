// src/pages/auth/SignupPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
    agreeToTerms: false,
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
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // For now just navigate home — real auth comes with Supabase later
    alert('Account created successfully! (Auth coming soon)');
    navigate('/');
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">

        {/* Left side — branding */}
        <div className="signup-left">
          <h1>The Cars</h1>
          <p>Your trusted car marketplace. Buy, sell, and discover your next ride.</p>
          <ul>
            <li>✅ Verified sellers</li>
            <li>✅ Thousands of listings</li>
            <li>✅ Safe & secure payments</li>
            <li>✅ Free to browse</li>
          </ul>
        </div>

        {/* Right side — form */}
        <div className="signup-right">
          <h2>Create your account</h2>
          <p className="signup-subtitle">
            Already have an account? <Link to="/login">Log in</Link>
          </p>

          {/* Role toggle */}
          <div className="role-toggle">
            <button
              type="button"
              className={formData.role === 'buyer' ? 'active' : ''}
              onClick={() => setFormData(prev => ({ ...prev, role: 'buyer' }))}
            >
              I'm a Buyer
            </button>
            <button
              type="button"
              className={formData.role === 'seller' ? 'active' : ''}
              onClick={() => setFormData(prev => ({ ...prev, role: 'seller' }))}
            >
              I'm a Seller
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <span className="error">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john@email.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+234 800 000 0000"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Min. 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
              {errors.agreeToTerms && <span className="error">{errors.agreeToTerms}</span>}
            </div>

            <button type="submit" className="signup-submit-btn">
              Create Account
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;