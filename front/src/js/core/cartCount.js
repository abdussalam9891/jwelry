export function updateCartCount(count) {
  const badge = document.getElementById("cartCount");

  if (!badge) return;

  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}
