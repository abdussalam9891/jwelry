import { Suspense } from "react";

import ProductsListing from "@/components/product/ProductsListing";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Shop Premium Jewellery | Gemora",
  description:
    "Browse Gemora's premium jewellery collection including rings, necklaces, bracelets and earrings. Discover handcrafted designs for every occasion.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="page-content min-h-screen" />}>
      <ProductsListing />
    </Suspense>
  );
}
