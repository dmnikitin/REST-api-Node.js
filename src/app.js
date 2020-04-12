const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { errorLogger } = require('./common/winston-config');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loggerMiddleware = require('./middlewares/logger');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use((req, res, next) => loggerMiddleware(null, req, res, next));

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:id/tasks', taskRouter);

app.use(loggerMiddleware);

process.on('uncaughtException', err => {
  errorLogger.error({ statusCode: 500, message: err.message });
  const exit = process.exit;
  exit(1);
});

process.on('unhandledRejection', reason => {
  errorLogger.error({ statusCode: 500, message: reason.message });
});

module.exports = app;
