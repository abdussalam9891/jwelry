import { createProductCard } from "../components/productCard.js";
import Auth from "../core/auth.js";
import { openAuthModal } from "../components/authModal.js";
import { initWishlist, loadWishlistState, openVariantModal  } from "../features/wishlist.js";
import { updateWishlistPageCount } from "../core/wishlistCount.js";

document.addEventListener("DOMContentLoaded", async () => {
  initWishlist();
  await loadWishlistPage();
});

let isLoading = false;

 async function loadWishlistPage() {
  const grid = document.getElementById("wishlistGrid");
  const countEl = document.getElementById("wishlistCountText");

  if (!grid) return; // ❌ no warning needed

  if (isLoading) return;
  isLoading = true;

  try {
    // 🔐 Auth check
    if (!Auth.isLoggedIn()) {
      await openAuthModal();

      if (!Auth.isLoggedIn()) {
        grid.innerHTML = `
          <p class="text-sm text-black/60 text-center py-10">
            Please login to view wishlist
          </p>
        `;
        if (countEl) countEl.textContent = "0 items";
        return;
      }
    }

    // 🔄 Loading state
    grid.innerHTML = `
      <div class="text-sm text-black/60 animate-pulse text-center py-10">
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

    // 🔥 Update count
    updateWishlistPageCount(products.length);

    // ❌ Empty
    if (!products.length) {
      grid.innerHTML = `
        <p class="text-sm text-black/60 text-center py-10">
          Your wishlist is empty
        </p>
      `;
      return;
    }

    // ✅ Render
    grid.innerHTML = products
      .map(p =>
        createProductCard(p, {
          showWishlistButton: false,
          showRemoveButton: true,
          showMoveToCart: true
        })
      )
      .join("");

    // 🔥 BIND EVENTS (scoped + clean)
    grid.querySelectorAll(".move-to-cart").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const productId = btn.dataset.id;

        if (!productId) {
          console.error("Missing productId on button");
          return;
        }

        openVariantModal(productId);
      });
    });

    // 🔄 Sync wishlist state
    await loadWishlistState();

  } catch (err) {
    console.error(err);

    grid.innerHTML = `
      <p class="text-sm text-red-500 text-center py-10">
        Failed to load wishlist
      </p>
    `;

    if (countEl) countEl.textContent = "0 items";

  } finally {
    isLoading = false;
  }
}



