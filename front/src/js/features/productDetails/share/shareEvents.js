import {
  shareProduct,
  shareToPlatform,
  copyProductLink,
} from "./shareUtils.js";

let initialized = false;
let currentShareData = null;

export function initShare(shareData) {
  currentShareData = shareData;

  if (initialized) return;

  initialized = true;

  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", handleKeydown);
}

async function handleClick(e) {
  // Share Button
  if (
    e.target.closest("#shareBtn") ||
    e.target.closest("#stickyShareBtn")
  ) {
    const nativeShared = await shareProduct(currentShareData);

    if (!nativeShared) {
      openModal();
    }

    return;
  }

  // Close
  if (
    e.target.closest("#closeShareModal") ||
    e.target.id === "shareBackdrop"
  ) {
    closeModal();
    return;
  }

  // Copy
  if (e.target.closest("#copyShareLink")) {
    const result = await copyProductLink(currentShareData.url);

    showToast(result.message);

    return;
  }

  // Platforms
  const platform = e.target.closest("[data-platform]");

  if (platform) {
    shareToPlatform(
      platform.dataset.platform,
      currentShareData
    );

    return;
  }
}

function handleKeydown(e) {
  const modal = document.getElementById("shareModal");

  if (!modal || modal.classList.contains("hidden")) return;

  if (e.key === "Escape") {
    closeModal();
  }
}

function openModal() {
  const modal = document.getElementById("shareModal");

  if (!modal) return;

  modal.classList.remove("hidden");

  document.body.classList.add("overflow-hidden");
}

function closeModal() {
  const modal = document.getElementById("shareModal");

  if (!modal) return;

  modal.classList.add("hidden");

  document.body.classList.remove("overflow-hidden");
}

function showToast(message) {
  let toast = document.getElementById("shareToast");

  if (!toast) {
    toast = document.createElement("div");

    toast.id = "shareToast";

    toast.className =
      "fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black text-white px-5 py-3 text-sm z-[var(--z-toast)] opacity-0 transition-all duration-300";

    document.body.appendChild(toast);
  }

  toast.textContent = message;

  toast.classList.remove("opacity-0");
  toast.classList.add("opacity-100");

  clearTimeout(toast.timer);

  toast.timer = setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0");
  }, 2200);
}
