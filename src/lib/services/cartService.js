import api from "../api";

export function getCart() {
  return api.get("/v1/cart");
}

export function addToCart(productId, variantId = null) {
  return api.post(`/v1/cart/${productId}`, { variantId });
}

export function updateCartItem(cartItemId, quantity) {
  return api.patch(`/v1/cart/item/${cartItemId}`, { quantity });
}

export function removeCartItem(cartItemId) {
  return api.delete(`/v1/cart/item/${cartItemId}`);
}
