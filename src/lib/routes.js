// Single place for building internal URLs so pages and components never
// hand-assemble paths.

export function productUrl(slug) {
  return `/products/${encodeURIComponent(slug || "")}`;
}

export function collectionUrl(slug) {
  return `/collections/${encodeURIComponent(slug || "")}`;
}

export function orderUrl(id) {
  return `/orders/${id}`;
}

export function productsUrl(params = {}) {
  const query = new URLSearchParams(params).toString();

  return query ? `/products?${query}` : "/products";
}

// Hero banner navigation targets come from the CMS.
export function getBannerLink(target) {
  if (!target) return "#";

  switch (target.type) {
    case "page":
      return target.value === "products" || target.value === "collections"
        ? "/products"
        : "/";

    case "category":
      return productsUrl({ category: target.value });

    case "collection":
      return collectionUrl(target.value);

    case "product":
      return productUrl(target.value);

    case "external":
      return target.value;

    default:
      return "#";
  }
}
