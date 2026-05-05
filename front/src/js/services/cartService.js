import api from "../core/api.js";

export async function getCart() {
  return api.get("/v1/cart");
}

export async function addToCart(productId, quantity = 1) {
  return api.post("/v1/cart", { productId, quantity });
}

export async function updateCartItem(cartItemId, quantity) {
  return api.put(`/v1/cart/${cartItemId}`, { quantity });
}

export async function removeCartItem(cartItemId) {
  return api.delete(`/v1/cart/${cartItemId}`);
}
