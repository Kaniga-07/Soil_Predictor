import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing">
      <h1 style={{color:"black"}}>Welcome to Soil Prediction</h1>
      <p>Predict the best type of crops based on soil data. Enter your data to get started!</p>
      <a href="/predict" className="cta-button">Start Prediction</a>
    </div>
  );
};

export default LandingPage;
