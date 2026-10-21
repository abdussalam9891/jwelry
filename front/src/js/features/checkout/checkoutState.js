// features/checkout/checkoutState.js

import { loadCart, getCartState } from "../cart.js";

export const checkoutState = {
  mode: "cart",
  items: [],
  pricing: null,
};

export async function initializeCheckoutState() {
  const mode =
    new URLSearchParams(window.location.search).get("mode") ||
    "cart";

  checkoutState.mode = mode;

  if (mode === "cart") {
    await loadCart();

    const cart = getCartState();

    checkoutState.items = cart.items;
    checkoutState.pricing = cart.pricing;

    return;
  }

  let preview;

  try {
    preview = JSON.parse(
      sessionStorage.getItem("checkout_preview")
    );
  } catch {
    preview = null;
  }

  if (!preview) {
    sessionStorage.removeItem("checkout_preview");
    window.location.href = "/";
    return;
  }

  checkoutState.items = preview.items;
  checkoutState.pricing = preview.pricing;
}

export function updateCheckoutState(preview) {
  checkoutState.items = preview.items;
  checkoutState.pricing = preview.pricing;
}

export function resetCheckoutState() {
  checkoutState.mode = "cart";
  checkoutState.items = [];
  checkoutState.pricing = null;

  sessionStorage.removeItem("checkout_preview");
}
