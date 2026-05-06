// core/wishlistCount.js
export function updateWishlistCount(count) {
  const badge = document.getElementById("wishlistCount");
  if (!badge) return;

  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}




export function updateWishlistPageCount(count) {
  const countEl = document.getElementById("wishlistCountText");
  if (!countEl) return;

  countEl.textContent = `${count} item${count !== 1 ? "s" : ""}`;
}
