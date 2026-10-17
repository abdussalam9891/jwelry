import ProductCard from "./ProductCard";

const gridClass =
  "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14";

// Renders a useProductListing() result: loading, error, empty or the grid.
export default function ProductGrid({ listing, search = "" }) {
  if (listing.status === "loading") {
    return (
      <div className={gridClass}>
        <div className="col-span-full py-16 text-center text-black/50">
          Loading products...
        </div>
      </div>
    );
  }

  if (listing.status === "error") {
    return (
      <div className={gridClass}>
        <div className="col-span-full py-16 text-center text-red-500">
          Something went wrong.
        </div>
      </div>
    );
  }

  if (!listing.products.length) {
    return (
      <div className={gridClass}>
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium">
            {search ? `No results for "${search}"` : "No products found"}
          </p>
          <p className="mt-2 text-black/50">Try another search or filter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={gridClass} data-reveal-group>
      {listing.products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
