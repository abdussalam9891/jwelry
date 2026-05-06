import { createProductCard } from "../components/productCard.js";
import { initWishlist, loadWishlistState } from "../features/wishlist.js";
import { CONFIG } from "../config.js";


let url =
  `${CONFIG.API_BASE}/v1/products?limit=8`;
const container = document.getElementById("productContainer");
const tabs = document.querySelectorAll(".tab");

let currentRequest = 0;
const cache = {};

async function fetchProducts(type) {
  // ✅ 1. If cached → render instantly
  if (cache[type]) {
    container.scrollTo({ left: 0, behavior: "smooth" });
    renderProducts(cache[type]);
    return;
  }

  const requestId = ++currentRequest;

  try {
    container.innerHTML = `<div class="text-sm text-gray-500 px-4">Loading products...</div>`;


    if (type === "trending") url += "&tag=trending";
    else if (type === "new") url += "&tag=new";
    else url += `&subcategory=${type}`;

    const res = await fetch(url);
    const data = await res.json();

    if (requestId !== currentRequest) return;

    if (!data || !Array.isArray(data.products)) {
      container.innerHTML = `<div class="text-sm text-red-500 px-4">Failed to load products</div>`;
      return;
    }

    // ✅ 2. STORE + RENDER
    cache[type] = data.products;
    renderProducts(data.products);

  } catch (err) {
    console.error(err);
    container.innerHTML = `<div class="text-sm text-red-500 px-4">Failed to load products</div>`;
  }
}


async function renderProducts(products) {
  if (!products || products.length === 0) {
    container.innerHTML = `
      <p class="text-sm text-black/60 text-center py-6">
        No products found
      </p>
    `;
    return;
  }

  const safeProducts = products.filter(p => p && p._id);

  container.innerHTML = safeProducts
    .map(p => `
      <div class="w-[200px] min-w-[200px] flex-shrink-0 snap-start">
        ${createProductCard(p, {
          showWishlistButton: true
        })}
      </div>
    `)
    .join("");

      await loadWishlistState();
}



tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    if (tab.classList.contains("active")) return;

    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    container.scrollTo({ left: 0, behavior: "smooth" });

    const type = tab.dataset.type;
    fetchProducts(type);
  });
});

document.querySelector('[data-type="trending"]')?.classList.add("active");

fetchProducts("trending"); // default

initWishlist();
