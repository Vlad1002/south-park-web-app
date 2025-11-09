const mysql = require('mysql2');
require('dotenv').config();

// Creăm un pool de conexiuni la MySQL
// Suportă atât DATABASE_URL (production) cât și credențiale separate (development)
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
