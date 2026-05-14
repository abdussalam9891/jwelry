 import { CONFIG } from "../config.js";


export function createCartItem(item) {

  const name = item.name || "Product";

 const image =
  item.image ||
  "https://via.placeholder.com/150?text=No+Image";

  const price = item.price ?? 0;

  const originalPrice = item.originalPrice;

  const qty = item.quantity || 1;

  const id = item._id;

  const slug = item.slug || "";

  const material =
    item.variantDetails?.material || "";

  const size =
    item.variantDetails?.size || "";

  const savings =
    originalPrice && originalPrice > price
      ? originalPrice - price
      : 0;

  return `

    <div
      class="cart-item bg-white rounded-3xl border border-black/5 p-5 flex gap-5 relative hover:shadow-md transition duration-300"
    >

      <!-- REMOVE -->
      <button
        class="remove-from-cart absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-black/30 hover:text-red-500 hover:bg-red-50 transition"
        data-id="${id}"
      >
        ✕
      </button>

      <!-- IMAGE -->
      <a
        href="/front/pages/productDetails.html?slug=${slug}"
        class="shrink-0 block"
      >
        <img
          src="${image}"
          class="w-28 h-32 object-cover rounded-2xl bg-[#F8F8F8] hover:scale-[1.02] transition"
        />
      </a>

      <!-- INFO -->
      <div class="flex-1 min-w-0 flex flex-col">

        <!-- TITLE -->
        <a
          href="/front/pages/productDetails.html?slug=${slug}"
          class="block"
        >
          <h3 class="text-[15px] font-medium leading-snug line-clamp-2 pr-10 hover:text-black/70 transition">
            ${name}
          </h3>
        </a>

        <!-- VARIANT -->
        ${
          material || size
            ? `
          <p class="text-xs text-black/45 mt-1 tracking-wide uppercase">
            ${material}
            ${size ? `• Size ${size}` : ""}
          </p>
        `
            : ""
        }

        <!-- PRICE -->
        <div class="flex items-center gap-2 mt-3">

          <span class="text-[1.05rem] font-semibold">
            ₹${price.toLocaleString()}
          </span>

          ${
            originalPrice
              ? `
            <span class="text-sm text-black/35 line-through">
              ₹${originalPrice.toLocaleString()}
            </span>
          `
              : ""
          }

          ${
            savings
              ? `
            <span class="text-xs text-[#6B1A2A] font-medium">
              Save ₹${savings.toLocaleString()}
            </span>
          `
              : ""
          }

        </div>

        <!-- DELIVERY -->
        <div class="flex items-center gap-2 mt-2">

          <span class="w-2 h-2 rounded-full bg-[#8D6E63]"></span>

          <p class="text-xs text-[#7A5C61]">
            Delivery in 3–5 business days
          </p>

        </div>

        <!-- BOTTOM -->
        <div class="mt-5 flex flex-col items-start gap-3">

          <!-- QUANTITY -->
          <div
            class="flex items-center border border-black/10 rounded-xl overflow-hidden bg-[#FAFAFA]"
          >

            <button
              class="qty-btn w-9 h-9 flex items-center justify-center hover:bg-black/5 transition text-lg"
              data-type="decrease"
              data-id="${id}"
            >
              −
            </button>

            <span class="w-10 text-center text-sm font-medium">
              ${qty}
            </span>

            <button
              class="qty-btn w-9 h-9 flex items-center justify-center hover:bg-black/5 transition text-lg"
              data-type="increase"
              data-id="${id}"
            >
              +
            </button>

          </div>

          <!-- ACTIONS -->
          <div class="flex items-center gap-4">

            <button
              class="move-to-wishlist text-xs tracking-wide text-black/50 hover:text-black transition"
              data-id="${id}"
            >
              MOVE TO WISHLIST
            </button>

            <span class="text-black/20">|</span>

            <button
              class="remove-from-cart text-xs tracking-wide text-red-500 hover:text-red-600 transition"
              data-id="${id}"
            >
              REMOVE
            </button>

          </div>

        </div>

      </div>

    </div>
  `;
}
