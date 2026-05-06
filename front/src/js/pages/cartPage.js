import {
  changeQuantity,
  getCartState,
  loadCart,
  removeItem,
} from "../features/cart.js";

import { createCartItem } from "../components/cartItem.js";
import { addToWishlist } from "../features/wishlist.js";
import { showToast }
from "../components/toast.js";
import { CONFIG } from "../config.js";

let selectedId = null;
let isUpdating = false;

async function init() {
  setupModal();
  setupCartEvents();
  await loadCart();
  render();
}

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

  const data = getCartState();

  const container =
    document.getElementById("cartItems");

  const countText =
    document.getElementById("cartCountText");

  if (!container) return;

  // 🔥 EMPTY CART
  if (!Array.isArray(data) || !data.length) {

    container.innerHTML = `

      <div class="flex flex-col items-center justify-center py-24">

        <!-- ICON -->
      <div class="mb-5">

  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
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
          href="/front/pages/products.html"
          class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#6B1A2A] text-white text-sm hover:opacity-90 transition"
        >
          Continue Shopping
        </a>

      </div>
    `;

    if (countText) {
      countText.textContent = "0 items";
    }

    renderSummary();

    return;
  }

  // 🔥 RENDER ITEMS
  container.innerHTML =
    data.map(createCartItem).join("");

  const totalQty = data.reduce(
    (sum, i) => sum + (i.quantity || 0),
    0
  );

  if (countText) {

    countText.textContent =
      `${totalQty} item${totalQty > 1 ? "s" : ""}`;
  }

  renderSummary();
}



async function handleCartClick(e) {
  const qtyBtn = e.target.closest(".qty-btn");
  const removeBtn = e.target.closest(".remove-from-cart");
  const wishlistBtn = e.target.closest(".move-to-wishlist");
  const link = e.target.closest(".product-link");

  // 🔥 Navigate
  if (link) {
    window.location.href = `/front/pages/productDetails.html?slug=${link.dataset.slug}`;
    return;
  }

  // 🔥 Remove item
  if (removeBtn) {
    openModal(removeBtn.dataset.id);
    return;
  }

  // 🔥 Move to wishlist
  if (wishlistBtn) {
    try {
      const itemId = wishlistBtn.dataset.id;

      const item = getCartState().find((i) => i._id === itemId);

      if (!item) return;

      // 🔥 add product to wishlist
      await addToWishlist(item.productId);

      // 🔥 remove from cart
      await removeItem(itemId);

      // 🔥 refresh UI
      render();

      showToast("Moved to wishlist");
    } catch (err) {
      console.error(err);
      showToast("Failed to move item");
    }

    return;
  }

  // 🔥 Quantity update
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

function renderSummary() {

  const data = getCartState();

  const el =
    document.getElementById("summaryContent");

  if (!el) return;

  if (!Array.isArray(data)) {

    el.innerHTML = `
      <p class="text-sm text-red-500">
        Failed to load summary
      </p>
    `;

    return;
  }

  // 🔥 CALCULATIONS
  const subtotal = data.reduce((sum, item) => {

    if (!item || typeof item.price !== "number") {
      return sum;
    }

    return sum + (item.price * item.quantity);

  }, 0);

  const originalTotal = data.reduce((sum, item) => {

    if (
      !item ||
      typeof item.originalPrice !== "number"
    ) {
      return sum;
    }

    return sum + (
      item.originalPrice * item.quantity
    );

  }, 0);

  const savings =
    Math.max(originalTotal - subtotal, 0);

  const totalItems = data.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // 🔥 UI
  el.innerHTML = `

    <!-- ITEMS -->
    <div class="flex justify-between items-center text-sm mb-3">
      <span class="text-black/60">
        Items (${totalItems})
      </span>

      <span class="font-medium">
        ₹${subtotal.toLocaleString()}
      </span>
    </div>

    <!-- SHIPPING -->
    <div class="flex justify-between items-center text-sm mb-3">

      <span class="text-black/60">
        Shipping
      </span>

      <span class="text-green-600 font-medium">
        Free
      </span>

    </div>

    <!-- SAVINGS -->
    ${
      savings > 0
        ? `
      <div class="flex justify-between items-center text-sm mb-4">

        <span class="text-black/60">
          You Saved
        </span>

        <span class="text-green-600 font-semibold">
          − ₹${savings.toLocaleString()}
        </span>

      </div>
    `
        : ""
    }

    <!-- DIVIDER -->
    <div class="border-t border-black/10 pt-4 mb-4">

      <div class="flex justify-between items-center">

        <div>
          <p class="font-semibold text-[15px]">
            Total
          </p>

          <p class="text-xs text-black/45 mt-0.5">
            Inclusive of all taxes
          </p>
        </div>

        <span class="text-[1.3rem] font-bold">
          ₹${subtotal.toLocaleString()}
        </span>

      </div>

    </div>

    <!-- DELIVERY -->
    <div
      class="bg-[#F8F8F8] rounded-xl p-3 mb-4"
    >

      <div class="flex items-start gap-2">

        <div
          class="w-2 h-2 rounded-full bg-green-500 mt-1.5"
        ></div>

        <div>

          <p class="text-sm font-medium">
            Estimated Delivery
          </p>

          <p class="text-xs text-black/55 mt-0.5">
            Arrives within 3–5 business days
          </p>

        </div>

      </div>

    </div>

    <!-- TRUST -->

     <div class="space-y-3 mb-5">

  <!-- SECURE -->
  <div class="flex items-center gap-2.5 text-xs text-black/60">

    <div class="w-7 h-7 rounded-full bg-[#F7F7F7] flex items-center justify-center">

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
        class="w-4 h-4 text-black/50"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0 1 19.5 12.75v6A2.25 2.25 0 0 1 17.25 21h-10.5A2.25 2.25 0 0 1 4.5 18.75v-6A2.25 2.25 0 0 1 6.75 10.5Z"
        />
      </svg>

    </div>

    <span>Secure checkout</span>

  </div>

  <!-- RETURNS -->
  <div class="flex items-center gap-2.5 text-xs text-black/60">

    <div class="w-7 h-7 rounded-full bg-[#F7F7F7] flex items-center justify-center">

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
        class="w-4 h-4 text-black/50"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865A8.25 8.25 0 0 1 17.803 6.3l3.181 3.181"
        />
      </svg>

    </div>

    <span>Easy 7-day returns</span>

  </div>

  <!-- AUTHENTIC -->
  <div class="flex items-center gap-2.5 text-xs text-black/60">

    <div class="w-7 h-7 rounded-full bg-[#F7F7F7] flex items-center justify-center">

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
        class="w-4 h-4 text-black/50"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75 11.25 15 15 9.75m6 2.25a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>

    </div>

    <span>100% authentic jewelry</span>

  </div>







    <!-- CTA -->
    <button
      class="w-full h-12 rounded-xl bg-[#6B1A2A] text-white font-medium hover:opacity-90 transition"
    >
      Checkout Securely
    </button>

  `;
}

init();
