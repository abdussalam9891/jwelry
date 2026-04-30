// pages/wishlistPage.js

import { createProductCard } from "../components/productCard.js";
import Auth from "../core/auth.js";
import { openAuthModal } from "../components/authModal.js";
import { initWishlist } from "../features/wishlist.js";


const grid = document.getElementById("wishlistGrid");

async function loadWishlistPage() {
  if (!Auth.isLoggedIn()) {
    await openAuthModal();
    return;
  }

  try {
    grid.innerHTML = `<p class="text-sm text-black/60">Loading wishlist...</p>`;

    const res = await fetch(`${CONFIG.API_BASE}/api/wishlist`, {
      headers: Auth.authHeader(),
    });

    if (!res.ok) throw new Error("Failed");

    const products = await res.json();

    if (!products.length) {
      grid.innerHTML = `<p class="text-sm text-black/60">Your wishlist is empty</p>`;
      return;
    }

    grid.innerHTML = products.map(createProductCard).join("");

  } catch (err) {
    console.error(err);
    grid.innerHTML = `<p class="text-sm text-red-500">Failed to load wishlist</p>`;
  }
}


// INIT
loadWishlistPage();
initWishlist();
