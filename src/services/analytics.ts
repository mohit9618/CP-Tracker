const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/analytics`;

export async function getMyAnalytics() {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return response.json();
}