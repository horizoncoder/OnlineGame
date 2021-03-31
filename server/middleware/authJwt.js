const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');

const User = db.user;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send(
      console.log('No token provided!'),
    );
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send(console('no valid token '));
    }
    User.findByPk(decoded.id).then((user) => {
      req.user = user;
      next();
    });
  });
};

const authJwt = {
  verifyToken,

};
module.exports = authJwt;
