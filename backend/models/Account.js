const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    codeforcesHandle: {
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
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", AccountSchema);