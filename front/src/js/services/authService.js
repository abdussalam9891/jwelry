import api from "../core/api.js";

/* ---------------- USER ---------------- */

export async function getMe() {
  return await api.get("/v1/auth/me");
}

/* ---------------- OTP AUTH ---------------- */

export async function requestOtp(phone) {
  return await api.post(
    "/v1/auth/request-otp",
    { phone }
  );
}

export async function verifyOtp(
  phone,
  otp
) {
  return await api.post(
    "/v1/auth/verify-otp",
    {
      phone,
      otp,
    }
  );
}

/* ---------------- EMAIL LOGIN ---------------- */

export async function login(
  email,
  password
) {
  return await api.post(
    "/v1/auth/login",
    {
      email,
      password,
    }
  );
}

/* ---------------- REGISTER ---------------- */

export async function register(
  name,
  email,
  password
) {
  return await api.post(
    "/v1/auth/register",
    {
      name,
      email,
      password,
    }
  );
}



export async function verifyEmailOtp(email, otp) {
  return await api.post(
    "/v1/auth/verify-email-otp",
    { email, otp }
  );
}

/* ---------------- FORGOT PASSWORD ---------------- */

export async function forgotPassword(
  email
) {
  return await api.post(
    "/v1/auth/forgot-password",
    {
      email,
    }
  );
}

/* ---------------- RESET PASSWORD ---------------- */

export async function resetPassword(
  token,
  password
) {
  return await api.post(
    "/v1/auth/reset-password",
    {
      token,
      password,
    }
  );
}

/* ---------------- LOGOUT ---------------- */

export async function logout() {
  return await api.post(
    "/v1/auth/logout"
  );
}
