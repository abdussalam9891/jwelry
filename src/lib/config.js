const LOCAL_API = "http://localhost:5000/api";
const PRODUCTION_API = "https://jwelry-backend.onrender.com/api";

export const SITE_URL = "https://gemora-jwelry.vercel.app";

// NEXT_PUBLIC_API_BASE wins when set; otherwise talk to a local backend while
// developing on localhost and the production API everywhere else.
export function getApiBase() {
  if (process.env.NEXT_PUBLIC_API_BASE) {
    return process.env.NEXT_PUBLIC_API_BASE;
  }

  if (typeof window === "undefined") {
    return PRODUCTION_API;
  }

  const { hostname } = window.location;

  return hostname === "localhost" || hostname === "127.0.0.1"
    ? LOCAL_API
    : PRODUCTION_API;
}

// Absolute API base for server-side fetches (metadata, JSON-LD). A relative
// NEXT_PUBLIC_API_BASE such as "/api" only works in the browser, so on the
// server fall back to the proxy target or the production API.
export function getServerApiBase() {
  const base = process.env.NEXT_PUBLIC_API_BASE;

  if (base && /^https?:\/\//.test(base)) return base;

  return process.env.API_PROXY_TARGET || PRODUCTION_API;
}
