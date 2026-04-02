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
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, title: '', message: '', type: '' });

  const closeModal = () => setModal({ show: false, title: '', message: '', type: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.emailOrPhone.trim()) newErrors.emailOrPhone = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
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

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === formData.emailOrPhone && u.password === formData.password);

    if (!user) {
      setModal({
        show: true,
        title: 'Login Failed',
        message: 'Invalid email or password. Please try again.',
        type: 'error',
      });
      setLoading(false);
      return;
    }

    const { password, ...userWithoutPassword } = user;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

    setLoading(false);
    // Redirect to dashboard overview
    navigate('/dashboard/overview');
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Left side – branding */}
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
              <label>Email Address</label>
              <input
                type="email"
                name="emailOrPhone"
                placeholder="john@email.com"
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

            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
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
            <button className="modal-btn-primary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;