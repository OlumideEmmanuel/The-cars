// src/pages/car-detail/CarDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { carsData } from '../../data/carsData';
import Footer from '../../components/layout/Footer';
import './CarDetailPage.css';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = carsData.find(c => c.id === Number(id));

  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [reported, setReported] = useState(false);
  const [showReport, setShowReport] = useState(false);
  // const [compareList, setCompareList] = useState([]);

  const similar = carsData
    .filter(c => c.category === car?.category && c.id !== car?.id)
    .slice(0, 4);

  // Use same image multiple times to simulate a gallery
  const images = car ? [car.image, car.image, car.image] : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    // Track recently viewed
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    if (car && !viewed.find(v => v.id === car.id)) {
      const updated = [car, ...viewed].slice(0, 10);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    }
  }, [id]);

  if (!car) {
    return (
      <div className="car-not-found">
        <i className="bi bi-exclamation-circle"></i>
        <h2>Car Not Found</h2>
        <p>The listing you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/browse')}>Back to Browse</button>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hi, I saw your ${car.name} listed on THE CARS for ${car.price}. Is it still available?`);
    window.open(`https://wa.me/2348000000000?text=${msg}`, '_blank');
  };

  const handleCall = () => {
    window.open('tel:+2348000000000', '_self');
  };

  const specs = [
    { label: 'Make', value: car.name.split(' ')[0], icon: 'bi-car-front' },
    { label: 'Model', value: car.name.split(' ').slice(1).join(' '), icon: 'bi-tag' },
    { label: 'Year', value: car.year, icon: 'bi-calendar3' },
    { label: 'Mileage', value: car.mileage, icon: 'bi-speedometer2' },
    { label: 'Fuel Type', value: car.fuel, icon: 'bi-fuel-pump' },
    { label: 'Condition', value: car.mileage === '0 miles' ? 'Brand New' : 'Used', icon: 'bi-patch-check' },
    { label: 'Category', value: car.category, icon: 'bi-grid' },
    { label: 'Price', value: car.price, icon: 'bi-cash' },
  ];

  return (
    <div className="car-detail-page">

      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb-inner">
          <button onClick={() => navigate('/')}>Home</button>
          <i className="bi bi-chevron-right"></i>
          <button onClick={() => navigate('/browse')}>Browse</button>
          <i className="bi bi-chevron-right"></i>
          <button onClick={() => navigate(`/browse?category=${car.category}`)}>{car.category}</button>
          <i className="bi bi-chevron-right"></i>
          <span>{car.name}</span>
        </div>
      </div>

      <div className="car-detail-container">
        <div className="car-detail-main">

          {/* LEFT — Gallery */}
          <div className="gallery-section">
            <div className="gallery-main">
              <img src={images[activeImage]} alt={car.name} />
              <div className="gallery-badges">
                {car.mileage === '0 miles' && (
                  <span className="g-badge g-badge--new">Brand New</span>
                )}
                <span className="g-badge">{car.category}</span>
              </div>
              {/* Nav arrows */}
              <button
                className="gallery-arrow gallery-arrow--prev"
                onClick={() => setActiveImage(i => (i - 1 + images.length) % images.length)}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                className="gallery-arrow gallery-arrow--next"
                onClick={() => setActiveImage(i => (i + 1) % images.length)}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>

            {/* Thumbnails */}
            <div className="gallery-thumbs">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`gallery-thumb ${i === activeImage ? 'gallery-thumb--active' : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt={`View ${i + 1}`} />
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="gallery-actions">
              <button
                className={`action-btn ${saved ? 'action-btn--active' : ''}`}
                onClick={() => setSaved(!saved)}
              >
                <i className={`bi ${saved ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                {saved ? 'Saved' : 'Save to Wishlist'}
              </button>
              <button className="action-btn" onClick={() => navigate('/compare')}>
                <i className="bi bi-bar-chart-steps"></i>
                Compare
              </button>
              <button className="action-btn action-btn--danger" onClick={() => setShowReport(true)}>
                <i className="bi bi-flag"></i>
                Report
              </button>
            </div>
          </div>

          {/* RIGHT — Info */}
          <div className="car-info-section">

            {/* Header */}
            <div className="car-info-header">
              <div>
                <h1 className="car-detail-title">{car.name}</h1>
                <div className="car-detail-meta">
                  <span><i className="bi bi-calendar3"></i>{car.year}</span>
                  <span><i className="bi bi-speedometer2"></i>{car.mileage}</span>
                  <span><i className="bi bi-fuel-pump"></i>{car.fuel}</span>
                </div>
              </div>
              <div className="car-detail-price">{car.price}</div>
            </div>

            {/* Seller card */}
            <div className="seller-card">
              <div className="seller-card-header">
                <div className="seller-avatar">EO</div>
                <div className="seller-info">
                  <strong>Emmanuel Olumide</strong>
                  <span>Verified Seller</span>
                  <div className="seller-rating">
                    {Array(5).fill(0).map((_, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                    <span>(24 reviews)</span>
                  </div>
                </div>
                <span className="seller-badge">
                  <i className="bi bi-patch-check-fill"></i> Verified
                </span>
              </div>
              <div className="seller-actions">
                <button className="seller-btn seller-btn--call" onClick={handleCall}>
                  <i className="bi bi-telephone-fill"></i>
                  Call Seller
                </button>
                <button className="seller-btn seller-btn--whatsapp" onClick={handleWhatsApp}>
                  <i className="bi bi-whatsapp"></i>
                  WhatsApp
                </button>
              </div>
              <p className="seller-note">
                <i className="bi bi-shield-check"></i>
                Always inspect the vehicle before making payment.
              </p>
            </div>

            {/* Specs table */}
            <div className="specs-section">
              <h3 className="section-subheading">
                <i className="bi bi-list-check"></i> Vehicle Specifications
              </h3>
              <div className="specs-grid">
                {specs.map((spec, i) => (
                  <div className="spec-row" key={i}>
                    <div className="spec-label">
                      <i className={`bi ${spec.icon}`}></i>
                      {spec.label}
                    </div>
                    <div className="spec-value">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="description-section">
              <h3 className="section-subheading">
                <i className="bi bi-file-text"></i> Description
              </h3>
              <p>{car.description}</p>
              <p style={{ marginTop: '0.8rem', color: 'var(--text-mid)', fontSize: '0.9rem' }}>
                This vehicle has been inspected and verified by our team. All specifications
                listed are accurate to the best of the seller's knowledge. We encourage all
                buyers to conduct an independent inspection before completing any purchase.
              </p>
            </div>

            {/* Safety checks */}
            <div className="safety-section">
              <h3 className="section-subheading">
                <i className="bi bi-shield-check"></i> Safety Checks
              </h3>
              <div className="safety-grid">
                {[
                  'Identity Verified', 'Ownership Confirmed',
                  'Price Verified', 'Photos Authentic',
                  'No Duplicate Listing', 'Listing Approved'
                ].map((check, i) => (
                  <div className="safety-item" key={i}>
                    <i className="bi bi-check-circle-fill"></i>
                    {check}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Similar Cars */}
        {similar.length > 0 && (
          <div className="similar-section">
            <div className="section-header">
              <div>
                <p className="section-tag">You Might Also Like</p>
                <h2 className="section-title">Similar Cars</h2>
              </div>
              <button
                className="view-all-btn"
                onClick={() => navigate(`/browse?category=${car.category}`)}
              >
                View All <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            <div className="similar-grid">
              {similar.map(c => (
                <div
                  className="similar-card"
                  key={c.id}
                  onClick={() => navigate(`/car/${c.id}`)}
                >
                  <div className="similar-img">
                    <img src={c.image} alt={c.name} />
                  </div>
                  <div className="similar-body">
                    <h4>{c.name}</h4>
                    <span className="card-price">{c.price}</span>
                    <div className="card-specs">
                      <span><i className="bi bi-calendar3"></i>{c.year}</span>
                      <span><i className="bi bi-fuel-pump"></i>{c.fuel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky bar */}
      <div className="mobile-sticky-bar">
        <div className="mobile-sticky-price">{car.price}</div>
        <div className="mobile-sticky-actions">
          <button onClick={handleCall}>
            <i className="bi bi-telephone-fill"></i> Call
          </button>
          <button className="whatsapp" onClick={handleWhatsApp}>
            <i className="bi bi-whatsapp"></i> WhatsApp
          </button>
        </div>
      </div>

      {/* Report Modal */}
      {showReport && (
        <div className="modal-overlay" onClick={() => setShowReport(false)}>
          <div className="report-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowReport(false)}>
              <i className="bi bi-x-lg"></i>
            </button>
            <h3>Report Listing</h3>
            <p>Why are you reporting this listing?</p>
            <div className="report-options">
              {['Fake listing', 'Wrong price', 'Duplicate listing', 'Scam attempt', 'Incorrect photos', 'Other'].map(r => (
                <button
                  key={r}
                  className="report-option"
                  onClick={() => { setReported(true); setShowReport(false); }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {reported && (
        <div className="toast-notification">
          <i className="bi bi-check-circle-fill"></i>
          Report submitted. Thank you.
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CarDetailPage;