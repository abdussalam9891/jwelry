import { Suspense } from "react";
import Link from "next/link";

import OrderIdText from "@/components/checkout/OrderIdText";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Order Confirmed | Gemora",
  description: "Your Gemora order has been placed successfully.",
  path: "/order-success",
  index: false,
});

export default function OrderSuccessPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen overflow-x-hidden">
      {/* BACKGROUND GLOW */}
      <div className="fixed top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#6B1A2A]/10 blur-3xl pointer-events-none" />

      <main className="min-h-screen flex items-center justify-center px-4 py-14 relative z-10">
        <div className="w-full max-w-xl bg-white rounded-[2rem] border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* TOP SUCCESS AREA */}
          <div className="relative px-8 pt-10 pb-8 text-center bg-gradient-to-b from-[#FDF7F8] to-white">
            {/* SUCCESS ICON */}
            <div className="relative w-24 h-24 mx-auto rounded-full bg-[#F8EEF1] flex items-center justify-center shadow-inner mb-6">
              <div className="absolute inset-0 rounded-full animate-ping bg-[#E8D7DC] opacity-40" />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-11 h-11 text-[#6B1A2A] relative z-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75 10.5 18 19.5 6"
                />
              </svg>
            </div>

            {/* TITLE */}
            <h1 className="text-[2rem] md:text-[2.3rem] font-bold tracking-tight text-black mb-3">
              Order Confirmed
            </h1>

            {/* DESCRIPTION */}
            <p className="text-black/55 text-sm leading-7 max-w-md mx-auto">
              Your order has been placed successfully. We’ve started preparing
              your jewelry with care and precision.
            </p>
          </div>

          {/* ORDER DETAILS */}
          <div className="px-8 py-7">
            <div className="rounded-2xl border border-black/5 bg-[#FAFAFA] p-5 mb-6">
              {/* ORDER ID */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-black/40 mb-1">
                    Order ID
                  </p>

                  <p className="font-medium text-[0.92rem] text-[#6B1A2A] tracking-wide truncate">
                    <Suspense fallback="--">
                      <OrderIdText />
                    </Suspense>
                  </p>
                </div>

                <div className="px-3 py-1 rounded-full bg-[#F8EEF1] text-[#6B1A2A] border border-[#E8D7DC] text-xs font-semibold self-start sm:self-auto shrink-0">
                  Confirmed
                </div>
              </div>

              {/* DELIVERY */}
              <div className="flex items-start gap-3 rounded-xl bg-white p-4 border border-black/5">
                <div className="w-10 h-10 rounded-full bg-[#F6F6F6] flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-black/60"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm10.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM8.25 18.75h7.5m-12-12h11.218c1.121 0 2.092.77 2.347 1.862l1.296 5.527A2.25 2.25 0 0 1 18.418 16.5H5.25A2.25 2.25 0 0 1 3 14.25V9A2.25 2.25 0 0 1 5.25 6.75Z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="font-medium text-sm">Estimated Delivery</p>

                  <p className="text-black/55 text-sm mt-1 leading-6">
                    Your order is expected to arrive within 3–5 business days.
                  </p>
                </div>
              </div>
            </div>

            {/* TRUST */}
            <div className="space-y-3 mb-8">
              {/* SECURE */}
              <div className="flex items-center gap-3 text-sm text-black/60">
                <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-black/5 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.7"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 text-[#6B1A2A]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0 1 19.5 12.75v6A2.25 2.25 0 0 1 17.25 21h-10.5A2.25 2.25 0 0 1 4.5 18.75v-6A2.25 2.25 0 0 1 6.75 10.5Z"
                    />
                  </svg>
                </div>

                <span> Secure & encrypted checkout </span>
              </div>

              {/* PREMIUM */}
              <div className="flex items-center gap-3 text-sm text-black/60">
                <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-black/5 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.7"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 text-[#6B1A2A]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3l2.25 4.5L19.5 9l-3.75 3.75L16.5 18 12 15.75 7.5 18l.75-5.25L4.5 9l5.25-1.5L12 3Z"
                    />
                  </svg>
                </div>

                <span> Premium handcrafted jewelry </span>
              </div>

              {/* RETURNS */}
              <div className="flex items-center gap-3 text-sm text-black/60">
                <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-black/5 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.7"
                    stroke="currentColor"
                    className="w-4 h-4 text-[#6B1A2A]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865A8.25 8.25 0 0 1 17.803 6.3l3.181 3.181"
                    />
                  </svg>
                </div>

                <span> Easy returns & support assistance </span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="space-y-3">
              {/* CONTINUE SHOPPING */}
              <Link
                href="/"
                className="w-full h-12 rounded-xl bg-[#6B1A2A] text-white font-medium flex items-center justify-center hover:opacity-90 transition"
              >
                Continue Shopping
              </Link>

              {/* VIEW ORDERS */}
              <Link
                href="/orders"
                className="w-full h-12 rounded-xl border border-black/10 bg-white font-medium flex items-center justify-center hover:bg-black/5 transition"
              >
                View My Orders
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
