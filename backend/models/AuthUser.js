const mongoose = require("mongoose");

const AuthUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  verificationOTP: {
    type: String,
    default: null,
  },

  verificationOTPExpiry: {
    type: Date,
    default: null,
  },

  resetOTP: {
    type: String,
    default: null,
  },

  resetOTPExpiry: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("AuthUser", AuthUserSchema);