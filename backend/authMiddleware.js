const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware pentru verificare JWT token
const authenticateToken = (req, res, next) => {
  // Obține token din header Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verifică și decodează token-ul
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Salvează user info în request
    next(); // Continuă la următorul handler
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authenticateToken;
