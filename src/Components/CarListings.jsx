import React from 'react';
import "./CarListings.css";

const cars = [
  { id: 1, name: 'Tesla Model S', price: '$80,000', image: 'https://source.unsplash.com/400x300/?tesla' },
  { id: 2, name: 'Ford Mustang', price: '$60,000', image: 'https://source.unsplash.com/400x300/?mustang' },
  { id: 3, name: 'BMW X5', price: '$70,000', image: 'https://source.unsplash.com/400x300/?bmw' },
];

const CarListings = () => {
  return (
    <section className="car-listings">
      {cars.map(car => (
        <div key={car.id} className="car-card">
          <img src={car.image} alt={car.name} />
          <h3>{car.name}</h3>
          <p>{car.price}</p>
          <button>View Details</button>
        </div>
      ))}
    </section>
  );
};

export default CarListings;
