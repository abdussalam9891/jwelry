const API_URL = "http://localhost:5000/api/products";
const grid = document.getElementById("productsGrid");
const sortSelect = document.getElementById("sortSelect");

// ---- CARD ----
function createProductCard(product) {
  const img1 = product.images?.[0] || "/front/src/assets/images/placeholder.jpg";
  const img2 = product.images?.[1] || img1;

  return `
    <a href="/front/pages/product.html?slug=${product.slug}" class="group block">

      <div class="relative overflow-hidden bg-[#F9F6F2]">
        <img
          src="${img1}"
          class="w-full aspect-[3/4] object-cover transition duration-500 group-hover:opacity-0"
          loading="lazy"
        />
        <img
          src="${img2}"
          class="w-full aspect-[3/4] object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
          loading="lazy"
        />

        ${
          product.isBestSeller
            ? `<span class="absolute top-3 left-3 text-[10px] px-2 py-1 bg-white/90 backdrop-blur">
                 BESTSELLER
               </span>`
            : ""
        }
      </div>

      <div class="mt-3">
        <h3 class="text-[0.95rem] font-medium leading-snug">
          ${product.name}
        </h3>

        <div class="flex items-center gap-2 mt-1">
          <span class="text-[0.95rem] font-semibold">₹${product.price}</span>
          ${
            product.originalPrice
              ? `<span class="text-[0.85rem] line-through text-black/40">
                   ₹${product.originalPrice}
                 </span>`
              : ""
          }
        </div>
      </div>

    </a>
  `;
}

// ---- UI STATES ----
function showLoading() {
  grid.innerHTML = `<p class="col-span-full text-sm text-black/60">Loading products...</p>`;
}

function showEmpty() {
  grid.innerHTML = `<p class="col-span-full text-sm text-black/60">No products found</p>`;
}

function showError() {
  grid.innerHTML = `<p class="col-span-full text-sm text-red-500">Something went wrong</p>`;
}

// ---- FETCH ----
async function loadProducts() {
  try {
    const params = new URLSearchParams(window.location.search);

    // 🔥 FIX: use subcategory (your UI uses this)
    if (!params.toString()) {
      params.set("subcategory", "rings");
    }

    showLoading();

    const res = await fetch(`${API_URL}?${params}`);
    const data = await res.json();

    if (!data.products || !data.products.length) {
      showEmpty();
      return;
    }

    grid.innerHTML = data.products.map(createProductCard).join("");

  } catch (error) {
    console.error(error);
    showError();
  }
}

// ---- SORT ----
sortSelect?.addEventListener("change", () => {
  const params = new URLSearchParams(window.location.search);

  if (sortSelect.value === "low") {
    params.set("sort", "price_asc");
  } else if (sortSelect.value === "high") {
    params.set("sort", "price_desc");
  } else {
    params.delete("sort");
  }

  window.location.search = params.toString();
});

// ---- FILTER CLICK (sync URL) ----
document.addEventListener("click", (e) => {
  const params = new URLSearchParams(window.location.search);

  let changed = false;

  if (e.target.dataset.filter) {
    params.set("subcategory", e.target.dataset.filter);
    changed = true;
  }

  if (e.target.dataset.material) {
    params.set("category", e.target.dataset.material);
    changed = true;
  }

  if (changed) {
    drawer?.classList.add("translate-x-full"); // close mobile drawer
    window.location.search = params.toString();
  }





});





const openBtn = document.getElementById("openFilters");
const closeBtn = document.getElementById("closeFilters");
const drawer = document.getElementById("mobileFilters");
const overlay = document.getElementById("filterOverlay");

openBtn?.addEventListener("click", () => {
  drawer.classList.remove("translate-x-full");
  overlay.classList.remove("hidden");
});

closeBtn?.addEventListener("click", closeDrawer);
overlay?.addEventListener("click", closeDrawer);

function closeDrawer() {
  drawer.classList.add("translate-x-full");
  overlay.classList.add("hidden");
}






const sortMobile = document.getElementById("sortSelectMobile");

sortMobile?.addEventListener("change", () => {
  const params = new URLSearchParams(window.location.search);

  if (sortMobile.value === "low") {
    params.set("sort", "price_asc");
  } else if (sortMobile.value === "high") {
    params.set("sort", "price_desc");
  } else {
    params.delete("sort");
  }

  window.location.search = params.toString();
});



function setActiveFilters() {
  const params = new URLSearchParams(window.location.search);

  const subcategory = params.get("subcategory");
  const category = params.get("category");

  document.querySelectorAll("[data-filter]").forEach(btn => {
    if (btn.dataset.filter === subcategory) {
      btn.classList.add("text-[#6B1A2A]");
    }
  });

  document.querySelectorAll("[data-material]").forEach(btn => {
    if (btn.dataset.material === category) {
      btn.classList.add("text-[#6B1A2A]");
    }
  });
}


function syncSearchInput() {
  const params = new URLSearchParams(window.location.search);
  const search = params.get("search");

  const desktopInput = document.getElementById("searchInput");
  const mobileInput = document.getElementById("mobileSearchInput");

  if (search) {
    if (desktopInput) desktopInput.value = search;
    if (mobileInput) mobileInput.value = search;
  }
}





loadProducts();
setActiveFilters();
syncSearchInput();
