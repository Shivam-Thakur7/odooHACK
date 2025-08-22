const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: String,
  desc: String,
  lat: Number,
  long: Number,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number] // [longitude, latitude]
  },
  images: [String],
  category: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  is_anonymous: Boolean
}, { timestamps: true });

issueSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Issue', issueSchema);
