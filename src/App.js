import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage.js";
import PatientLogin from "./PatientLogin.js";  // Import PatientLogin
import PatientRegistration from "./PatientRegistration.js";  // Import PatientRegistration
import Dashboard from './Dashboard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-registration" element={<PatientRegistration />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
