import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import pool from './db.js'; // your postgres connection pool setup

const app = express();

// Use CORS middleware
app.use(cors());
app.use(bodyParser.json());

// Define the route to fetch patient data (API routes should be defined before serving static files)
app.get('/patient/:patientId', async (req, res) => {
  const { patientId } = req.params;
  console.log(`Fetching data for patientId: ${patientId}`); // Add logging

  try {
    const result = await pool.query('SELECT * FROM patients WHERE "patientId" = $1', [patientId]);
    console.log(`Query result: ${JSON.stringify(result.rows)}`); // Add logging

    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        patient: result.rows[0],
      });
    } else {
      res.status(404).json({ success: false, message: 'Patient not found' });
    }
  } catch (err) {
    console.error('Error fetching patient data:', err); // Add logging
    res.status(500).json({ success: false, message: 'Error fetching patient data', error: err.message });
  }
});

// Registration Route
app.post('/patient-registration', async (req, res) => {
  const { name, username, password, age, height, weight, exercise_frequency } = req.body;
  console.log(`Registering patient: ${username}`); // Add logging

  // Check if user already exists
  const existingUser = await pool.query('SELECT * FROM patients WHERE username = $1', [username]);
  console.log(`Existing user check result: ${JSON.stringify(existingUser.rows)}`); // Add logging

  if (existingUser.rows.length > 0) {
    return res.status(400).json({ success: false, message: 'Username already taken' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO patients (name, username, password, age, height, weight, exercise_frequency) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, username, password, age, height, weight, exercise_frequency]
    );
    console.log(`Registration query result: ${JSON.stringify(result.rows)}`); // Add logging

    const newPatient = result.rows[0];
    res.status(200).json({
      success: true,
      message: 'Registration successful!',
      patientId: newPatient.patientId, // Update this line to match the correct column name
    });
  } catch (err) {
    console.error('Error during registration:', err); // Add logging
    res.status(500).json({ success: false, message: 'Registration failed, please try again' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt for username: ${username}`); // Add logging

  try {
    const result = await pool.query(
      'SELECT * FROM patients WHERE username = $1 AND password = $2',
      [username, password]
    );
    console.log(`Login query result: ${JSON.stringify(result.rows)}`); // Add logging

    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        patientId: result.rows[0].patientId, // Update this line to match the correct column name
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error logging in:', err); // Add logging
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
});

// Serve static files from the React frontend app
app.use(express.static(path.join(path.resolve(), '..', 'build'))); // Serves from the 'build' folder in the project root (one level up from 'backend'))

// The "catchall" handler: for any request that doesn't match a backend route, send back the React app's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), '..', 'build', 'index.html')); // Path to index.html in the 'build' folder
});

// Server Listening
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});