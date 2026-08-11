const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // 1. Get JWT from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }

    // 2. Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Handle stored inside JWT during login
    const codeforcesHandle = decoded.codeforcesHandle;

    // 3. Fetch user's Codeforces submissions
    const response = await axios.get(
      `https://codeforces.com/api/user.status?handle=${codeforcesHandle}`
    );

    const submissions = response.data.result;

    // 4. Store unique solved problems
    const solvedProblems = new Map();

    submissions.forEach((submission) => {
      if (submission.verdict === "OK") {
        const problem = submission.problem;

        const problemId =
          `${problem.contestId}-${problem.index}`;

        if (!solvedProblems.has(problemId)) {
          solvedProblems.set(problemId, problem);
        }
      }
    });

    // 5. Rating-wise analytics
    const ratingDistribution = {};

    // 6. Topic-wise analytics
    const topicDistribution = {};

    solvedProblems.forEach((problem) => {

      // Rating
      if (problem.rating) {
        ratingDistribution[problem.rating] =
          (ratingDistribution[problem.rating] || 0) + 1;
      }

      // Tags
      if (problem.tags) {
        problem.tags.forEach((tag) => {
          topicDistribution[tag] =
            (topicDistribution[tag] || 0) + 1;
        });
      }

    });

    // 7. Send analytics
    res.json({
      codeforcesHandle,

      totalSolved: solvedProblems.size,

      ratingDistribution,

      topicDistribution,
    });

  } catch (error) {
    console.log(
      "Analytics Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "Failed to fetch analytics",
    });
  }
});

module.exports = router;