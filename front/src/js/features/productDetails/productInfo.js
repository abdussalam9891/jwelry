import { renderVariantOptions } from "./variantRenderer.js";
import { renderDescriptionSection, renderProductMeta } from "./description.js";

import { renderReviewsSection } from "./reviewsRenderer.js";


import {
  renderOffers,
  renderDeliverySection,
  renderTrustSection,
} from "./sections.js";



import { productState } from "./state.js";

function renderHeader(product) {
  return `
    <div class="space-y-1">
      <h1 class="text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
        ${product.name}
      </h1>
    </div>
  `;
}

function renderPrice(product) {
  return `
    <div class="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-2">

      <span id="productPrice">₹${product.price}</span>

      ${
        product.originalPrice
          ? `
          <span
            id="originalPrice"
            class="line-through text-black/40 text-sm sm:text-base"
          >
            ₹${product.originalPrice}
          </span>
        `
          : ""
      }

    </div>

    <div
      id="stockStatus"
      class="text-sm text-green-600"
    ></div>
  `;
}



// ctaRenderer.js

function renderCTA(product) {
  return `
    <!-- Desktop CTA -->
    <div class="hidden md:flex flex-col sm:flex-row gap-3 mt-6">

      <!-- Wishlist -->
      <button
        id="wishlistBtn"
        data-id="${product._id}"
        class="wishlist-btn w-full sm:w-[56px] h-[52px] flex items-center justify-center border rounded-lg hover:bg-gray-50 transition order-3 sm:order-1"
        aria-label="Add to Wishlist"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-black/70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.74 0-3.27.86-4 2.09-.73-1.23-2.26-2.09-4-2.09-2.761 0-5 2.015-5 4.5 0 6 9 11.25 9 11.25s9-5.25 9-11.25z"
          />
        </svg>
      </button>

      <div class="flex flex-1 gap-3 order-1 sm:order-2">

        <button
          id="addToCartBtn"
          class="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-black/90 transition"
        >
          ADD TO CART
        </button>

        <button
          id="buyNowBtn"
          class="flex-1 bg-[#8B1E2D] text-white py-3 rounded-lg font-medium hover:bg-[#731826] transition"
        >
          BUY NOW
        </button>

      </div>

    </div>

    <!-- Mobile Sticky CTA -->
    <div
      class="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-2xl z-[9999] p-3"
    >
      <div class="flex items-center gap-3">

        <!-- Wishlist -->
        <button
          id="stickyWishlistBtn"
          data-id="${product._id}"
          class="wishlist-btn w-12 h-12 flex items-center justify-center border rounded-lg flex-shrink-0"
          aria-label="Add to Wishlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-black/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.74 0-3.27.86-4 2.09-.73-1.23-2.26-2.09-4-2.09-2.761 0-5 2.015-5 4.5 0 6 9 11.25 9 11.25s9-5.25 9-11.25z"
            />
          </svg>
        </button>

        <!-- Add to Cart -->
        <button
          id="stickyAddToCartBtn"
          class="flex-1 bg-black text-white py-3 rounded-lg font-medium"
        >
          ADD TO CART
        </button>

        <!-- Buy Now -->
        <button
          id="stickyBuyNowBtn"
          class="flex-1 bg-[#8B1E2D] text-white py-3 rounded-lg font-medium"
        >
          BUY NOW
        </button>

      </div>
    </div>
  `;
}





export function renderInfo(product) {
  return `
    <div class="space-y-6">

      ${renderHeader(product)}

      ${renderPrice(product)}

      ${renderVariantOptions(product)}

      ${renderCTA(product)}

      ${renderOffers()}

      ${renderDeliverySection()}

      ${renderDescriptionSection(product)}

     ${renderProductMeta(product, productState.selectedMaterial)}

      ${renderReviewsSection()}

      ${renderTrustSection()}

    </div>
  `;
}
