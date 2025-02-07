const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost',      // Host for your database (usually localhost)
  database: 'healthify_db',  // Replace with your database name
  password: 'abhishek', // Replace with your PostgreSQL password
  port: 5432,             // Default port for PostgreSQL
});

module.exports = pool;
