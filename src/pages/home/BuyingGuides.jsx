import React from "react";
import "./BuyingGuides.css";

const guides = [
  {
    id: 1,
    title: "EV Buying Guide",
    description: "Thinking about buying an electric vehicle? Our comprehensive EV Buying Guide can help, no matter where in the process you’re at.",
    linkText: "View Buyer Guide for Electric Vehicles",
  },
  {
    id: 2,
    title: "Hybrid Buying Guide",
    description: "All hybrids are not the same. Learn which is right for you.",
    linkText: "View Buyer Guide for Hybrid Vehicles",
  },
  {
    id: 3,
    title: "SUV Buying Guide",
    description: "SUVs are for everybody. We can help find yours.",
    linkText: "View Buyer Guide for SUVs",
  },
  {
    id: 4,
    title: "Family Buying Guide",
    description: "Looking for a new family car? Get helpful tips and advice before your next purchase.",
    linkText: "View Buyer Guide for Families",
  },
];

const BuyingGuides = () => {
  return (
    <section className="guides-section">
      <div className="guides-container">
        <h2>We’ll help you buy with confidence</h2>

        {/* Top Info Cards */}
        <div className="info-cards">
          <div className="info-card">
            <h3>How Are Automakers Responding to the Tariffs?</h3>
            <p>Automakers are offering varying responses to President Trump's new automotive tariffs. Learn more about how your favorite vehicles are affected.</p>
            <span className="sponsored">Sponsored Content</span>
          </div>
          <div className="info-card">
            <h3>Kia News</h3>
            <p>Catch up with the latest news on your favorite vehicles from Kia.</p>
            <span className="sponsored">Sponsored Content</span>
          </div>
          <div className="info-card">
            <h3>Pay less. Stress less. Get More.</h3>
            <p>Get personalized auto insurance offers before heading to the dealership.</p>
          </div>
        </div>

        {/* Buying Guides */}
        <div className="guides-grid">
          {guides.map((guide) => (
            <div className="guide-card" key={guide.id}>
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              <a href="#" className="guide-link">{guide.linkText}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyingGuides;
