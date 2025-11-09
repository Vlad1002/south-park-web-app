const { Pool } = require('pg');
require('dotenv').config();

// Creăm un pool de conexiuni la PostgreSQL
// Suportă atât DATABASE_URL (production) cât și credențiale separate (development)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

module.exports = pool;
