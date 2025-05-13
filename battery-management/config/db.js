const mysql = require('mysql2/promise');
require('dotenv').config();  // Load the environment variables from .env file

// Database connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,       // Use host from .env
  user: process.env.DB_USER,       // Use user from .env
  password: process.env.DB_PASSWORD,  // Use password from .env
  database: process.env.DB_NAME    // Use database name from .env
});

module.exports = db;
