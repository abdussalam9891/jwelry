import { getMyOrders }
from "../services/orderService.js";

import { createOrderCard }
from "../components/orderCard.js";

async function initOrdersPage() {

  const container =
    document.getElementById(
      "ordersContainer"
    );

  if (!container) return;

  try {

    const data =
      await getMyOrders();

    const orders =
      data.orders || [];

    //  EMPTY
    if (!orders.length) {

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
    <div
      class="
        w-24
        h-24
        rounded-full
        bg-[#F8EEF1]
        flex
        items-center
        justify-center
        mb-6
      "
    >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="
          w-10
          h-10
          text-[#6B1A2A]
        "
      >

        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20.25 7.5v10.125c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 0 1 3.75 17.625V7.5m16.5 0-2.28-2.28a1.125 1.125 0 0 0-.795-.33H6.825c-.298 0-.584.118-.795.33L3.75 7.5m16.5 0H3.75"
        />

      </svg>

    </div>



    <!-- TITLE -->
    <h2
      class="
        text-3xl
        font-semibold
        tracking-tight
        mb-3
      "
    >
      No orders yet
    </h2>



    <!-- SUBTEXT -->
    <p
      class="
        text-sm
        text-black/50
        max-w-sm
        leading-6
        mb-8
      "
    >
      You haven’t placed any orders yet.
      Start exploring timeless jewellery
      collections crafted for every moment.
    </p>



    <!-- CTA -->
    <a
      href="/front/index.html"
      class="
        h-12
        px-7
        inline-flex
        items-center
        justify-center
        rounded-xl
        bg-[#6B1A2A]
        text-white
        text-sm
        font-medium
        hover:opacity-90
        transition
      "
    >
      Continue Shopping
    </a>

  </div>

`;
      return;

    }

    // 🔥 render orders
    container.innerHTML =
      orders
        .map(createOrderCard)
        .join("");

  } catch (err) {

    console.error(err);

    container.innerHTML = `
      <p class="text-red-500">
        Failed to load orders
      </p>
    `;
  }

}

initOrdersPage();
