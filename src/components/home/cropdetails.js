import React from 'react';
import { useLocation } from 'react-router-dom';

function CropDetails() {
    const location = useLocation();
    const { crop } = location.state; // Get crop data passed via state

    return (
        <div className="crop-details-container">
            <h1>{crop.name} Details</h1>
            <img src={crop.image} alt={crop.name} className="crop-image" />
            <p><strong>Growth Period:</strong> {crop.growPeriod}</p>
            <p><strong>Growing Advice:</strong> {crop.advice}</p>
            <h3>Fertilizers and Usage:</h3>
            <p>Step-by-step guidance on using fertilizers for {crop.name}...</p>
            <h3>Growth Stages:</h3>
            <p>Explanation of the stages involved in growing {crop.name}...</p>
        </div>
    );
}

export default CropDetails;
