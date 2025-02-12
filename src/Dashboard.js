import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

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
          } else {
            navigate('/login');
          }
        } catch (err) {
          console.error('Error fetching patient data:', err);
        }
      };

      fetchPatientData();
    }
  }, [navigate]);

  const calculateBMI = (height, weight) => {
    if (height > 0) {
      return (weight / ((height / 100) ** 2)).toFixed(2); // BMI formula: weight (kg) / height (m)^2
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      {patient ? (
        <>
          <h2>Welcome, {patient.name}</h2>
          <p>Age: {patient.age}</p>
          <p>Height: {patient.height} cm</p>
          <p>Weight: {patient.weight} kg</p>
          <p>Exercise Frequency: {patient.exercise_frequency}</p>

          {/* BMI Calculator */}
          <h3>BMI Calculator</h3>
          <p>BMI: {calculateBMI(patient.height, patient.weight)}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
