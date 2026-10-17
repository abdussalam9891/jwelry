import RequireAuth from "@/components/auth/RequireAuth";
import WishlistView from "@/components/account/WishlistView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "My Wishlist | Gemora",
  description:
    "View and manage the items you've saved to your Gemora wishlist.",
  path: "/wishlist",
  index: false,
});

export default function WishlistPage() {
  return (
    <main className="container-main page-content pb-14">
      <RequireAuth>
        <WishlistView />
      </RequireAuth>
    </main>
  );
}
