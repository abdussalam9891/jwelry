// features/wishlist.js

import Auth from "../core/auth.js";
import { openAuthModal } from "../components/authModal.js";
import { updateWishlistCount } from "../core/wishlistCount.js";


const API_BASE = "http://localhost:5000";

export function initWishlist() {
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".wishlist-btn");
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    if (!Auth.isLoggedIn()) {
      await openAuthModal();
      return;
    }

    const id = btn.dataset.id;

    try {
      if (btn.classList.contains("active")) {
        await fetch(`${API_BASE}/api/wishlist/${id}`, {
          method: "DELETE",
          headers: authHeader(),
        });
        btn.classList.remove("active");
      } else {
        await fetch(`${API_BASE}/api/wishlist/${id}`, {
          method: "POST",
          headers: authHeader(),
        });
        btn.classList.add("active");
      }
    } catch (err) {
      console.error("Wishlist error", err);
    }
  });
}

export async function loadWishlistState() {
  if (!Auth.isLoggedIn()) return;

  try {
    const res = await fetch(`${API_BASE}/api/wishlist`, {
      headers: authHeader(),
    });

    const products = await res.json();
    const ids = products.map(p => p._id);

    document.querySelectorAll(".wishlist-btn").forEach(btn => {
      if (ids.includes(btn.dataset.id)) {
        btn.classList.add("active");
      }
    });

  } catch (err) {
    console.error("Failed to load wishlist", err);
  }
}

function authHeader() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}




updateWishlistCount();
