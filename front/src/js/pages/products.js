import { createProductCard } from "../components/productCard.js";
import { initWishlist, loadWishlistState  } from "../features/wishlist.js";

const API_URL = "http://localhost:5000/api/v1/products";
const grid = document.getElementById("productsGrid");
const sortSelect = document.getElementById("sortSelect");



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

    showLoading();

    const res = await fetch(`${API_URL}?${params}`);
    const data = await res.json();

    if (!data || !Array.isArray(data.products) || data.products.length === 0) {
      showEmpty();
      return;
    }

    grid.innerHTML = data.products
      .map(p => createProductCard(p, {
        showWishlistButton: true
      }))
      .join("");

    await loadWishlistState();

    // 🔥 ADD THIS (VERY IMPORTANT)
    renderPagination(data.page, data.totalPages);

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
const filterBtn = e.target.closest("[data-filter]");
const materialBtn = e.target.closest("[data-material]");
const genderBtn = e.target.closest("[data-gender]");

if (filterBtn) {
  const current = params.get("subcategory");

  if (current === filterBtn.dataset.filter) {
    params.delete("subcategory");
  } else {
    params.set("subcategory", filterBtn.dataset.filter);
  }

  changed = true;
}



if (materialBtn) {
  const current = params.get("category");

  if (current === materialBtn.dataset.material) {
    params.delete("category");
  } else {
    params.set("category", materialBtn.dataset.material);
  }

  changed = true;
}




if (genderBtn) {
  const current = params.get("gender");

  if (current === genderBtn.dataset.gender) {
    params.delete("gender");
  } else {
    params.set("gender", genderBtn.dataset.gender);
  }

  changed = true;
}

 if (changed) {

   params.delete("page");

  drawer?.classList.add("translate-x-full");

  window.scrollTo({ top: 0, behavior: "smooth" }); //  ADD THIS

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
  const gender = params.get("gender");

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



document.querySelectorAll("[data-gender]").forEach(btn => {
  if (btn.dataset.gender === gender) {
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




function setPageTitle() {
  const title = document.getElementById("pageTitle");
  if (!title) return;

  const params = new URLSearchParams(window.location.search);

  const gender = params.get("gender");
  const subcategory = params.get("subcategory");
  const tag = params.get("tag");

  if (gender === "her") title.textContent = "Jewellery for Her";
  else if (gender === "him") title.textContent = "Jewellery for Him";
  else if (gender === "kids") title.textContent = "Jewellery for Kids";
  else if (tag === "trending") title.textContent = "Trending Jewellery";
  else if (tag === "new") title.textContent = "New Arrivals";
  else if (subcategory) title.textContent = subcategory.toUpperCase();
  else title.textContent = "Our Collection";
}




function renderPagination(currentPage, totalPages) {
  const container = document.getElementById("pagination");
  if (!container) return;

  container.innerHTML = "";

  if (totalPages <= 1) return;

  const params = new URLSearchParams(window.location.search);

  // Prev
  if (currentPage > 1) {
    container.appendChild(createPageBtn("←", currentPage - 1, params));
  }

  // Pages
  for (let i = 1; i <= totalPages; i++) {
    container.appendChild(
      createPageBtn(i, i, params, i === currentPage)
    );
  }

  // Next
  if (currentPage < totalPages) {
    container.appendChild(createPageBtn("→", currentPage + 1, params));
  }
}


function createPageBtn(label, page, params, isActive = false) {
  const btn = document.createElement("button");

  const newParams = new URLSearchParams(params);
  newParams.set("page", page);

  btn.textContent = label;

  btn.className = `
    px-3 py-1 text-sm border
    ${isActive ? "bg-black text-white" : "bg-white"}
  `;

  btn.addEventListener("click", () => {
    window.location.search = newParams.toString();
  });

  return btn;
}


loadProducts();
setActiveFilters();
syncSearchInput();
setPageTitle();
initWishlist();


