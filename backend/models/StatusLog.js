// const mongoose = require('mongoose');

// const statusLogSchema = new mongoose.Schema({
//   issue_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
//   status: String,
//   timestamp: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('StatusLog', statusLogSchema);
const mongoose = require('mongoose');

const statusLogSchema = new mongoose.Schema({
  issue_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ✅ for populate()
  status: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StatusLog', statusLogSchema);
