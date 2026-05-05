const isLocalHost =
  window.location.protocol === "file:" ||
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const CONFIG = {
  API_BASE: isLocalHost
    ? "http://localhost:5000"
    : "https://your-production-api.com",
};









