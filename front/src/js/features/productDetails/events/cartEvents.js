import Auth from "../../../core/auth.js";
import { openLoginFlow } from "../../../features/navbar/authHelpers.js";
import { addToCart } from "../../../services/cartService.js";
import { showToast } from "../utils.js";
import { productState } from "../state.js";

async function handleAddToCart() {
  const product = productState.currentProduct;

  if (!product) return;

  if (product.variants?.length) {
    const hasMaterial = product.variants.some((v) => v.material);
    const hasSize = product.variants.some((v) => v.size);

    if (hasMaterial && !productState.selectedMaterial) {
      showToast("Please select material");
      return;
    }

    if (hasSize && !productState.selectedSize) {
      showToast("Please select size");
      return;
    }

    if (!productState.selectedVariantId) {
      showToast("Please select a valid combination");
      return;
    }
  }

  const user = await Auth.getCurrentUser();

  if (!user) {
    await openLoginFlow();
    return;
  }

  try {
    await addToCart(
      product._id,
      productState.selectedVariantId
    );

    showToast("Added to cart");
  } catch (err) {
    console.error(err);
    showToast("Failed to add to cart");
  }
}

export function attachCartEvents() {
  document
    .getElementById("addToCartBtn")
    ?.addEventListener("click", handleAddToCart);

  document
    .getElementById("stickyAddToCartBtn")
    ?.addEventListener("click", handleAddToCart);
}
