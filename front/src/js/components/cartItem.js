export function createCartItem(item) {
  // 🛡️ Safety fallback (prevents "undefined" UI crash)
  const name = item.name || "Product";
const image = item.image || "https://via.placeholder.com/150?text=No+Image";
  const price = item.price ?? 0;
  const originalPrice = item.originalPrice;
  const qty = item.quantity || 1;
  const id = item._id;

  return `
    <div class="flex gap-4 border-b py-5 items-start">

      <!-- IMAGE -->
      <img src="${image}"
           class="w-20 h-24 object-cover rounded bg-gray-100" />

      <!-- INFO -->
      <div class="flex-1">

        <!-- NAME -->
        <h3 class="font-medium text-sm">${name}</h3>

        <!-- PRICE -->
        <div class="mt-1 flex items-center gap-2">
          <span class="font-semibold">₹${price}</span>
          ${
            originalPrice
              ? `<span class="line-through text-black/40 text-sm">₹${originalPrice}</span>`
              : ""
          }
        </div>

        <!-- 🔥 QUANTITY CONTROLS -->
        <div class="flex items-center gap-2 mt-3">
          <button class="qty-btn px-2 border rounded" data-type="decrease" data-id="${id}">-</button>
          <span>${qty}</span>
          <button class="qty-btn px-2 border rounded" data-type="increase" data-id="${id}">+</button>
        </div>

        <!-- ACTIONS -->
        <div class="flex gap-4 mt-3 text-xs">
          <button class="remove-from-cart text-red-500" data-id="${id}">
            REMOVE
          </button>
          <button class="move-to-wishlist text-black/60" data-id="${id}">
            MOVE TO WISHLIST
          </button>
        </div>

      </div>

      <!-- CLOSE -->
      <button class="remove-from-cart text-lg" data-id="${id}">
        ✕
      </button>

    </div>
  `;
}
