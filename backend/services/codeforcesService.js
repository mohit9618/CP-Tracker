const axios = require("axios");

async function fetchCodeforcesData(username) {
  // User Info
  const userInfoResponse = await axios.get(
    `https://codeforces.com/api/user.info?handles=${username}`
  );

  // Rating History
  const ratingResponse = await axios.get(
    `https://codeforces.com/api/user.rating?handle=${username}`
  );

  // Submissions
  const submissionsResponse = await axios.get(
    `https://codeforces.com/api/user.status?handle=${username}`
  );

  const userInfo = userInfoResponse.data.result[0];
  const ratingHistory = ratingResponse.data.result;

  const totalContests = ratingHistory.length;

  const submissions = submissionsResponse.data.result;

  const solvedProblems = new Set();

  submissions.forEach((sub) => {
    if (sub.verdict === "OK") {
      solvedProblems.add(
        `${sub.problem.contestId}-${sub.problem.index}`
      );
    }
  });

  const totalSolved = solvedProblems.size;

  return {
    userInfo,
    ratingHistory,
    totalSolved,
    totalContests,
  };
}

module.exports = { fetchCodeforcesData };