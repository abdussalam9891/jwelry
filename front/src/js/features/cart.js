import {
  getCart,
  updateCartItem,
  removeCartItem
} from "../services/cartService.js";

import { showToast } from "../components/toast.js";

import { updateCartCount } from "../core/cartCount.js";

let cartState = [];

export async function loadCart() {
  const data = await getCart();

  cartState = data.items || [];

  // Navbar badge update
  const totalQty = cartState.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  updateCartCount(totalQty);

  return cartState;
}

export function getCartState() {
  return cartState;
}

const MAX_CART_QTY = 3;

export async function changeQuantity(
  id,
  delta
) {
  const item = cartState.find(
    (i) => i._id === id
  );

  if (!item) return;

  const newQty =
    item.quantity + delta;

  if (
    newQty > MAX_CART_QTY
  ) {
    showToast(
      `You can only purchase up to ${MAX_CART_QTY} units of this item`
    );

    return;
  }

  if (newQty <= 0) {
    await removeCartItem(id);
  } else {
    await updateCartItem(
      id,
      newQty
    );
  }

  await loadCart();
}

export async function removeItem(id) {
  await removeCartItem(id);

  await loadCart();
}
