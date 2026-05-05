import {
  getCart,
  updateCartItem,
  removeCartItem
} from "../services/cartService.js";

let cartState = [];

export async function loadCart() {
  const data = await getCart();

  cartState = data.items || [];   //normalize here

  return cartState;
}

export function getCartState() {
  return cartState;
}

export async function changeQuantity(id, delta) {
  const item = cartState.find(i => i._id === id);
  if (!item) return;

  const newQty = item.quantity + delta;

  if (newQty <= 0) {
    await removeCartItem(id);
  } else {
    await updateCartItem(id, newQty);
  }

  await loadCart();
}

export async function removeItem(id) {
  await removeCartItem(id);
  await loadCart();
}
