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

const slug = new URLSearchParams(location.search).get("slug");

const collectionConfig = {
  bridal: {
    title: "Bridal Collection",
    image: "/src/assets/images/bridal.jpg",
    description:
      "Timeless pieces crafted for life's most beautiful moments.",
  },

  luxury: {
    title: "Luxury Collection",
    image: "/src/assets/images/luxury.jpg",
    description:
      "Statement jewellery designed to stand out.",
  },

  minimal: {
    title: "Minimal Collection",
    image: "/src/assets/images/minimal.jpg",
    description:
      "Elegant simplicity for everyday wear.",
  },

  wedding: {
    title: "Wedding Collection",
    image: "/src/assets/images/wedding.jpg",
    description:
      "Celebrate forever with handcrafted wedding jewellery.",
  },

  engagement: {
    title: "Engagement Collection",
    image: "/src/assets/images/engagement.jpg",
    description:
      "Made for unforgettable proposals.",
  },
};

async function initCollectionPage() {
  try {
    const config = collectionConfig[slug];

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
    const url = new URL(window.location);

    url.searchParams.set("subcategory", slug);

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
