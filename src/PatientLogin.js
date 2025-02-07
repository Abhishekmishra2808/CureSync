import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientLogin.css';

const PatientLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('patientId', data.patientId);
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <h2>Patient Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-btn">Login</button>
      </form>
      <div className="new-user">
        <p>New user? <a href="/patient-registration">Register here</a></p>
      </div>
    </div>
  );
};

export default PatientLogin;
