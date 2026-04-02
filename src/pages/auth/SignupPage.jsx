import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [modal, setModal] = useState({ show: false, title: '', message: '', type: '' });

  const closeModal = () => setModal({ show: false, title: '', message: '', type: '' });

useEffect(() => {
  const newErrors = {};

  if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Enter a valid email address';
  } else {
    newErrors.email = '';
  }

  if (formData.password) {
    let strength = 0;
    if (formData.password.length >= 6) strength++;
    if (/[A-Z]/.test(formData.password)) strength++;
    if (/[0-9]/.test(formData.password)) strength++;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++;
    setPasswordStrength(Math.min(strength, 3));
  } else {
    setPasswordStrength(0);
  }

  if (formData.confirmPassword) {
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    } else {
      newErrors.confirmPassword = '';
    }
  }

  setErrors(prev => {
    const merged = { ...prev, ...newErrors };
    Object.keys(merged).forEach(key => {
      if (merged[key] === '') delete merged[key];
    });
    return merged;
  });
}, [formData.email, formData.password, formData.confirmPassword]);

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

    setLoading(true);

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const emailExists = existingUsers.some(user => user.email === formData.email);

    if (emailExists) {
      setModal({
        show: true,
        title: 'Signup Failed',
        message: 'This email is already registered. Please log in.',
        type: 'error',
      });
      setLoading(false);
      return;
    }

    const newUser = {
      id: Date.now(),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password, 
      role: formData.role,
      createdAt: new Date().toISOString(),
    };

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    setLoading(false);
    setModal({
      show: true,
      title: 'Account Created!',
      message: 'Your account has been created successfully. Please log in.',
      type: 'success',
    });
  };

  const strengthText = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#e53e3e', '#ed8936', '#ecc94b', '#48bb78'];

  return (
    <div className="signup-wrapper">
      <div className="signup-card">

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
                {formData.password && (
                  <div className="password-strength">
                    <div
                      className="strength-bar"
                      style={{
                        width: `${(passwordStrength + 1) * 25}%`,
                        backgroundColor: strengthColors[passwordStrength],
                      }}
                    />
                    <span className="strength-text">
                      Strength: {strengthText[passwordStrength]}
                    </span>
                  </div>
                )}
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

            <button type="submit" className="signup-submit-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className={`modal-box ${modal.type === 'error' ? 'modal-error' : 'modal-success'}`} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <i className="bi bi-x-lg"></i>
            </button>
            <div className="modal-icon">
              <i className={`bi ${modal.type === 'error' ? 'bi-x-circle-fill' : 'bi-check-circle-fill'}`}></i>
            </div>
            <h3>{modal.title}</h3>
            <p>{modal.message}</p>
            {modal.type === 'success' && (
              <button className="modal-btn-primary" onClick={() => navigate('/login')}>
                Go to Login
              </button>
            )}
            {modal.type === 'error' && (
              <button className="modal-btn-secondary" onClick={closeModal}>
                Try Again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;