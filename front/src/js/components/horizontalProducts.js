
import { createProductCard } from "./productCard.js";
import { loadWishlistState } from "../features/wishlist.js";

export async function renderHorizontalSection({
  containerId,
  products
}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!products || products.length === 0) {
    container.innerHTML = `
      <p class="text-sm text-black/60 text-center py-6">
        No products found
      </p>
    `;
    return;
  }

  const safeProducts = products.filter(p => p && p._id);

 container.innerHTML = `
  <div class="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar">

    ${safeProducts.map(p => `
      <div class="w-[160px] sm:w-[200px] flex-shrink-0 snap-start">
        ${createProductCard(p, { showWishlistButton: true })}
      </div>
    `).join("")}

  </div>
`;

  await loadWishlistState(); // keep wishlist synced
}
