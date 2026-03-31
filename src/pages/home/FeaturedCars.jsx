// src/pages/home/FeaturedCars.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { carsData } from '../../data/carsData';
import './FeaturedCars.css';

const FeaturedCars = () => {
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState(null);
  const [saved, setSaved] = useState([]);
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    const shuffled = [...carsData].sort(() => Math.random() - 0.5).slice(0, 8);
    setFeaturedCars(shuffled);
  }, []);

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSaved(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <section className="featured-section">
      <div className="section-container">

        {/* Header */}
        <div className="section-header">
          <div>
            <p className="section-tag">Hand Picked For You</p>
            <h2 className="section-title">Featured Cars</h2>
          </div>
          <button className="view-all-btn" onClick={() => navigate('/browse')}>
            View All Cars <i className="bi bi-arrow-right"></i>
          </button>
        </div>

        {/* Grid */}
        <div className="featured-grid">
          {featuredCars.map(car => (
            <div className="car-card" key={car.id} onClick={() => setSelectedCar(car)}>

              <div className="card-image-wrap">
                <img src={car.image} alt={car.name} />
                <button
                  className={`save-btn ${saved.includes(car.id) ? 'save-btn--saved' : ''}`}
                  onClick={(e) => toggleSave(e, car.id)}
                >
                  <i className={`bi ${saved.includes(car.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                </button>
                <span className="card-badge">{car.category}</span>
              </div>

              <div className="card-body">
                <div className="card-top">
                  <h3 className="card-title">{car.name}</h3>
                  <span className="card-price">{car.price}</span>
                </div>

                <div className="card-specs">
                  <span><i className="bi bi-calendar3"></i> {car.year}</span>
                  <span><i className="bi bi-speedometer2"></i> {car.mileage}</span>
                  <span><i className="bi bi-fuel-pump"></i> {car.fuel}</span>
                </div>

                <button className="card-btn">
                  View Details <i className="bi bi-arrow-right"></i>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Modal */}
      {selectedCar && (
        <div className="modal-overlay" onClick={() => setSelectedCar(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCar(null)}>
              <i className="bi bi-x-lg"></i>
            </button>
            <div className="modal-image">
              <img src={selectedCar.image} alt={selectedCar.name} />
              <span className="modal-badge">{selectedCar.category}</span>
            </div>
            <div className="modal-body">
              <div className="modal-header-row">
                <h2>{selectedCar.name}</h2>
                <span className="modal-price">{selectedCar.price}</span>
              </div>
              <div className="modal-specs">
                <div className="spec-item">
                  <i className="bi bi-calendar3"></i>
                  <span>Year</span>
                  <strong>{selectedCar.year}</strong>
                </div>
                <div className="spec-item">
                  <i className="bi bi-speedometer2"></i>
                  <span>Mileage</span>
                  <strong>{selectedCar.mileage}</strong>
                </div>
                <div className="spec-item">
                  <i className="bi bi-fuel-pump"></i>
                  <span>Fuel</span>
                  <strong>{selectedCar.fuel}</strong>
                </div>
                <div className="spec-item">
                  <i className="bi bi-tag"></i>
                  <span>Category</span>
                  <strong>{selectedCar.category}</strong>
                </div>
              </div>
              <p className="modal-desc">{selectedCar.description}</p>
              <div className="modal-actions">
                <button className="modal-btn-primary" onClick={() => navigate(`/car/${selectedCar.id}`)}>
                  <i className="bi bi-eye"></i> Full Details
                </button>
                <button className="modal-btn-secondary">
                  <i className="bi bi-whatsapp"></i> WhatsApp Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default FeaturedCars;