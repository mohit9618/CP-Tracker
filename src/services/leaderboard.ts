export async function getLeaderboard() {

  const response = await fetch(
    "http://127.0.0.1:5000/api/leaderboard"
  );

  return await response.json();
}