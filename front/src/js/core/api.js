import { CONFIG } from "../config.js";

const api = {

  async request(
    method,
    endpoint,
    data = null
  ) {

    const config = {

      method,

      // 🔥 send HttpOnly cookies
      credentials: "include",

      headers: {
        "Content-Type":
          "application/json",
      },

      ...(data && {
        body: JSON.stringify(data),
      }),

    };

    const res = await fetch(
      `${CONFIG.API_BASE}${endpoint}`,
      config
    );

    // 🔥 Handle API errors
    if (!res.ok) {

      let errorMsg =
        "Something went wrong";

      try {

        const err =
          await res.json();

        errorMsg =
          err.message || errorMsg;

      } catch {}

      const error =
        new Error(errorMsg);

      error.status =
        res.status;

      throw error;

    }

    // 🔥 No content
    if (res.status === 204) {

      return null;

    }

    // 🔥 Parse JSON safely
    try {

      return await res.json();

    } catch {

      return null;

    }

  },

  get(endpoint) {

    return api.request(
      "GET",
      endpoint
    );

  },

  post(endpoint, data) {

    return api.request(
      "POST",
      endpoint,
      data
    );

  },

  put(endpoint, data) {

    return api.request(
      "PUT",
      endpoint,
      data
    );

  },

  patch(endpoint, data) {

    return api.request(
      "PATCH",
      endpoint,
      data
    );

  },

  delete(endpoint) {

    return api.request(
      "DELETE",
      endpoint
    );

  },

};

export default api;
