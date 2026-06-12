import api from "../core/api.js";

export function getProfile() {
  return api.get("/v1/auth/me");
}

export function updateProfile(payload) {
  return api.patch(
    "/v1/auth/profile",
    payload
  );
}

export function uploadAvatar(file) {
  const formData = new FormData();

  formData.append(
    "avatar",
    file
  );

  return api.patch(
    "/v1/auth/profile/avatar",
    formData
  );
}

export function updatePreferences(payload) {
  return api.patch(
    "/v1/auth/preferences",
    payload
  );
}
