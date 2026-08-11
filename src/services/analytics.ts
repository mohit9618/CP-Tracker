export async function getMyAnalytics() {
  const response = await fetch(
    "http://localhost:5000/api/analytics",
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return response.json();
}