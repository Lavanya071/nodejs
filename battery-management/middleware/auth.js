const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer TOKEN

  if (!token) return res.status(401).json({ message: 'No token provided' }); // No token provided

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Token expired or invalid
      return res.status(403).json({ message: 'Token is either expired or invalid. Please log in again.' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
