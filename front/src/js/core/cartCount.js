import { getCart } from "../services/cartService.js";

export function updateCartCount(count) {
  const badge = document.getElementById("cartCount");

  if (!badge) return;

  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

export async function refreshCartCount() {
  const data = await getCart();

  const totalQty = (data.items || []).reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  updateCartCount(totalQty);
}
