import api from "../core/api.js";

export async function getMe() {

  return await api.get(
    "/v1/auth/me"
  );

}
