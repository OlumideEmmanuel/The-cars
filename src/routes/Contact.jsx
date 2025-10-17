import React from "react";
import "./Contact.css";

const UnderConstruction = () => {
  return (
    <div className="under-construction">
      <div className="uc-content">
        <h1>🚧 Page Under Construction 🚧</h1>
        <p>We're working hard to bring this page to life. Please check back soon!</p>
        <button onClick={() => window.location.href = "/"}>Go Back Home</button>
      </div>
    </div>
  );
};

export default UnderConstruction;
