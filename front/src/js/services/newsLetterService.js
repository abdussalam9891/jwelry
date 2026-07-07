import api from "../core/api.js";

export function subscribeNewsletter(email) {
  return api.post(
    "/v1/newsletter/subscribe",
    { email }
  );
}
