import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import About from './routes/About';
import Home from './routes/Home';
import './styles/global.css';
import Reviews from './routes/Reviews';
import Contact from './routes/Contact';
import Signup from './routes/Signup';





const App = () => {
  return (
    <div>
       <Navbar />

       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </div>
  );
};

export default App;
