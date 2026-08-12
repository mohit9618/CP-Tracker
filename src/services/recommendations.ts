const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/recommendations`;

export async function getRecommendations() {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return response.json();
}