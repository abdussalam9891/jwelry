import { Suspense } from "react";

import RequireAuth from "@/components/auth/RequireAuth";
import CheckoutView from "@/components/checkout/CheckoutView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Checkout | Gemora",
  description: "Complete your jewellery purchase securely with Gemora.",
  path: "/checkout",
  index: false,
});

export default function CheckoutPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 page-content">
      <RequireAuth>
        <Suspense fallback={null}>
          <CheckoutView />
        </Suspense>
      </RequireAuth>
    </main>
  );
}
