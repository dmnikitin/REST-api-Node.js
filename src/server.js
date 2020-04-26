const mongoose = require('mongoose');
const app = require('./app');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const logger = require('./common/winston-config');
const User = require('./resources/users/user.model');

const connectToMongo = () => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.once('open', () => {
    console.log('mongoDB connection success');
    db.collection('users').drop();
    app.listen(PORT, () =>
      console.log(`App is running on http://localhost:${PORT}`)
    );
    const admin = new User({
      name: 'admin',
      login: 'admin',
      password: 'admin'
    });
    admin.save();
  });
};

connectToMongo();

process.on('uncaughtException', err => {
  logger.error({ statusCode: 500, message: err.message });
  const exit = process.exit;
  exit(1);
});

process.on('unhandledRejection', reason => {
  logger.error({ statusCode: 500, message: reason.message });
});
