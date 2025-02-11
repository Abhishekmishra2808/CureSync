const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db'); // your postgres connection pool setup


const path = require('path');
;

// ... your existing backend routes and middleware are here ...

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '..', 'build'))); // Serves from the 'build' folder in the project root (one level up from 'backend')

// The "catchall" handler: for any request that doesn't match a backend route, send back the React app's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html')); //  Path to index.html in the 'build' folder
});

// ... your server startup code (app.listen(...)) is here ...

app.use(cors());
app.use(bodyParser.json());

// Registration Route
app.post('/patient-registration', async (req, res) => {
  const { name, username, password, age, height, weight, exercise_frequency } = req.body;

  // Check if user already exists
  const existingUser = await pool.query('SELECT * FROM patients WHERE username = $1', [username]);
  if (existingUser.rows.length > 0) {
    return res.status(400).json({ success: false, message: 'Username already taken' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO patients (name, username, password, age, height, weight, exercise_frequency) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, username, password, age, height, weight, exercise_frequency]
    );

    const newPatient = result.rows[0];
    res.status(200).json({
      success: true,
      message: 'Registration successful!',
      patientId: newPatient.patient_id,
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ success: false, message: 'Registration failed, please try again' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const result = await pool.query(
      'SELECT * FROM patients WHERE username = $1 AND password = $2',
      [username, password]
    );
    
    if (result.rows.length > 0) {
      res.status(200).json({
        success: true,
        patientId: result.rows[0].patient_id,
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
});

// Server Listening
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
