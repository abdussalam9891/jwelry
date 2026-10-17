import api from "../api";

export async function getCurrentUser() {
  try {
    const res = await api.get("/v1/auth/me");
    return res?.user || null;
  } catch {
    return null;
  }
}

export function getMe() {
  return api.get("/v1/auth/me");
}

export function login(email, password) {
  return api.post("/v1/auth/login", { email, password });
}

export function register(name, email, password) {
  return api.post("/v1/auth/register", { name, email, password });
}

export function verifyEmailOtp(email, otp) {
  return api.post("/v1/auth/verify-email-otp", { email, otp });
}

// Exchanges a Firebase-verified phone number for a backend session cookie.
export function firebaseLogin(phone) {
  return api.post("/v1/auth/firebase-login", { phone });
}

export function forgotPassword(email) {
  return api.post("/v1/auth/forgot-password", { email });
}

export function resetPassword(token, password) {
  return api.post("/v1/auth/reset-password", { token, password });
}

export function logout() {
  return api.post("/v1/auth/logout");
}
