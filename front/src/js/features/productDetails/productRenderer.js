
import {
  renderMainImage,
  renderThumbnails,
  attachImageGalleryEvents,
} from "./imageGallery.js";

import { renderInfo } from "./productInfo.js";

import { attachVariantEvents } from "./events/variantEvents.js";
import { attachDescriptionEvents } from "./events/descriptionEvents.js";
import {
  attachReviewModalEvents,
  attachReviewSubmitEvents,
} from "./events/reviewEvents.js";
import { attachCartEvents } from "./events/cartEvents.js";
import { attachBuyNowEvents } from "./events/buyNowEvents.js";


export function renderProduct(product) {
  const container = document.getElementById("productContainer");

  container.innerHTML = `
    <div class="section-sm container-main max-w-7xl mx-auto px-4 md:px-6">

      <div class="grid grid-cols-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr] gap-6 md:gap-10 items-start">

        <!-- LEFT -->
        <div class="md:sticky md:top-24 self-start">
          <div class="flex flex-col md:flex-row gap-4">

            ${renderThumbnails(product.images?.map((img) => img.url))}

            <div class="w-full">
             ${renderMainImage(product.images?.[0]?.url)}
            </div>

          </div>
        </div>

        <!-- RIGHT -->
        <div>

          ${renderInfo(product)}



        </div>

      </div>

    </div>
  `;

  //  ADD THIS RIGHT HERE
  const prices = product.variants?.map((v) => v.price) || [];

  if (prices.length) {
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    const priceEl = document.getElementById("productPrice");

    if (priceEl) {
      priceEl.textContent = min === max ? `₹${min}` : `₹${min} – ₹${max}`;
    }
  }

  //  THEN attach events
 attachImageGalleryEvents();

attachVariantEvents(product);

attachDescriptionEvents();

attachReviewModalEvents();

attachReviewSubmitEvents();

attachCartEvents();

attachBuyNowEvents();
}
