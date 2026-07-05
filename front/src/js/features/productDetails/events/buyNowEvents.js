import Auth from "../../../core/auth.js";
import { openAuthModal } from "../../../components/authModal.js";

import { createBuyNowPreview } from "../../../services/buyNowService.js";

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
    const preview = await createBuyNowPreview(
      product._id,
      productState.selectedVariantId,
      1
    );

    console.log("Preview:", preview);
console.log("Type:", typeof preview);

    sessionStorage.setItem(
      "gemora_buy_now",
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
