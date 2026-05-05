import {
  loadCart,
  getCartState,
  changeQuantity,
  removeItem
} from "../features/cart.js";

import { createCartItem } from "../components/cartItem.js";

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
  const container = document.getElementById("cartItems");
  const countText = document.getElementById("cartCountText");

  if (!container) return;

  if (!Array.isArray(data) || !data.length) {
    container.innerHTML = `
      <div class="text-center py-16">
        <p class="text-lg font-medium mb-2">Your cart is empty</p>
        <a href="/" class="text-[#6B1A2A] underline">Continue shopping</a>
      </div>
    `;
    if (countText) countText.textContent = "0 items";
    renderSummary();
    return;
  }

  container.innerHTML = data.map(createCartItem).join("");

  const totalQty = data.reduce((sum, i) => sum + (i.quantity || 0), 0);

  if (countText) {
    countText.textContent = `${totalQty} item${totalQty > 1 ? "s" : ""}`;
  }

  renderSummary();
}
async function handleCartClick(e) {
  const inc = e.target.closest(".increase");
  const dec = e.target.closest(".decrease");
  const remove = e.target.closest(".remove-btn");
  const link = e.target.closest(".product-link");

  // Navigate
  if (link) {
    window.location.href = `/pages/productDetails.html?slug=${link.dataset.slug}`;
    return;
  }

  // Remove → modal
  if (remove) {
    openModal(remove.dataset.id);
    return;
  }

  if (!inc && !dec) return;

  const itemEl = e.target.closest(".cart-item");

  if (itemEl) {
    itemEl.classList.add("opacity-50", "pointer-events-none");
  }

  try {
    if (inc) await changeQuantity(inc.dataset.id, 1);
    if (dec) await changeQuantity(dec.dataset.id, -1);

    render(); // only after real update
  } catch (err) {
    console.error(err);
    alert("Update failed. Try again.");
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
  const el = document.getElementById("summaryContent");

  if (!el) return;

  if (!Array.isArray(data)) {
    console.error("Invalid cart data:", data);
    el.innerHTML = `<p class="text-red-500 text-sm">Error loading summary</p>`;
    return;
  }

  const subtotal = data.reduce((sum, item) => {
    if (!item || typeof item.price !== "number") return sum;
    return sum + item.price * item.quantity;
  }, 0);

  el.innerHTML = `
    <div class="flex justify-between mb-2 text-sm">
      <span>Subtotal</span>
      <span>₹${subtotal}</span>
    </div>

    <div class="flex justify-between mb-2 text-sm">
      <span>Shipping</span>
      <span class="text-green-600">Free</span>
    </div>

    <hr class="my-2"/>

    <div class="flex justify-between font-semibold">
      <span>Total</span>
      <span>₹${subtotal}</span>
    </div>
  `;
}

init();
