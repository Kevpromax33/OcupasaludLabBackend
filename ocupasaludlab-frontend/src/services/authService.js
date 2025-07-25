const API_URL = 'https://tu-backend.onrender.com/api/token/';

export async function login(username, password) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error('Login failed');
  return response.json(); // { access, refresh }
}
