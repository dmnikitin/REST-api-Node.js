const { createLogger, format, transports } = require('winston');

const logger = createLogger({
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

module.exports = logger;
