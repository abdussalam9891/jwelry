"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { CheckIcon, MapPinIcon, TruckIcon } from "@/components/ui/icons";
import { formatCurrency, formatDate } from "@/lib/format";
import { getOrderById } from "@/lib/services/orderService";

const eyebrowClass = "text-[11px] uppercase tracking-[0.16em] text-black/45";

// Order confirmation shown after checkout; the order id comes from ?id=.
export default function OrderSuccessDetails() {
  const orderId = useSearchParams().get("id");
  const [order, setOrder] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    getOrderById(orderId)
      .then((data) => setOrder(data.order))
      .catch(() => setFailed(true));
  }, [orderId]);

  const totalItems =
    order?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const address = order?.shippingAddress;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* CONFIRMATION */}
      <div className="text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-[#6B1A2A] text-white flex items-center justify-center">
          <CheckIcon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.2} />
        </div>

        <h1 className="heading-title mt-6">Thank you for your order!</h1>

        <p className="mt-3 text-sm md:text-[15px] text-black/60 leading-6 max-w-md mx-auto">
          Your order has been placed successfully. A confirmation has been sent
          to your registered email.
        </p>

        {order && (
          <p className="mt-5 text-sm text-black/60">
            Order No.{" "}
            <span className="font-sans font-semibold text-[#6B1A2A]">
              {order.orderNumber}
            </span>
          </p>
        )}
      </div>

      {/* SUMMARY */}
      <div className="mt-8 rounded-lg border border-black/10 bg-white">
        {!order && !failed && orderId && (
          <div className="p-6 space-y-3 animate-pulse" aria-label="Loading order">
            <div className="h-4 w-1/3 rounded bg-black/5" />
            <div className="h-16 rounded bg-black/5" />
            <div className="h-4 w-1/2 rounded bg-black/5" />
          </div>
        )}

        {(failed || !orderId) && (
          <p className="p-6 text-sm text-black/60 text-center">
            We couldn&apos;t load your order details right now. You can find
            this order under My Orders.
          </p>
        )}

        {order && (
          <>
            {/* META */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-5 md:px-6 py-5 border-b border-black/10">
              <div>
                <p className={eyebrowClass}>Order Date</p>
                <p className="mt-1 text-sm font-medium">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <div>
                <p className={eyebrowClass}>Payment</p>
                <p className="mt-1 text-sm font-medium">
                  {order.paymentMethod}
                </p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className={eyebrowClass}>Amount</p>
                <p className="mt-1 font-sans text-sm font-semibold">
                  {formatCurrency(order.totalPrice)}
                </p>
              </div>
            </div>

            {/* ITEMS */}
            <div className="px-5 md:px-6 py-5 border-b border-black/10">
              <h2 className="heading-card">
                Items ({totalItems})
              </h2>

              <ul className="mt-4 space-y-4">
                {order.items.map((item, index) => (
                  <li
                    key={`${item.slug}-${index}`}
                    className="flex items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-md bg-[#F7F7F7] overflow-hidden shrink-0">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-1.5"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm font-medium leading-5 line-clamp-2">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-black/50">
                        Qty {item.quantity}
                        {item.variant?.size && ` · Size ${item.variant.size}`}
                      </p>
                    </div>
                    <p className="font-sans text-sm font-semibold shrink-0">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* DELIVERY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5 md:px-6 py-5">
              {address && (
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 mt-0.5 text-[#6B1A2A] shrink-0" />
                  <div className="text-sm leading-6 text-black/65 min-w-0 break-words">
                    <p className="font-medium text-black">
                      {address.fullName}
                    </p>
                    <p>
                      {address.addressLine1}
                      {address.addressLine2 && `, ${address.addressLine2}`}
                    </p>
                    <p>
                      {address.city}, {address.state} {address.pincode}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <TruckIcon className="w-5 h-5 mt-0.5 text-[#6B1A2A] shrink-0" />
                <div className="text-sm leading-6 text-black/65">
                  <p className="font-medium text-black">Estimated Delivery</p>
                  <p>Within 3–5 business days</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ACTIONS */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href={order ? `/orders/${order._id}` : "/orders"}
          className="h-12 rounded-md border border-[#6B1A2A] text-[#6B1A2A] text-sm font-semibold uppercase tracking-wider flex items-center justify-center hover:bg-[#F8EEF1] transition"
        >
          View Order
        </Link>
        <Link
          href="/"
          className="h-12 rounded-md bg-[#6B1A2A] text-white text-sm font-semibold uppercase tracking-wider flex items-center justify-center hover:opacity-90 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
