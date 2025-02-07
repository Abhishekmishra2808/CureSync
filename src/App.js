import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import PatientLogin from "./PatientLogin";  // Import PatientLogin
import PatientRegistration from "./PatientRegistration";  // Import PatientRegistration
import Dashboard from './Dashboard';

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
