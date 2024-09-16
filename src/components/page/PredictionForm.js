import React, { useState } from "react";
import "./PredictionForm.css";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    ph: "",
    texture: "",
    moisture: "",
    temperature: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally submit the form data to your backend
    console.log(formData);
  };

  return (
    <div className="prediction-form">
      <h2>Enter Soil Data for Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label>pH Level:</label>
        <input
          type="text"
          name="ph"
          value={formData.ph}
          onChange={handleChange}
          required
        />
        <label>Soil Texture:</label>
        <input
          type="text"
          name="texture"
          value={formData.texture}
          onChange={handleChange}
          required
        />
        <label>Moisture Level:</label>
        <input
          type="text"
          name="moisture"
          value={formData.moisture}
          onChange={handleChange}
          required
        />
        <label>Temperature (°C):</label>
        <input
          type="text"
          name="temperature"
          value={formData.temperature}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">Predict</button>
      </form>
    </div>
  );
};

export default PredictionForm;
