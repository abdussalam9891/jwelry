import { getApiBase } from "./config";

async function request(method, endpoint, data = null) {
  const isFormData =
    typeof FormData !== "undefined" && data instanceof FormData;

  const config = {
    method,

    // Send HttpOnly cookies
    credentials: "include",
  };

  if (data) {
    if (isFormData) {
      // Let the browser set the multipart boundary
      config.body = data;
    } else {
      config.headers = { "Content-Type": "application/json" };
      config.body = JSON.stringify(data);
    }
  }

  const res = await fetch(`${getApiBase()}${endpoint}`, config);

  if (!res.ok) {
    let errorMsg = "Something went wrong";

    try {
      const err = await res.json();
      errorMsg = err.message || errorMsg;
    } catch {}

    const error = new Error(errorMsg);
    error.status = res.status;
    throw error;
  }

  if (res.status === 204) {
    return null;
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}

const api = {
  request,
  get: (endpoint) => request("GET", endpoint),
  post: (endpoint, data) => request("POST", endpoint, data),
  put: (endpoint, data) => request("PUT", endpoint, data),
  patch: (endpoint, data) => request("PATCH", endpoint, data),
  delete: (endpoint) => request("DELETE", endpoint),
};

export default api;
