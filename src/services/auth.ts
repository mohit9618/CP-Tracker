const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;
export async function register(
  codeforcesHandle: string,
  email: string,
  password: string
) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      codeforcesHandle,
      email,
      password,
    }),
  });

  return await response.json();
}

export async function verifyOTP(
  email: string,
  otp: string
) {
  const response = await fetch(`${BASE_URL}/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      otp,
    }),
  });

  return await response.json();
}

export async function login(
  codeforcesHandle: string,
  password: string
) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      codeforcesHandle,
      password,
    }),
  });

  return await response.json();
}

export async function logout() {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  return await response.json();
}

export async function getCurrentUser() {
  const response = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.user;
}

export async function forgotPassword(
  codeforcesHandle: string
) {
  const response = await fetch(`${BASE_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      codeforcesHandle,
    }),
  });

  return await response.json();
}

export async function resetPassword(
  codeforcesHandle: string,
  otp: string,
  newPassword: string
) {
  const response = await fetch(`${BASE_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      codeforcesHandle,
      otp,
      newPassword,
    }),
  });

  return await response.json();
}