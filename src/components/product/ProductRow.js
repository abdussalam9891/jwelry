import ProductCard from "./ProductCard";

// Horizontally scrolling strip of product cards.
export default function ProductRow({ products }) {
  const safeProducts = (products || []).filter((p) => p && p._id);

  if (!safeProducts.length) {
    return (
      <p className="text-sm text-black/60 text-center py-6">
        No products found
      </p>
    );
  }

  return (
    <div
      className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar"
      data-reveal-group
    >
      {safeProducts.map((product) => (
        <div
          key={product._id}
          className="w-[160px] sm:w-[200px] flex-shrink-0 snap-start"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
