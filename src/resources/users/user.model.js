const mongoose = require('mongoose');
const uuid = require('uuid');

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    name: { type: String, required: false },
    login: { type: String, required: false },
    password: { type: String, required: false }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
