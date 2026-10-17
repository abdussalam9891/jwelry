"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CouponSection from "./CouponSection";
import AddressManager from "@/components/account/AddressManager";
import OrderSummary from "@/components/cart/OrderSummary";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { CHECKOUT_PREVIEW_KEY } from "@/lib/checkout";
import { createOrder, previewCheckout } from "@/lib/services/orderService";
import { paymentFailed, verifyPayment } from "@/lib/services/paymentService";
import { openRazorpay } from "@/lib/razorpay";

const PAYMENT_METHODS = [
  {
    value: "COD",
    title: "Cash on Delivery",
    subtitle: "Pay when your order arrives",
  },
  {
    value: "RAZORPAY",
    title: "Razorpay",
    subtitle: "UPI, Cards, NetBanking & Wallets",
  },
];

function readBuyNowPreview() {
  try {
    return JSON.parse(sessionStorage.getItem(CHECKOUT_PREVIEW_KEY));
  } catch {
    return null;
  }
}

export default function CheckoutView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "buyNow" ? "buyNow" : "cart";

  const { loadCart } = useCart();
  const showToast = useToast();

  const [checkout, setCheckout] = useState(null); // { items, pricing }
  const [addressId, setAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (mode === "cart") {
      loadCart()
        .then((cart) => setCheckout(cart))
        .catch((err) => {
          console.error(err);
          showToast("Failed to load cart");
        });
      return;
    }

    const preview = readBuyNowPreview();

    if (!preview) {
      sessionStorage.removeItem(CHECKOUT_PREVIEW_KEY);
      router.replace("/");
      return;
    }

    setCheckout({ items: preview.items, pricing: preview.pricing });
  }, [mode, loadCart, router, showToast]);

  // Buy-now orders re-send the single product with every preview/order call.
  function basePayload() {
    const payload = { mode };

    if (mode === "buyNow") {
      const [item] = checkout.items;
      Object.assign(payload, {
        productId: item.product,
        variantId: item.variant?.variantId || null,
        quantity: item.quantity,
      });
    }

    return payload;
  }

  async function refreshPreview(couponCode) {
    const preview = await previewCheckout({ ...basePayload(), couponCode });
    setCheckout({ items: preview.items, pricing: preview.pricing });
  }

  async function applyCoupon(code) {
    try {
      await refreshPreview(code);
      showToast("Coupon applied");
    } catch (err) {
      showToast(err.message);
    }
  }

  async function removeCoupon() {
    try {
      await refreshPreview(null);
    } catch (err) {
      showToast(err.message);
    }
  }

  function finishOrder(orderId) {
    sessionStorage.removeItem(CHECKOUT_PREVIEW_KEY);
    loadCart().catch(() => {});
    router.push(`/order-success?id=${orderId}`);
  }

  async function payWithRazorpay(response) {
    try {
      const payment = await openRazorpay({
        key: response.key,
        razorpayOrder: response.razorpayOrder,
        customer: {
          name: response.order.customerName,
          email: response.order.customerEmail,
          contact: response.order.customerPhone,
        },
      });

      await verifyPayment({
        orderId: response.order._id,
        razorpayOrderId: payment.razorpay_order_id,
        razorpayPaymentId: payment.razorpay_payment_id,
        razorpaySignature: payment.razorpay_signature,
      });

      showToast("Payment Successful");
      finishOrder(response.order._id);
    } catch (error) {
      console.error(error);

      try {
        await paymentFailed(response.order._id);
      } catch (err) {
        console.error(err);
      }

      setPlacing(false);
      showToast(error.message || "Payment failed");
    }
  }

  async function placeOrder() {
    if (!addressId) {
      showToast("Please select an address");
      return;
    }

    try {
      setPlacing(true);

      const response = await createOrder({
        ...basePayload(),
        addressId,
        paymentMethod,
        couponCode: checkout.pricing.coupon?.code || null,
      });

      if (paymentMethod === "COD") {
        showToast("Order placed successfully");
        finishOrder(response.order._id);
        return;
      }

      await payWithRazorpay(response);
    } catch (error) {
      console.error(error);
      setPlacing(false);
      showToast(error.message || "Failed to place order");
    }
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold">Checkout</h1>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
            <AddressManager
              mode="checkout"
              selectedId={addressId}
              onSelect={setAddressId}
            />
          </div>

          <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-5">Payment Method</h2>

            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.value}
                  className="flex items-center justify-between border rounded-xl px-4 py-4 cursor-pointer hover:border-[#6B1A2A] transition"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={() => setPaymentMethod(method.value)}
                    />
                    <div>
                      <p className="font-medium">{method.title}</p>
                      <p className="text-xs text-black/50">{method.subtitle}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-black/5 rounded-2xl p-2 shadow-sm">
            {checkout ? (
              <>
                {checkout.pricing && (
                  <div className="mb-5">
                    <CouponSection
                      pricing={checkout.pricing}
                      onApply={applyCoupon}
                      onRemove={removeCoupon}
                    />
                  </div>
                )}

                <h2 className="text-[1.35rem] font-semibold mb-5">
                  Order Summary
                </h2>
                <OrderSummary pricing={checkout.pricing} />
              </>
            ) : (
              <p className="text-sm text-black/50 p-3">
                Loading order summary...
              </p>
            )}

            <button
              type="button"
              disabled={!checkout?.pricing || placing}
              onClick={placeOrder}
              className="w-full h-12 rounded-xl bg-[#6B1A2A] text-white font-medium hover:opacity-90 transition mt-5 disabled:opacity-60"
            >
              {placing ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
