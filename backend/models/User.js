const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  platform: {
    type: String,
    required: true,
  },

  userInfo: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },

  ratingHistory: {
    type: Array,
    default: [],
  },

  totalSolved: {
    type: Number,
    default: 0,
  },

  totalContests: {
    type: Number,
    default: 0,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  

});



UserSchema.index(
  { username: 1, platform: 1 },
  { unique: true }
);

module.exports = mongoose.model("User", UserSchema);