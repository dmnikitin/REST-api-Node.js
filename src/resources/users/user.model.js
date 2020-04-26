const mongoose = require('mongoose');
const uuid = require('uuid');
const hash = require('../../helpers/hash');

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

userSchema.pre('save', hash);

const User = mongoose.model('User', userSchema);

module.exports = User;
