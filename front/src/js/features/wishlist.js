 // features/wishlist.js

import { openAuthModal } from "../components/authModal.js";
import Auth from "../core/auth.js";
import { updateWishlistCount } from "../core/wishlistCount.js";

let wishlistSet = new Set(); // source of truth

// INIT (event delegation)
export function initWishlist() {
  document.addEventListener("click", async (e) => {


    // ❌ REMOVE (wishlist page)

    const removeBtn = e.target.closest(".wishlist-remove");
    if (removeBtn) {
      e.preventDefault();

      const id = String(removeBtn.dataset.id);

      // instant UI update
      wishlistSet.delete(id);
     updateWishlistCount(wishlistSet.size);

      removeBtn.closest(".group")?.remove();

      const grid = document.getElementById("wishlistGrid");
      if (grid && !grid.children.length) {
        grid.innerHTML = `<p class="text-sm text-black/60">Your wishlist is empty</p>`;
      }

      // async API (non-blocking)
      fetch(`${CONFIG.API_BASE}/api/wishlist/${id}`, {
        method: "DELETE",
        headers: Auth.authHeader(),
      }).catch(err => {
        console.error(err);

        // rollback
        wishlistSet.add(id);
       updateWishlistCount(wishlistSet.size);
      });

      return;
    }



    // 🛒 MOVE TO CART

    const cartBtn = e.target.closest(".move-to-cart");
    if (cartBtn) {
      e.preventDefault();

      const id = String(cartBtn.dataset.id);

      // instant UI
      wishlistSet.delete(id);
      updateWishlistCount(wishlistSet.size);

      cartBtn.closest(".group")?.remove();

      const grid = document.getElementById("wishlistGrid");
      if (grid && !grid.children.length) {
        grid.innerHTML = `<p class="text-sm text-black/60">Your wishlist is empty</p>`;
      }

      // async API
      fetch(`${CONFIG.API_BASE}/api/cart/${id}`, {
        method: "POST",
        headers: Auth.authHeader(),
      });

      fetch(`${CONFIG.API_BASE}/api/wishlist/${id}`, {
        method: "DELETE",
        headers: Auth.authHeader(),
      }).catch(err => {
        console.error("Move to cart failed", err);
      });

      return;
    }



    // WISHLIST TOGGLE

    const btn = e.target.closest(".wishlist-btn");
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const id = String(btn.dataset.id);

    // auth check (still awaited, but unavoidable UX-wise)
    if (!Auth.isLoggedIn()) {
      await openAuthModal();
      if (!Auth.isLoggedIn()) return;
    }

    const isSaved = wishlistSet.has(id);

    // instant state update
    if (isSaved) {
      wishlistSet.delete(id);
    } else {
      wishlistSet.add(id);
    }

  // instant UI
btn.classList.toggle("active");
console.log("✅ toggled:", btn.classList.contains("active"));

btn.offsetHeight;

updateWishlistCount(wishlistSet.size);

    // async API (non-blocking)
    fetch(`${CONFIG.API_BASE}/api/wishlist/${id}`, {
      method: isSaved ? "DELETE" : "POST",
      headers: Auth.authHeader(),
    })
      .then(res => {
         console.log("📡 API status:", res.status);
  if (!res.ok) throw new Error("Wishlist API failed");
      })
      .catch(err => {
        console.error("❌ rollback firing:", err.message);

        // rollback
        if (isSaved) {
          wishlistSet.add(id);
          btn.classList.add("active");
        } else {
          wishlistSet.delete(id);
          btn.classList.remove("active");
        }
updateWishlistCount(wishlistSet.size);
      });
  });
}



// LOAD STATE

export async function loadWishlistState(products = null) {
  if (!Auth.isLoggedIn()) return;

  try {
    let items = products;

    if (!items) {
      const res = await fetch(`${CONFIG.API_BASE}/api/wishlist`, {
        headers: Auth.authHeader(),
      });

      const data = await res.json();
      items = Array.isArray(data) ? data : data.items || [];
    }

    wishlistSet.clear();

    items.forEach(item => {
      const id = typeof item === "string" ? item : item._id;
      if (id) wishlistSet.add(String(id));
    });

    applyWishlistUI();
   updateWishlistCount(wishlistSet.size);

  } catch (err) {
    console.error("Failed to load wishlist", err);
  }
}


// APPLY UI STATE

function applyWishlistUI() {
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    const id = String(btn.dataset.id);

    const shouldBeActive = wishlistSet.has(id);
    const isActive = btn.classList.contains("active");

    if (shouldBeActive !== isActive) {
      btn.classList.toggle("active", shouldBeActive);
    }
  });
}




