import { createProductCard } from "../components/productCard.js";
import { initWishlist, loadWishlistState  } from "../features/wishlist.js";
import { CONFIG } from "../config.js";

const API_URL =
  `${CONFIG.API_BASE}/v1/products`;
const grid = document.getElementById("productsGrid");
const sortSelect = document.getElementById("sortSelect");



// ---- UI STATES ----
function showLoading() {
  grid.innerHTML = `<p class="col-span-full text-sm text-black/60">Loading products...</p>`;
}



function showError() {
  grid.innerHTML = `<p class="col-span-full text-sm text-red-500">Something went wrong</p>`;
}

// ---- FETCH ----
async function loadProducts() {
  if (!grid) return;

  try {
    const params =
      new URLSearchParams(
        window.location.search
      );

    showLoading();

    const res =
      await fetch(
        `${API_URL}?${params}`
      );

    if (!res.ok) {
      throw new Error(
        "Failed to fetch products"
      );
    }

    const data =
      await res.json();

    const products =
      data?.products || [];

    // EMPTY STATE
    if (
      !Array.isArray(
        products
      ) ||
      products.length === 0
    ) {
      grid.innerHTML = "";
      renderPagination(
        1,
        0
      );
      showEmpty();
      return;
    }

    // RENDER PRODUCTS
    grid.innerHTML =
      products
        .map((p) =>
          createProductCard(
            p,
            {
              showWishlistButton:
                true,
            }
          )
        )
        .join("");

    // WISHLIST STATE
    await loadWishlistState();

    // PAGINATION
    renderPagination(
      data.page || 1,
      data.totalPages || 1
    );
  } catch (error) {
    console.error(
      "[loadProducts]",
      error
    );

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
const audienceBtn =
  e.target.closest(
    "[data-audience]"
  );
  const subcategoryBtn =
  e.target.closest(
    "[data-subcategory]"
  );

if (filterBtn) {
  const current = params.get("category");

  if (current === filterBtn.dataset.filter) {
    params.delete("category");
  } else {
    params.set(
      "category",
      filterBtn.dataset.filter
    );
  }

  changed = true;
}


if (materialBtn) {
  const current =
    params.get("material");

  if (
    current ===
    materialBtn.dataset.material
  ) {
    params.delete("material");
  } else {
    params.set(
      "material",
      materialBtn.dataset.material
    );
  }

  changed = true;
}



if (subcategoryBtn) {
  const current =
    params.get(
      "subcategory"
    );

  if (
    current ===
    subcategoryBtn.dataset
      .subcategory
  ) {
    params.delete(
      "subcategory"
    );
  } else {
    params.set(
      "subcategory",
      subcategoryBtn.dataset
        .subcategory
    );
  }

  changed = true;
}



if (audienceBtn) {
  const current =
    params.get(
      "targetAudience"
    );

  if (
    current ===
    audienceBtn.dataset.audience
  ) {
    params.delete(
      "targetAudience"
    );
  } else {
    params.set(
      "targetAudience",
      audienceBtn.dataset.audience
    );
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





const openBtn =
  document.getElementById(
    "openFilters"
  );

const closeBtn =
  document.getElementById(
    "closeFilters"
  );

const drawer =
  document.getElementById(
    "mobileFilters"
  );

const overlay =
  document.getElementById(
    "filterOverlay"
  );

// OPEN DRAWER
openBtn?.addEventListener(
  "click",
  () => {
    if (!drawer || !overlay)
      return;

    drawer.classList.remove(
      "translate-x-full"
    );

    overlay.classList.remove(
      "hidden"
    );
  }
);

// CLOSE DRAWER
closeBtn?.addEventListener(
  "click",
  closeDrawer
);

overlay?.addEventListener(
  "click",
  closeDrawer
);

function closeDrawer() {
  if (!drawer || !overlay)
    return;

  drawer.classList.add(
    "translate-x-full"
  );

  overlay.classList.add(
    "hidden"
  );
}

// MOBILE SORT
const sortMobile =
  document.getElementById(
    "sortSelectMobile"
  );

sortMobile?.addEventListener(
  "change",
  () => {
    const params =
      new URLSearchParams(
        window.location.search
      );

    switch (
      sortMobile.value
    ) {
      case "low":
        params.set(
          "sort",
          "price_asc"
        );
        break;

      case "high":
        params.set(
          "sort",
          "price_desc"
        );
        break;

      default:
        params.delete(
          "sort"
        );
    }

    params.delete("page");

    closeDrawer();

    window.location.search =
      params.toString();
  }
);



function setActiveFilters() {
  const params =
    new URLSearchParams(
      window.location.search
    );

  const category =
    params.get("category");

  const material =
    params.get("material");

  const subcategory =
    params.get("subcategory");

  const targetAudience =
    params.get(
      "targetAudience"
    );

  // CATEGORY (rings / bracelets / earrings)
  document
    .querySelectorAll(
      "[data-filter]"
    )
    .forEach((btn) => {
      if (
        btn.dataset.filter ===
        category
      ) {
        btn.classList.add(
          "text-[#6B1A2A]"
        );
      }
    });

  // MATERIAL (gold / silver / diamond)
  document
    .querySelectorAll(
      "[data-material]"
    )
    .forEach((btn) => {
      if (
        btn.dataset.material ===
        material
      ) {
        btn.classList.add(
          "text-[#6B1A2A]"
        );
      }
    });

  // SUBCATEGORY (wedding / casual / party)
  document
    .querySelectorAll(
      "[data-subcategory]"
    )
    .forEach((btn) => {
      if (
        btn.dataset
          .subcategory ===
        subcategory
      ) {
        btn.classList.add(
          "text-[#6B1A2A]"
        );
      }
    });

  // TARGET AUDIENCE
  document
    .querySelectorAll(
      "[data-audience]"
    )
    .forEach((btn) => {
      if (
        btn.dataset.audience ===
        targetAudience
      ) {
        btn.classList.add(
          "text-[#6B1A2A]"
        );
      }
    });
}


function syncSearchInput() {
  const params =
    new URLSearchParams(
      window.location.search
    );

  const search =
    params.get("search");

  const desktopInput =
    document.getElementById(
      "searchInput"
    );

  const mobileInput =
    document.getElementById(
      "mobileSearchInput"
    );

  if (!search) return;

  if (desktopInput) {
    desktopInput.value =
      search;
  }

  if (mobileInput) {
    mobileInput.value =
      search;
  }
}


// showempty
function showEmpty() {
  const search =
    new URLSearchParams(
      window.location.search
    ).get("search");

  grid.innerHTML = `
    <div
      class="
        col-span-full
        flex
        flex-col
        items-center
        justify-center
        py-16
        text-center
      "
    >
      <p
        class="
          text-lg
          font-semibold
          text-black/80
        "
      >
        ${
          search
            ? `No results for "${search}"`
            : "No products found"
        }
      </p>

      <p
        class="
          mt-2
          text-sm
          text-black/50
        "
      >
        Try another category,
        material or keyword.
      </p>
    </div>
  `;
}





export function setPageTitle() {
  const pageTitle =
    document.getElementById(
      "pageTitle"
    );

  if (!pageTitle) return;

  const params =
    new URLSearchParams(
      window.location.search
    );

  const search =
    params.get("search");

  const category =
    params.get("category");

  const subcategory =
    params.get("subcategory");

  const material =
    params.get("material");

  const targetAudience =
    params.get(
      "targetAudience"
    );

  const tag =
    params.get("tag");

  // SEARCH
  if (search) {
    pageTitle.textContent =
      `Results for "${search}"`;
  }

  // AUDIENCE
  else if (
    targetAudience === "women"
  ) {
    pageTitle.textContent =
      "Jewellery for Women";
  }

  else if (
    targetAudience === "men"
  ) {
    pageTitle.textContent =
      "Jewellery for Men";
  }

  else if (
    targetAudience === "kids"
  ) {
    pageTitle.textContent =
      "Jewellery for Kids";
  }

  else if (
    targetAudience === "unisex"
  ) {
    pageTitle.textContent =
      "Unisex Jewellery";
  }

  // TAGS
  else if (
    tag === "trending"
  ) {
    pageTitle.textContent =
      "Trending Jewellery";
  }

  else if (
    tag === "new"
  ) {
    pageTitle.textContent =
      "New Arrivals";
  }

  // CATEGORY
  else if (category) {
    pageTitle.textContent =
      category.toUpperCase();
  }

  // SUBCATEGORY
  else if (subcategory) {
    pageTitle.textContent =
      subcategory.toUpperCase();
  }

  // MATERIAL
  else if (material) {
    pageTitle.textContent =
      `${material.toUpperCase()} Jewellery`;
  }

  else {
    pageTitle.textContent =
      "Our Collection";
  }
}




function renderPagination(
  currentPage,
  totalPages
) {
  const container =
    document.getElementById(
      "pagination"
    );

  if (!container) return;

  container.innerHTML = "";

  if (totalPages <= 1) return;

  container.className =
    "flex items-center justify-center gap-2 mt-10 flex-wrap";

  const params =
    new URLSearchParams(
      window.location.search
    );

  // PREV
  if (currentPage > 1) {
    container.appendChild(
      createPageBtn(
        "←",
        currentPage - 1,
        params
      )
    );
  }

  // PAGES
  for (
    let i = 1;
    i <= totalPages;
    i++
  ) {
    container.appendChild(
      createPageBtn(
        i,
        i,
        params,
        i === currentPage
      )
    );
  }

  // NEXT
  if (
    currentPage < totalPages
  ) {
    container.appendChild(
      createPageBtn(
        "→",
        currentPage + 1,
        params
      )
    );
  }
}

function createPageBtn(
  label,
  page,
  params,
  isActive = false
) {
  const btn =
    document.createElement(
      "button"
    );

  const newParams =
    new URLSearchParams(
      params
    );

  newParams.set(
    "page",
    page
  );

  btn.textContent = label;

  btn.className = `
    min-w-[40px]
    h-10
    px-3
    rounded-xl
    border
    text-sm
    font-medium
    transition-all
    duration-200
    ${
      isActive
        ? `
          bg-[#6B1A2A]
          text-white
          border-[#6B1A2A]
        `
        : `
          bg-white
          text-black/70
          border-black/10
          hover:bg-[#F8F4F5]
          hover:text-[#6B1A2A]
        `
    }
  `;

  btn.addEventListener(
    "click",
    () => {
      window.location.search =
        newParams.toString();
    }
  );

  return btn;
}

 


loadProducts();
setActiveFilters();
syncSearchInput();
setPageTitle();
initWishlist();
showEmpty();


