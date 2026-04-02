// src/pages/dashboard/CompareCars.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { carsData } from '../../data/carsData';
import './CompareCars.css';

const CompareCars = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([carsData[0], carsData[6]]);
  const [showPicker, setShowPicker] = useState(null);

  const addCar = (car) => {
    if (selected.length < 3 && !selected.find(c => c.id === car.id)) {
      setSelected(prev => [...prev, car]);
    }
    setShowPicker(null);
  };

  const removeCar = (id) => setSelected(prev => prev.filter(c => c.id !== id));

  const specs = ['year', 'mileage', 'fuel', 'category', 'price'];
  const specLabels = { year: 'Year', mileage: 'Mileage', fuel: 'Fuel Type', category: 'Category', price: 'Price' };

  return (
    <div className="dashboard-section">
      <div className="section-page-header">
        <div>
          <h2><i className="bi bi-bar-chart-steps"></i> Compare Cars</h2>
          <p>Compare up to 3 cars side by side</p>
        </div>
        {selected.length < 3 && (
          <button className="header-action-btn" onClick={() => setShowPicker('new')}>
            <i className="bi bi-plus"></i> Add Car
          </button>
        )}
      </div>

      <div className="compare-table">

        {/* Header row */}
        <div className="compare-row compare-row--header">
          <div className="compare-label-cell">Specifications</div>
          {selected.map(car => (
            <div className="compare-car-header" key={car.id}>
              <div className="compare-car-img">
                <img src={car.image} alt={car.name} />
              </div>
              <h4>{car.name}</h4>
              <span>{car.price}</span>
              <div className="compare-car-actions">
                <button onClick={() => navigate(`/car/${car.id}`)}>
                  <i className="bi bi-eye"></i> View
                </button>
                <button onClick={() => removeCar(car.id)} className="remove-compare">
                  <i className="bi bi-x"></i>
                </button>
              </div>
            </div>
          ))}
          {selected.length < 3 && (
            <div className="compare-add-slot" onClick={() => setShowPicker('new')}>
              <i className="bi bi-plus-circle"></i>
              <span>Add Car</span>
            </div>
          )}
        </div>

        {/* Spec rows */}
        {specs.map(spec => (
          <div className="compare-row" key={spec}>
            <div className="compare-label-cell">{specLabels[spec]}</div>
            {selected.map(car => {
              const val = car[spec]?.toString();
              const allVals = selected.map(c => c[spec]?.toString());
              const isUnique = allVals.filter(v => v === val).length === 1;
              return (
                <div
                  key={car.id}
                  className={`compare-value-cell ${isUnique && selected.length > 1 ? 'compare-value-cell--highlight' : ''}`}
                >
                  {val}
                </div>
              );
            })}
            {selected.length < 3 && <div className="compare-empty-cell">—</div>}
          </div>
        ))}

      </div>

      {/* Car picker modal */}
      {showPicker && (
        <div className="modal-overlay" onClick={() => setShowPicker(null)}>
          <div className="compare-picker" onClick={e => e.stopPropagation()}>
            <div className="compare-picker-header">
              <h3>Select a Car to Compare</h3>
              <button onClick={() => setShowPicker(null)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="compare-picker-grid">
              {carsData
                .filter(c => !selected.find(s => s.id === c.id))
                .map(car => (
                  <div
                    className="compare-picker-card"
                    key={car.id}
                    onClick={() => addCar(car)}
                  >
                    <img src={car.image} alt={car.name} />
                    <div>
                      <h4>{car.name}</h4>
                      <span>{car.price}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareCars;