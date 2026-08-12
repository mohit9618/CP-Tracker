export async function getContests() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/contests`
  );

  return await response.json();
}