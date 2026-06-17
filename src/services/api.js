/**
 * Base API client – replace BASE_URL and implement real fetch calls
 * when connecting to the FastAPI backend.
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const apiClient = {
  baseUrl: BASE_URL,

  async get(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  },

  async post(endpoint, body, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      body: JSON.stringify(body),
      ...options,
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  },
};

export default apiClient;
