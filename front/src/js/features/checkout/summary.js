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
        
        ₹${Math.round(finalTotal).toLocaleString("en-IN")}
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

`;
}
