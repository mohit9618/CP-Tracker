const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    contestId: {
      type: String,
      required: true,
    },

    contestName: {
      type: String,
      required: true,
    },

    startTimeSeconds: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reminder", reminderSchema);