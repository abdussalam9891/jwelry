import {
  changeQuantity,
  getCartState,
  loadCart,
  removeItem,
} from "../features/cart.js";

import { createCartItem } from "../components/cartItem.js";
import { showToast } from "../components/toast.js";
import { addToWishlist } from "../features/wishlist.js";
import { loadWishlistState } from "../features/wishlist.js";
import {
  getAvailableCoupons,
  validateCoupon,
} from "../services/couponService.js";

let selectedId = null;
let isUpdating = false;

async function init() {
  setupModal();
  setupCartEvents();
  await loadCart();
  await loadWishlistState();
  render();
}

function openModal(id) {
  selectedId = id;
  document.getElementById("cartModal").classList.remove("hidden");
}

function setupModal() {
  const modal = document.getElementById("cartModal");
  const confirmBtn = document.getElementById("confirmRemove");
  const closeBtn = document.getElementById("closeModal");

  if (!modal || !confirmBtn || !closeBtn) {
    console.warn("Modal elements missing");
    return;
  }

  confirmBtn.onclick = async () => {
    try {
      await removeItem(selectedId);
      render();
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    } finally {
      modal.classList.add("hidden");
    }
  };

  closeBtn.onclick = () => {
    modal.classList.add("hidden");
  };

  // close on outside click
  modal.addEventListener("click", (e) => {
    if (e.target.id === "cartModal") {
      modal.classList.add("hidden");
    }
  });
}

function render() {
  const data = getCartState();

  const container = document.getElementById("cartItems");

  const countText = document.getElementById("cartCountText");

  if (!container) return;

  // EMPTY CART
  if (!Array.isArray(data) || !data.length) {
    container.innerHTML = `

      <div
    class="
      min-h-[65vh]
      flex
      flex-col
      items-center
      justify-center
      text-center
    "
  >

        <!-- ICON -->
      <div class="mb-5">

  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-16 h-16 text-black/20"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.25 3h1.386a1.5 1.5 0 0 1 1.415 1.022L5.64 6.75m0 0h12.72a1.5 1.5 0 0 1 1.45 1.885l-1.12 4.5a1.5 1.5 0 0 1-1.45 1.115H8.126a1.5 1.5 0 0 1-1.45-1.115L5.64 6.75Zm0 0L4.5 3.75M9.75 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>

</div>

        <!-- TITLE -->
        <h2 class="text-2xl font-semibold mb-2">
          Your cart is empty
        </h2>

        <!-- SUBTEXT -->
        <p class="text-sm text-black/50 mb-6">
          Looks like you haven’t added anything yet.
        </p>

        <!-- CTA -->
        <a
          href="/pages/products.html"
          class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#6B1A2A] text-white text-sm hover:opacity-90 transition"
        >
          Continue Shopping
        </a>

      </div>
    `;

    if (countText) {
      countText.textContent = "0 items";
    }

    document.getElementById("summaryWrapper")?.classList.add("hidden");

    return;

    document.getElementById("summaryWrapper")?.classList.remove("hidden");
  }

  //RENDER ITEMS
  container.innerHTML = data.map(createCartItem).join("");

  const totalQty = data.reduce((sum, i) => sum + (i.quantity || 0), 0);

  if (countText) {
    countText.textContent = `${totalQty} item${totalQty > 1 ? "s" : ""}`;
  }

  renderSummary();
renderAvailableCoupons();
}

async function handleCartClick(e) {
  const qtyBtn = e.target.closest(".qty-btn");
  const removeBtn = e.target.closest(".remove-from-cart");
  const wishlistBtn = e.target.closest(".move-to-wishlist");
  const link = e.target.closest(".product-link");

  // Navigate
  if (link) {
    window.location.href = `/pages/productDetails.html?slug=${link.dataset.slug}`;
    return;
  }

  // Remove item
  if (removeBtn) {
    openModal(removeBtn.dataset.id);
    return;
  }

  // Move to wishlist
  if (wishlistBtn) {
    try {
      const itemId = wishlistBtn.dataset.id;

      const item = getCartState().find((i) => i._id === itemId);

      if (!item) return;

      // add product to wishlist
      await addToWishlist(item.productId);

      // remove from cart
      await removeItem(itemId);

      // refresh UI
      render();

      showToast("Moved to wishlist");
    } catch (err) {
      console.error(err);
      showToast("Failed to move item");
    }

    return;
  }

  // Quantity update
  if (!qtyBtn) return;

  const type = qtyBtn.dataset.type;
  const id = qtyBtn.dataset.id;

  const itemEl = e.target.closest(".cart-item");

  if (itemEl) {
    itemEl.classList.add("opacity-50", "pointer-events-none");
  }

  try {
    if (type === "increase") {
      await changeQuantity(id, 1);
    }

    if (type === "decrease") {
      await changeQuantity(id, -1);
    }

    render();
  } catch (err) {
    console.warn(err.message);
    showToast(err.message);
  } finally {
    if (itemEl) {
      itemEl.classList.remove("opacity-50", "pointer-events-none");
    }
  }
}

function setupCartEvents() {
  const container = document.getElementById("cartItems");

  if (!container) {
    console.warn("cartItems missing");
    return;
  }

  container.addEventListener("click", handleCartClick);
}

export function renderSummary({ showCheckoutButton = true } = {}) {
  const data = getCartState();

  const el = document.getElementById("summaryContent");

  if (!el) return;

  if (!Array.isArray(data)) {
    el.innerHTML = `
      <p class="text-sm text-red-500">
        Failed to load summary
      </p>
    `;

    return;
  }

  // CALCULATIONS
  const subtotal = data.reduce((sum, item) => {
    if (!item || typeof item.price !== "number") {
      return sum;
    }

    return sum + item.price * item.quantity;
  }, 0);

  const originalTotal = data.reduce((sum, item) => {
    if (!item || typeof item.originalPrice !== "number") {
      return sum;
    }

    return sum + item.originalPrice * item.quantity;
  }, 0);

 const savings = Math.max(
  originalTotal - subtotal,
  0
);

const totalItems =
  data.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

const appliedCoupon =
  JSON.parse(
    localStorage.getItem(
      "appliedCoupon"
    ) || "null"
  );

const discount =
  appliedCoupon?.discount || 0;

const couponCode =
  appliedCoupon?.coupon?.code || "";

const totalSavings =
  savings + discount;

const finalTotal =
  Math.max(
    subtotal - discount,
    0
  );

  // UI
  el.innerHTML = `<!-- PRICE -->

<div class="space-y-3">

  <div class="flex justify-between text-sm">
    <span class="text-black/60">
      Items (${totalItems})
    </span>

    <span class="font-medium">
      ₹${subtotal.toLocaleString()}
    </span>
  </div>

  <div class="flex justify-between text-sm">
    <span class="text-black/60">
      Shipping
    </span>

    <span class="font-medium text-green-600">
      FREE
    </span>
  </div>

  ${
    discount > 0
      ? `
      <div class="flex justify-between text-sm">

        <span class="text-black/60">
          Coupon (${couponCode})
        </span>

        <span class="font-semibold text-green-600">
          -₹${discount.toLocaleString()}
        </span>

      </div>
    `
      : ""
  }

  ${
    savings > 0
      ? `
      <div class="flex justify-between text-sm">

        <span class="text-black/60">
          You Saved
        </span>

        <span class="font-semibold text-[#6B1A2A]">
          ₹${totalSavings.toLocaleString()}
        </span>

      </div>
    `
      : ""
  }

</div>


<!-- COUPONS -->

<div
  class="
  mt-5
  border
  border-dashed
  border-[#6B1A2A]/20
  rounded-xl
  p-4
  "
>

  <div
    class="
    flex
    items-center
    justify-between
    mb-3
    "
  >

    <h3
      class="
      text-sm
      font-semibold
      "
    >
      Available Offers
    </h3>

    <span
      class="
      text-xs
      text-black/50
      "
    >
      Apply & Save
    </span>

  </div>

  <div
    id="availableCoupons"
    class="space-y-2"
  ></div>

</div>



${
  appliedCoupon
    ? `
      <div
        class="
        mt-3
        flex
        items-center
        justify-between
        bg-green-50
        border
        border-green-200
        rounded-xl
        px-3
        py-2
        "
      >

        <div>

          <p
            class="
            text-sm
            font-medium
            text-green-700
            "
          >
            ${couponCode} Applied
          </p>

          <p
            class="
            text-xs
            text-green-600
            "
          >
            You saved ₹${discount}
          </p>

        </div>

        <button
          id="removeCouponBtn"
          class="
          text-xs
          text-red-500
          hover:underline
          "
        >
          Remove
        </button>

      </div>
    `
    : ""
}


<!-- TOTAL -->

<div
  class="
  border-t
  border-black/10
  mt-5
  pt-5
  "
>

  <div
    class="
    flex
    justify-between
    items-start
    "
  >

    <div>

      <p
        class="
        text-base
        font-semibold
        "
      >
        Total
      </p>

      <p
        class="
        text-xs
        text-black/45
        mt-1
        "
      >
        Inclusive of all taxes
      </p>

    </div>

    <div
      class="
      text-right
      "
    >

      <p
        class="
        text-[30px]
        leading-none
        font-bold
        tracking-tight
        "
      >
        ₹${finalTotal.toLocaleString()}
      </p>

    </div>

  </div>

</div>


${
  showCheckoutButton
    ? `

    <a
      href="/pages/checkout.html"
      class="block mt-5"
    >

      <button
        class="
        w-full
        h-12
        rounded-xl
        bg-[#6B1A2A]
        text-white
        font-medium
        hover:opacity-90
        transition
        shadow-sm
        "
      >
        Checkout Securely
      </button>

    </a>

  `
    : ""
}


<!-- TRUST -->

<div
  class="
  mt-5
  border-t
  border-black/5
  pt-5
  space-y-4
  "
>

  <div
    class="
    flex
    items-center
    gap-3
    "
  >

    <div
      class="
      w-9
      h-9
      rounded-full
      bg-[#F7F7F7]
      flex
      items-center
      justify-center
      "
    >

        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
        class="w-4 h-4 text-black/50"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0 1 19.5 12.75v6A2.25 2.25 0 0 1 17.25 21h-10.5A2.25 2.25 0 0 1 4.5 18.75v-6A2.25 2.25 0 0 1 6.75 10.5Z"
        />
      </svg>
    </div>

    <div>

      <p class="text-sm font-medium">
        Secure Checkout
      </p>

      <p class="text-xs text-black/50">
        SSL encrypted payment flow
      </p>

    </div>

  </div>

  <div
    class="
    flex
    items-center
    gap-3
    "
  >

    <div
      class="
      w-9
      h-9
      rounded-full
      bg-[#F7F7F7]
      flex
      items-center
      justify-center
      "
    >

        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
        class="w-4 h-4 text-black/50"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865A8.25 8.25 0 0 1 17.803 6.3l3.181 3.181"
        />
      </svg>

    </div>

    <div>

      <p class="text-sm font-medium">
        Easy Returns
      </p>

      <p class="text-xs text-black/50">
        Hassle-free 7 day returns
      </p>

    </div>

  </div>

  <div
    class="
    flex
    items-center
    gap-3
    "
  >

    <div
      class="
      w-9
      h-9
      rounded-full
      bg-[#F7F7F7]
      flex
      items-center
      justify-center
      "
    >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75L11.25 15 15 9.75"
        />
      </svg>

    </div>

    <div>

      <p class="text-sm font-medium">
        Authentic Jewelry
      </p>

      <p class="text-xs text-black/50">
        Quality checked before shipping
      </p>

    </div>

  </div>

</div>


<!-- DELIVERY -->

<div
  class="
  mt-5
  bg-[#F8F8F8]
  rounded-xl
  p-4
  "
>

  <div
    class="
    flex
    items-start
    gap-3
    "
  >

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.8"
      stroke="currentColor"
      class="w-5 h-5 mt-0.5 text-[#6B1A2A]"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3 4.5h2.25L7.5 15h9.75l2.25-7.5H6.75"
      />
    </svg>

    <div>

      <p class="text-sm font-medium">
        Estimated Delivery
      </p>

      <p class="text-xs text-black/55 mt-1">
        Arrives within 3–5 business days
      </p>

    </div>

  </div>

</div>`;
}



async function renderAvailableCoupons() {

  const container =
    document.getElementById(
      "availableCoupons"
    );

  if (!container) return;

  try {

    const subtotal =
  getCartState()
    .reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

const data =
  await getAvailableCoupons(
    subtotal
  );

    const coupons =
  data.applicableCoupons || [];



const appliedCoupon =
  JSON.parse(
    localStorage.getItem(
      "appliedCoupon"
    ) || "null"
  );

if (
  appliedCoupon &&
  !coupons.some(
    (coupon) =>
      coupon.code ===
      appliedCoupon.coupon.code
  )
) {

  localStorage.removeItem(
    "appliedCoupon"
  );

}

    if (!coupons.length) {

      container.innerHTML = `
        <p class="text-xs text-black/50">
          No active offers
        </p>
      `;

      return;
    }

    container.innerHTML =
      coupons
        .map((coupon) => {

          const isApplied =
            appliedCoupon?.coupon?.code ===
            coupon.code;

          return `

            <div
              class="
              border
              rounded-xl
              p-3
              flex
              items-center
              justify-between
              "
            >

              <div>

                <p
                  class="
                  text-sm
                  font-semibold
                  text-[#6B1A2A]
                  "
                >
                  ${coupon.code}
                </p>

                <p
                  class="
                  text-xs
                  text-black/60
                  mt-1
                  "
                >
                  ${
                    coupon.discountType ===
                    "PERCENTAGE"
                      ? `${coupon.discountValue}% OFF`
                      : `₹${coupon.discountValue} OFF`
                  }

                  ${
                    coupon.minOrderAmount
                      ? ` • Min ₹${coupon.minOrderAmount}`
                      : ""
                  }
                </p>

              </div>

              ${
                isApplied
                  ? `
                    <span
                      class="
                      text-green-600
                      text-sm
                      font-medium
                      "
                    >
                      ✓ Applied
                    </span>
                  `
                  : `
                    <button
                      class="
                      apply-coupon-btn
                      text-sm
                      font-medium
                      text-[#6B1A2A]
                      "
                      data-code="${coupon.code}"
                    >
                      Apply
                    </button>
                  `
              }

            </div>

          `;
        })
        .join("");

    attachCouponEvents();

    document
  .getElementById(
    "removeCouponBtn"
  )
  ?.addEventListener(
    "click",
    async () => {

      localStorage.removeItem(
        "appliedCoupon"
      );

      render();



      showToast(
        "Coupon removed"
      );

    }
  );

  } catch (err) {

    console.error(err);

  }

}



function attachCouponEvents() {

  document
    .querySelectorAll(
      ".apply-coupon-btn"
    )
    .forEach((btn) => {

      btn.addEventListener(
        "click",
        async () => {

          try {

            const code =
              btn.dataset.code;

            const subtotal =
              getCartState()
                .reduce(
                  (
                    sum,
                    item
                  ) =>
                    sum +
                    item.price *
                      item.quantity,
                  0
                );

            const result =
              await validateCoupon(
                code,
                subtotal
              );

              console.log(
  "Coupon validation result:",
  result
);

            localStorage.setItem(
              "appliedCoupon",
              JSON.stringify(
                result
              )
            );

            render();


            showToast(
              `${code} applied`
            );

          } catch (err) {

            localStorage.removeItem(
    "appliedCoupon"
  );

  render();

  showToast(
    err.message
  );

          }

        }
      );

    });

}




export async function initCartPage() {
  setupModal();
  setupCartEvents();
  await loadCart();
   await loadWishlistState();
  render();


await renderAvailableCoupons();
}
