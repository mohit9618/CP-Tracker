console.log("CONTEST ROUTE LOADED");
const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("CONTEST ROUTE WORKING");
});
router.get("/", async (req, res) => {

  console.log("CONTEST API HIT");

  try {

    const response = await axios.get(
      "https://codeforces.com/api/contest.list"
    );

    console.log("CF API SUCCESS");

    res.json(response.data.result);

  } catch (error) {

    console.log("CF API ERROR:");
    console.log(error.message);

    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;