const mongoose = require('mongoose');
const uuid = require('uuid');

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

// const saltRounds = 10;

// userSchema.pre('save', function(next) {
//     // Check if document is new or a new password has been set
//     if (this.isNew || this.isModified('password')) {
//         // Saving reference to this because of changing scopes
//         const document = this;
//         bcrypt.hash(document.password, saltRounds,
//             function(err, hashedPassword) {
//                 if (err) {
//                     next(err);
//                 } else {
//                     document.password = hashedPassword;
//                     next();
//                 }
//             });
//     } else {
//         next();
//     }
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
