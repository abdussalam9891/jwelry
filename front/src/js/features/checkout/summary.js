export function renderSummary({
  items,
    pricing,
    showCheckoutButton = true,
} = {}) {


  const el = document.getElementById("summaryContent");

  if (!el) return;

  if (!Array.isArray(items) || !pricing) {
    el.innerHTML = `
      <p class="text-sm text-red-500">
        Failed to load summary
      </p>
    `;
    return;
  }

  const subtotal = pricing.subtotal;
  const savings = pricing.savings;
  const shipping = pricing.shipping ?? 0;
  const totalItems = pricing.itemCount;
  const finalTotal = pricing.total ?? subtotal;

  el.innerHTML = `
<!-- PRICE -->

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
      ${
        shipping === 0
          ? "FREE"
          : `₹${shipping.toLocaleString()}`
      }
    </span>
  </div>

  ${
    savings > 0
      ? `
      <div class="flex justify-between text-sm">

        <span class="text-black/60">
          You Saved
        </span>

        <span class="font-semibold text-[#6B1A2A]">
          ₹${savings.toLocaleString()}
        </span>

      </div>
    `
      : ""
  }

</div>

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
         aria-hidden="true"
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
         aria-hidden="true"
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
         aria-hidden="true"
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
       aria-hidden="true"
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

</div>

`;
}
