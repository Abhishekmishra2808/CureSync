const { Client } = require('pg');

const client = new Client({
  host: 'localhost',     // PostgreSQL server address
  port: 5432,           // Default port for PostgreSQL
  user: 'postgres',     // Replace with your PostgreSQL username
  password: 'abhishek',         // Replace with your password
  database: 'healthify_db',
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL.');
  }
});

module.exports = client;
