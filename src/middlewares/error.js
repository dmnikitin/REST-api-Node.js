const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { errorLogger } = require('../common/winston-config');

function errorMiddleware(err, req, res, next) {
  const { code, message } = err;
  errorLogger.log('error', `error: ${code}: ${message}`);
  if (code) {
    res.status(code).send(message);
  } else {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
}

module.exports = errorMiddleware;
