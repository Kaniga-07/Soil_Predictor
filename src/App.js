import React from "react";
import { BrowserRouter as Router,Routes, Route} from "react-router-dom";

import "./App.css";
import PredictionForm from "./components/page/PredictionForm";
import LandingPage from "./components/page/LandingPage";
import AboutPage from "./components/page/AboutPage";
import ContactPage from "./components/page/ContactPage";
import Footer from "./components/page/Footer";
import Navbar from "./components/page/Navbar";
import SoilPredictor from "./components/home/soilpredictor";
import CropDetails from "./components/home/cropdetails";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<LandingPage/>} />
          <Route path="/soil" element={<SoilPredictor/>} />
         <Route path="/crop/:cropName" element={<CropDetails/>} />
          <Route path="/predict" element={<PredictionForm/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/contact" element={<ContactPage/>} />
        </Routes>
        
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
