const { createLogger, format, transports } = require('winston');

const errorLogger = createLogger({
  level: 'error',
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error'
    })
  ]
});

const infoLogger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'info.log',
      level: 'info'
    })
  ]
});

module.exports = { infoLogger, errorLogger };
