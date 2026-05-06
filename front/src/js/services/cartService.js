import api from "../core/api.js";

export async function getCart() {
  return api.get("/v1/cart");
}

export async function addToCart(productId, variantId = null) {
  return api.post(`/v1/cart/${productId}`, {
    variantId,
  });
}

export async function updateCartItem(cartItemId, quantity) {
  return api.patch(
    `/v1/cart/item/${cartItemId}`,
    { quantity }
  );
}

export async function removeCartItem(cartItemId) {
  return api.delete(
    `/v1/cart/item/${cartItemId}`
  );
}
