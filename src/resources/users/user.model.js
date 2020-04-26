const mongoose = require('mongoose');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    name: String,
    login: String,
    password: String
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const saltRounds = 10;

function hash(next) {
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
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

userSchema.pre('save', hash);

const User = mongoose.model('User', userSchema);

module.exports = User;
