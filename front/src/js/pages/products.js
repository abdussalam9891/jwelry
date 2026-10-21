
import {
  loadProducts,
} from "../features/products/loadProducts.js";

import {
  renderAllFilters,
} from "../features/products/renderFilters.js";

import {
  initFilterEvents,
  initDropdownEvents,
  syncFiltersFromURL,
} from "../features/products/filterEvents.js";

import {
  initMobileFilters,
} from "../features/products/mobileFilters.js";

import {
  initSort,
  renderSort,
} from "../features/products/sort.js";

import {
  initWishlist,
} from "../features/wishlist.js";

import {
  setPageTitle,
} from "../features/products/pageTitle.js";
import {
  renderCollectionHeader,
  renderCollectionBanner,
} from "../features/products/collectionHeader.js";
import {
  renderFilterBar,
} from "../features/products/filterBar.js";

import { renderFilterDropdowns }
from "../features/products/renderFilters.js";



async function initProductsPage() {
  try {

    document.getElementById("collectionHeader").innerHTML =
      renderCollectionHeader();

      document.getElementById(
  "collectionBanner"
).innerHTML =
  renderCollectionBanner();

    document.getElementById("filterBar").innerHTML =
      renderFilterBar();

      document.getElementById(
  "filterDropdowns"
).innerHTML =
  renderFilterDropdowns();

   renderAllFilters();

syncFiltersFromURL();

initFilterEvents();

initMobileFilters();

initDropdownEvents();

initSort();

    setPageTitle();

    await loadProducts();

    initWishlist();

  } catch (error) {
    console.error("[ProductsPage]", error);
  }
}

document.addEventListener(
  "DOMContentLoaded",
  initProductsPage
);

