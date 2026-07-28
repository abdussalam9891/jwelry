import api from "../core/api.js";

/**
 * Get recently viewed products
 */
export async function getRecentlyViewed() {
  return api.get("/v1/recently-viewed");
}

/**
 * Save viewed product
 */
export async function addRecentlyViewed(
  productId
) {
  return api.post(
    `/v1/recently-viewed/${productId}`
  );
}

/**
 * Merge guest history after login
 */
export async function mergeRecentlyViewed(
  guestProductIds
) {
  return api.post(
    "/v1/recently-viewed/merge",
    {
      guestProductIds,
    }
  );
}

/**
 * Clear history
 */
export async function clearRecentlyViewed() {
  return api.delete(
    "/v1/recently-viewed/clear"
  );
}
