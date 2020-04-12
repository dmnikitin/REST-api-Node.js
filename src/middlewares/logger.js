const { infoLogger, errorLogger } = require('../common/winston-config');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const loggerMiddleware = (err, req, res, next) => {
  if (!err) {
    infoLogger.log(
      'info',
      `url: ${req.url}, query params: ${JSON.stringify(
        req.query
      )}, body: ${JSON.stringify(req.body)}`
    );
  } else {
    const { code, message } = err;
    errorLogger.log('error', `error: ${code}: ${message}`);
    if (code) {
      res.status(code).send(message);
    } else {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send(getStatusText(INTERNAL_SERVER_ERROR));
    }
  }
  next();
};

module.exports = loggerMiddleware;
