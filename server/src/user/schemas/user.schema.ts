
import * as mongoose from 'mongoose';
const SHA256 = require("crypto-js/sha256");
import * as bcrypt from 'bcryptjs';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  created_at: { type: Date, default: Date.now }
});

// Before saving the user, hash the password
UserSchema.pre('save', next => {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) { return next(error); }
      user.password = hash;
      user.hash = SHA256(user.username + hash + Math.sqrt(new Date().getTime()));
      next();
    });
  });
});

// Before updating the user, hash the password
UserSchema.pre('findOneAndUpdate', next => {
  const user = this._update;
  if (user.password) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) { return next(error); }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});