import api from "../api";

export async function getWishlist() {
  const data = await api.get("/v1/wishlist");

  return Array.isArray(data) ? data : data?.items || [];
}

export function addToWishlist(productId) {
  return api.post(`/v1/wishlist/${productId}`);
}

export function removeFromWishlist(productId) {
  return api.delete(`/v1/wishlist/${productId}`);
}
