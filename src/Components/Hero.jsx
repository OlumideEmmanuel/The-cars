import React, { useState, useEffect } from 'react';
import './Hero.css';
import heroImage1 from "../assets/hero1.jpg";
import heroImage2 from "../assets/hero2.jpg";
import heroImage3 from "../assets/hero3.jpg";
import { carsData } from '../data/carsData';

const images = [heroImage1, heroImage2, heroImage3];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Search selections
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");

  // Dynamic options
  const [availableModels, setAvailableModels] = useState([]);
  const [availableFuels, setAvailableFuels] = useState([]);

  // Search results popup
  const [searchResults, setSearchResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Detailed modal
  const [selectedCar, setSelectedCar] = useState(null);

  // Hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Update models and fuels when make changes
  useEffect(() => {
    if (selectedMake) {
      const carsByMake = carsData.filter(
        car => car.name.split(" ")[0].toLowerCase() === selectedMake.toLowerCase()
      );

       const models = carsByMake.map(car => car.name).sort();
      setAvailableModels(models);

       const fuels = [...new Set(carsByMake.map(car => car.fuel))];
      setAvailableFuels(fuels);
    } else {
      setAvailableModels([]);
      setAvailableFuels([]);
    }
    setSelectedModel("");
    setSelectedFuel("");
  }, [selectedMake]);

   const handleSearch = () => {
    let filteredCars = carsData;

    if (selectedMake) {
      filteredCars = filteredCars.filter(
        car => car.name.split(" ")[0].toLowerCase() === selectedMake.toLowerCase()
      );
    }
    if (selectedModel) {
      filteredCars = filteredCars.filter(car => car.name === selectedModel);
    }
    if (selectedFuel) {
      filteredCars = filteredCars.filter(car => car.fuel === selectedFuel);
    }

    setSearchResults(filteredCars);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);
  const openDetails = (car) => setSelectedCar(car);
  const closeDetails = () => setSelectedCar(null);

  return (
    <section className="hero" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>Drive the Future Today</h1>
        <p>Find your perfect new or used car with ease.</p>

         <div className="search-box">
          <select value={selectedMake} onChange={e => setSelectedMake(e.target.value)}>
            <option value="">Make</option>
            {[...new Set(carsData.map(car => car.name.split(" ")[0]))]
              .sort()
              .map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
          </select>

          <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)}>
            <option value="">Model</option>
            {availableModels.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>

           <select value={selectedFuel} onChange={e => setSelectedFuel(e.target.value)}>
            <option value="">Fuel Type</option>
            {availableFuels.map(fuel => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>

          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

       {showPopup && (
        <div className="category-popup-overlay" onClick={closePopup}>
          <div className="category-popup" onClick={e => e.stopPropagation()}>
            <button className="category-popup-close" onClick={closePopup}>×</button>
            <h2>Search Results</h2>

            {searchResults.length ? (
              <div className="category-popup-grid">
                {searchResults.map(car => (
                  <div className="category-popup-card" key={car.id}>
                    <img src={car.image} alt={car.name} />
                    <div className="info">
                      <h3>{car.name}</h3>
                      <p className="price">{car.price}</p>
                      <button
                        className="view-details-btn"
                        onClick={() => openDetails(car)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No cars found matching your criteria.</p>
            )}
          </div>
        </div>
      )}

       {selectedCar && (
        <div className="category-popup-overlay" onClick={closeDetails}>
          <div className="category-popup" onClick={e => e.stopPropagation()}>
            <button className="category-popup-close" onClick={closeDetails}>×</button>
            <div className="category-popup-card">
              <img src={selectedCar.image} alt={selectedCar.name} />
              <div className="info">
                <h2>{selectedCar.name}</h2>
                <p className="price">{selectedCar.price}</p>
                <p><strong>Year:</strong> {selectedCar.year}</p>
                <p><strong>Mileage:</strong> {selectedCar.mileage}</p>
                <p><strong>Fuel:</strong> {selectedCar.fuel}</p>
                <p>{selectedCar.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
