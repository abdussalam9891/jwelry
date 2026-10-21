import { openAuthModal } from "../components/authModal.js";
import { renderProduct } from "../features/productDetails/productRenderer.js";
import {
  saveRecentlyViewed,
  loadRecentlyViewed,
} from "../features/recentlyViewed/recentlyViewed.js";
import { renderHorizontalSection } from "../components/horizontalProducts.js";
import Auth from "../core/auth.js";
import { initWishlist, loadWishlistState } from "../features/wishlist.js";
import { addToCart } from "../services/cartService.js";
import {
  getProductBySlug,
  getSimilarProducts,
  getTrendingProducts,
} from "../services/productService.js";

import {
  loadReviewPage,
  attachReviewSort,
} from "../features/productDetails/events/reviewEvents.js";
import {
  renderDeliveryChecker,
  initDeliveryChecker,
} from "../components/deliveryChecker.js";

import {
  productState,
  resetProductState,
} from "../features/productDetails/state.js";

import {
  renderMainImage,
  renderThumbnails,
  attachImageGalleryEvents,
} from "../features/productDetails/imageGallery.js";

import {
  productDetailsSkeleton,
  productRowSkeleton,
} from "../components/skeletons.js";

import { updateSeo, setJsonLd, SITE_NAME, SITE_URL } from "../utils/seo.js";

document.addEventListener("DOMContentLoaded", loadProduct);



async function loadProduct() {
  const container = document.getElementById("productContainer");

  if (!container) return;

  const slug = new URLSearchParams(window.location.search).get("slug");

  if (!slug) {
    renderProductMessage(container, "Product not found");
    return;
  }

  try {
       resetProductState();
    container.innerHTML = productDetailsSkeleton();

    for (const id of ["similarSection", "recommendSection"]) {
      const section = document.getElementById(id);
      if (section) section.innerHTML = productRowSkeleton();
    }

    // Product
    const product = await getProductBySlug(slug);

   productState.currentProduct = product;
productState.currentProductId = product._id;
productState.currentUser = await Auth.getCurrentUser();

    renderProduct(product);
    updateProductSeo(product, slug);

    initDeliveryChecker();
    initWishlist();
    await loadWishlistState();

    // Save current product
await saveRecentlyViewed(product._id);

    // Reviews
   await loadReviewPage(
  productState.currentProductId,
  1,
  productState.currentUser
);

   attachReviewSort(
  productState.currentProductId,
  productState.currentUser
);

await loadRecentlyViewed(
  "recentlyViewedSection"
);

    // Similar + Recommended
    const [similarData, trendingData] =
      await Promise.all([
        getSimilarProducts(product.category),
        getTrendingProducts(),
      ]);

    await renderHorizontalSection({
      containerId: "similarSection",
      products: similarData.products || [],
    });

    await renderHorizontalSection({
      containerId: "recommendSection",
      products: trendingData.products || [],
    });

  } catch (err) {
    console.error(err);

    renderProductMessage(container, "We couldn't load this product");
  }
}

function renderProductMessage(container, message) {
  // Hide the "Similar Products" / "You may also like" blocks, headings included.
  for (const id of ["similarSection", "recommendSection"]) {
    const section = document.getElementById(id);
    if (section) section.parentElement.hidden = true;
  }

  container.innerHTML = `
    <div class="flex flex-col items-center justify-center text-center py-24">
      <h1 class="text-2xl md:text-3xl font-light">${message}</h1>
      <p class="mt-3 text-black/50">It may have been removed or the link is incorrect.</p>
      <a href="/pages/products.html" class="btn-primary inline-flex items-center px-6 h-11 mt-8">
        Browse Jewellery
      </a>
    </div>
  `;
}

function updateProductSeo(product, slug) {
  const path = `/pages/productDetails?slug=${encodeURIComponent(slug)}`;
  const images = (product.images || []).map((img) => img.url).filter(Boolean);
  // description is either a plain string or { short, design, details }
  const rawDescription =
    typeof product.description === "string"
      ? product.description
      : product.description?.short || product.description?.design;
  const description =
    rawDescription ||
    `Shop ${product.name} at ${SITE_NAME}. Handcrafted premium jewellery.`;

  updateSeo({
    title: product.name,
    description,
    path,
    image: images[0],
  });

  const inStock = (product.variants || []).some((v) => v.stock > 0);

  setJsonLd("product-jsonld", {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: description.replace(/s+/g, " ").trim(),
    image: images,
    category: product.category,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      url: new URL(path, SITE_URL).href,
      priceCurrency: "INR",
      price: product.price,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  });
}


