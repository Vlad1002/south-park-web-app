const mysql = require('mysql2');

// Creăm un pool de conexiuni la MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root123', // parola ta MySQL
  database: 'south_park_episodes',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Folosim promise wrapper pentru async/await
const promisePool = pool.promise();

module.exports = promisePool;
