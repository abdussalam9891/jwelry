import { openAuthModal } from "../components/authModal.js";
import { renderProduct } from "../features/productDetails/productRenderer.js";
import { renderHorizontalSection } from "../components/horizontalProducts.js";
import Auth from "../core/auth.js";
import { initWishlist, loadWishlistState } from "../features/wishlist.js";
import { addToCart } from "../services/cartService.js";
import {
  getProductBySlug,
  getSimilarProducts,
  getTrendingProducts,
} from "../services/productService.js";

import {
  loadReviewPage,
  attachReviewSort,
} from "../features/productDetails/events/reviewEvents.js";
import {
  renderDeliveryChecker,
  initDeliveryChecker,
} from "../components/deliveryChecker.js";

import {
  productState,
  resetProductState,
} from "../features/productDetails/state.js";

import {
  renderMainImage,
  renderThumbnails,
  attachImageGalleryEvents,
} from "../features/productDetails/imageGallery.js";

document.addEventListener("DOMContentLoaded", loadProduct);



async function loadProduct() {
  const container = document.getElementById("productContainer");

  if (!container) return;

  const slug = new URLSearchParams(window.location.search).get("slug");

  if (!slug) {
    container.innerHTML = "Product not found";
    return;
  }

  try {
       resetProductState();
    container.innerHTML = "Loading product...";

    // Product
    const product = await getProductBySlug(slug);

   productState.currentProduct = product;
productState.currentProductId = product._id;
productState.currentUser = await Auth.getCurrentUser();

    renderProduct(product);

    initDeliveryChecker();
    initWishlist();
    await loadWishlistState();

    // Reviews
   await loadReviewPage(
  productState.currentProductId,
  1,
  productState.currentUser
);

   attachReviewSort(
  productState.currentProductId,
  productState.currentUser
);

    // Similar + Recommended
    const [similarData, trendingData] =
      await Promise.all([
        getSimilarProducts(product.category),
        getTrendingProducts(),
      ]);

    await renderHorizontalSection({
      containerId: "similarSection",
      products: similarData.products || [],
    });

    await renderHorizontalSection({
      containerId: "recommendSection",
      products: trendingData.products || [],
    });

  } catch (err) {
    console.error(err);

    container.innerHTML = `
      <div class="text-center py-10">
        Failed to load product
      </div>
    `;
  }
}


