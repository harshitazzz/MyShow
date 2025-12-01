// Utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (payload, expiresIn = '24h') => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not set in environment');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

module.exports = generateToken;