import React, { useState } from 'react';
import './PopularCategories.css';
import { FaCarSide, FaBolt, FaTruckPickup } from 'react-icons/fa';
import { GiJeep } from 'react-icons/gi';
import { MdOutlineSportsMotorsports } from 'react-icons/md';
import { carsData } from '../../data/carsData';

const categories = [
  { id: 1, name: 'SUVs', icon: <GiJeep size={40} />, count: 12 },
  { id: 2, name: 'Sedans', icon: <FaCarSide size={40} />, count: 18 },
  { id: 3, name: 'Sports', icon: <MdOutlineSportsMotorsports size={40} />, count: 8 },
  { id: 4, name: 'Electric', icon: <FaBolt size={40} />, count: 6 },
  { id: 5, name: 'Trucks', icon: <FaTruckPickup size={40} />, count: 9 },

];

const PopularCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const closeModal = () => {
    setSelectedCategory(null);
  };

  const filteredCars = selectedCategory
    ? carsData.filter(car => car.category === selectedCategory)
    : [];

  return (
    <section className="categories-section">
      <div className="categories-container">
        <h2>Popular Categories</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div
              className="category-card"
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <div className="category-icon">{cat.icon}</div>
              <h3>{cat.name}</h3>
              <p>{cat.count} Cars</p>
            </div>
          ))}
        </div>
      </div>

       {selectedCategory && (
        <div className="category-popup-overlay" onClick={closeModal}>
          <div className="category-popup" onClick={(e) => e.stopPropagation()}>
            <button className="category-popup-close" onClick={closeModal}>×</button>
            <h2>{selectedCategory} Cars</h2>

            {filteredCars.length > 0 ? (
              <div className="category-popup-grid">
                {filteredCars.map(car => (
                  <div className="category-popup-card" key={car.id}>
                    <img src={car.image} alt={car.name} />
                    <div className="info">
                      <h3>{car.name}</h3>
                      <p>{car.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                No cars available in this category.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PopularCategories;
