export async function getCodeforcesData(username: string) {

const response = await fetch(
  `http://127.0.0.1:5000/api/codeforces/${username}`
);

  const data = await response.json();

  if (data.error) {
    return null;
  }

  return data;
}