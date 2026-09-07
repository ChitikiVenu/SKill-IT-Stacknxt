const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001';

export async function apiRequest(path, { method = 'GET', body, accessToken } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(payload?.error || 'Request failed.');
    error.status = response.status;
    throw error;
  }

  return payload;
}
