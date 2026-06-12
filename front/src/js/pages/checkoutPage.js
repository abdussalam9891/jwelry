import { showToast } from "../components/toast.js";
import { getCartState, loadCart } from "../features/cart.js";
import { createOrder } from "../features/order.js";
import { loadWishlistState } from "../features/wishlist.js";
import { renderSummary } from "./cartPage.js";
import { initAddressManager } from "../features/addressManager.js";

async function initCheckout() {
  // load cart
  await loadCart();
  await loadWishlistState();

  const cart = getCartState();

  if (!cart.length) {
    window.location.href = "/pages/cart.html";
    return;
  }

  // address manager
  await initAddressManager({
    containerId: "addressContainer",
    mode: "checkout",
  });

  // summary
  renderSummary({
    showCheckoutButton: false,
  });

  // order button
  setupPlaceOrder();
}

function setupPlaceOrder() {
  const btn = document.getElementById("placeOrderBtn");

  if (!btn) return;

  btn.addEventListener("click", async () => {
    try {
      const selectedAddress = document.querySelector(
        'input[name="selectedAddress"]:checked'
      );

      if (!selectedAddress) {
        showToast("Please select an address");
        return;
      }

      const selectedPayment = document.querySelector(
        'input[name="payment"]:checked'
      );

      const paymentMethod =
        selectedPayment?.value || "COD";

      btn.disabled = true;
      btn.textContent = "Placing Order...";

      const appliedCoupon = JSON.parse(
        localStorage.getItem("appliedCoupon")
      );

      const data = await createOrder({
        addressId: selectedAddress.value,
        paymentMethod,
        couponCode:
          appliedCoupon?.coupon?.code,
      });

      localStorage.removeItem(
        "appliedCoupon"
      );

      showToast(
        "Order placed successfully"
      );

      setTimeout(() => {
        window.location.href =
          `/pages/orderSuccess.html?id=${data.order._id}`;
      }, 1000);

    } catch (err) {

      console.error(err);

      showToast(
        err.message ||
        "Failed to place order"
      );

      btn.disabled = false;
      btn.textContent = "Place Order";
    }
  });
}

initCheckout();
