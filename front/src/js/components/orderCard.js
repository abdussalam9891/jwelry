import { CONFIG } from "../config.js";


export function createOrderCard(order) {

  // first item preview
  const firstItem =
    order.items?.[0];

  // fallback image
const image =
  firstItem?.image ||
  "https://via.placeholder.com/150?text=No+Image";
  // product title
  const title =
    firstItem?.name ||
    "Jewellery Item";

  // item count
  const totalItems =
    order.items?.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    ) || 0;

  // short order id
  const shortId =
    order._id
      ?.slice(-8)
      ?.toUpperCase();

  // formatted date
  const formattedDate =
    new Date(
      order.createdAt
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  // order status
  const status =
  order.orderStatus
    ?.charAt(0)
    .toUpperCase() +

  order.orderStatus
    ?.slice(1)
    .toLowerCase()
  || "Confirmed";

  return `

    <a
      href="/front/pages/orderDetails.html?id=${order._id}"
     class="
  block
  bg-white
  border
  border-black/5
  rounded-3xl
  p-5
  hover:border-[#E6D7DB]
  hover:shadow-md
  hover:-translate-y-[1px]
  transition
"
    >

      <!-- TOP -->
      <div
        class="
          flex
          items-start
          justify-between
          gap-4
          mb-5
        "
      >

        <!-- ORDER ID -->
        <div>

          <p
            class="
              text-[11px]
              uppercase
              tracking-[0.18em]
              text-black/40
              mb-1
            "
          >
            Order ID
          </p>

          <p
            class="
              text-sm
              font-semibold
              text-[#6B1A2A]
            "
          >
            #${shortId}
          </p>

        </div>

        <!-- STATUS -->
        <div
          class="
            px-3
            py-1
            rounded-full
            bg-[#F8EEF1]
            border
            border-[#E8D7DC]
            text-[#6B1A2A]
            text-xs
            font-semibold
            shrink-0
          "
        >
          ${status}
        </div>

      </div>



      <!-- BODY -->
      <div
        class="
          flex
          items-center
          gap-4
        "
      >

        <!-- IMAGE -->
        <div
          class="
            w-20
            h-20
            rounded-2xl
            overflow-hidden
            bg-[#F3F3F3]
            shrink-0
          "
        >

          <img
            src="${image}"
            alt="${title}"
            class="
              w-full
              h-full
              object-cover
            "
          />

        </div>



        <!-- INFO -->
        <div
          class="
            flex-1
            min-w-0
          "
        >

          <!-- TITLE -->
          <h3
            class="
              text-[15px]
              font-medium
              truncate
            "
          >
            ${title}
          </h3>

          <!-- META -->
          <p
            class="
              text-sm
              text-black/55
              mt-1
            "
          >
            ${totalItems}
            item${totalItems > 1 ? "s" : ""}

            •

            ₹${order.totalPrice?.toLocaleString()}
          </p>

          <!-- DATE -->
          <p
            class="
              text-xs
              text-black/40
              mt-2
            "
          >
            Ordered on ${formattedDate}
          </p>

        </div>



        <!-- ARROW -->
        <div
          class="
            hidden
            sm:flex
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
            class="
              w-5
              h-5
              text-black/25
            "
          >

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />

          </svg>

        </div>

      </div>

    </a>

  `;
}
