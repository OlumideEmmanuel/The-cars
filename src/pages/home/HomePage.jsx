// src/pages/home/HomePage.jsx
import React from 'react';
import Hero from './Hero';
import StatsBar from './StatsBar';
import FeaturedCars from './FeaturedCars';
import PopularCategories from './PopularCategories';
import HowItWorks from './HowItWorks';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import CTABanner from './CTABanner';
import Footer from '../../components/layout/Footer';

const HomePage = () => {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedCars />
      <PopularCategories />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
      <Footer />
    </>
  );
};

export default HomePage;