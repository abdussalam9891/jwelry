// Shared loading placeholders. Each one mirrors the layout of the content
// that replaces it, so the page doesn't jump when data arrives.

const block = "bg-black/[0.06] rounded";

function wrap(inner, label, extraClass = "") {
  return `
    <div role="status" aria-busy="true" class="animate-pulse ${extraClass}">
      <span class="sr-only">${label}</span>
      ${inner}
    </div>
  `;
}

export function productCardSkeleton() {
  return `
    <div aria-hidden="true">
      <div class="w-full aspect-[4/5] ${block} rounded-md"></div>
      <div class="mt-3 h-4 w-4/5 ${block}"></div>
      <div class="mt-2 h-4 w-1/3 ${block}"></div>
    </div>
  `;
}

// Used inside an existing grid (e.g. #productsGrid), so it renders as
// `display: contents` and the cards fall into the parent's columns.
export function productGridSkeleton(count = 8) {
  return wrap(
    Array.from({ length: count }, productCardSkeleton).join(""),
    "Loading products",
    "contents",
  );
}

export function productRowSkeleton(count = 6) {
  return wrap(
    `<div class="flex gap-4 overflow-hidden pb-2">
      ${Array.from(
        { length: count },
        () => `
          <div class="w-[160px] sm:w-[200px] flex-shrink-0">
            ${productCardSkeleton()}
          </div>
        `,
      ).join("")}
    </div>`,
    "Loading products",
  );
}

export function productDetailsSkeleton() {
  return wrap(
    `<div class="section-sm container-main max-w-7xl mx-auto px-4 md:px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr] gap-6 md:gap-10 items-start">
        <div class="flex flex-col-reverse md:flex-row gap-4">
          <div class="flex md:flex-col gap-3">
            ${'<div class="w-16 h-20 bg-black/[0.06] rounded"></div>'.repeat(4)}
          </div>
          <div class="w-full aspect-[4/5] ${block}"></div>
        </div>
        <div class="space-y-4">
          <div class="h-7 w-3/4 ${block}"></div>
          <div class="h-4 w-1/3 ${block}"></div>
          <div class="h-8 w-1/2 ${block} mt-6"></div>
          <div class="flex gap-2 pt-4">
            ${'<div class="h-10 w-14 bg-black/[0.06] rounded"></div>'.repeat(4)}
          </div>
          <div class="h-12 w-full ${block} mt-6"></div>
          <div class="h-12 w-full ${block}"></div>
          <div class="space-y-2 pt-6">
            <div class="h-4 w-full ${block}"></div>
            <div class="h-4 w-full ${block}"></div>
            <div class="h-4 w-2/3 ${block}"></div>
          </div>
        </div>
      </div>
    </div>`,
    "Loading product",
  );
}

// Rows of image + text, for cart items and order cards.
export function listSkeleton(count = 3) {
  return wrap(
    `<div class="space-y-4">
      ${Array.from(
        { length: count },
        () => `
          <div class="flex gap-4 rounded-2xl border border-black/5 bg-white p-4">
            <div class="w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 ${block}"></div>
            <div class="flex-1 space-y-3 py-1">
              <div class="h-4 w-2/3 ${block}"></div>
              <div class="h-4 w-1/3 ${block}"></div>
              <div class="h-4 w-1/4 ${block}"></div>
            </div>
          </div>
        `,
      ).join("")}
    </div>`,
    "Loading",
  );
}

export function reviewsSkeleton(count = 2) {
  return wrap(
    Array.from(
      { length: count },
      () => `
        <div class="space-y-2 py-2">
          <div class="h-4 w-1/4 ${block}"></div>
          <div class="h-4 w-full ${block}"></div>
          <div class="h-4 w-3/4 ${block}"></div>
        </div>
      `,
    ).join(""),
    "Loading reviews",
    "space-y-4",
  );
}
