/**
 * Base API client – replace BASE_URL and implement real fetch calls
 * when connecting to the FastAPI backend.
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const getHeaders = (customHeaders = {}) => {
  const headers = { 'Content-Type': 'application/json', ...customHeaders };
  const token = localStorage.getItem('ecostay-token') || sessionStorage.getItem('ecostay-token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const apiClient = {
  baseUrl: BASE_URL,

  async get(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(options.headers),
      ...options,
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  },

  async post(endpoint, body, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(options.headers),
      body: JSON.stringify(body),
      ...options,
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  },

  async put(endpoint, body, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(options.headers),
      body: JSON.stringify(body),
      ...options,
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  },

  async delete(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(options.headers),
      ...options,
    });
    if (!response.ok) {
      if (response.status === 204) return;
      throw new Error(`API error: ${response.status}`);
    }
    return response.status === 204 ? null : response.json();
  },
};

export default apiClient;
