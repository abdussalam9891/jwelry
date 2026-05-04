import { createCartItem } from "../components/cartItem.js";
import Auth from "../core/auth.js";
import { openAuthModal } from "../components/authModal.js";

document.addEventListener("DOMContentLoaded", loadCart);

async function loadCart() {
  const grid = document.getElementById("cartGrid");
  const countText = document.getElementById("cartCountText");

  if (!grid) {
    console.warn("cartGrid missing");
    return;
  }

  try {
    // 🔐 AUTH CHECK
    if (!Auth.isLoggedIn()) {
      await openAuthModal();

      if (!Auth.isLoggedIn()) {
        grid.innerHTML = `<p class="text-sm text-black/60">Please login to view cart</p>`;
        return;
      }
    }

    // 🔄 LOADING STATE
    grid.innerHTML = `
      <div class="text-sm text-black/60 animate-pulse">
        Loading cart...
      </div>
    `;

    // 📡 FETCH CART
    const res = await fetch(`${CONFIG.API_BASE}/api/v1/cart`, {
      headers: Auth.authHeader(),
    });

    if (!res.ok) {
      throw new Error(`Cart fetch failed: ${res.status}`);
    }

    const data = await res.json();
    const items = data.items || [];

    // 📭 EMPTY STATE
    if (!items.length) {
      grid.innerHTML = `
        <p class="text-sm text-black/60">
          Your cart is empty
        </p>
      `;

      if (countText) countText.textContent = "0 items";
      return;
    }

    // 🛒 RENDER CART ITEMS (IMPORTANT FIX)
    grid.innerHTML = items.map(createCartItem).join("");

    // 🔢 CORRECT ITEM COUNT (sum of quantities)
    const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

    if (countText) {
      countText.textContent = `${totalQty} item${totalQty > 1 ? "s" : ""}`;
    }

  } catch (err) {
    console.error("Cart Load Error:", err);

    grid.innerHTML = `
      <p class="text-sm text-red-500">
        Failed to load cart
      </p>
    `;
  }
}
