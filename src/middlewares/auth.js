const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const authMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    const [prefix, token] = req.headers.authorization.split(' ');
    if (prefix === 'Bearer') {
      jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(403).send({
            success: false,
            error: 'failed to verify token'
          });
        }
        req.decoded = decoded;
        next();
      });
    }
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
};

module.exports = authMiddleware;
