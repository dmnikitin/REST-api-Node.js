const bcrypt = require('bcrypt');
const saltRounds = 10;

function hash(next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      document.password = hashedPassword;
      return next();
    });
  } else {
    return next();
  }
}

module.exports = hash;
