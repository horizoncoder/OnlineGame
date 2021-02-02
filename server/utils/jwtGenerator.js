const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(USER_ID) {
  const payload = {
    user: USER_ID,
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '24h' });
}

module.exports = jwtGenerator;
