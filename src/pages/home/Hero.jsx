// src/pages/home/Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import heroImage1 from "../../assets/hero1.jpg";
import heroImage2 from "../../assets/hero2.jpg";
import heroImage3 from "../../assets/hero3.jpg";
import { carsData } from '../../data/carsData';

const images = [heroImage1, heroImage2, heroImage3];

const makes = [...new Set(carsData.map(car => car.name.split(" ")[0]))].sort();
const years = [...new Set(carsData.map(car => car.year))].sort((a, b) => b - a);
const fuels = [...new Set(carsData.map(car => car.fuel))].sort();

const Hero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const intervalRef = useRef(null);

  // Start auto-rotation
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const next = (currentIndex + 1) % images.length;
      startTransition(next);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  // Function to start a transition to a new image
  const startTransition = (newIndex) => {
    if (newIndex === currentIndex) return;

    // Set the next image to fade in
    setNextIndex(newIndex);

    // After the transition duration (1s), swap current and clean up
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setNextIndex(null);
    }, 1000); // matches CSS transition time
  };

  // Manual indicator click
  const handleIndicatorClick = (index) => {
    if (index === currentIndex) return;
    // Reset the interval to avoid quick jumps after manual click
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        const next = (index + 1) % images.length;
        startTransition(next);
      }, 5000);
    }
    startTransition(index);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedMake) params.set('make', selectedMake);
    if (selectedYear) params.set('year', selectedYear);
    if (selectedFuel) params.set('fuel', selectedFuel);
    navigate(`/browse?${params.toString()}`);
  };

  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');

  return (
    <section className="hero">

      {/* Background images container */}
      <div className="hero-bg-container">
        {/* Current active image */}
        <div
          className={`hero-bg ${currentIndex !== null ? 'hero-bg--active' : ''}`}
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
        {/* Next image (fading in) */}
        {nextIndex !== null && (
          <div
            className="hero-bg hero-bg--active"
            style={{ backgroundImage: `url(${images[nextIndex]})` }}
          />
        )}
      </div>

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Slide indicators */}
      <div className="hero-indicators">
        {images.map((_, i) => (
          <button
            key={i}
            className={`indicator ${i === currentIndex ? 'indicator--active' : ''}`}
            onClick={() => handleIndicatorClick(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content (unchanged) */}
      <div className="hero-content">
        <div className="hero-badge">
          <i className="bi bi-patch-check-fill"></i>
          Africa's Trusted Car Marketplace
        </div>

        <h1 className="hero-title">
          Find Your Perfect <span>Ride</span>
        </h1>

        <p className="hero-subtitle">
          Browse thousands of verified cars from trusted sellers across Africa.
          New, used, and certified — all in one place.
        </p>

        <div className="hero-search">
          <div className="search-fields">
            <div className="search-field">
              <label><i className="bi bi-car-front"></i> Make</label>
              <select value={selectedMake} onChange={e => setSelectedMake(e.target.value)}>
                <option value="">Any Make</option>
                {makes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            <div className="search-divider" />

            <div className="search-field">
              <label><i className="bi bi-calendar3"></i> Year</label>
              <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                <option value="">Any Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="search-divider" />

            <div className="search-field">
              <label><i className="bi bi-fuel-pump"></i> Fuel Type</label>
              <select value={selectedFuel} onChange={e => setSelectedFuel(e.target.value)}>
                <option value="">Any Fuel</option>
                {fuels.map(fuel => (
                  <option key={fuel} value={fuel}>{fuel}</option>
                ))}
              </select>
            </div>

            <button className="search-btn" onClick={handleSearch}>
              <i className="bi bi-search"></i>
              Search
            </button>
          </div>
        </div>

        <div className="hero-quick-links">
          <span>Popular:</span>
          {['SUVs', 'Sedans', 'Electric', 'Sports', 'Trucks'].map(cat => (
            <button
              key={cat}
              onClick={() => navigate(`/browse?category=${cat}`)}
              className="quick-link"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;