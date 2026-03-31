import React from "react";
import { useNavigate } from "react-router-dom";
import "./UnderConstruction.css";

const UnderConstruction = ({ pageName = "This page" }) => {
  const navigate = useNavigate();

  return (
    <div className="uc-wrapper">
      <div className="uc-content">
        <div className="uc-icon">🚧</div>
        <h1>{pageName}</h1>
        <p>We're working hard to bring this to life. Check back soon!</p>
        <button onClick={() => navigate("/")}>Go Back Home</button>
      </div>
    </div>
  );
};

export default UnderConstruction;