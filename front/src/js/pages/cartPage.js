import {
  changeQuantity,
  getCartState,
  loadCart,
  removeItem,
} from "../features/cart.js";

import { createCartItem } from "../components/cartItem.js";
import { showToast } from "../components/toast.js";
import { addToWishlist } from "../features/wishlist.js";
import { loadWishlistState } from "../features/wishlist.js";


import { renderSummary } from "../features/checkout/summary.js";


let selectedId = null;
let isUpdating = false;







function openModal(id) {
  selectedId = id;
  document.getElementById("cartModal").classList.remove("hidden");
}

function setupModal() {
  const modal = document.getElementById("cartModal");
  const confirmBtn = document.getElementById("confirmRemove");
  const closeBtn = document.getElementById("closeModal");

  if (!modal || !confirmBtn || !closeBtn) {
    console.warn("Modal elements missing");
    return;
  }

  confirmBtn.onclick = async () => {
    try {
      await removeItem(selectedId);
      render();
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    } finally {
      modal.classList.add("hidden");
    }
  };

  closeBtn.onclick = () => {
    modal.classList.add("hidden");
  };

  // close on outside click
  modal.addEventListener("click", (e) => {
    if (e.target.id === "cartModal") {
      modal.classList.add("hidden");
    }
  });
}

function render() {
 const { items, pricing } = getCartState();

  const container = document.getElementById("cartItems");

  const countText = document.getElementById("cartCountText");

  if (!container) return;

  // EMPTY CART
  if (!Array.isArray(items) || !items.length) {
    container.innerHTML = `

      <div
    class="
      min-h-[65vh]
      flex
      flex-col
      items-center
      justify-center
      text-center
    "
  >

        <!-- ICON -->
      <div class="mb-5">

  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
     aria-hidden="true"
    class="w-16 h-16 text-black/20"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.25 3h1.386a1.5 1.5 0 0 1 1.415 1.022L5.64 6.75m0 0h12.72a1.5 1.5 0 0 1 1.45 1.885l-1.12 4.5a1.5 1.5 0 0 1-1.45 1.115H8.126a1.5 1.5 0 0 1-1.45-1.115L5.64 6.75Zm0 0L4.5 3.75M9.75 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>

</div>

        <!-- TITLE -->
        <h2 class="text-2xl font-semibold mb-2">
          Your cart is empty
        </h2>

        <!-- SUBTEXT -->
        <p class="text-sm text-black/50 mb-6">
          Looks like you haven’t added anything yet.
        </p>

        <!-- CTA -->
        <a
          href="/pages/products.html"
          class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#6B1A2A] text-white text-sm hover:opacity-90 transition"
        >
          Continue Shopping
        </a>

      </div>
    `;

   if (countText) {
  countText.textContent = "0 items";
}

document.getElementById("summaryWrapper")?.classList.add("hidden");

return;
}

// Show summary when cart has items
document.getElementById("summaryWrapper")?.classList.remove("hidden");

// RENDER ITEMS
container.innerHTML = items.map(createCartItem).join("");

const totalQty = items.reduce(
  (sum, i) => sum + (i.quantity || 0),
  0
);

if (countText) {
  countText.textContent = `${totalQty} item${totalQty > 1 ? "s" : ""}`;
}

renderSummary({
  items,
  pricing,
});
}

async function handleCartClick(e) {
  const qtyBtn = e.target.closest(".qty-btn");
  const removeBtn = e.target.closest(".remove-from-cart");
  const wishlistBtn = e.target.closest(".move-to-wishlist");
  const link = e.target.closest(".product-link");

  // Navigate
  if (link) {
    window.location.href = `/pages/productDetails.html?slug=${link.dataset.slug}`;
    return;
  }

  // Remove item
  if (removeBtn) {
    openModal(removeBtn.dataset.id);
    return;
  }

  // Move to wishlist
  if (wishlistBtn) {
    try {
      const itemId = wishlistBtn.dataset.id;

      const item = getCartState().items.find((i) => i._id === itemId);

      if (!item) return;

      // add product to wishlist
      await addToWishlist(item.productId);

      // remove from cart
      await removeItem(itemId);

      // refresh UI
      render();

      showToast("Moved to wishlist");
    } catch (err) {
      console.error(err);
      showToast("Failed to move item");
    }

    return;
  }

  // Quantity update
  if (!qtyBtn) return;

  const type = qtyBtn.dataset.type;
  const id = qtyBtn.dataset.id;

  const itemEl = e.target.closest(".cart-item");

  if (itemEl) {
    itemEl.classList.add("opacity-50", "pointer-events-none");
  }

  try {
    if (type === "increase") {
      await changeQuantity(id, 1);
    }

    if (type === "decrease") {
      await changeQuantity(id, -1);
    }

    render();
  } catch (err) {
    console.warn(err.message);
    showToast(err.message);
  } finally {
    if (itemEl) {
      itemEl.classList.remove("opacity-50", "pointer-events-none");
    }
  }
}

function setupCartEvents() {
  const container = document.getElementById("cartItems");

  if (!container) {
    console.warn("cartItems missing");
    return;
  }

  container.addEventListener("click", handleCartClick);
}










export async function initCartPage() {
  setupModal();
  setupCartEvents();
  await loadCart();
   await loadWishlistState();
  render();



}
