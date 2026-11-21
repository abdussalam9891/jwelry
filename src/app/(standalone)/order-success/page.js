import { Suspense } from "react";
import Link from "next/link";

import OrderSuccessDetails from "@/components/checkout/OrderSuccessDetails";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Order Confirmed | Gemora",
  description: "Your Gemora order has been placed successfully.",
  path: "/order-success",
  index: false,
});

export default function OrderSuccessPage() {
  return (
    <div className="bg-[#FAF7F5] min-h-screen overflow-x-hidden">
      <header className="bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-center">
          <Link href="/" aria-label="Go to Gemora home">
            <img
              src="/assets/icon/logo.png"
              className="h-14 w-auto object-contain"
              alt="Gemora Logo"
              decoding="async"
            />
          </Link>
        </div>
      </header>

      <main className="px-4 py-10 md:py-14">
        <Suspense fallback={null}>
          <OrderSuccessDetails />
        </Suspense>
      </main>
    </div>
  );
}
