// src/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

import "./LandingPage.css";


function LandingPage() {
  const navigate = useNavigate();  // Initialize the navigate function

  // Function to navigate to the Patient Login Page
  const handlePatientLogin = () => {
    navigate("/patient-login");  // This will redirect to the '/patient-login' route
  };

  return (
    <div className="landing-container">
      <h1>Welcome to Our Healthcare App</h1>
      <div className="button-container">
        <button className="btn" onClick={handlePatientLogin}>
          Sign in as Patient
        </button>
        <button className="btn">Sign in as Doctor</button>
        <button className="btn">Sign in as Hospital</button>
      </div>
    </div>
  );
}

export default LandingPage;
