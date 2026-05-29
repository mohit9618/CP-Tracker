export async function getCodeforcesData(username: string) {

  const response = await fetch(
    `http://localhost:5000/api/codeforces/${username}`
  );

  const data = await response.json();

  if (data.error) {
    return null;
  }

  return data;
}