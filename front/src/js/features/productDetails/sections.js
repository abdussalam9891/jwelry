// sections.js

import { renderDeliveryChecker } from "../../components/deliveryChecker.js";

 

export function renderDeliverySection() {
  return `
    <div>
      ${renderDeliveryChecker()}
    </div>
  `;
}

export function renderTrustSection() {
  return `
    <div class="border border-[#6B1A2A]/10 rounded-2xl p-5 bg-[#F9F6F2] space-y-5">

      <!-- Free Delivery -->
      <div class="flex items-start gap-4">
        <div class="bg-white border border-[#6B1A2A]/10 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#6B1A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M3 7h13v10H3zM16 10h3l2 3v4h-5zM7.5 17.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm9 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
          </svg>
        </div>

        <div>
          <p class="text-[0.95rem] font-medium text-black">
            Free Delivery
          </p>

          <p class="text-[0.85rem] text-black/60">
            Arrives in 3–5 days
          </p>
        </div>
      </div>

      <!-- Easy Returns -->
      <div class="flex items-start gap-4">
        <div class="bg-white border border-[#6B1A2A]/10 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#6B1A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M4 4v6h6M20 20v-6h-6M5.5 9A7 7 0 0119 12m-14 0a7 7 0 0013.5 3"/>
          </svg>
        </div>

        <div>
          <p class="text-[0.95rem] font-medium text-black">
            Easy Returns
          </p>

          <p class="text-[0.85rem] text-black/60">
            7-day hassle-free returns
          </p>
        </div>
      </div>

      <!-- Lifetime Warranty -->
      <div class="flex items-start gap-4">
        <div class="bg-white border border-[#6B1A2A]/10 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#6B1A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z"/>
          </svg>
        </div>

        <div>
          <p class="text-[0.95rem] font-medium text-black">
            Lifetime Warranty
          </p>

          <p class="text-[0.85rem] text-black/60">
            On plating & polish
          </p>
        </div>
      </div>

      <!-- Secure Checkout -->
      <div class="flex items-start gap-4">
        <div class="bg-white border border-[#6B1A2A]/10 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#6B1A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M12 11c1.1 0 2 .9 2 2v2h-4v-2c0-1.1.9-2 2-2zm6 0V9a6 6 0 10-12 0v2M5 11h14v10H5z"/>
          </svg>
        </div>

        <div>
          <p class="text-[0.95rem] font-medium text-black">
            Secure Checkout
          </p>

          <p class="text-[0.85rem] text-black/60">
            100% protected payments
          </p>
        </div>
      </div>

    </div>
  `;
}
