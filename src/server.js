const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./common/winston-config');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection.once('open', () => {
  console.log('mongodb connected');
  db.dropDatabase();

  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

process.on('uncaughtException', err => {
  logger.error({ statusCode: 500, message: err.message });
  const exit = process.exit;
  exit(1);
});

process.on('unhandledRejection', reason => {
  logger.error({ statusCode: 500, message: reason.message });
});
