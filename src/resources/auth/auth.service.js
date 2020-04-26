const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const User = require('../users/user.model');

const createToken = (login, password) => {
  const token = jwt.sign({ login, password }, JWT_SECRET_KEY, {
    expiresIn: '24h'
  });
  return token;
};

const checkAuth = login => User.findOne({ login });

module.exports = { createToken, checkAuth };
