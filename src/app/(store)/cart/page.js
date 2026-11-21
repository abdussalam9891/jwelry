import RequireAuth from "@/components/auth/RequireAuth";
import CartView from "@/components/cart/CartView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Shopping Cart | Gemora",
  description:
    "Review your selected jewellery items and proceed securely to checkout with Gemora.",
  path: "/cart",
  index: false,
});

export default function CartPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 page-content">
      <RequireAuth>
        <CartView />
      </RequireAuth>
    </main>
  );
}
