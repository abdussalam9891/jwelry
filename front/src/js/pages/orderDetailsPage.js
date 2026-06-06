import { getOrderById } from "../services/orderService.js";

async function initOrderDetailsPage() {
  //  get order id from url
  const params = new URLSearchParams(window.location.search);

  const orderId = params.get("id");

  // ❌ no id
  if (!orderId) {
    window.location.href = "/pages/orders.html";

    return;
  }

  try {
    //  fetch order
    const data = await getOrderById(orderId);

    renderOrder(data.order);
  } catch (err) {
    console.error(err);

    document.body.innerHTML = `

      <div
        class="
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-4
        "
      >

        <h2
          class="
            text-2xl
            font-semibold
            mb-3
          "
        >
          Failed to load order
        </h2>

        <p
          class="
            text-sm
            text-black/50
            mb-6
          "
        >
          Something went wrong while
          fetching your order details.
        </p>

        <a
          href="/pages/orders.html"
          class="
            h-11
            px-6
            inline-flex
            items-center
            justify-center
            rounded-xl
            bg-[#6B1A2A]
            text-white
            text-sm
            font-medium
          "
        >
          Back to Orders
        </a>

      </div>

    `;
  }
}

function renderOrder(order) {


  console.log(order);
console.log(order.coupon);




  //  formatted date
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  //  status
  const status =
    order.orderStatus?.charAt(0).toUpperCase() +
    order.orderStatus?.slice(1).toLowerCase();

  //  item count
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  //  top info
  document.getElementById("orderDate").textContent =
    `Placed on ${formattedDate}`;


    document.getElementById(
  "orderNumber"
).textContent =
  order.orderNumber;






if (
  order.coupon &&
  order.coupon.discountAmount > 0
) {

  document.getElementById(
    "couponBadge"
  ).innerHTML = `
    <div
      class="
        mt-4

        rounded-2xl

        border
        border-green-200

        bg-green-50

        px-5
        py-4
      "
    >

      <p
        class="
          text-xs
          uppercase
          tracking-wide
          text-green-600
        "
      >
        Coupon Applied
      </p>

      <div
        class="
          mt-2

          flex
          items-center
          justify-between
          gap-6
        "
      >
        <div>

          <p
            class="
              font-semibold
              text-green-800
            "
          >
            ${order.coupon.code}
          </p>

          <p
            class="
              text-sm
              text-green-700
            "
          >
            Discount successfully applied
          </p>

        </div>

        <div
          class="
            text-right
          "
        >
          <p
            class="
              text-xs
              text-green-600
            "
          >
            Savings
          </p>

          <p
            class="
              text-lg
              font-bold
              text-green-700
            "
          >
            ₹${order.coupon.discountAmount.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  `;
}

  document.getElementById("orderStatus").textContent = status;

  document.getElementById("itemCount").textContent =
    `${totalItems} item${totalItems > 1 ? "s" : ""}`;

  //  render items
  const itemsContainer = document.getElementById("orderItemsContainer");

  itemsContainer.innerHTML = order.items
    .map((item) => {
      const image = item.image || "";

      return `

        <a
  href="/pages/productDetails.html?slug=${item.slug}"
  class="
    flex
    items-center
    gap-4
    hover:bg-[#FAFAFA]
    rounded-2xl
    transition
    p-2
    -m-2
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
              alt="${item.name}"
              class="
                w-full
                h-full
                object-contain
                p-2
              "
            />

          </div>



          <!-- INFO -->
          <div class="flex-1 min-w-0">

            <h3
              class="
                text-[15px]
                font-medium
              "
            >
              ${item.name}
            </h3>

            <p
              class="
                text-sm
                text-black/50
                mt-1
              "
            >
              Quantity:
              ${item.quantity}
            </p>

          </div>



          <!-- PRICE -->
          <div
            class="
              text-sm
              font-semibold
            "
          >
            ₹${(item.price * item.quantity).toLocaleString()}
          </div>

        </a>

      `;
    })
    .join("");

  //  shipping address
  const address = order.shippingAddress;

  document.getElementById("shippingAddress").innerHTML = `

    <p class="font-medium text-black mb-1">
      ${address.fullName}
    </p>

    <p>
      ${address.addressLine1}
    </p>

    <p>
      ${address.addressLine2 || ""}
    </p>

    <p>
      ${address.city},
      ${address.state}
      - ${address.pincode}
    </p>

    <p class="mt-2">
      Phone:
      ${address.phone}
    </p>

  `;

  //  payment summary
  document.getElementById("subtotalPrice").textContent =
    `₹${order.itemsPrice.toLocaleString()}`;

if (
  order.coupon &&
  order.coupon.discountAmount > 0
) {

  document
    .getElementById(
      "couponRow"
    )
    .classList.remove(
      "hidden"
    );

  document.getElementById(
    "couponCode"
  ).innerHTML = `
    <span
      class="
        inline-flex
        items-center

        rounded-full

        bg-green-100

        px-3
        py-1

        text-xs
        font-medium

        text-green-700
      "
    >
      ${order.coupon.code}
    </span>
  `;

  document.getElementById(
    "couponDiscount"
  ).textContent =
    `-₹${order.coupon.discountAmount.toLocaleString()}`;
}

  document.getElementById("shippingPrice").textContent =
    order.shippingPrice > 0
      ? `₹${order.shippingPrice.toLocaleString()}`
      : "Free";

 document.getElementById(
  "totalPrice"
).textContent =
  `₹${order.totalPrice.toLocaleString()}`;

/* SAVINGS */

if (
  order.coupon &&
  order.coupon.discountAmount > 0
) {

  document.getElementById(
    "totalSavings"
  ).textContent =
    `You saved ₹${order.coupon.discountAmount.toLocaleString()}`;

}

document.getElementById(
  "paymentMethod"
).textContent =
  order.paymentMethod;


}

initOrderDetailsPage();
