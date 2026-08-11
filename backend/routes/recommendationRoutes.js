const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Get logged-in user from JWT cookie
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

    const codeforcesHandle = decoded.codeforcesHandle;

    // Get user info and submissions
    const [userResponse, submissionsResponse, problemsResponse] =
      await Promise.all([
        axios.get(
          `https://codeforces.com/api/user.info?handles=${codeforcesHandle}`
        ),

        axios.get(
          `https://codeforces.com/api/user.status?handle=${codeforcesHandle}`
        ),

        axios.get(
          "https://codeforces.com/api/problemset.problems"
        ),
      ]);

    const userInfo = userResponse.data.result[0];
    const submissions = submissionsResponse.data.result;
    const allProblems =
      problemsResponse.data.result.problems;

    // Current user rating
    const userRating = userInfo.rating || 800;

    // Store already solved problems
    const solvedProblems = new Set();

    submissions.forEach((submission) => {
      if (submission.verdict === "OK") {
        const problem = submission.problem;

        solvedProblems.add(
          `${problem.contestId}-${problem.index}`
        );
      }
    });

    // Recommend problems around user's rating
    const minimumRating = Math.max(
      800,
      userRating - 200
    );

    const maximumRating = userRating + 200;

    const recommendations = allProblems
      .filter((problem) => {
        const problemId =
          `${problem.contestId}-${problem.index}`;

        return (
          problem.rating &&
          problem.rating >= minimumRating &&
          problem.rating <= maximumRating &&
          !solvedProblems.has(problemId)
        );
      })

      // Randomize recommendations
      .sort(() => Math.random() - 0.5)

      // Return 10 problems
      .slice(0, 10)

      .map((problem) => ({
        contestId: problem.contestId,
        index: problem.index,
        name: problem.name,
        rating: problem.rating,
        tags: problem.tags,

        url: `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`,
      }));

    res.json({
      codeforcesHandle,
      userRating,
      ratingRange: {
        minimum: minimumRating,
        maximum: maximumRating,
      },
      recommendations,
    });

  } catch (error) {
    console.log(
      "Recommendation Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "Failed to generate recommendations",
    });
  }
});

module.exports = router;