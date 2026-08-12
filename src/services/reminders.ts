const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/reminders`;

export async function getReminders() {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reminders");
  }

  return response.json();
}

export async function addReminder(contest: {
  contestId: string;
  contestName: string;
  startTimeSeconds: number;
}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(contest),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to add reminder");
  }

  return data;
}

export async function deleteReminder(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete reminder");
  }

  return response.json();
}