import { Suspense } from "react";

import ProductsListing from "@/components/product/ProductsListing";
import { listingTitle } from "@/lib/listingTitle";
import { pageMetadata } from "@/lib/metadata";
import { productsUrl } from "@/lib/routes";

export async function generateMetadata({ searchParams }) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(await searchParams)) {
    if (typeof value === "string") params.set(key, value);
  }

  const title = listingTitle(params);
  const category = params.get("category");
  const isPlain = title === "All Jewellery";

  // Category listings are worth indexing on their own; every other filter
  // combination points its canonical back to the category (or all products).
  return pageMetadata({
    title: isPlain ? "Shop Premium Jewellery | Gemora" : `${title} | Gemora`,
    description: isPlain
      ? "Browse Gemora's premium jewellery collection including rings, necklaces, bracelets and earrings. Discover handcrafted designs for every occasion."
      : `Shop ${title.toLowerCase()} at Gemora. Handcrafted premium jewellery for every occasion.`,
    path: category ? productsUrl({ category }) : "/products",
    index: !params.get("search"),
  });
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="page-content min-h-screen" />}>
      <ProductsListing />
    </Suspense>
  );
}
