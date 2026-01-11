const mysql = require('mysql2');
require('dotenv').config();

// Cream un pool de conexiuni la MySQL
// Suporta atat DATABASE_URL (production) cat si credentiale separate (development)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'south_park_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Folosim promise wrapper pentru async/await
const promisePool = pool.promise();

module.exports = promisePool;
