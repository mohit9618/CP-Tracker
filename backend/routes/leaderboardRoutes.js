const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    const users = await User.find({
      platform: "codeforces",
    });

    const leaderboard = users
      .map((user) => ({
        username: user.username,
        rating: user.userInfo?.rating || 0,
        totalSolved: user.totalSolved || 0,
        totalContests: user.totalContests || 0,
      }))
      .sort((a, b) => b.rating - a.rating);

    res.json(leaderboard);

  } catch (error) {

    console.log(error.message);

    res.status(500).json({
      error: "Failed to fetch leaderboard",
    });
  }
});

module.exports = router;