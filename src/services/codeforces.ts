export async function getCodeforcesData(username: string) {

const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/codeforces/${username}`
);

  const data = await response.json();

  if (data.error) {
    return null;
  }

  return data;
}