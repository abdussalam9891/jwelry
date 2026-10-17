import api from "../api";

/* PRODUCTS */

export function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();

  return api.get(`/v1/products?${query}`);
}

export function getProductById(id) {
  return api.get(`/v1/products/${id}`);
}

export function getProductBySlug(slug) {
  return api.get(`/v1/products/slug/${slug}`);
}

export function getSearchSuggestions(query) {
  return api.get(
    `/v1/products/search-suggestions?q=${encodeURIComponent(query)}`,
  );
}

export function getSimilarProducts(category) {
  return api.get(`/v1/products?category=${category}&limit=10`);
}

export function getTrendingProducts() {
  return api.get("/v1/products?tag=trending&limit=10");
}

/* REVIEWS */

export function getProductReviews(productId, page = 1, sort = "latest") {
  return api.get(`/v1/reviews/product/${productId}?page=${page}&sort=${sort}`);
}

export function createReview(productId, formData) {
  return api.post(`/v1/reviews/product/${productId}`, formData);
}

export function updateReview(reviewId, formData) {
  return api.patch(`/v1/reviews/${reviewId}`, formData);
}

export function deleteReview(reviewId) {
  return api.delete(`/v1/reviews/${reviewId}`);
}

export function getTestimonials() {
  return api.get("/v1/reviews/testimonials");
}
