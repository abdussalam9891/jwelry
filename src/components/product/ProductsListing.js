"use client";

import { useSearchParams } from "next/navigation";

import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import ProductGrid from "./ProductGrid";
import SortSelect from "./SortSelect";
import { collectionBannerConfig } from "@/data/banners";
import { useProductListing } from "@/hooks/useProductListing";

export default function ProductsListing() {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const listing = useProductListing(queryString);

  const category = searchParams.get("category");
  const banner =
    collectionBannerConfig[category] || collectionBannerConfig.default;

  const count = listing.status === "ready" ? listing.total : 0;

  return (
    <div className="page-content">
      <section className="container-main py-6 md:py-8">
        <div className="flex items-center justify-end gap-6 pb-6">
          <div className="flex items-center gap-5">
            <p className="text-right text-3xl font-light tracking-[-0.03em] text-black/80">
              {count.toLocaleString()} Products
            </p>

            <SortSelect basePath="/products" queryString={queryString} />
          </div>
        </div>
      </section>

      <section className="container-main pb-4">
        <div className="relative overflow-hidden rounded-[40px] h-[320px] md:h-[460px]">
          <img
            src={banner.image}
            alt={banner.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="sticky top-[var(--navbar-h,0px)] z-[var(--z-sticky)] bg-white border-y border-black/5">
        <div className="container-main">
          <FilterBar queryString={queryString} />
        </div>
      </section>

      <section className="container-main py-8">
        <ProductGrid
          listing={listing}
          search={searchParams.get("search")?.trim() || ""}
        />

        {listing.status === "ready" && (
          <Pagination
            basePath="/products"
            currentPage={listing.page}
            totalPages={listing.totalPages}
            queryString={queryString}
          />
        )}
      </section>
    </div>
  );
}
