const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password_hash: String,
  is_admin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
