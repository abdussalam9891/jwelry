import api from "../core/api.js";

export async function getProfile() {
  const res = await api.get(
    "/v1/auth/me"
  );

  return res;
}

export async function getAddresses() {
  const res = await api.get(
    "/v1/addresses"
  );

  return res.addresses || [];
}

export async function updateProfile(
  payload
) {
  return await api.patch(
    "/v1/auth/profile",
    payload
  );
}

export async function uploadAvatar(
  file
) {
  const formData =
    new FormData();

  formData.append(
    "avatar",
    file
  );

  return await api.patch(
    "/v1/auth/profile/avatar",
    formData
  );
}

export async function updatePreferences(
  payload
) {
  return await api.patch(
    "/v1/auth/preferences",
    payload
  );
}
