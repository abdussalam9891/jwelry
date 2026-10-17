import RequireAuth from "@/components/auth/RequireAuth";
import OrderDetails from "@/components/account/OrderDetails";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  return pageMetadata({
    title: "Order Details | Gemora",
    description:
      "View your Gemora order details, status and tracking information.",
    path: `/orders/${(await params).id}`,
    index: false,
  });
}

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;

  return (
    <div className="bg-[#FAFAFA] text-[#111827]">
      <main className="max-w-7xl mx-auto px-5 py-10 page-content">
        <RequireAuth>
          <OrderDetails orderId={id} />
        </RequireAuth>
      </main>
    </div>
  );
}
