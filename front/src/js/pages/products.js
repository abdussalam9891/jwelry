
import {
  loadProducts,
} from "../features/products/loadProducts.js";

import {
  renderAllFilters,
} from "../features/products/renderFilters.js";

import {
  initFilterEvents,
} from "../features/products/filterEvents.js";

import {
  initMobileFilters,
} from "../features/products/mobileFilters.js";

import {
  initSort,
} from "../features/products/sort.js";

import {
  initWishlist,
} from "../features/wishlist.js";

import {
  setPageTitle,
} from "../features/products/pageTitle.js";

async function initProductsPage() {
  try {

    // FILTER UI
    renderAllFilters();

    // FILTER EVENTS
    initFilterEvents();

    // MOBILE DRAWER
    initMobileFilters();

    // SORTING
    initSort();

    // PAGE TITLE
    setPageTitle();

    // PRODUCTS
    await loadProducts();

    // WISHLIST
    initWishlist();

  } catch (error) {
    console.error(
      "[ProductsPage]",
      error
    );
  }
}

document.addEventListener(
  "DOMContentLoaded",
  initProductsPage
);

