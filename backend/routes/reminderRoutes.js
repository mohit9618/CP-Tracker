const express = require("express");
const jwt = require("jsonwebtoken");
const Reminder = require("../models/Reminder");

const router = express.Router();

// Get all reminders for logged-in user
router.get("/", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const reminders = await Reminder.find({
      userId: decoded.userId,
    }).sort({
      startTimeSeconds: 1,
    });

    res.json(reminders);
  } catch (error) {
    console.log("Get Reminder Error:", error.message);

    res.status(500).json({
      error: "Failed to fetch reminders",
    });
  }
});


// Add a reminder
router.post("/", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const {
      contestId,
      contestName,
      startTimeSeconds,
    } = req.body;

    // Check if reminder already exists
    const existingReminder = await Reminder.findOne({
      userId: decoded.userId,
      contestId,
    });

    if (existingReminder) {
      return res.status(400).json({
        error: "Reminder already added",
      });
    }

    const reminder = await Reminder.create({
      userId: decoded.userId,
      contestId,
      contestName,
      startTimeSeconds,
    });

    res.status(201).json(reminder);

  } catch (error) {
    console.log("Add Reminder Error:", error.message);

    res.status(500).json({
      error: "Failed to add reminder",
    });
  }
});


// Delete reminder
router.delete("/:id", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      userId: decoded.userId,
    });

    if (!reminder) {
      return res.status(404).json({
        error: "Reminder not found",
      });
    }

    res.json({
      message: "Reminder removed",
    });

  } catch (error) {
    console.log("Delete Reminder Error:", error.message);

    res.status(500).json({
      error: "Failed to remove reminder",
    });
  }
});


module.exports = router;