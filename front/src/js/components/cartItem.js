// export function createCartItem(item) {
//   const name = item.name || "Product";

//   const image = item.image || "https://via.placeholder.com/150?text=No+Image";

//   const price = item.price ?? 0;

//   const originalPrice = item.originalPrice;

//   const qty = item.quantity || 1;

//   const id = item._id;

//   const slug = item.slug || "";

//   const material = item.variantDetails?.material || "";

//   const size = item.variantDetails?.size || "";

//   const savings =
//     originalPrice && originalPrice > price ? originalPrice - price : 0;

//   return `

//     <div
//       class="cart-item bg-white rounded-3xl border border-black/5 p-5 flex gap-5 relative hover:shadow-md transition duration-300"
//     >

//       <!-- REMOVE -->
//       <button
//         class="remove-from-cart absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-black/30 hover:text-red-500 hover:bg-red-50 transition"
//         data-id="${id}"
//       >
//         ✕
//       </button>

//       <!-- IMAGE -->
//       <a
//         href="/pages/productDetails.html?slug=${slug}"
//         class="shrink-0 block"
//       >
//         <img
//           src="${image}"
//           class="w-28 h-32 object-cover rounded-2xl bg-[#F8F8F8] hover:scale-[1.02] transition"
//         />
//       </a>

//       <!-- INFO -->
//       <div class="flex-1 min-w-0 flex flex-col">

//         <!-- TITLE -->
//         <a
//           href="/pages/productDetails.html?slug=${slug}"
//           class="block"
//         >
//           <h3 class="text-[15px] font-medium leading-snug line-clamp-2 pr-10 hover:text-black/70 transition">
//             ${name}
//           </h3>
//         </a>

//         <!-- VARIANT -->
//         ${
//           material || size
//             ? `
//           <p class="text-xs text-black/45 mt-1 tracking-wide uppercase">
//             ${material}
//             ${size ? `• Size ${size}` : ""}
//           </p>
//         `
//             : ""
//         }

//         <!-- PRICE -->
//         <div class="flex items-center gap-2 mt-3">

//           <span class="text-[1.05rem] font-semibold">
//             ₹${price.toLocaleString()}
//           </span>

//           ${
//             originalPrice
//               ? `
//             <span class="text-sm text-black/35 line-through">
//               ₹${originalPrice.toLocaleString()}
//             </span>
//           `
//               : ""
//           }

//           ${
//             savings
//               ? `
//             <span class="text-xs text-[#6B1A2A] font-medium">
//               Save ₹${savings.toLocaleString()}
//             </span>
//           `
//               : ""
//           }

//         </div>

//         <!-- DELIVERY -->
//         <div class="flex items-center gap-2 mt-2">

//           <span class="w-2 h-2 rounded-full bg-[#8D6E63]"></span>

//           <p class="text-xs text-[#7A5C61]">
//             Delivery in 3–5 business days
//           </p>

//         </div>

//         <!-- BOTTOM -->
//         <div class="mt-5 flex flex-col items-start gap-3">

//           <!-- QUANTITY -->
//           <div
//             class="flex items-center border border-black/10 rounded-xl overflow-hidden bg-[#FAFAFA]"
//           >

//             <button
//               class="qty-btn w-9 h-9 flex items-center justify-center hover:bg-black/5 transition text-lg"
//               data-type="decrease"
//               data-id="${id}"
//             >
//               −
//             </button>

//             <span class="w-10 text-center text-sm font-medium">
//               ${qty}
//             </span>

//             <button
//               class="qty-btn w-9 h-9 flex items-center justify-center hover:bg-black/5 transition text-lg"
//               data-type="increase"
//               data-id="${id}"
//             >
//               +
//             </button>

//           </div>

//           <!-- ACTIONS -->
//           <div class="flex items-center gap-4">

//             <button
//               class="move-to-wishlist text-xs tracking-wide text-black/50 hover:text-black transition"
//               data-id="${id}"
//             >
//               MOVE TO WISHLIST
//             </button>

//             <span class="text-black/20">|</span>

//             <button
//               class="remove-from-cart text-xs tracking-wide text-red-500 hover:text-red-600 transition"
//               data-id="${id}"
//             >
//               REMOVE
//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//   `;
// }






// export function createCartItem(item) {
//   const name = item.name || "Product";
//   const image =
//     item.image || "https://via.placeholder.com/400x500?text=No+Image";

//   const price = item.price ?? 0;
//   const originalPrice = item.originalPrice;
//   const qty = item.quantity || 1;
//   const id = item._id;
//   const slug = item.slug || "";

//   const material = item.variantDetails?.material || "";
//   const size = item.variantDetails?.size || "";

//   const savings =
//     originalPrice && originalPrice > price
//       ? originalPrice - price
//       : 0;

//   return `
// <div class="bg-white rounded-[28px] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

//   <div class="flex flex-col sm:flex-row gap-6 p-6">

//     <!-- IMAGE -->
//     <a
//       href="/pages/productDetails.html?slug=${slug}"
//       class="relative shrink-0 mx-auto sm:mx-0"
//     >
//       <img
//         src="${image}"
//         alt="${name}"
//         class="w-36 h-40 rounded-2xl object-cover bg-[#F7F5F3]"
//       />
//     </a>

//     <!-- CONTENT -->
//     <div class="flex-1 min-w-0 flex flex-col">

//       <!-- TOP -->
//       <div class="flex justify-between gap-4">

//         <div class="min-w-0">

//           <a
//             href="/pages/productDetails.html?slug=${slug}"
//             class="block"
//           >
//             <h3 class="text-lg font-medium leading-snug hover:text-[#6B1A2A] transition line-clamp-2">
//               ${name}
//             </h3>
//           </a>

//           ${
//             material || size
//               ? `
//           <p class="mt-2 text-sm text-black/45">
//             ${material}
//             ${size ? `• Size ${size}` : ""}
//           </p>
//           `
//               : ""
//           }

//         </div>

//         <button
//           class="remove-from-cart shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-black/30 hover:bg-red-50 hover:text-red-500 transition"
//           data-id="${id}"
//           aria-label="Remove item"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg"
//             class="w-5 h-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             stroke-width="2">
//             <path stroke-linecap="round"
//               stroke-linejoin="round"
//               d="M6 18L18 6M6 6l12 12"/>
//           </svg>
//         </button>

//       </div>

//       <!-- PRICE -->
//       <div class="mt-5 flex flex-wrap items-center gap-3">

//         <span class="text-2xl font-semibold">
//           ₹${price.toLocaleString()}
//         </span>

//         ${
//           originalPrice
//             ? `
//         <span class="text-base text-black/35 line-through">
//           ₹${originalPrice.toLocaleString()}
//         </span>
//         `
//             : ""
//         }

//         ${
//           savings
//             ? `
//         <span class="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
//           Save ₹${savings.toLocaleString()}
//         </span>
//         `
//             : ""
//         }

//       </div>

//       <!-- DELIVERY -->
//       <div class="mt-3 flex items-center gap-2 text-sm text-black/55">

//         <span class="w-2 h-2 rounded-full bg-emerald-500"></span>

//         <span>Delivery in 3–5 business days</span>

//       </div>

//       <!-- BOTTOM -->
//       <div class="mt-auto pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

//         <!-- Quantity -->
//         <div
//           class="flex items-center rounded-full border border-black/10 bg-[#FAFAFA] overflow-hidden w-fit"
//         >

//           <button
//             class="qty-btn w-11 h-11 flex items-center justify-center text-lg hover:bg-black/5 transition"
//             data-id="${id}"
//             data-type="decrease"
//           >
//             −
//           </button>

//           <span class="w-10 text-center font-medium">
//             ${qty}
//           </span>

//           <button
//             class="qty-btn w-11 h-11 flex items-center justify-center text-lg hover:bg-black/5 transition"
//             data-id="${id}"
//             data-type="increase"
//           >
//             +
//           </button>

//         </div>

//         <!-- Wishlist -->
//         <button
//           class="move-to-wishlist flex items-center gap-2 text-sm text-black/55 hover:text-[#6B1A2A] transition"
//           data-id="${id}"
//         >

//           <svg xmlns="http://www.w3.org/2000/svg"
//             class="w-5 h-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             stroke-width="1.8">
//             <path
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.74 0-3.27.86-4 2.09-.73-1.23-2.26-2.09-4-2.09-2.761 0-5 2.015-5 4.5 0 6 9 11.25 9 11.25s9-5.25 9-11.25z"
//             />
//           </svg>

//           <span>Save for later</span>

//         </button>

//       </div>

//     </div>

//   </div>

// </div>
// `;
// }










export function createCartItem(item) {
  const name = item.name || "Product";
  const image = item.image || "https://via.placeholder.com/400x500?text=No+Image";
  const price = item.price ?? 0;
  const originalPrice = item.originalPrice;
  const qty = item.quantity || 1;
  const id = item._id;
  const slug = item.slug || "";
  const material = item.variantDetails?.material || "";
  const size = item.variantDetails?.size || "";
  const savings = originalPrice && originalPrice > price
    ? originalPrice - price
    : 0;

  return `
<div class="rounded-3xl bg-white shadow-sm ring-1 ring-black/5 hover:shadow-lg transition-all">

  <!-- Desktop -->
  <div class="hidden md:flex gap-6 p-6">

    <a href="/pages/productDetails.html?slug=${slug}" class="shrink-0">
      <img
        src="${image}"
        alt="${name}"
        class="w-36 h-44 rounded-2xl object-cover bg-[#F7F5F3]"
      />
    </a>

    <div class="flex-1 flex flex-col">

      <div class="flex justify-between gap-5">

        <div class="min-w-0">
          <a href="/pages/productDetails.html?slug=${slug}">
            <h3 class="text-lg font-medium leading-snug hover:text-[#6B1A2A] transition line-clamp-2">
              ${name}
            </h3>
          </a>

          ${(material || size) ? `
          <p class="mt-2 text-sm text-black/45">
            ${material}${size ? ` • Size ${size}` : ""}
          </p>` : ""}
        </div>

        <button
          class="remove-from-cart w-9 h-9 rounded-full hover:bg-red-50 hover:text-red-500 transition"
          data-id="${id}">
          ✕
        </button>

      </div>

      <div class="mt-4 flex items-center gap-3 flex-wrap">
        <span class="text-3xl font-semibold">₹${price.toLocaleString()}</span>

        ${originalPrice ? `
        <span class="text-black/35 line-through">
          ₹${originalPrice.toLocaleString()}
        </span>` : ""}

        ${savings ? `
        <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
          SAVE ₹${savings.toLocaleString()}
        </span>` : ""}
      </div>

      <div class="mt-2 text-sm text-black/50">
         Delivery in 3–5 business days
      </div>

      <div class="mt-auto pt-6 flex items-center justify-between">

        <div class="flex items-center rounded-full bg-[#F7F7F7] ring-1 ring-black/10 overflow-hidden">

          <button
            class="qty-btn w-10 h-10 hover:bg-black/5"
            data-type="decrease"
            data-id="${id}">
            −
          </button>

          <span class="w-10 text-center font-medium">${qty}</span>

          <button
            class="qty-btn w-10 h-10 hover:bg-black/5"
            data-type="increase"
            data-id="${id}">
            +
          </button>

        </div>

        <button
          class="move-to-wishlist text-sm text-black/55 hover:text-[#6B1A2A]"
          data-id="${id}">
          ♡ Save for later
        </button>

      </div>

    </div>

  </div>

  <!-- Mobile -->
  <div class="md:hidden p-4">

    <div class="flex gap-4">

      <a href="/pages/productDetails.html?slug=${slug}">
        <img
          src="${image}"
          alt="${name}"
          class="w-24 h-28 rounded-xl object-cover bg-[#F7F5F3]"
        />
      </a>

      <div class="flex-1 min-w-0">

        <div class="flex justify-between gap-2">

          <a
            href="/pages/productDetails.html?slug=${slug}"
            class="min-w-0">

            <h3 class="text-[15px] font-medium leading-snug line-clamp-2">
              ${name}
            </h3>

          </a>

          <button
            class="remove-from-cart text-black/40"
            data-id="${id}">
            ✕
          </button>

        </div>

        ${(material || size) ? `
        <p class="mt-1 text-xs text-black/45">
          ${material}${size ? ` • ${size}` : ""}
        </p>` : ""}

        <div class="mt-2 flex items-center gap-2 flex-wrap">
          <span class="text-xl font-semibold">
            ₹${price.toLocaleString()}
          </span>

          ${originalPrice ? `
          <span class="text-xs line-through text-black/35">
            ₹${originalPrice.toLocaleString()}
          </span>` : ""}
        </div>

        <div class="mt-1 text-xs text-black/45">
          Delivery in 3–5 business days
        </div>

        <div class="mt-4 flex items-center justify-between gap-3">

          <div class="flex items-center rounded-full bg-[#F7F7F7] ring-1 ring-black/10 overflow-hidden">

            <button
              class="qty-btn w-9 h-9"
              data-id="${id}"
              data-type="decrease">
              −
            </button>

            <span class="w-8 text-center text-sm font-medium">
              ${qty}
            </span>

            <button
              class="qty-btn w-9 h-9"
              data-id="${id}"
              data-type="increase">
              +
            </button>

          </div>

          <button
            class="move-to-wishlist text-xs text-black/55"
            data-id="${id}">
            ♡ Save
          </button>

        </div>

      </div>

    </div>

  </div>

</div>
`;
}



