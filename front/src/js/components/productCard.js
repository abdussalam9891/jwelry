// export function createProductCard(product) {
//   const img1 =
//     product.images?.[0] || "/front/src/assets/images/placeholder.jpg";
//   const img2 = product.images?.[1] || img1;

//   const hasDiscount =
//     product.originalPrice && product.originalPrice > product.price;

//   const discountPercent = hasDiscount
//     ? Math.round(
//         ((product.originalPrice - product.price) / product.originalPrice) * 100
//       )
//     : null;

//   const productId = product._id || product.id;

//   return `
//     <a href="/front/pages/product.html?slug=${product.slug}"
//        class="group block w-full max-w-full hover:opacity-95 active:scale-[0.98] transition">

//       <div class="relative overflow-hidden bg-[#F9F6F2] rounded-md">

//         <!-- IMAGE 1 -->
//         <img
//           src="${img1}"
//           onerror="this.onerror=null;this.src='/front/src/assets/images/placeholder.jpg';"
//           class="w-full aspect-[3/4] object-cover transition duration-500 group-hover:opacity-0"
//           loading="lazy"
//         />

//         <!-- IMAGE 2 -->
//         <img
//           src="${img2}"
//           onerror="this.onerror=null;this.src='/front/src/assets/images/placeholder.jpg';"
//           class="w-full aspect-[3/4] object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
//           loading="lazy"
//         />

//         <!-- WISHLIST BUTTON -->
//       <button
//   class="wishlist-btn absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full       transition"
//   data-id="${productId}"
// >
//   <svg
//     class="w-8 h-8 stroke-gray-400 fill-none transition duration-200"
//     viewBox="0 0 24 24"
//     stroke-width="1.8"
//   >
//     <path
//       d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"
//     />
//   </svg>
// </button>

//         <!-- BESTSELLER -->
//         ${
//           product.isBestSeller
//             ? `<span class="absolute top-3 left-3 text-[10px] px-2 py-1 bg-white/90 backdrop-blur rounded-sm shadow-sm">
//                  BESTSELLER
//                </span>`
//             : ""
//         }

//         <!-- DISCOUNT -->
//         ${
//           hasDiscount
//             ? `<span class="absolute bottom-3 left-3 text-[10px] px-2 py-1 bg-black text-white rounded-sm">
//                  ${discountPercent}% OFF
//                </span>`
//             : ""
//         }

//       </div>

//       <div class="mt-3">

//         <h3 class="text-[0.95rem] font-medium leading-snug line-clamp-2">
//           ${product.name}
//         </h3>

//         <div class="flex items-center gap-2 mt-1">

//           <span class="text-[0.95rem] font-semibold">
//             ₹${product.price.toLocaleString()}
//           </span>

//           ${
//             hasDiscount
//               ? `<span class="text-[0.85rem] line-through text-black/40">
//                    ₹${product.originalPrice.toLocaleString()}
//                  </span>`
//               : ""
//           }

//         </div>

//       </div>

//     </a>
//   `;
// }







export function createProductCard(product, options = {}) {
  const {
    showWishlistButton = true,
    showRemoveButton = false,
    showMoveToCart = false,
  } = options;

  const img1 =
    product.images?.[0] || "/front/src/assets/images/placeholder.jpg";
  const img2 = product.images?.[1] || img1;

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const productId = product._id || product.id;

  return `
    <div class="group relative w-full">

      <!-- REMOVE BUTTON (wishlist page only) -->
      ${
        showRemoveButton
          ? `
        <button
          class="wishlist-remove absolute top-3 right-3 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-red-50 transition"
          data-id="${productId}"
        >
          ✕
        </button>
      `
          : ""
      }

      <!--  WISHLIST BUTTON (listing pages) -->
      ${
        showWishlistButton
          ? `
        <button
          class="wishlist-btn absolute top-3 right-3 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur transition"
          data-id="${productId}"
        >
          <svg
  class="w-7 h-7 transition duration-200"
  viewBox="0 0 24 24"
  stroke-width="1.8"
>
            <path
              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"
            />
          </svg>
        </button>
      `
          : ""
      }

      <!-- LINK (ONLY NAVIGATION) -->
      <a href="/front/pages/product.html?slug=${product.slug}" class="block">

        <div class="relative overflow-hidden bg-[#F9F6F2] rounded-md">

          <!-- IMAGE 1 -->
          <img
            src="${img1}"
            onerror="this.onerror=null;this.src='/front/src/assets/images/placeholder.jpg';"
            class="w-full aspect-[3/4] object-cover transition duration-500 group-hover:opacity-0"
            loading="lazy"
          />

          <!-- IMAGE 2 -->
          <img
            src="${img2}"
            onerror="this.onerror=null;this.src='/front/src/assets/images/placeholder.jpg';"
            class="w-full aspect-[3/4] object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
            loading="lazy"
          />

          <!-- BESTSELLER -->
          ${
            product.isBestSeller
              ? `
            <span class="absolute top-3 left-3 text-[10px] px-2 py-1 bg-white/90 backdrop-blur rounded-sm shadow-sm">
              BESTSELLER
            </span>
          `
              : ""
          }

          <!-- DISCOUNT -->
          ${
            hasDiscount
              ? `
            <span class="absolute bottom-3 left-3 text-[10px] px-2 py-1 bg-black text-white rounded-sm">
              ${discountPercent}% OFF
            </span>
          `
              : ""
          }

        </div>

        <!-- CONTENT -->
        <div class="mt-3">

          <h3 class="text-[0.95rem] font-medium leading-snug line-clamp-2">
            ${product.name}
          </h3>

          <div class="flex items-center gap-2 mt-1">

            <span class="text-[0.95rem] font-semibold">
              ₹${(product.price ?? 0).toLocaleString()}
            </span>

            ${
              hasDiscount
                ? `
              <span class="text-[0.85rem] line-through text-black/40">
                ₹${product.originalPrice.toLocaleString()}
              </span>
            `
                : ""
            }

          </div>

        </div>

      </a>

      <!-- 🛒 MOVE TO CART (wishlist page only) -->
      ${
        showMoveToCart
          ? `
        <button
          class="move-to-cart w-full mt-3 bg-black text-white py-2 rounded text-sm font-medium hover:bg-black/80 transition"
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
