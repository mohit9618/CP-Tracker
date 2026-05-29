const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:username", async (req, res) => {
  try {

    const username = req.params.username;

    const userInfo = await axios.get(
      `https://codeforces.com/api/user.info?handles=${username}`
    );

    const ratingHistory = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${username}`
    );

    res.json({
      userInfo: userInfo.data.result[0],
      ratingHistory: ratingHistory.data.result,
    });

  } catch (error) {

    res.status(500).json({
      error: "Failed to fetch Codeforces data",
    });

  }
});

module.exports = router;