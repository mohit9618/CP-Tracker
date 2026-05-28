export async function getCodeforcesUser(username: string) {
  const response = await fetch(
    `https://codeforces.com/api/user.info?handles=${username}`
  );

  const data = await response.json();

  if (data.status !== "OK") {
    return null;
  }

  return data.result[0];
}

export async function getUserRating(username: string) {
  const response = await fetch(
    `https://codeforces.com/api/user.rating?handle=${username}`
  );

  const data = await response.json();

  if (data.status !== "OK") {
    return [];
  }

  return data.result;
}