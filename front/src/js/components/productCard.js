import { CONFIG } from "../config.js";


export function createProductCard(product, options = {}) {
  const {
    showWishlistButton = true,
    showRemoveButton = false,
    showMoveToCart = false,
  } = options;

  





  const img1 =
  product.images?.[0]?.url ||

  "/front/src/assets/images/placeholder.webp";

  const img2 =
  product.images?.[1]?.url ||
  img1;

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const productId = product._id || product.id;

  return `
    <div data-product-id="${productId}" class="group relative w-full">

      ${
        showRemoveButton
          ? `
        <button
          class="wishlist-remove absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow hover:bg-red-50 transition text-sm"
          data-id="${productId}"
        >
          ✕
        </button>
      `
          : ""
      }

      ${
        showWishlistButton
          ? `
        <button
          class="wishlist-btn absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur transition"
          data-id="${productId}"
        >
          <svg class="w-5 h-5 transition duration-200" viewBox="0 0 24 24" stroke-width="1.8">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
          </svg>
        </button>
      `
          : ""
      }

      <a href="/front/pages/productDetails.html?slug=${product.slug}" class="block">

        <div class="relative overflow-hidden bg-[#F9F6F2] rounded-md">

          <!-- IMAGE -->
          <img
            src="${img1}"
            onerror="this.onerror=null;this.src='/front/src/assets/images/placeholder.jpg';"
            class="w-full aspect-[4/5] object-cover transition duration-500 group-hover:opacity-0"
            loading="lazy"
          />

          <!-- HOVER IMAGE -->
          <img
            src="${img2}"
            onerror="this.onerror=null;this.src='/front/src/assets/images/placeholder.jpg';"
            class="w-full aspect-[4/5] object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
            loading="lazy"
          />

          ${
            product.isBestSeller
              ? `
            <span class="absolute top-2 left-2 text-[10px] px-2 py-0.5 bg-white/90 rounded shadow-sm">
              BESTSELLER
            </span>
          `
              : ""
          }

          ${
            hasDiscount
              ? `
            <span class="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 bg-black text-white rounded">
              ${discountPercent}% OFF
            </span>
          `
              : ""
          }

        </div>

        <!-- CONTENT -->
        <div class="mt-2 space-y-1">

          <h3 class="text-[0.9rem] font-medium leading-snug line-clamp-1">
            ${product.name}
          </h3>

          <div class="flex items-center gap-1">

            <span class="text-[0.9rem] font-semibold">
              ₹${(product.price ?? 0).toLocaleString()}
            </span>

            ${
              hasDiscount
                ? `
              <span class="text-[0.8rem] line-through text-black/40">
                ₹${product.originalPrice.toLocaleString()}
              </span>
            `
                : ""
            }

          </div>

        </div>

      </a>

      ${
        showMoveToCart
          ? `
        <button
          class="move-to-cart w-full mt-2 bg-black text-white py-1.5 rounded text-xs font-medium hover:bg-black/80 transition"
          data-id="${productId}"
        >
          Move to Cart
        </button>
      `
          : ""
      }

    </div>
  `;
}
