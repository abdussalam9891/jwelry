import api from "../core/api.js";
import { refreshCartCount } from "../core/cartCount.js";

export async function getCart() {
  return api.get("/v1/cart");
}

 
export async function addToCart(productId, variantId = null) {
  const response = await api.post(`/v1/cart/${productId}`, {
    variantId,
  });

  await refreshCartCount();

  return response;
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
