import api from "../core/api.js";

export async function submitContactForm(
  payload
) {
  return await api.post(
    "/v1/contact",
    payload
  );
}
