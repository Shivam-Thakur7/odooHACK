const mongoose = require('mongoose');

const flagSchema = new mongoose.Schema({
  issue_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reason: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flag', flagSchema);
