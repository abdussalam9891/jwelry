const isLocalHost =
  window.location.protocol === "file:" ||
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const CONFIG = {

  // 🔥 API routes
  API_BASE: isLocalHost
    ? "http://localhost:5000/api"
    : "https://your-production-api.com/api",

  // 🔥 Static assets/images
  ASSET_BASE: isLocalHost
    ? "http://localhost:5000"
    : "https://your-production-api.com",

};
