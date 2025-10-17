import React, { useState, useEffect } from 'react';
import { carsData } from '../data/carsData';
import './FeaturedCars.css';

const FeaturedCars = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    const shuffled = [...carsData].sort(() => Math.random() - 0.5).slice(0, 4);
    setFeaturedCars(shuffled);
  }, []);

  const openModal = (car) => {
    setSelectedCar(car);
  };

  const closeModal = () => {
    setSelectedCar(null);
  };

  return (
    <section className="featured-section">
      <div className="featured-container">
        <h2>Featured Cars</h2>
        <div className="cars-grid">
          {featuredCars.map(car => (
            <div className="car-card" key={car.id}>
              <div className="car-image">
                <img src={car.image} alt={car.name} />
              </div>
              <div className="car-info">
                <h3>{car.name}</h3>
                <p className="price">{car.price}</p>
                <button onClick={() => openModal(car)} className="details-btn">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCar && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            <div className="modal-image">
              <img src={selectedCar.image} alt={selectedCar.name} />
            </div>
            <div className="modal-info">
              <h2>{selectedCar.name}</h2>
              <p className="modal-price">{selectedCar.price}</p>
              <p><strong>Year:</strong> {selectedCar.year}</p>
              <p><strong>Mileage:</strong> {selectedCar.mileage}</p>
              <p><strong>Fuel:</strong> {selectedCar.fuel}</p>
              <p className="modal-desc">{selectedCar.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedCars;
