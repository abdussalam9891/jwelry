// Shared loading placeholders. Each one mirrors the layout of the content
// that replaces it, so the page doesn't jump when data arrives.

const block = "bg-black/[0.06] rounded";

function Status({ label, className = "", children }) {
  return (
    <div role="status" aria-busy="true" className={`animate-pulse ${className}`}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

function times(count, render) {
  return Array.from({ length: count }, (_, i) => render(i));
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className={`w-full aspect-[4/5] ${block} rounded-md`} />
      <div className={`mt-3 h-4 w-4/5 ${block}`} />
      <div className={`mt-2 h-4 w-1/3 ${block}`} />
    </div>
  );
}

// Rendered inside an existing grid as `display: contents`, so the cards fall
// into the parent's columns.
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <Status label="Loading products" className="contents">
      {times(count, (i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </Status>
  );
}

// Rendered inside an existing horizontal row as `display: contents`.
export function ProductRowSkeleton({ count = 6 }) {
  return (
    <Status label="Loading products" className="contents">
      {times(count, (i) => (
        <div key={i} className="w-[160px] sm:w-[200px] flex-shrink-0">
          <ProductCardSkeleton />
        </div>
      ))}
    </Status>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <Status label="Loading product">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr] gap-6 md:gap-10 items-start">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3">
            {times(4, (i) => (
              <div key={i} className={`w-16 h-20 ${block}`} />
            ))}
          </div>
          <div className={`w-full aspect-[4/5] ${block}`} />
        </div>

        <div className="space-y-4">
          <div className={`h-7 w-3/4 ${block}`} />
          <div className={`h-4 w-1/3 ${block}`} />
          <div className={`h-8 w-1/2 ${block} mt-6`} />
          <div className="flex gap-2 pt-4">
            {times(4, (i) => (
              <div key={i} className={`h-10 w-14 ${block}`} />
            ))}
          </div>
          <div className={`h-12 w-full ${block} mt-6`} />
          <div className={`h-12 w-full ${block}`} />
          <div className="space-y-2 pt-6">
            <div className={`h-4 w-full ${block}`} />
            <div className={`h-4 w-full ${block}`} />
            <div className={`h-4 w-2/3 ${block}`} />
          </div>
        </div>
      </div>
    </Status>
  );
}

// Rows of image + text, for cart items and order cards.
export function ListSkeleton({ count = 3, label = "Loading" }) {
  return (
    <Status label={label} className="space-y-4">
      {times(count, (i) => (
        <div
          key={i}
          className="flex gap-4 rounded-2xl border border-black/5 bg-white p-4"
        >
          <div className={`w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 ${block}`} />
          <div className="flex-1 space-y-3 py-1">
            <div className={`h-4 w-2/3 ${block}`} />
            <div className={`h-4 w-1/3 ${block}`} />
            <div className={`h-4 w-1/4 ${block}`} />
          </div>
        </div>
      ))}
    </Status>
  );
}

export function ReviewsSkeleton({ count = 2 }) {
  return (
    <Status label="Loading reviews" className="space-y-4">
      {times(count, (i) => (
        <div key={i} className="space-y-2 py-2">
          <div className={`h-4 w-1/4 ${block}`} />
          <div className={`h-4 w-full ${block}`} />
          <div className={`h-4 w-3/4 ${block}`} />
        </div>
      ))}
    </Status>
  );
}
