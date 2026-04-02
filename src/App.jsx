import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/layout/Navbar';
import HomePage from './pages/home/HomePage';
import BrowsePage from './pages/browse/BrowsePage';
import SignupPage from './pages/auth/SignupPage';
import SellerLandingPage from './pages/seller/SellerLandingPage';
import ReviewsPage from './pages/reviews/ReviewsPage';
import AboutPage from './pages/about/AboutPage';
import ContactPage from './pages/contact/ContactPage';
import LoginPage from './pages/auth/LoginPage';
import CarDetailPage from './pages/car-detail/CarDetailPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import Wishlist from './pages/dashboard/Wishlist';
import RecentlyViewed from './pages/dashboard/RecentlyViewed';
import CompareCars from './pages/dashboard/CompareCars';
import Messages from './pages/dashboard/Messages';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';
import './styles/global.css';

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/dashboard') || location.pathname === '/compare';

  return (
    <div>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/seller" element={<SellerLandingPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/car/:id" element={<CarDetailPage />} />
        <Route path="/compare" element={<CompareCars />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="recently-viewed" element={<RecentlyViewed />} />
          <Route path="compare-cars" element={<CompareCars />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;