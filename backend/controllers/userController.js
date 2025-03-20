import { registerPatient } from '../models/userModels.js';
import bcrypt from 'bcryptjs';

export const registerNewPatient = (req, res) => {
  const { name, age, height, weight, exercise_frequency, username, password } = req.body;

  // Hash the password before saving it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    const userData = {
      name,
      age,
      height,
      weight,
      exercise_frequency,
      username,
      password: hashedPassword,
    };

    // Insert the data into the database
    registerPatient(userData, (dbErr, result) => {
      if (dbErr) {
        return res.status(500).json({ error: 'Failed to register patient' });
      }

      res.status(201).json({ message: 'Patient registered successfully' });
    });
  });
};