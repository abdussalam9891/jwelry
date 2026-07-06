// features/checkout/checkout.js

import { createOrder, previewCheckout } from "../../services/orderService.js";
import { checkoutState } from "./checkoutState.js";

export async function refreshCheckout(couponCode = null) {
  const payload = {
    mode: checkoutState.mode,
    couponCode,
  };

  if (checkoutState.mode === "buyNow") {
    Object.assign(payload, {
      productId: checkoutState.items[0].product,
      variantId:
        checkoutState.items[0].variant?.variantId || null,
      quantity: checkoutState.items[0].quantity,
    });
  }

  const preview = await previewCheckout(payload);

  checkoutState.items = preview.items;
  checkoutState.pricing = preview.pricing;

  return preview;
}

export async function applyCoupon(code) {
  return refreshCheckout(code);
}

export async function removeCoupon() {
  return refreshCheckout(null);
}

export async function placeOrder({
  addressId,
  paymentMethod,
}) {
  const payload = {
    mode: checkoutState.mode,
    addressId,
    paymentMethod,
    couponCode:
      checkoutState.pricing.coupon?.code || null,
  };

  if (checkoutState.mode === "buyNow") {
    Object.assign(payload, {
      productId: checkoutState.items[0].product,
      variantId:
        checkoutState.items[0].variant?.variantId || null,
      quantity: checkoutState.items[0].quantity,
    });
  }

  return createOrder(payload);
}
