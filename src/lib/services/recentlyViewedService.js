import api from "../api";

export function getRecentlyViewed() {
  return api.get("/v1/recently-viewed");
}

export function addRecentlyViewed(productId) {
  return api.post(`/v1/recently-viewed/${productId}`);
}
