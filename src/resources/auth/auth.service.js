const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const User = require('../users/user.model');

const createToken = (login, id) => {
  const token = jwt.sign({ login, id }, JWT_SECRET_KEY, { expiresIn: '24h' });
  return token;
};

const checkRegistration = async login => User.findOne({ login });

module.exports = { createToken, checkRegistration };
