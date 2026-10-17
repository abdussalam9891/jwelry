"use client";

import { useSearchParams } from "next/navigation";

import Pagination from "./Pagination";
import ProductGrid from "./ProductGrid";
import SortSelect from "./SortSelect";
import { useProductListing } from "@/hooks/useProductListing";
import { collectionUrl } from "@/lib/routes";

// Products for one collection; the collection maps onto the API's `style`.
export default function CollectionListing({ collection }) {
  const searchParams = useSearchParams();

  const viewParams = new URLSearchParams();
  ["page", "sort"].forEach((key) => {
    if (searchParams.get(key)) viewParams.set(key, searchParams.get(key));
  });

  const viewQuery = viewParams.toString();

  const apiParams = new URLSearchParams(viewParams);
  apiParams.set("style", collection.slug);

  const listing = useProductListing(apiParams.toString());
  const basePath = collectionUrl(collection.slug);

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-light">{collection.title}</h2>
        <SortSelect basePath={basePath} queryString={viewQuery} />
      </div>

      <ProductGrid listing={listing} />

      {listing.status === "ready" && (
        <div className="mt-16">
          <Pagination
            basePath={basePath}
            currentPage={listing.page}
            totalPages={listing.totalPages}
            queryString={viewQuery}
          />
        </div>
      )}
    </>
  );
}
