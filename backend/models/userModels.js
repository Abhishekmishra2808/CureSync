const client = require('./db');  // Import the PostgreSQL connection

const registerPatient = (userData, callback) => {
  const { name, age, height, weight, exercise_frequency, username, password } = userData;

  const query = `
    INSERT INTO users (name, age, height, weight, exercise_frequency, username, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  
  client.query(query, [name, age, height, weight, exercise_frequency, username, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = { registerPatient };
