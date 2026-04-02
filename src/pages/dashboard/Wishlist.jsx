import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { carsData } from '../../data/carsData';
import './Wishlist.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(carsData.slice(0, 6));

  const remove = (id) => setWishlist(prev => prev.filter(c => c.id !== id));

  return (
    <div className="dashboard-section">
      <div className="section-page-header">
        <div>
          <h2><i className="bi bi-heart-fill"></i> My Wishlist</h2>
          <p>{wishlist.length} saved cars</p>
        </div>
        <button className="header-action-btn" onClick={() => navigate('/browse')}>
          <i className="bi bi-plus"></i> Add More Cars
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-dashboard-state">
          <i className="bi bi-heart"></i>
          <h3>Your wishlist is empty</h3>
          <p>Start saving cars you like while browsing.</p>
          <button onClick={() => navigate('/browse')}>Browse Cars</button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(car => (
            <div className="wishlist-card" key={car.id}>
              <div className="wishlist-img" onClick={() => navigate(`/car/${car.id}`)}>
                <img src={car.image} alt={car.name} />
                <span className="wishlist-category">{car.category}</span>
              </div>
              <div className="wishlist-body">
                <div className="wishlist-top">
                  <h3 onClick={() => navigate(`/car/${car.id}`)}>{car.name}</h3>
                  <span className="wishlist-price">{car.price}</span>
                </div>
                <div className="card-specs">
                  <span><i className="bi bi-calendar3"></i>{car.year}</span>
                  <span><i className="bi bi-speedometer2"></i>{car.mileage}</span>
                  <span><i className="bi bi-fuel-pump"></i>{car.fuel}</span>
                </div>
                <div className="wishlist-actions">
                  <button className="wishlist-view-btn" onClick={() => navigate(`/car/${car.id}`)}>
                    <i className="bi bi-eye"></i> View Details
                  </button>
                  <button className="wishlist-remove-btn" onClick={() => remove(car.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;