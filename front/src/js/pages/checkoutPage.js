import { showToast } from "../components/toast.js";
import {
  getCartState,
  loadCart,
} from "../features/cart.js";
import {
  loadWishlistState,
} from "../features/wishlist.js";
import {
  initAddressManager,
} from "../features/addressManager.js";

import { renderSummary } from "./cartPage.js";

import {
  createOrder,
} from "../services/orderService.js";

import {
  verifyPayment,
  paymentFailed,
} from "../services/paymentService.js";

import {
  openRazorpay,
} from "../utils/razorpay.js";

async function initCheckout() {
  await loadCart();
  await loadWishlistState();

  const cart =
    getCartState();

  if (!cart.length) {
    window.location.href =
      "/pages/cart.html";
    return;
  }

  await initAddressManager({
    containerId:
      "addressContainer",
    mode: "checkout",
  });

  renderSummary({
    showCheckoutButton:
      false,
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

async function handleCheckout(
  btn
) {
  try {
    const selectedAddress =
      document.querySelector(
        'input[name="selectedAddress"]:checked'
      );

    if (!selectedAddress) {
      showToast(
        "Please select an address"
      );
      return;
    }

    const selectedPayment =
      document.querySelector(
        'input[name="payment"]:checked'
      );

    const paymentMethod =
      selectedPayment?.value ||
      "COD";

    btn.disabled = true;

    btn.textContent =
      "Placing Order...";

    const appliedCoupon =
      JSON.parse(
        localStorage.getItem(
          "appliedCoupon"
        )
      );

    const response =
      await createOrder({
        addressId:
          selectedAddress.value,

        paymentMethod,

        couponCode:
          appliedCoupon?.coupon
            ?.code,
      });

    localStorage.removeItem(
      "appliedCoupon"
    );

    if (
      paymentMethod === "COD"
    ) {
      return handleCOD(
        response.order
      );
    }

    await handleRazorpayPayment(
      response,
      btn
    );

  } catch (error) {

    console.error(error);

    btn.disabled = false;

    btn.textContent =
      "Place Order";

    showToast(
      error.message ||
        "Failed to place order"
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
