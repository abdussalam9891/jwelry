import RequireAuth from "@/components/auth/RequireAuth";
import OrdersList from "@/components/account/OrdersList";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "My Orders | Gemora",
  description: "Track and manage your recent Gemora purchases.",
  path: "/orders",
  index: false,
});

export default function OrdersPage() {
  return (
    <div className="bg-[#FAFAFA] text-[#111]">
      <main className="max-w-6xl mx-auto px-4 py-10 page-content">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">My Orders</h1>
          <p className="text-sm text-black/50 mt-2">
            Track and manage your recent purchases
          </p>
        </div>

        <RequireAuth>
          <OrdersList />
        </RequireAuth>
      </main>
    </div>
  );
}
