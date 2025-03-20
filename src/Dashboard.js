import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [patient, setPatient] = useState(null);
  const [healthScore, setHealthScore] = useState(0); // State for health score
  const navigate = useNavigate();

  const calculateBMI = (height, weight) => {
    if (height > 0) {
      return (weight / ((height / 100) ** 2)).toFixed(2); // BMI formula: weight (kg) / height (m)^2
    }
    return null;
  };

  const calculateHealthScore = useCallback((patient) => {
    const bmi = calculateBMI(patient.height, patient.weight);
    let score = 50; // Base score

    // Adjust score based on BMI
    if (bmi >= 18.5 && bmi <= 24.9) {
      score += 20; // Add points for normal BMI
    } else {
      score -= 10; // Deduct points for abnormal BMI
    }

    // Adjust score based on exercise frequency
    switch (patient.exercise_frequency.toLowerCase()) {
      case 'high':
        score += 30;
        break;
      case 'moderate':
        score += 20;
        break;
      case 'low':
        score += 10;
        break;
      default:
        score += 0; // No additional points for no exercise
    }

    setHealthScore(Math.min(score, 100)); // Ensure score doesn't exceed 100
  }, []);

  useEffect(() => {
    const patientId = localStorage.getItem('patientId');
    console.log('Retrieved patientId:', patientId);

    if (!patientId) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      // Fetch patient data from the backend
      const fetchPatientData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/patient/${patientId}`);
          const data = await response.json();

          if (data.success) {
            setPatient(data.patient);
            calculateHealthScore(data.patient); // Calculate health score
          } else {
            navigate('/login');
          }
        } catch (err) {
          console.error('Error fetching patient data:', err);
        }
      };

      fetchPatientData();
    }
  }, [navigate, calculateHealthScore]);

  const pieData = {
    labels: ['Health Score', 'Remaining'],
    datasets: [
      {
        data: [healthScore, 100 - healthScore],
        backgroundColor: ['#4caf50', '#e0e0e0'], // Green for health score, gray for remaining
        hoverBackgroundColor: ['#66bb6a', '#bdbdbd'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {patient ? (
        <>
          <h2 className="dashboard-heading">Welcome, {patient.name}</h2>
          <div className="dashboard-info-box">
            <p>Age: {patient.age}</p>
            <p>Height: {patient.height} cm</p>
            <p>Weight: {patient.weight} kg</p>
            <p>Exercise Frequency: {patient.exercise_frequency}</p>
          </div>

          {/* BMI Calculator */}
          <h3 className="dashboard-subheading">BMI Calculator</h3>
          <p>BMI: {calculateBMI(patient.height, patient.weight)}</p>

          {/* Health Score Pie Chart */}
          <h3 className="dashboard-subheading">Health Score</h3>
          <div className="dashboard-chart-container">
            <Pie data={pieData} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;