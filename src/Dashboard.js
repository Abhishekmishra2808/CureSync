import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const patientId = localStorage.getItem('patientId');

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

  return (
    <div className="dashboard-container">
      {patient ? (
        <>
          <h2>Welcome, {patient.name}</h2>
          <p>Age: {patient.age}</p>
          <p>Height: {patient.height} cm</p>
          <p>Weight: {patient.weight} kg</p>
          <p>Exercise Frequency: {patient.exercise_frequency}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
