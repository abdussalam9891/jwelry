import Auth from "../../core/auth.js";

import {
  addRecentlyViewed,
  getRecentlyViewed,
} from "../../services/recentlyViewedService.js";

import { renderHorizontalSection } from "../../components/horizontalProducts.js";

/**
 * Save viewed product
 */
export async function saveRecentlyViewed(productId) {
  if (!productId) return;

  try {
    const user = await Auth.getCurrentUser();

    if (!user) return;

    await addRecentlyViewed(productId);
  } catch (error) {
    console.error(
      "Failed to save recently viewed:",
      error
    );
  }
}

/**
 * Render Recently Viewed section
 */
export async function loadRecentlyViewed(containerId) {
  try {
    const wrapper = document.getElementById(
      "recentlyViewedWrapper"
    );

    const user = await Auth.getCurrentUser();

    if (!user) {
      wrapper?.classList.add("hidden");
      return;
    }

    const response = await getRecentlyViewed();

    const products = response.products || [];

    if (!products.length) {
      wrapper?.classList.add("hidden");
      return;
    }

    wrapper?.classList.remove("hidden");

    await renderHorizontalSection({
      containerId,
      products,
    });
  } catch (error) {
    console.error(
      "Failed to load recently viewed:",
      error
    );
  }
}
