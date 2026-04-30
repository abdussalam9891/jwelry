// features/wishlist.js

import { openAuthModal } from "../components/authModal.js";
import Auth from "../core/auth.js";
import { updateWishlistCount } from "../core/wishlistCount.js";

let wishlistSet = new Set(); // source of truth

// ─────────────────────────────
// INIT (event delegation)
// ─────────────────────────────
export function initWishlist() {
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".wishlist-btn");
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const productId = btn.dataset.id;

    if (!Auth.isLoggedIn()) {
      await openAuthModal();
      return;
    }

    const isSaved = wishlistSet.has(productId);

    // 🔥 OPTIMISTIC UI
    if (isSaved) {
      wishlistSet.delete(productId);
      btn.classList.remove("active");
    } else {
      wishlistSet.add(productId);
      btn.classList.add("active");
    }

    updateWishlistCount();

    try {
      const res = await fetch(`${CONFIG.API_BASE}/api/wishlist/${productId}`, {
        method: isSaved ? "DELETE" : "POST",
        headers: Auth.authHeader(),
      });

      if (!res.ok) throw new Error("Wishlist API failed");

      // remove card if on wishlist page
      if (isSaved && window.location.pathname.includes("wishlist.html")) {
        btn.closest("a")?.remove();

        const grid = document.getElementById("wishlistGrid");
        if (grid && !grid.querySelector(".wishlist-btn")) {
          grid.innerHTML = `<p class="text-sm text-black/60">Your wishlist is empty</p>`;
        }
      }

    } catch (err) {
      console.error("Wishlist sync failed", err);

      // 🔥 ROLLBACK
      if (isSaved) {
        wishlistSet.add(productId);
        btn.classList.add("active");
      } else {
        wishlistSet.delete(productId);
        btn.classList.remove("active");
      }

      updateWishlistCount(); // rollback sync
    }
  });
}

// ─────────────────────────────
// LOAD STATE (on page load)
// ─────────────────────────────
export async function loadWishlistState() {
  if (!Auth.isLoggedIn()) return;

  try {
    const res = await fetch(`${CONFIG.API_BASE}/api/wishlist`, {
      headers: Auth.authHeader(),
    });

    const data = await res.json();

    // 🔥 SAFE update (don’t replace reference)
    wishlistSet.clear();
    data.items.forEach(id => wishlistSet.add(id));

    applyWishlistUI();
    updateWishlistCount(); // 🔥 sync navbar

  } catch (err) {
    console.error("Failed to load wishlist", err);
  }
}

// ─────────────────────────────
// APPLY UI STATE
// ─────────────────────────────
function applyWishlistUI() {
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    const id = btn.dataset.id;

    if (wishlistSet.has(id)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}
