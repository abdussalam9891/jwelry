import Auth from "../../../core/auth.js";
import { openAuthModal } from "../../../components/authModal.js";

import { previewCheckout } from "../../../services/orderService.js";

import { showToast } from "../utils.js";
import { productState } from "../state.js";

async function handleBuyNow() {
  const product = productState.currentProduct;

  if (!product) return;

  // Validate variant selection
  if (product.variants?.length) {
    const hasMaterial = product.variants.some(
      (v) => v.material
    );

    const hasSize = product.variants.some(
      (v) => v.size
    );

    if (
      hasMaterial &&
      !productState.selectedMaterial
    ) {
      showToast("Please select material");
      return;
    }

    if (
      hasSize &&
      !productState.selectedSize
    ) {
      showToast("Please select size");
      return;
    }

    if (!productState.selectedVariantId) {
      showToast("Please select a valid combination");
      return;
    }
  }

  // User must be logged in
  const user = await Auth.getCurrentUser();

  if (!user) {
    await openAuthModal();
    return;
  }

  try {
  const preview = await previewCheckout({
  mode: "buyNow",

  productId: product._id,

  variantId: productState.selectedVariantId,

  quantity: 1,
});

sessionStorage.setItem(
  "checkout_preview",
  JSON.stringify(preview)
);

    console.log(
  "Stored:",
  sessionStorage.getItem("gemora_buy_now")
);

    window.location.href =
      "/pages/checkout.html?mode=buyNow";
  } catch (err) {
    console.error(err);

    showToast(
      err.message ||
        "Failed to proceed to checkout"
    );
  }
}

export function attachBuyNowEvents() {
  document
    .getElementById("buyNowBtn")
    ?.addEventListener(
      "click",
      handleBuyNow
    );

  document
    .getElementById("stickyBuyNowBtn")
    ?.addEventListener(
      "click",
      handleBuyNow
    );
}
