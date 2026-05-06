 // features/wishlist.js

import { openAuthModal } from "../components/authModal.js";
import Auth from "../core/auth.js";
import { updateWishlistCount, updateWishlistPageCount } from "../core/wishlistCount.js";

let wishlistSet = new Set(); // source of truth

let selectedMaterial = null;
let selectedSize = null;
let selectedVariantId = null;

// INIT (event delegation)
export function initWishlist() {
  document.addEventListener("click", async (e) => {


    // REMOVE (wishlist page)

    const removeBtn = e.target.closest(".wishlist-remove");
    if (removeBtn) {
      e.preventDefault();

      const id = String(removeBtn.dataset.id);

      // instant UI update
   wishlistSet.delete(id);

updateWishlistCount(wishlistSet.size);        // navbar
updateWishlistPageCount(wishlistSet.size);    // page 🔥 FIX

      removeBtn.closest(".group")?.remove();

      const grid = document.getElementById("wishlistGrid");
      if (grid && !grid.children.length) {
        grid.innerHTML = `<p class="text-sm text-black/60">Your wishlist is empty</p>`;
      }

      // async API (non-blocking)
      fetch(`${CONFIG.API_BASE}/api/v1/wishlist/${id}`, {
        method: "DELETE",
        headers: Auth.authHeader(),
      }).catch(err => {
        console.error(err);

        // rollback
        wishlistSet.add(id);
       updateWishlistCount(wishlistSet.size);
       updateWishlistPageCount(wishlistSet.size);
      });

      return;
    }



    // MOVE TO CART

    const cartBtn = e.target.closest(".move-to-cart");
if (cartBtn) {
  e.preventDefault();

  const id = String(cartBtn.dataset.id);

  // 🔥 OPEN VARIANT SELECTOR
  openVariantModal(id);

  return;
}
    if (cartBtn) {
      e.preventDefault();

      const id = String(cartBtn.dataset.id);

      // instant UI
      wishlistSet.delete(id);
      updateWishlistCount(wishlistSet.size);
      updateWishlistPageCount(wishlistSet.size);

      cartBtn.closest(".group")?.remove();

      const grid = document.getElementById("wishlistGrid");
      if (grid && !grid.children.length) {
        grid.innerHTML = `<p class="text-sm text-black/60">Your wishlist is empty</p>`;
      }

      // async API
      fetch(`${CONFIG.API_BASE}/api/v1/cart/${id}`, {
        method: "POST",
        headers: Auth.authHeader(),
      });

      fetch(`${CONFIG.API_BASE}/api/v1/wishlist/${id}`, {
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


btn.offsetHeight;

updateWishlistCount(wishlistSet.size);
updateWishlistPageCount(wishlistSet.size);

    // async API (non-blocking)
    fetch(`${CONFIG.API_BASE}/api/v1/wishlist/${id}`, {
      method: isSaved ? "DELETE" : "POST",
      headers: Auth.authHeader(),
    })
      .then(res => {
         
  if (!res.ok) throw new Error("Wishlist API failed");
      })
      .catch(err => {
        console.error(" rollback firing:", err.message);

        // rollback
        if (isSaved) {
          wishlistSet.add(id);
          btn.classList.add("active");
        } else {
          wishlistSet.delete(id);
          btn.classList.remove("active");
        }
updateWishlistCount(wishlistSet.size);
updateWishlistPageCount(wishlistSet.size);
      });
  });
}



// LOAD STATE

export async function loadWishlistState(products = null) {
  if (!Auth.isLoggedIn()) return;

  try {
    let items = products;

    // 🔥 fetch only if needed
    if (!items) {
      const res = await fetch(`${CONFIG.API_BASE}/api/v1/wishlist`, {
        headers: Auth.authHeader(),
      });

      if (!res.ok) throw new Error("Failed to fetch wishlist");

      items = await res.json(); // now always array of products
    }

    // 🔥 reset state
    wishlistSet.clear();

    // 🔥 ONLY product objects now (clean)
    items.forEach(product => {
      if (product?._id) {
        wishlistSet.add(String(product._id));
      }
    });

    applyWishlistUI();

    // 🔥 count from state (no refetch)
    updateWishlistCount(wishlistSet.size);
    updateWishlistPageCount(wishlistSet.size);

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



export async function openVariantModal(productId) {
  const modal = document.getElementById("variantModal");
  const container = document.getElementById("variantOptions");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");

  // 🔥 loading state
  container.innerHTML = `
    <p class="text-sm text-black/60">Loading options...</p>
  `;

  try {
    const res = await fetch(`${CONFIG.API_BASE}/api/v1/products/${productId}`);

    if (!res.ok) {
      const text = await res.text();
      console.error("Product fetch failed:", text);
      throw new Error("Failed to load product");
    }

    const product = await res.json();

    // 🔴 safety check
    if (!product.variants || !product.variants.length) {
      container.innerHTML = `
        <p class="text-sm text-black/60">No variants available</p>
      `;
      return;
    }

    const materials = [...new Set(product.variants.map(v => v.material))];
    const sizes = [...new Set(product.variants.map(v => v.size).filter(Boolean))];

    container.innerHTML = `
      <div class="space-y-4">

        <div>
          <p class="text-sm mb-1">Material</p>
          <div class="flex gap-2 flex-wrap">
            ${materials.map(m => `
              <button class="variant-material border px-3 py-1 rounded" data-m="${m}">
                ${m}
              </button>
            `).join("")}
          </div>
        </div>

        ${
          sizes.length ? `
          <div>
            <p class="text-sm mb-1">Size</p>
            <div class="flex gap-2 flex-wrap">
              ${sizes.map(s => `
                <button class="variant-size border px-3 py-1 rounded" data-s="${s}">
                  ${s}
                </button>
              `).join("")}
            </div>
          </div>
          ` : ""
        }

      </div>
    `;

    attachVariantEvents(product);

  } catch (err) {
    console.error(err);

    container.innerHTML = `
      <p class="text-sm text-red-500">Failed to load options</p>
    `;
  }
}



function updateVariantSelectionUI(selector, activeBtn) {
  document.querySelectorAll(selector).forEach(btn => {
    btn.classList.remove("active");
  });

  activeBtn.classList.add("active");
}


function closeVariantModal() {
  const modal = document.getElementById("variantModal");

  modal.classList.add("hidden");
  modal.classList.remove("flex");


  document.body.classList.remove("overflow-hidden");
}


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("variantModal");

  if (!modal) {

    return;
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeVariantModal();
    }
  });
});




function attachVariantEvents(product) {
  let selectedMaterial = null;
  let selectedSize = null;
  let selectedVariantId = null;

  const errorEl = document.getElementById("variantError");
  const confirmBtn = document.getElementById("confirmMoveToCart");

  // 🔴 Reset error
  if (errorEl) errorEl.classList.add("hidden");

  // 🔴 MATERIAL CLICK
  document.querySelectorAll(".variant-material").forEach(btn => {
    btn.onclick = () => {
      selectedMaterial = btn.dataset.m;

      updateVariantSelectionUI(".variant-material", btn);

      selectedVariantId = updateVariantMatch(
        product,
        selectedMaterial,
        selectedSize
      );

      if (errorEl) errorEl.classList.add("hidden");
    };
  });

  // 🔴 SIZE CLICK
  document.querySelectorAll(".variant-size").forEach(btn => {
    btn.onclick = () => {
      selectedSize = btn.dataset.s;

      updateVariantSelectionUI(".variant-size", btn);

      selectedVariantId = updateVariantMatch(
        product,
        selectedMaterial,
        selectedSize
      );

      if (errorEl) errorEl.classList.add("hidden");
    };
  });

  // 🔴 CONFIRM BUTTON
  if (confirmBtn) {
    confirmBtn.onclick = null;

    confirmBtn.onclick = async () => {
      try {
        // 🔴 VALIDATION
        if (!selectedVariantId) {
          errorEl?.classList.remove("hidden");
          return;
        }

        errorEl?.classList.add("hidden");

        // 🔒 prevent spam clicks
        confirmBtn.disabled = true;
        confirmBtn.classList.add("opacity-50", "cursor-not-allowed");

        // 🔥 1. ADD TO CART
        const cartRes = await fetch(
          `${CONFIG.API_BASE}/api/v1/cart/${product._id}`,
          {
            method: "POST",
            headers: {
              ...Auth.authHeader(),
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              variantId: selectedVariantId
            })
          }
        );

        if (!cartRes.ok) {
          const text = await cartRes.text();
          console.error("Add to cart failed:", text);
          throw new Error("Add to cart failed");
        }

        // 🔥 2. REMOVE FROM WISHLIST
        await fetch(`${CONFIG.API_BASE}/api/v1/wishlist/${product._id}`, {
          method: "DELETE",
          headers: Auth.authHeader()
        });

        // 🔥 UX FIRST (instant feedback)
        closeVariantModal();
        showToast("Added to cart");

        // 🔄 Refresh wishlist (clean state)

        // 🔥 update local state
wishlistSet.delete(String(product._id));

updateWishlistCount(wishlistSet.size);
updateWishlistPageCount(wishlistSet.size);

// 🔥 remove card instantly
document
  .querySelector(`[data-product-id="${product._id}"]`)
  ?.remove();

// 🔥 empty state
const grid = document.getElementById("wishlistGrid");

if (grid && !grid.children.length) {
  grid.innerHTML = `
    <p class="text-sm text-black/60 text-center py-10">
      Your wishlist is empty
    </p>
  `;
}






      } catch (err) {
        console.error("ERROR:", err);
        showToast("Something went wrong");
      } finally {
        // 🔓 re-enable button
        confirmBtn.disabled = false;
        confirmBtn.classList.remove("opacity-50", "cursor-not-allowed");
      }
    };
  }
}




function updateVariantMatch(product, material, size) {
  if (!material) return null;

  const variant = product.variants.find(v => {
    const materialMatch = v.material === material;

    const sizeMatch =
      !v.size || !size || v.size === size;

    return materialMatch && sizeMatch;
  });

  return variant ? variant._id : null;
}


function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2000);
}
