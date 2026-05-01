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
