const BASE_URL = import.meta.env.VITE_BASE_URL || "/api";

export const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  return data;
};
