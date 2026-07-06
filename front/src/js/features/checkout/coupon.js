import {
  checkoutState,
  updateCheckoutState,
} from "./checkoutState.js";

import {
  previewCheckout,
} from "../../services/orderService.js";

import {
  getAvailableCoupons,
} from "../../services/couponService.js";

import { renderSummary } from "./summary.js";

import { showToast } from "../productDetails/utils.js";





export async function renderCouponSection() {
  console.log("renderCouponSection called");
  const container = document.getElementById("couponSection");

  console.log("Container:", container);

  if (!container) return;

  try {
    const subtotal = checkoutState.pricing.subtotal;

    const data = await getAvailableCoupons(subtotal);

    const coupons = data.applicableCoupons || [];

    const appliedCoupon = checkoutState.pricing.coupon;



    container.innerHTML = `
<section
  class="
    mt-6
    overflow-hidden
    rounded-3xl
    border
    border-black/10
    bg-white
    shadow-[0_8px_30px_rgba(0,0,0,0.03)]
  "
>

  <!-- HEADER -->

  <div
    class="
      flex
      items-center
      justify-between
      px-6
      py-5
      border-b
      border-black/5
    "
  >

    <div>

      <h3
        class="
          text-[15px]
          font-semibold
        "
      >
        Offers
      </h3>

      <p
        class="
          mt-1
          text-[13px]
          text-black/45
        "
      >
        Best available savings for this order
      </p>

    </div>

  <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.7"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="w-5 h-5 text-[#6B1A2A]"
  aria-hidden="true"
>
  <path d="M3 9V6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75V9a2 2 0 0 0 0 6v2.25A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V15a2 2 0 0 0 0-6Z"/>
  <path d="M9 7.5v9"/>
  <path d="M13.5 9.5h.01"/>
  <path d="M16.5 14.5h.01"/>
  <path d="M16.8 9.2l-3.6 6.1"/>
</svg>

  </div>

  ${
    appliedCoupon
      ? `
      <div
        class="
          px-6
          py-5
          border-b
          border-green-100
          bg-green-50/40
        "
      >

        <div
          class="
            flex
            items-start
            justify-between
            gap-4
          "
        >

          <div>

            <p
              class="
                text-[14px]
                font-semibold
                text-green-700
              "
            >
              ${appliedCoupon.code}
            </p>

            <p
              class="
                mt-1
                text-[13px]
                text-green-600
              "
            >
              ₹${checkoutState.pricing.discount.toLocaleString()}
              saved on this order
            </p>

          </div>

          <button
            id="removeCouponBtn"
            class="
              text-[13px]
              font-medium
              text-[#6B1A2A]
              hover:underline
            "
          >
            Remove
          </button>

        </div>

      </div>
      `
      : ""
  }

  <div>

    ${
      coupons.length
        ? coupons
            .map((coupon) => {

              const isApplied =
                appliedCoupon?.code === coupon.code;

              return `
              <div
                class="
                  flex
                  items-center
                  justify-between
                  gap-5
                  px-6
                  py-5
                  border-b
                  border-black/5
                  last:border-0
                "
              >

                <div class="flex-1">

                  <p
                    class="
                      text-[14px]
                      font-semibold
                      tracking-wide
                    "
                  >
                    ${coupon.code}
                  </p>

                  <p
                    class="
                      mt-2
                      text-[13px]
                      text-black/75
                    "
                  >
                    ${
                      coupon.discountType === "PERCENTAGE"
                        ? `${coupon.discountValue}% OFF`
                        : `₹${coupon.discountValue.toLocaleString()} OFF`
                    }
                  </p>

                  <p
                    class="
                      mt-1
                      text-[12px]
                      text-black/45
                    "
                  >
                    ${
                      coupon.minOrderAmount
                        ? `Minimum order ₹${coupon.minOrderAmount.toLocaleString()}`
                        : "No minimum purchase"
                    }
                  </p>

                </div>

                ${
                  isApplied
                    ? `
                    <span
                      class="
                        text-[13px]
                        font-medium
                        text-green-600
                      "
                    >
                      Applied
                    </span>
                    `
                    : `
                    <button
                      class="
                        apply-coupon-btn
                        shrink-0
                        h-10
                        min-w-[92px]
                        rounded-full
                        border
                        border-black/10
                        bg-white
                        px-5
                        text-[13px]
                        font-medium
                        transition-all
                        duration-200
                        hover:border-[#6B1A2A]
                        hover:text-[#6B1A2A]
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
            .join("")
        : `
        <div
          class="
            px-6
            py-10
            text-center
          "
        >

          <p
            class="
              text-[14px]
              text-black/45
            "
          >
            No offers are available for this order.
          </p>

        </div>
        `
    }

  </div>

</section>
`;

    attachCouponEvents();

  } catch (err) {
    console.error(err);
  }
}



async function applyCoupon(
  couponCode
) {

  const payload = {

    mode:
      checkoutState.mode,

    couponCode,

  };

  if (
    checkoutState.mode ===
    "buyNow"
  ) {

    Object.assign(payload, {

      productId:
        checkoutState.items[0].product,

      variantId:
        checkoutState.items[0]
          .variant?.variantId || null,

      quantity:
        checkoutState.items[0]
          .quantity,

    });

  }

  const preview =
    await previewCheckout(
      payload
    );

  updateCheckoutState(
    preview
  );

  renderSummary({

    items:
      checkoutState.items,

    pricing:
      checkoutState.pricing,

    showCheckoutButton:
      false,

  });

  await renderCouponSection();

}






async function removeCoupon() {

  const payload = {

    mode:
      checkoutState.mode,

  };

  if (
    checkoutState.mode ===
    "buyNow"
  ) {

    Object.assign(payload, {

      productId:
        checkoutState.items[0].product,

      variantId:
        checkoutState.items[0]
          .variant?.variantId || null,

      quantity:
        checkoutState.items[0]
          .quantity,

    });

  }

  const preview =
    await previewCheckout(
      payload
    );

  updateCheckoutState(
    preview
  );

  renderSummary({

    items:
      checkoutState.items,

    pricing:
      checkoutState.pricing,

    showCheckoutButton:
      false,

  });

  await renderCouponSection();

}







function attachCouponEvents() {

  document
    .querySelectorAll(
      ".apply-coupon-btn"
    )
    .forEach(btn => {

      btn.onclick = async () => {

        try {

          await applyCoupon(
            btn.dataset.code
          );

          showToast(
            "Coupon applied"
          );

        } catch (err) {

          showToast(
            err.message
          );

        }

      };

    });

  document
    .getElementById(
      "removeCouponBtn"
    )
    ?.addEventListener(
      "click",
      removeCoupon
    );

}
