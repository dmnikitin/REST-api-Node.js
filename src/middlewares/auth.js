const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const authMiddleware = (req, res, next) => {
  if (req.url === '/login' || req.url.startsWith('/doc')) {
    return next();
  }
  if (req.headers.authorization) {
    const [prefix, token] = req.headers.authorization.split(' ');
    if (prefix === 'Bearer') {
      jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401).send({
            success: false,
            error: 'failed to verify token'
          });
          return;
        }
        req.decoded = decoded;
        return next();
      });
    }
  } else {
    res.status(401).send({
      success: false,
      message: 'No token provided'
    });
    return;
  }
};

module.exports = authMiddleware;
