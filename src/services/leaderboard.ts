export async function getLeaderboard() {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/leaderboard`
  );

  return await response.json();
}