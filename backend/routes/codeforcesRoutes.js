const express = require("express");
const { fetchCodeforcesData } = require("../services/codeforcesService");
const User = require("../models/User");

const router = express.Router();

router.get("/:username", async (req, res) => {
  console.log("REQUEST RECEIVED:", req.params.username);
  try {
    const username = req.params.username;

    // Check MongoDB first
    const existingUser = await User.findOne({
  username,
  platform: "codeforces",
});

const CACHE_TIME = 6 * 60 * 60 * 1000; // 6 hours

if (existingUser) {

  const isCacheValid =
    Date.now() - new Date(existingUser.updatedAt).getTime() < CACHE_TIME;

  if (isCacheValid) {
    console.log("Returning cached data");

    return res.json({
      userInfo: existingUser.userInfo,
      ratingHistory: existingUser.ratingHistory,
      totalSolved: existingUser.totalSolved,
      totalContests: existingUser.totalContests,
    });
  }

  console.log("Cache expired. Fetching latest data...");
}

    // Fetch from Codeforces
   const {
  userInfo,
  ratingHistory,
  totalSolved,
  totalContests,
} = await fetchCodeforcesData(username);

    // Save to MongoDB
    await User.findOneAndUpdate(
  {
    username,
    platform: "codeforces",
  },
  {
    userInfo,
    ratingHistory,
    totalSolved,
    totalContests,
    updatedAt: new Date(),
  },
  {
    upsert: true,
    new: true,
  }
);

    console.log("Data fetched from Codeforces and saved");

    res.json({
      userInfo,
      ratingHistory,
      totalSolved,
      totalContests,
    });

  } catch (error) {

    console.log("ERROR MESSAGE:");
    console.log(error.message);

    res.status(500).json({
      error: "Failed to fetch user data",
    });
  }
});

module.exports = router;