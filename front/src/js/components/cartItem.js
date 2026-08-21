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
          type="button"
          class="remove-from-cart w-9 h-9 rounded-full hover:bg-red-50 hover:text-red-500 transition"
          data-id="${id}"
          aria-label="Remove item">
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
            type="button"
            class="qty-btn w-10 h-10 hover:bg-black/5"
            data-type="decrease"
            data-id="${id}"
            aria-label="Decrease quantity">
            −
          </button>

          <span class="w-10 text-center font-medium">${qty}</span>

          <button
            type="button"
            class="qty-btn w-10 h-10 hover:bg-black/5"
            data-type="increase"
            data-id="${id}"
            aria-label="Increase quantity">
            +
          </button>

        </div>

        <button
          type="button"
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
            type="button"
            class="remove-from-cart text-black/40"
            data-id="${id}"
            aria-label="Remove item">
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
              type="button"
              class="qty-btn w-9 h-9"
              data-id="${id}"
              data-type="decrease"
              aria-label="Decrease quantity">
              −
            </button>

            <span class="w-8 text-center text-sm font-medium">
              ${qty}
            </span>

            <button
              type="button"
              class="qty-btn w-9 h-9"
              data-id="${id}"
              data-type="increase"
              aria-label="Increase quantity">
              +
            </button>

          </div>

          <button
            type="button"
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
