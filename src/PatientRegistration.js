import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientRegistration.css';  // Ensure the CSS file is imported

const PatientRegistration = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [exercise_frequency, setExerciseFrequency] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = { name, username, password, age, height, weight, exercise_frequency };

    try {
      const response = await fetch('http://localhost:5000/patient-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        alert('Registration Successful!');
        navigate('/patient-login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="login-container"> {/* Changed container class name to match CSS */}
      <h2>Patient Registration</h2>
      <form className="login-form" onSubmit={handleSubmit}> {/* Changed form class name to match CSS */}
        <div className="input-container"> {/* White container for inputs */}
          <div className="form-group">
            <input type="text" placeholder="Name" value={name} className="login-input" onChange={(e) => setName(e.target.value)} required /> {/* Added input class name to match CSS */}
          </div>
          <div className="form-group">
            <input type="text" placeholder="Username" value={username} className="login-input" onChange={(e) => setUsername(e.target.value)} required /> {/* Added input class name to match CSS */}
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" value={password} className="login-input" onChange={(e) => setPassword(e.target.value)} required /> {/* Added input class name to match CSS */}
          </div>
          <div className="form-group">
            <input type="number" placeholder="Age" value={age} className="login-input" onChange={(e) => setAge(e.target.value)} required /> {/* Added input class name to match CSS */}
          </div>
          <div className="form-group">
            <input type="number" placeholder="Height (cm)" value={height} className="login-input" onChange={(e) => setHeight(e.target.value)} required /> {/* Added input class name to match CSS */}
          </div>
          <div className="form-group">
            <input type="number" placeholder="Weight (kg)" value={weight} className="login-input" onChange={(e) => setWeight(e.target.value)} required /> {/* Added input class name to match CSS */}
          </div>
          <div className="form-group">
            <select value={exercise_frequency} className="login-input" onChange={(e) => setExerciseFrequency(e.target.value)} required> {/* Added input class name to match CSS */}
              <option value="">Select Exercise Frequency</option>
              <option value="High">5-7 days a week</option>
              <option value="Moderate">3-5 days a week</option>
              <option value="Low">1-2 days a week</option>
              <option value="None">No Exercise</option>
            </select>
          </div>
        </div> {/* End of white container for inputs */}

        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-btn">Register</button> {/* Added button class name to match CSS */}
      </form>
      <p className="new-user"> {/* Added class name to match CSS */}
        Already have an account? <a href="/patient-login">Login</a>
      </p>
    </div>
  );
};

export default PatientRegistration;