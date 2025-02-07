// src/PatientSignIn.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PatientSignIn.css';  // Add CSS for styling

function PatientSignIn() {
  return (
    <div className="patient-sign-in">
      <h2>Patient Sign-In</h2>
      <p>Please choose one of the following options:</p>
      
      <div className="sign-in-options">
        {/* Option 1: Username and Password */}
        <Link to="/patient-login" className="button option-button">Username & Password</Link>
        
        {/* Option 2: New Login */}
        <Link to="/patient-new-login" className="button option-button">New Login</Link>
      </div>
    </div>
  );
}

export default PatientSignIn;
