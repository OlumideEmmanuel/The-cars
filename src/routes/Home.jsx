import React, { useState } from 'react';
import Hero from '../Components/Hero';
import FeaturedCars from '../Components/FeaturedCars';
import PopularCategories from '../Components/PopularCategories';
import BuyingGuides from '../Components/BuyingGuides';
import Footer from '../Components/Footer';


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <Hero />
      <FeaturedCars selectedCategory={selectedCategory} />
      <PopularCategories onCategorySelect={setSelectedCategory} />
      <BuyingGuides />
      <Footer />

    </>
  );
};

export default Home;
