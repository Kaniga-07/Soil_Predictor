import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Soil Prediction</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/soil">Soil type</Link></li>
        <li><Link to="/predict"> Crop Prediction</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
