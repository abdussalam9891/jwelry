import {
  loadProducts,
} from "../features/products/loadProducts.js";

import {
  renderSort,
  initSort,
} from "../features/products/sort.js";

import {
  initWishlist,
} from "../features/wishlist.js";

import { collections } from "../components/navbar/navbarNavigation.js";

const slug = new URLSearchParams(location.search).get("slug");



async function initCollectionPage() {
  try {
   const config = collections.find(
  (collection) => collection.slug === slug
);

    if (!config) return;

    // Hero
    document.getElementById("heroTitle").textContent =
      config.title;

    document.getElementById("heroDescription").textContent =
      config.description;

    document.getElementById("heroImage").src =
      config.image;

    document.getElementById("productsHeading").textContent =
      config.title;

    // Lock collection in URL
  // Lock collection in URL
const url = new URL(window.location);

// Remove old parameter (for backwards compatibility)
url.searchParams.delete("subcategory");

// Add the correct parameter
url.searchParams.set("style", slug);

if (!url.searchParams.has("page")) {
  url.searchParams.set("page", "1");
}

history.replaceState({}, "", url);

 document.getElementById(
  "sortContainer"
).innerHTML = renderSort();

initSort();

    // Products + Pagination
    await loadProducts();

    // Wishlist
    initWishlist();

  } catch (error) {
    console.error("[CollectionPage]", error);
  }
}

document.addEventListener(
  "DOMContentLoaded",
  initCollectionPage
);
