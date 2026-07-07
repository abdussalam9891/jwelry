import { showToast } from "../components/toast.js";

import {
  loadWishlistState,
} from "../features/wishlist.js";
import {
  initAddressManager,
} from "../features/addressManager.js";




import {
  placeOrder,
} from "../features/checkout/checkout.js";

import {
  verifyPayment,
  paymentFailed,
} from "../services/paymentService.js";

import {
  openRazorpay,
} from "../utils/razorpay.js";



import { checkoutState, initializeCheckoutState } from "../features/checkout/checkoutState.js";
import { renderCouponSection } from "../features/checkout/coupon.js";
import { renderSummary } from "../features/checkout/summary.js";








async function initCheckout() {
    await loadWishlistState();

await initializeCheckoutState();

    await initAddressManager({
        containerId: "addressContainer",
        mode: "checkout",
    });

    await renderCouponSection();

     renderSummary({
        items: checkoutState.items,
        pricing: checkoutState.pricing,
        showCheckoutButton: false,
    });

    setupPlaceOrder();
}










function setupPlaceOrder() {
  const btn =
    document.getElementById(
      "placeOrderBtn"
    );

  if (!btn) return;

  btn.addEventListener(
    "click",
    () =>
      handleCheckout(btn)
  );
}

async function handleCheckout(btn) {
  try {
    const selectedAddress = document.querySelector(
      'input[name="selectedAddress"]:checked'
    );

    if (!selectedAddress) {
      showToast("Please select an address");
      return;
    }

    const paymentMethod =
      document.querySelector(
        'input[name="payment"]:checked'
      )?.value || "COD";

    btn.disabled = true;
    btn.textContent = "Placing Order...";

    const response = await placeOrder({
      addressId: selectedAddress.value,
      paymentMethod,
    });

    if (paymentMethod === "COD") {
      return handleCOD(response.order);
    }

    await handleRazorpayPayment(response, btn);

  } catch (error) {
    console.error(error);

    btn.disabled = false;
    btn.textContent = "Place Order";

    showToast(
      error.message || "Failed to place order"
    );
  }
}
function handleCOD(
  order
) {
  showToast(
    "Order placed successfully"
  );

  window.location.href =
    `/pages/orderSuccess.html?id=${order._id}`;
}

async function handleRazorpayPayment(
  response,
  btn
) {
  try {

    const payment =
      await openRazorpay({

        key:
          response.key,

        razorpayOrder:
          response.razorpayOrder,

        customer: {

          name:
            response.order
              .customerName,

          email:
            response.order
              .customerEmail,

          contact:
            response.order
              .customerPhone,

        },

      });

    await verifyPayment({

      orderId:
        response.order._id,

      razorpayOrderId:
        payment.razorpay_order_id,

      razorpayPaymentId:
        payment.razorpay_payment_id,

      razorpaySignature:
        payment.razorpay_signature,

    });

    showToast(
      "Payment Successful"
    );

    window.location.href =
      `/pages/orderSuccess.html?id=${response.order._id}`;

  } catch (error) {

    console.error(error);

    try {

      await paymentFailed(
        response.order._id
      );

    } catch (err) {

      console.error(err);

    }

    btn.disabled = false;

    btn.textContent =
      "Place Order";

    showToast(
      error.message ||
        "Payment failed"
    );

  }
}











initCheckout();
