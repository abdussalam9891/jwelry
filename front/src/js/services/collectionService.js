import api from "../core/api.js";

export function getCollection(
  slug
) {
  return api.get(
    `/v1/collections/${slug}`
  );
}

export function getCollectionProducts(
  slug,
  page = 1
) {
  return api.get(
    `/v1/products?collection=${slug}&page=${page}`
  );
}
