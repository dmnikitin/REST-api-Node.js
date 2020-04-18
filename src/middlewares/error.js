const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const logger = require('../common/winston-config');

const errorMiddleware = (err, req, res, next) => {
  const { code, message } = err;
  logger.log('error', `error: ${code}: ${message}`);
  if (code) {
    res.status(code).send(message);
  } else {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
};

module.exports = errorMiddleware;
