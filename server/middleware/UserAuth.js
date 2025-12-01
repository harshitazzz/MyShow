// Middleware/userAuth.js
const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided', success: false });

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Malformed token', success: false });
    }

    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || decoded.role !== 'user') {
      return res.status(403).json({ message: 'Forbidden: Users only', success: false });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error('User auth error:', err);
    return res.status(401).json({ message: 'Invalid or expired token', success: false });
  }
};

module.exports = userAuth;