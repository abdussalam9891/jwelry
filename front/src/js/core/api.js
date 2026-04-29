import Auth from './auth.js';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = {
  async request(method, endpoint, data = null) {
    const token = Auth.getToken();

    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(data && { body: JSON.stringify(data) }),
    };

    const res = await fetch(`${API_BASE}${endpoint}`, config);

    if (!res.ok) {
      let errorMsg = 'Something went wrong';
      try {
        const err = await res.json();
        errorMsg = err.message || errorMsg;
      } catch (_) {}

      if (res.status === 401) {
        Auth.logout();
      }

      throw new Error(errorMsg);
    }

    return res.json();
  },

  get: (endpoint) => api.request('GET', endpoint),
  post: (endpoint, data) => api.request('POST', endpoint, data),
  put: (endpoint, data) => api.request('PUT', endpoint, data),
  delete: (endpoint, data = null) => api.request('DELETE', endpoint, data),
};

export default api;
