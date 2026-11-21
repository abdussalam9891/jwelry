import api from "../api";

export function getProfile() {
  return api.get("/v1/auth/me");
}

export function updateProfile(payload) {
  return api.patch("/v1/auth/profile", payload);
}

export function uploadAvatar(file) {
  const formData = new FormData();
  formData.append("avatar", file);

  return api.patch("/v1/auth/profile/avatar", formData);
}
