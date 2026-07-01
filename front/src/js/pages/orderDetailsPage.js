// import { getOrderById } from "../services/orderService.js";

// async function initOrderDetailsPage() {
//   //  get order id from url
//   const params = new URLSearchParams(window.location.search);

//   const orderId = params.get("id");

//   // ❌ no id
//   if (!orderId) {
//     window.location.href = "/pages/orders.html";

//     return;
//   }

//   try {
//     //  fetch order
//     const data = await getOrderById(orderId);

//     renderOrder(data.order);
//   } catch (err) {
//     console.error(err);

//     document.body.innerHTML = `

//       <div
//         class="
//           min-h-screen
//           flex
//           flex-col
//           items-center
//           justify-center
//           text-center
//           px-4
//         "
//       >

//         <h2
//           class="
//             text-2xl
//             font-semibold
//             mb-3
//           "
//         >
//           Failed to load order
//         </h2>

//         <p
//           class="
//             text-sm
//             text-black/50
//             mb-6
//           "
//         >
//           Something went wrong while
//           fetching your order details.
//         </p>

//         <a
//           href="/pages/orders.html"
//           class="
//             h-11
//             px-6
//             inline-flex
//             items-center
//             justify-center
//             rounded-xl
//             bg-[#6B1A2A]
//             text-white
//             text-sm
//             font-medium
//           "
//         >
//           Back to Orders
//         </a>

//       </div>

//     `;
//   }
// }

// function renderOrder(order) {


//   console.log(order);
// console.log(order.coupon);




//   //  formatted date
//   const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });

//   //  status
//   const status =
//     order.orderStatus?.charAt(0).toUpperCase() +
//     order.orderStatus?.slice(1).toLowerCase();

//   //  item count
//   const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

//   //  top info
//   document.getElementById("orderDate").textContent =
//     `Placed on ${formattedDate}`;


//     document.getElementById(
//   "orderNumber"
// ).textContent =
//   order.orderNumber;






// if (
//   order.coupon &&
//   order.coupon.discountAmount > 0
// ) {

//   document.getElementById(
//     "couponBadge"
//   ).innerHTML = `
//     <div
//       class="
//         mt-4

//         rounded-2xl

//         border
//         border-green-200

//         bg-green-50

//         px-5
//         py-4
//       "
//     >

//       <p
//         class="
//           text-xs
//           uppercase
//           tracking-wide
//           text-green-600
//         "
//       >
//         Coupon Applied
//       </p>

//       <div
//         class="
//           mt-2

//           flex
//           items-center
//           justify-between
//           gap-6
//         "
//       >
//         <div>

//           <p
//             class="
//               font-semibold
//               text-green-800
//             "
//           >
//             ${order.coupon.code}
//           </p>

//           <p
//             class="
//               text-sm
//               text-green-700
//             "
//           >
//             Discount successfully applied
//           </p>

//         </div>

//         <div
//           class="
//             text-right
//           "
//         >
//           <p
//             class="
//               text-xs
//               text-green-600
//             "
//           >
//             Savings
//           </p>

//           <p
//             class="
//               text-lg
//               font-bold
//               text-green-700
//             "
//           >
//             ₹${order.coupon.discountAmount.toLocaleString()}
//           </p>
//         </div>
//       </div>
//     </div>
//   `;
// }

//   document.getElementById("orderStatus").textContent = status;

//   document.getElementById("itemCount").textContent =
//     `${totalItems} item${totalItems > 1 ? "s" : ""}`;

//   //  render items
//   const itemsContainer = document.getElementById("orderItemsContainer");

//   itemsContainer.innerHTML = order.items
//     .map((item) => {
//       const image = item.image || "";

//       return `

//         <a
//   href="/pages/productDetails.html?slug=${item.slug}"
//   class="
//     flex
//     items-center
//     gap-4
//     hover:bg-[#FAFAFA]
//     rounded-2xl
//     transition
//     p-2
//     -m-2
//   "
// >

//           <!-- IMAGE -->
//           <div
//             class="
//               w-20
//               h-20
//               rounded-2xl
//               overflow-hidden
//               bg-[#F3F3F3]
//               shrink-0
//             "
//           >

//             <img
//               src="${image}"
//               alt="${item.name}"
//               class="
//                 w-full
//                 h-full
//                 object-contain
//                 p-2
//               "
//             />

//           </div>



//           <!-- INFO -->
//           <div class="flex-1 min-w-0">

//             <h3
//               class="
//                 text-[15px]
//                 font-medium
//               "
//             >
//               ${item.name}
//             </h3>

//             <p
//               class="
//                 text-sm
//                 text-black/50
//                 mt-1
//               "
//             >
//               Quantity:
//               ${item.quantity}
//             </p>

//           </div>



//           <!-- PRICE -->
//           <div
//             class="
//               text-sm
//               font-semibold
//             "
//           >
//             ₹${(item.price * item.quantity).toLocaleString()}
//           </div>

//         </a>

//       `;
//     })
//     .join("");

//   //  shipping address
//   const address = order.shippingAddress;

//   document.getElementById("shippingAddress").innerHTML = `

//     <p class="font-medium text-black mb-1">
//       ${address.fullName}
//     </p>

//     <p>
//       ${address.addressLine1}
//     </p>

//     <p>
//       ${address.addressLine2 || ""}
//     </p>

//     <p>
//       ${address.city},
//       ${address.state}
//       - ${address.pincode}
//     </p>

//     <p class="mt-2">
//       Phone:
//       ${address.phone}
//     </p>

//   `;

//   //  payment summary
//   document.getElementById("subtotalPrice").textContent =
//     `₹${order.itemsPrice.toLocaleString()}`;

// if (
//   order.coupon &&
//   order.coupon.discountAmount > 0
// ) {

//   document
//     .getElementById(
//       "couponRow"
//     )
//     .classList.remove(
//       "hidden"
//     );

//   document.getElementById(
//     "couponCode"
//   ).innerHTML = `
//     <span
//       class="
//         inline-flex
//         items-center

//         rounded-full

//         bg-green-100

//         px-3
//         py-1

//         text-xs
//         font-medium

//         text-green-700
//       "
//     >
//       ${order.coupon.code}
//     </span>
//   `;

//   document.getElementById(
//     "couponDiscount"
//   ).textContent =
//     `-₹${order.coupon.discountAmount.toLocaleString()}`;
// }

//   document.getElementById("shippingPrice").textContent =
//     order.shippingPrice > 0
//       ? `₹${order.shippingPrice.toLocaleString()}`
//       : "Free";

//  document.getElementById(
//   "totalPrice"
// ).textContent =
//   `₹${order.totalPrice.toLocaleString()}`;

// /* SAVINGS */

// if (
//   order.coupon &&
//   order.coupon.discountAmount > 0
// ) {

//   document.getElementById(
//     "totalSavings"
//   ).textContent =
//     `You saved ₹${order.coupon.discountAmount.toLocaleString()}`;

// }

// document.getElementById(
//   "paymentMethod"
// ).textContent =
//   order.paymentMethod;


// }

// initOrderDetailsPage();











































import { getOrderById } from "../services/orderService.js";

async function initOrderDetailsPage() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const orderId =
    params.get("id");

  if (!orderId) {

    window.location.href =
      "/pages/orders.html";

    return;

  }

  try {

    const data =
      await getOrderById(orderId);

    renderOrder(data.order);

  } catch (err) {

    console.error(err);

  }

}

initOrderDetailsPage();









function formatCurrency(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );
}

function capitalize(text) {
  return (
    text.charAt(0).toUpperCase() +
    text.slice(1).toLowerCase()
  );
}




function renderOrder(order) {

  renderHero(order);

  renderInvoice(order);

  renderTimeline(order);

  renderItems(order);

  renderShipping(order);

  renderCoupon(order);

  renderPayment(order);

  renderPaymentStatus(order);

  setupCopyButton(order);

}





function renderHero(order) {

  document.getElementById(
    "orderNumber"
  ).textContent =
    order.orderNumber;

  document.getElementById(
    "orderDate"
  ).textContent =
    `Placed on ${formatDate(
      order.createdAt
    )}`;

  document.getElementById(
    "orderStatus"
  ).textContent =
    capitalize(order.orderStatus);

}




function setupCopyButton(order) {
  const btn =
    document.getElementById(
      "copyOrderBtn"
    );

  if (!btn) return;

  const defaultHTML = `
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
d="M15.75 17.25v3.375A1.875 1.875 0 0 1 13.875 22.5H4.875A1.875 1.875 0 0 1 3 20.625V8.625A1.875 1.875 0 0 1 4.875 6.75H8.25m7.5-5.25h4.125A1.125 1.125 0 0 1 21 2.625v11.25A1.125 1.125 0 0 1 19.875 15h-9.75A1.125 1.125 0 0 1 9 13.875V2.625A1.125 1.125 0 0 1 10.125 1.5h5.625Z"
/>
</svg>

<span>
Copy Order Number
</span>
`;

  btn.innerHTML = defaultHTML;

  btn.onclick = async () => {

    try {

      await navigator.clipboard.writeText(
        order.orderNumber
      );

      btn.innerHTML = `
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="2"
stroke="currentColor"
class="w-4 h-4"
>
<path
stroke-linecap="round"
stroke-linejoin="round"
d="m4.5 12.75 6 6 9-13.5"
/>
</svg>

<span>
Copied
</span>
`;

      setTimeout(() => {
        btn.innerHTML =
          defaultHTML;
      }, 2000);

    } catch {

      alert(
        "Unable to copy order number."
      );

    }

  };

}



function renderInvoice(order) {

  if (!order.invoice?.url)
    return;

  document
    .getElementById(
      "invoiceCard"
    )
    .classList.remove(
      "hidden"
    );

  document.getElementById(
    "invoiceNumber"
  ).textContent =
    `Invoice #${order.invoice.invoiceNumber}`;

  document.getElementById(
    "invoiceGenerated"
  ).textContent =
    `Generated on ${formatDate(
      order.invoice.generatedAt
    )}`;

  const downloadBtn =
    document.getElementById(
      "downloadInvoiceBtn"
    );

  downloadBtn.href =
    order.invoice.url;

  downloadBtn.target =
    "_blank";

  downloadBtn.rel =
    "noopener noreferrer";

  downloadBtn.download =
    `${order.invoice.invoiceNumber}.pdf`;

}




function renderTimeline(order) {
  const container =
    document.getElementById(
      "orderTimeline"
    );

  const steps =
    getTimelineSteps(
      order.orderStatus
    );

  container.innerHTML = steps
    .map(
      (step, index) => `
<div
class="
relative

flex

flex-col

items-center

text-center
"
>

${
  index !== steps.length - 1
    ? `
<div
class="
hidden

md:block

absolute

top-7

left-1/2

ml-7

w-full

h-[2px]

${
  step.completed
    ? "bg-[#6B1A2A]"
    : "bg-gray-200"
}
"
></div>
`
    : ""
}

<div
class="
relative

z-10

w-14

h-14

rounded-full

flex

items-center

justify-center

transition-all

duration-300

${
  step.completed
    ? "bg-[#6B1A2A] text-white shadow-lg shadow-[#6B1A2A]/20"
    : "bg-[#F7F7F7] text-gray-400 border border-black/5"
}
"
>

${
  step.completed
    ? `
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="2.5"
stroke="currentColor"
class="w-6 h-6"
>
<path
stroke-linecap="round"
stroke-linejoin="round"
d="m4.5 12.75 6 6 9-13.5"
/>
</svg>
`
    : step.icon
}

</div>

<p
class="
mt-4

font-semibold

${
  step.completed
    ? "text-[#6B1A2A]"
    : "text-gray-400"
}
"
>

${step.label}

</p>

</div>
`
    )
    .join("");
}









function getTimelineSteps(currentStatus) {
  const statuses = [
    "PLACED",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
  ];

  const currentIndex =
    statuses.indexOf(currentStatus);

  return [
    {
      label: "Placed",

      completed: currentIndex >= 0,

      icon: `
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.8"
stroke="currentColor"
class="w-6 h-6"
>
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M3 7.5 12 3l9 4.5M3 7.5V16.5L12 21m-9-13.5L12 12m9-4.5V16.5L12 21m0-9v9"
/>
</svg>
`,
    },

    {
      label: "Confirmed",

      completed: currentIndex >= 1,

      icon: `
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.8"
stroke="currentColor"
class="w-6 h-6"
>
<path
stroke-linecap="round"
stroke-linejoin="round"
d="m4.5 12.75 6 6 9-13.5"
/>
</svg>
`,
    },

    {
      label: "Shipped",

      completed: currentIndex >= 2,

      icon: `
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.8"
stroke="currentColor"
class="w-6 h-6"
>
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M8.25 18.75a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m3 0h7.5m3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m3 0H21V12l-3-3h-3V5.25A2.25 2.25 0 0 0 12.75 3H6.75A2.25 2.25 0 0 0 4.5 5.25v13.5"
/>
</svg>
`,
    },

    {
      label: "Delivered",

      completed: currentIndex >= 3,

      icon: `
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.8"
stroke="currentColor"
class="w-6 h-6"
>
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M2.25 12 12 3l9.75 9M4.5 10.5v8.25A2.25 2.25 0 0 0 6.75 21h10.5a2.25 2.25 0 0 0 2.25-2.25V10.5"
/>
</svg>
`,
    },
  ];
}





function renderItems(order) {

  const container =
    document.getElementById(
      "orderItemsContainer"
    );

  container.innerHTML = order.items
    .map((item) => {

      const image =
        item.image || "";

      const material =
        item.variant?.material ||
        "Premium Jewellery";

      const size =
        item.variant?.size;

      return `

<a
href="/pages/productDetails.html?slug=${item.slug}"

class="
group

block

p-6

transition

hover:bg-[#FCFAFB]
"
>

<div
class="
flex

flex-col

sm:flex-row

gap-5
"
>

<!-- IMAGE -->

<div
class="
w-24
h-24

sm:w-28
sm:h-28

rounded-2xl

bg-[#F7F7F7]

overflow-hidden

shrink-0

mx-auto

sm:mx-0
"
>

<img

src="${image}"

alt="${item.name}"

class="
w-full
h-full

object-contain

p-3

transition

duration-300

group-hover:scale-105
"
/>

</div>

<!-- DETAILS -->

<div
class="
flex-1

min-w-0
"
>

<h3
class="
text-lg

font-semibold

leading-6
"
>

${item.name}

</h3>

${
item.variant?.sku
?`

<p
class="
mt-2

text-xs

tracking-wide

text-black/35
"
>

SKU • ${item.variant.sku}

</p>

`
:""
}

<div
class="
mt-4

flex

flex-wrap

gap-2
"
>

<span
class="
rounded-full

bg-[#F8EEF1]

px-3

py-1

text-xs

font-medium

text-[#6B1A2A]
"
>

${material}

</span>

${
size
?`

<span
class="
rounded-full

bg-[#F5F5F5]

px-3

py-1

text-xs

font-medium

text-black/60
"
>

Size ${size}

</span>

`
:""
}

</div>

<div
class="
mt-5

flex

flex-col

sm:flex-row

sm:items-center

gap-4

text-sm

text-black/55
"
>

<div
class="
flex

items-center

gap-2
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
d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
/>

</svg>

<span>

Qty

<strong
class="
ml-1

text-black
"
>

×${item.quantity}

</strong>

</span>

</div>

<div
class="
flex

items-center

gap-2
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
d="M12 6v12m-4-8h8"
/>

</svg>

<span>

Unit Price

<strong
class="
ml-1

text-black
"
>

${formatCurrency(item.price)}

</strong>

</span>

</div>

</div>

</div>

<!-- TOTAL -->

<div
class="
mt-5

sm:mt-0

sm:text-right

sm:shrink-0
"
>

<p
class="
text-xs

uppercase

tracking-wide

text-black/40
"
>

Subtotal

</p>

<p
class="
mt-2

text-2xl

font-bold

tracking-tight
"
>

${formatCurrency(
item.price *
item.quantity
)}

</p>

</div>

</div>

</a>

`;

    })
    .join("");

}



function renderShipping(order) {
  const address = order.shippingAddress;

  document.getElementById(
    "shippingAddress"
  ).innerHTML = `

<div
class="
grid

grid-cols-1

md:grid-cols-2

gap-6
"
>

<!-- Recipient -->

<div
class="
rounded-2xl

border

border-black/5

bg-[#FAFAFA]

p-5
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
w-11

h-11

rounded-xl

bg-[#F8EEF1]

flex

items-center

justify-center

text-[#6B1A2A]
"
>

<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.8"
stroke="currentColor"
class="w-5 h-5"
>
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0"
 />
</svg>

</div>

<div>

<p
class="
text-xs

uppercase

tracking-[0.18em]

text-black/40
"
>

Recipient

</p>

<p
class="
mt-1

font-semibold

text-lg
"
>

${address.fullName}

</p>

</div>

</div>

</div>

<!-- Phone -->

<div
class="
rounded-2xl

border

border-black/5

bg-[#FAFAFA]

p-5
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
w-11

h-11

rounded-xl

bg-[#F8EEF1]

flex

items-center

justify-center

text-[#6B1A2A]
"
>

<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.8"
stroke="currentColor"
class="w-5 h-5"
>
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.09.852l.64 2.561a1.125 1.125 0 0 1-.417 1.145l-1.294.97a11.035 11.035 0 0 0 5.331 5.331l.97-1.294a1.125 1.125 0 0 1 1.145-.417l2.561.64c.501.124.852.574.852 1.09V19.5A2.25 2.25 0 0 1 17.5 21.75h-.75C8.603 21.75 2.25 15.397 2.25 7.5V4.5Z"
/>
</svg>

</div>

<div>

<p
class="
text-xs

uppercase

tracking-[0.18em]

text-black/40
"
>

Phone

</p>

<p
class="
mt-1

font-semibold
"
>

${address.phone}

</p>

</div>

</div>

</div>

<!-- Address -->

<div
class="
md:col-span-2

rounded-2xl

border

border-black/5

bg-[#FAFAFA]

p-6
"
>

<div
class="
flex

items-start

gap-4
"
>

<div
class="
w-11

h-11

shrink-0

rounded-xl

bg-[#F8EEF1]

flex

items-center

justify-center

text-[#6B1A2A]
"
>

<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.8"
stroke="currentColor"
class="w-5 h-5"
>
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M12 21s6-5.25 6-11.25A6 6 0 1 0 6 9.75C6 15.75 12 21 12 21Z"
/>
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M12 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
/>
</svg>

</div>

<div class="flex-1">

<p
class="
text-xs

uppercase

tracking-[0.18em]

text-black/40
"
>

Delivery Address

</p>

<p
class="
mt-3

leading-7

text-black/70

break-words
"
>

${address.addressLine1}

${
  address.addressLine2
    ? `<br>${address.addressLine2}`
    : ""
}

<br>

${address.city}, ${address.state}

<br>

${address.pincode}

${
  address.landmark
    ? `<br><span class="text-black/50">Landmark: ${address.landmark}</span>`
    : ""
}

</p>

</div>

</div>

</div>

</div>

`;
}




function renderCoupon(order) {

  if (
    !order.coupon ||
    order.coupon.discountAmount <= 0
  )
    return;

  document.getElementById(
    "couponBadge"
  ).innerHTML = `

<section
class="
rounded-[30px]

border

border-green-200

bg-green-50

p-8
"
>

<div
class="
flex

justify-between

items-center
"
>

<div>

<p
class="
text-xs

uppercase

tracking-[0.2em]

text-green-600
"
>

Coupon Applied

</p>

<h3
class="
mt-3

text-2xl

font-semibold

text-green-700
"
>

${order.coupon.code}

</h3>

<p
class="
mt-3

text-green-700
"
>

Congratulations!

You saved

<strong>

${formatCurrency(

order.coupon.discountAmount

)}

</strong>

on this order.

</p>

</div>

<div
class="
text-5xl
"
>

🏷️

</div>

</div>

</section>

`;

}





function renderPayment(order) {

  document.getElementById(
    "subtotalPrice"
  ).textContent =
    formatCurrency(
      order.itemsPrice
    );

  document.getElementById(
    "shippingPrice"
  ).textContent =
    order.shippingPrice > 0
      ? formatCurrency(
          order.shippingPrice
        )
      : "Free";

  document.getElementById(
    "totalPrice"
  ).textContent =
    formatCurrency(
      order.totalPrice
    );

  document.getElementById(
    "paymentMethod"
  ).textContent =
    order.paymentMethod;

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
    ).textContent =
      order.coupon.code;

    document.getElementById(
      "couponDiscount"
    ).textContent =
      `− ${formatCurrency(
        order.coupon
          .discountAmount
      )}`;

    document.getElementById(
      "totalSavings"
    ).textContent =
      `You saved ${formatCurrency(
        order.coupon
          .discountAmount
      )}`;

  }

}



function renderPaymentStatus(order) {

  const badge =
    document.getElementById(
      "paymentStatus"
    );

  const status =
    order.paymentStatus;

  const config = {

    PAID: {

      text: "Paid",

      classes:
        "bg-green-50 border border-green-200 text-green-700",

      icon: `
<svg xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="2"
stroke="currentColor"
class="w-4 h-4">
<path
stroke-linecap="round"
stroke-linejoin="round"
d="m4.5 12.75 6 6 9-13.5"/>
</svg>
`,
    },

    PENDING: {

      text: "Pending",

      classes:
        "bg-yellow-50 border border-yellow-200 text-yellow-700",

      icon: `
<svg xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="2"
stroke="currentColor"
class="w-4 h-4">
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M12 6v6l4 2"/>
<circle
cx="12"
cy="12"
r="9"/>
</svg>
`,
    },

    FAILED: {

      text: "Failed",

      classes:
        "bg-red-50 border border-red-200 text-red-700",

      icon: `
<svg xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="2"
stroke="currentColor"
class="w-4 h-4">
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M6 18L18 6M6 6l12 12"/>
</svg>
`,
    },

    REFUNDED: {

      text: "Refunded",

      classes:
        "bg-blue-50 border border-blue-200 text-blue-700",

      icon: `
<svg xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="2"
stroke="currentColor"
class="w-4 h-4">
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M3 10h10V3"/>
<path
stroke-linecap="round"
stroke-linejoin="round"
d="M3 10a9 9 0 1 0 3-6.7"/>
</svg>
`,
    },

  };

  const current =
    config[status] ??
    config.PENDING;

  badge.className = `
mt-3

inline-flex

items-center

gap-2

rounded-full

px-4

py-2

text-sm

font-semibold

${current.classes}
`;

  badge.innerHTML = `
${current.icon}

<span>

${current.text}

</span>
`;

}
