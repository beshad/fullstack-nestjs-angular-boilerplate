import * as mongoose from 'mongoose';
const crypto = require('crypto');
import * as bcrypt from 'bcryptjs';

export const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: { type: String, select: true },
  created_at: { type: Date, default: Date.now }
});

// Before saving the user, hash the password
UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) { return next(error); }
      user.password = hash;
      user.hash = crypto.createHash('sha256')
        .update(user.email + hash + Math.sqrt(new Date().getTime()))
        .digest('base64');
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

// Omit the password when returning a user
UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});
