"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ArrowLeftIcon, CheckIcon } from "@/components/ui/icons";
import { capitalize, formatCurrency, formatDate } from "@/lib/format";
import { productUrl } from "@/lib/routes";
import { getOrderById } from "@/lib/services/orderService";

const ORDER_FLOW = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED"];

function StepIcon({ d }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
      stroke="currentColor"
      aria-hidden="true"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

const TIMELINE_STEPS = [
  {
    label: "Placed",
    icon: "M3 7.5 12 3l9 4.5M3 7.5V16.5L12 21m-9-13.5L12 12m9-4.5V16.5L12 21m0-9v9",
  },
  { label: "Confirmed", icon: "m4.5 12.75 6 6 9-13.5" },
  {
    label: "Shipped",
    icon: "M8.25 18.75a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m3 0h7.5m3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m3 0H21V12l-3-3h-3V5.25A2.25 2.25 0 0 0 12.75 3H6.75A2.25 2.25 0 0 0 4.5 5.25v13.5",
  },
  {
    label: "Delivered",
    icon: "M2.25 12 12 3l9.75 9M4.5 10.5v8.25A2.25 2.25 0 0 0 6.75 21h10.5a2.25 2.25 0 0 0 2.25-2.25V10.5",
  },
];

const PAYMENT_STATUS = {
  PAID: {
    text: "Paid",
    classes: "bg-green-50 border border-green-200 text-green-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    ),
  },
  PENDING: {
    text: "Pending",
    classes: "bg-yellow-50 border border-yellow-200 text-yellow-700",
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
  },
  FAILED: {
    text: "Failed",
    classes: "bg-red-50 border border-red-200 text-red-700",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    ),
  },
  REFUNDED: {
    text: "Refunded",
    classes: "bg-blue-50 border border-blue-200 text-blue-700",
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10V3" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10a9 9 0 1 0 3-6.7"
        />
      </>
    ),
  },
};

const cardClass = "rounded-[30px] border border-black/5 bg-white shadow-sm";
const eyebrowClass = "text-xs uppercase tracking-[0.18em] text-black/40";

function Timeline({ status }) {
  const currentIndex = ORDER_FLOW.indexOf(status);

  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
      {TIMELINE_STEPS.map((step, index) => {
        const completed = currentIndex >= index;

        return (
          <div
            key={step.label}
            className="relative flex flex-col items-center text-center"
          >
            {index !== TIMELINE_STEPS.length - 1 && (
              <div
                className={`hidden md:block absolute top-7 left-1/2 ml-7 w-full h-[2px] ${
                  completed ? "bg-[#6B1A2A]" : "bg-gray-200"
                }`}
              />
            )}

            <div
              className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                completed
                  ? "bg-[#6B1A2A] text-white shadow-lg shadow-[#6B1A2A]/20"
                  : "bg-[#F7F7F7] text-gray-400 border border-black/5"
              }`}
            >
              {completed ? (
                <CheckIcon className="w-6 h-6" strokeWidth={2.5} />
              ) : (
                <StepIcon d={step.icon} />
              )}
            </div>

            <p
              className={`mt-4 font-semibold ${completed ? "text-[#6B1A2A]" : "text-gray-400"}`}
            >
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function OrderItem({ item }) {
  return (
    <Link
      href={productUrl(item.slug)}
      className="group block p-6 transition hover:bg-[#FCFAFB]"
    >
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#F7F7F7] overflow-hidden shrink-0 mx-auto sm:mx-0">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain p-3 transition duration-300 group-hover:scale-105"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold leading-6">{item.name}</h3>

          {item.variant?.sku && (
            <p className="mt-2 text-xs tracking-wide text-black/35">
              SKU • {item.variant.sku}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#F8EEF1] px-3 py-1 text-xs font-medium text-[#6B1A2A]">
              {item.variant?.material || "Premium Jewellery"}
            </span>

            {item.variant?.size && (
              <span className="rounded-full bg-[#F5F5F5] px-3 py-1 text-xs font-medium text-black/60">
                Size {item.variant.size}
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-black/55">
            <span>
              Qty <strong className="ml-1 text-black">×{item.quantity}</strong>
            </span>
            <span>
              Unit Price{" "}
              <strong className="ml-1 text-black">
                {formatCurrency(item.price)}
              </strong>
            </span>
          </div>
        </div>

        <div className="mt-5 sm:mt-0 sm:text-right sm:shrink-0">
          <p className="text-xs uppercase tracking-wide text-black/40">
            Subtotal
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </Link>
  );
}

function CopyOrderNumber({ orderNumber }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy your order number:", orderNumber);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2 text-sm font-medium text-[#6B1A2A] hover:bg-[#F8EEF1] transition"
    >
      {copied ? (
        <CheckIcon className="w-4 h-4" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          aria-hidden="true"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375A1.875 1.875 0 0 1 13.875 22.5H4.875A1.875 1.875 0 0 1 3 20.625V8.625A1.875 1.875 0 0 1 4.875 6.75H8.25m7.5-5.25h4.125A1.125 1.125 0 0 1 21 2.625v11.25A1.125 1.125 0 0 1 19.875 15h-9.75A1.125 1.125 0 0 1 9 13.875V2.625A1.125 1.125 0 0 1 10.125 1.5h5.625Z"
          />
        </svg>
      )}
      <span>{copied ? "Copied" : "Copy Order Number"}</span>
    </button>
  );
}

export default function OrderDetails({ orderId }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getOrderById(orderId)
      .then((data) => setOrder(data.order))
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [orderId]);

  const backLink = (
    <Link
      href="/orders"
      className="inline-flex items-center gap-2 text-sm font-medium text-black/60 hover:text-[#6B1A2A] transition mb-6"
    >
      <ArrowLeftIcon />
      Back to Orders
    </Link>
  );

  if (error) {
    return (
      <>
        {backLink}
        <p className="text-red-500">Failed to load this order.</p>
      </>
    );
  }

  if (!order) {
    return (
      <>
        {backLink}
        <p className="text-lg font-semibold text-[#6B1A2A]">Loading...</p>
      </>
    );
  }

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const address = order.shippingAddress;
  const discount =
    order.coupon?.discountAmount > 0 ? order.coupon.discountAmount : 0;
  const paymentStatus =
    PAYMENT_STATUS[order.paymentStatus] ?? PAYMENT_STATUS.PENDING;

  return (
    <>
      {backLink}

      {/* HERO */}
      <section className={`${cardClass} p-8`}>
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-[#6B1A2A]/70 font-semibold">
              ORDER DETAILS
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Order Summary
            </h1>
            <p className="mt-6 text-lg font-semibold text-[#6B1A2A]">
              {order.orderNumber}
            </p>
            <p className="mt-2 text-black/50">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="flex flex-col items-start xl:items-end gap-4">
            <div className="inline-flex items-center rounded-full border border-[#E9D7DC] bg-[#F9EFF2] px-5 py-2 text-sm font-semibold text-[#6B1A2A]">
              {capitalize(order.orderStatus || "")}
            </div>
            <CopyOrderNumber orderNumber={order.orderNumber} />
          </div>
        </div>
      </section>

      {/* INVOICE */}
      {order.invoice?.url && (
        <section className="mt-8 rounded-[30px] border border-[#E8D7DC] bg-gradient-to-r from-[#FFF9FA] to-[#FFFDFB] p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F8EEF1] px-4 py-1.5 text-xs font-semibold text-[#6B1A2A]">
                Invoice Available
              </div>
              <h2 className="mt-5 text-2xl font-semibold">Tax Invoice</h2>
              <p className="mt-3 font-medium text-black/70">
                Invoice #{order.invoice.invoiceNumber}
              </p>
              <p className="mt-2 text-sm text-black/45">
                Generated on {formatDate(order.invoice.generatedAt)}
              </p>
            </div>

            <a
              href={order.invoice.url}
              target="_blank"
              rel="noopener noreferrer"
              download={`${order.invoice.invoiceNumber}.pdf`}
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#6B1A2A] px-8 text-white font-medium transition hover:opacity-90"
            >
              Download Invoice
            </a>
          </div>
        </section>
      )}

      {/* TIMELINE */}
      <section className="mt-8 rounded-[30px] border border-black/5 bg-white p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Order Progress</h2>
          <p className="text-sm text-black/40">Track your order journey</p>
        </div>
        <Timeline status={order.orderStatus} />
      </section>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-8">
          {/* ITEMS */}
          <section className={`${cardClass} overflow-hidden`}>
            <div className="flex items-center justify-between px-8 py-6 border-b border-black/5">
              <div>
                <h2 className="text-2xl font-semibold">Ordered Items</h2>
                <p className="mt-1 text-sm text-black/45">
                  Products included in this order
                </p>
              </div>
              <div className="text-sm font-medium text-black/50">
                {totalItems} item{totalItems > 1 ? "s" : ""}
              </div>
            </div>

            <div className="divide-y divide-black/5">
              {order.items.map((item, index) => (
                <OrderItem key={`${item.slug}-${index}`} item={item} />
              ))}
            </div>
          </section>

          {/* SHIPPING */}
          <section className={`${cardClass} p-8`}>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl bg-[#F8EEF1] flex items-center justify-center text-xl"
                aria-hidden="true"
              >
                📍
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Shipping Address</h2>
                <p className="text-sm text-black/45">Delivery destination</p>
              </div>
            </div>

            <div className="mt-8 text-[15px] leading-8 text-black/70">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <p className={eyebrowClass}>Recipient</p>
                  <p className="mt-2 font-semibold text-lg">
                    {address.fullName}
                  </p>
                </div>

                <div>
                  <p className={eyebrowClass}>Phone</p>
                  <p className="mt-2 font-semibold">{address.phone}</p>
                </div>

                <div className="md:col-span-2">
                  <p className={eyebrowClass}>Delivery Address</p>
                  <p className="mt-2 leading-7 text-black/70 break-words">
                    {address.addressLine1}
                    {address.addressLine2 && (
                      <>
                        <br />
                        {address.addressLine2}
                      </>
                    )}
                    <br />
                    {address.city}, {address.state}
                    <br />
                    {address.pincode}
                    {address.landmark && (
                      <>
                        <br />
                        <span className="text-black/50">
                          Landmark: {address.landmark}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* COUPON */}
          {discount > 0 && (
            <section className="rounded-[30px] border border-green-200 bg-green-50 p-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-green-600">
                    Coupon Applied
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-green-700">
                    {order.coupon.code}
                  </h3>
                  <p className="mt-3 text-green-700">
                    Congratulations! You saved{" "}
                    <strong>{formatCurrency(discount)}</strong> on this order.
                  </p>
                </div>
                <div className="text-5xl" aria-hidden="true">
                  🏷️
                </div>
              </div>
            </section>
          )}
        </div>

        <div>
          <div className="sticky top-24 space-y-6">
            {/* PAYMENT SUMMARY */}
            <section className={`${cardClass} overflow-hidden`}>
              <div className="px-8 py-6 border-b border-black/5">
                <h2 className="text-2xl font-semibold">Payment Summary</h2>
                <p className="mt-1 text-sm text-black/45">
                  Order payment breakdown
                </p>
              </div>

              <div className="p-8 space-y-5">
                <div className="flex justify-between text-sm">
                  <span className="text-black/50">Subtotal</span>
                  <span className="font-semibold">
                    {formatCurrency(order.itemsPrice)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="rounded-2xl bg-green-50 border border-green-200 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-green-600">
                          Coupon
                        </p>
                        <p className="mt-1 font-semibold text-green-700">
                          {order.coupon.code}
                        </p>
                      </div>
                      <div className="font-bold text-green-700">
                        − {formatCurrency(discount)}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-black/50">Shipping</span>
                  <span className="font-semibold">
                    {order.shippingPrice > 0
                      ? formatCurrency(order.shippingPrice)
                      : "Free"}
                  </span>
                </div>

                <hr className="border-black/10" />

                <div className="rounded-2xl bg-[#FAFAFA] p-5">
                  <p className="text-sm text-black/50">Total Paid</p>
                  <h3 className="mt-1 text-3xl font-bold tracking-tight">
                    {formatCurrency(order.totalPrice)}
                  </h3>
                  {discount > 0 && (
                    <p className="mt-4 text-sm font-medium text-green-600">
                      You saved {formatCurrency(discount)}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-black/40">
                      Payment Method
                    </p>
                    <p className="mt-2 font-semibold">{order.paymentMethod}</p>
                  </div>

                  <div
                    className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${paymentStatus.classes}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      {paymentStatus.icon}
                    </svg>
                    <span>{paymentStatus.text}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK ACTIONS */}
            <section className={`${cardClass} p-8`}>
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              <div className="mt-6 space-y-3">
                <Link
                  href="/orders"
                  className="flex items-center justify-center h-12 rounded-2xl border border-black/10 hover:bg-[#FAFAFA] transition"
                >
                  Back to Orders
                </Link>
                <Link
                  href="/"
                  className="flex items-center justify-center h-12 rounded-2xl bg-[#6B1A2A] text-white font-medium hover:opacity-90 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
