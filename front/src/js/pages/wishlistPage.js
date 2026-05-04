import { createProductCard } from "../components/productCard.js";
import Auth from "../core/auth.js";
import { openAuthModal } from "../components/authModal.js";
import { initWishlist, loadWishlistState } from "../features/wishlist.js";

document.addEventListener("DOMContentLoaded", async () => {
  initWishlist();
  await loadWishlistPage();
});

let isLoading = false;

async function loadWishlistPage() {
  const grid = document.getElementById("wishlistGrid");
  if (!grid) {
    console.warn("wishlistGrid missing");
    return;
  }

  if (isLoading) return;
  isLoading = true;

  try {
    if (!Auth.isLoggedIn()) {
      await openAuthModal();

      if (!Auth.isLoggedIn()) {
        grid.innerHTML = `<p class="text-sm text-black/60">Please login to view wishlist</p>`;
        return;
      }
    }

    // 🔥 loading state
    grid.innerHTML = `
      <div class="text-sm text-black/60 animate-pulse">
        Loading wishlist...
      </div>
    `;

    const res = await fetch(`${CONFIG.API_BASE}/api/v1/wishlist`, {
      headers: Auth.authHeader(),
    });

    if (!res.ok) {
      throw new Error(`Wishlist fetch failed: ${res.status}`);
    }

    const data = await res.json();
    const products = Array.isArray(data) ? data : data.items || [];

    if (!products.length) {
      grid.innerHTML = `<p class="text-sm text-black/60">Your wishlist is empty</p>`;
      return;
    }

    // ✅ SINGLE render (correct config)
    grid.innerHTML = products
      .map(p =>
        createProductCard(p, {
          showWishlistButton: false,
          showRemoveButton: true,
          showMoveToCart: true
        })
      )
      .join("");

    // ✅ sync state without refetch
    await loadWishlistState(products);

  } catch (err) {
    console.error(err);
    grid.innerHTML = `<p class="text-sm text-red-500">Failed to load wishlist</p>`;
  } finally {
    isLoading = false;
  }
}
