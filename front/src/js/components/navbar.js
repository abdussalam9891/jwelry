import { openAuthModal } from "../components/authModal.js";
import api from "../core/api.js";
import { getCurrentUser, logout } from "../core/authState.js";
import { updateWishlistCount } from "../core/wishlistCount.js";
import { loadWishlistState } from "../features/wishlist.js";
import { CONFIG } from "../config.js";


let placeholderInterval;

// load navbar
async function loadNavbar() {
  const navbarHTML = `

    <!-- Mobile overlay -->
<div
  id="navOverlay"
  class="fixed inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 pointer-events-none transition-opacity duration-300 z-[998]"
></div>

<!-- Mobile drawer -->
<div
  id="mobileMenu"
  class="fixed top-0 right-0 z-[999] w-full max-w-[320px] h-[100dvh] bg-[#F9F6F2] translate-x-full transition-transform duration-300 flex flex-col overflow-y-auto px-5 pt-5 pb-6 shadow-[ -10px_0_40px_rgba(0,0,0,0.15) ]"
>
  <button
    id="drawerClose"
    class="absolute top-5 right-5 z-[1000] p-1 hover:bg-black/5 rounded-lg transition-colors"
  >
    <svg
      class="w-6 h-6 text-[#1A1A1A]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>

  <nav class="flex flex-col gap-0 mt-4">
    <a
       href="/front/pages/products.html"
      class="py-3 px-2 text-[#1A1A1A] text-[1rem] font-medium border-b border-black/5 hover:text-[#6B1A2A] transition-colors"
      >All Jewellery</a
    >

    <a
      href="/front/pages/products.html?subcategory=rings"
      class="py-3 px-2 text-[#1A1A1A] text-[1rem] font-medium border-b border-black/5 hover:text-[#6B1A2A] transition-colors"
      >Rings</a
    >

     <a
      href="/front/pages/products.html?subcategory=earrings"
      class="py-3 px-2 text-[#1A1A1A] text-[1rem] font-medium border-b border-black/5 hover:text-[#6B1A2A] transition-colors"
      >Earrings</a
    >


    <a
      href="/front/pages/products.html?subcategory=bracelets"
      class="py-3 px-2 text-[#1A1A1A] text-[1rem] font-medium border-b border-black/5 hover:text-[#6B1A2A] transition-colors"
      >Bracelets</a
    >
    <a
       href="/front/pages/products.html?subcategory=necklaces"
      class="py-3 px-2 text-[#1A1A1A] text-[1rem] font-medium border-b border-black/5 hover:text-[#6B1A2A] transition-colors"
      >Necklaces</a
    >





  </nav>

  <div  class="mt-6 pt-4 border-t border-black/5">
    <a

      href="#"
      class="loginBtn block py-2.5 px-3 text-center text-sm font-semibold border border-[#6B1A2A] text-[#6B1A2A] hover:bg-[#6B1A2A] hover:text-white transition-colors duration-250"
    >
      Login / Signup
    </a>
  </div>
</div>




<!-- Main navbar -->
<nav
  id="mainNav"
  class="fixed top-0 left-0 right-0 z-[1000] bg-[#F9F6F2] transition-transform duration-300"
>





  <!-- ROW 1: Logo + Icons -->

  <div
    class="container-main flex items-center justify-between px-6 h-[64px] border-b border-black/5 transition-all duration-300"
  >
    <!-- LEFT -->
    <div class="flex items-center gap-4">
      <!-- Mobile Hamburger -->
      <button id="navToggle" class="md:hidden p-2 flex flex-col gap-1.5">
        <span class="block w-5 h-0.5 bg-[#6B1A2A]"></span>
        <span class="block w-5 h-0.5 bg-[#6B1A2A]"></span>
        <span class="block w-3 h-0.5 bg-[#6B1A2A]"></span>
      </button>

      <!-- Logo -->
      <a href="/front/index.html" class="flex-shrink-0">
        <img
          src="/front/src/assets/icon/logo.png"
          class="h-16 w-auto object-contain"
        />
      </a>
    </div>

    <!-- CENTER SEARCH (desktop only) -->
    <div class="hidden md:flex flex-1 justify-center px-6">
      <div class="w-full max-w-md relative">
        <input
          id="searchInput"
          type="text"
          placeholder="Search jewellery..."
          class="w-full px-4 py-2 pr-10 rounded-full border border-black/10 bg-[#F9F6F2] focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]/30"
        />

        <!-- Search Icon INSIDE input -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 text-[#6B1A2A] absolute right-3 top-1/2 -translate-y-1/2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.65 5.65a7.5 7.5 0 0 0 10.6 10.6Z"
          />
        </svg>
      </div>
    </div>

    <!-- RIGHT ICONS -->
    <div class="flex items-end gap-3 md:gap-4">
      <!-- Wishlist -->
      <button
        id="wishlistBtn"
        class="flex flex-col items-center justify-center text-[11px] p-2 hover:bg-black/5 rounded-lg relative"
      >
        <div class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-7 h-7 text-[#6B1A2A]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.74 0-3.27.86-4 2.09-.73-1.23-2.26-2.09-4-2.09-2.761 0-5 2.015-5 4.5 0 6 9 11.25 9 11.25s9-5.25 9-11.25Z"
            />
          </svg>

          <!-- Badge -->
          <span
            id="wishlistCount"
            class="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#6B1A2A] text-white hidden"
          >
            0
          </span>
        </div>

        <span class="mt-1 text-black/80 font-medium">Wishlist</span>
      </button>

      <!-- Cart -->
      <button
        id="cartBtn"
        class="flex flex-col items-center justify-center text-[11px] p-2 hover:bg-black/5 rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-7 h-7 text-[#6B1A2A]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 3h1.386a1.125 1.125 0 0 1 1.11.843l.383 1.437m0 0L6.75 14.25h10.5l1.621-6.072a1.125 1.125 0 0 0-1.088-1.428H5.13m0 0L4.5 3m2.25 11.25a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m9 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0"
          />
        </svg>

        <span class="mt-1 text-black/80 font-medium">Cart</span>
      </button>

      <!-- User -->
      <div class="relative hidden md:block">
        <button
          data-user="trigger"
          class="flex flex-col items-center justify-center text-[11px] p-2 hover:bg-black/5 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-7 h-7 text-[#6B1A2A]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0"
            />
          </svg>

          <span class="mt-1 text-black/80 font-medium">Profile</span>
        </button>


























        <!-- Dropdown -->
      <!-- Dropdown -->
<div
  id="userDropdown"
  class="
    absolute
    right-0
    mt-3
    w-72
    bg-white
    border
    border-black/5
    rounded-3xl
    shadow-2xl
    opacity-0
    pointer-events-none
    transition-all
    duration-200
    z-[1100]
    overflow-hidden
  "
>

  <!-- LOGGED IN CONTENT -->
  <div id="loggedInContent" class="hidden">

    <!-- USER -->
    <div
      class="
        p-5
        border-b
        border-black/5
      "
    >

      <div class="flex items-center gap-3">

        <!-- AVATAR -->
        <div
          class="
            w-12
            h-12
            rounded-full
            overflow-hidden
            bg-[#F6EEF0]
            shrink-0
          "
        >

          <img
            id="dropdownAvatar"
            src=""
            alt="User"
            class="
              w-full
              h-full
              object-cover
            "
          />

        </div>

        <!-- INFO -->
        <div class="min-w-0">

          <p
            id="dropdownName"
            class="
              font-semibold
              truncate
            "
          >
            --
          </p>

          <p
            id="dropdownEmail"
            class="
              text-sm
              text-black/45
              truncate
              mt-0.5
            "
          >
            --
          </p>

        </div>

      </div>

    </div>



    <!-- LINKS -->
    <div class="p-2">

      <!-- ORDERS -->
      <a
        href="/front/pages/orders.html"
        class="
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          hover:bg-[#FAFAFA]
          transition
        "
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.8"
          stroke="currentColor"
          class="w-5 h-5 text-black/60"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M20.25 7.5v10.125c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 0 1 3.75 17.625V7.5m16.5 0-2.28-2.28a1.125 1.125 0 0 0-.795-.33H6.825c-.298 0-.584.118-.795.33L3.75 7.5"
          />
        </svg>

        <span class="text-sm">
          My Orders
        </span>

      </a>



      <!-- WISHLIST -->
      <a
        href="/front/pages/wishlist.html"
        class="
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          hover:bg-[#FAFAFA]
          transition
        "
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.8"
          stroke="currentColor"
          class="w-5 h-5 text-black/60"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5-1.74 0-3.247.99-4 2.437-.753-1.446-2.26-2.437-4-2.437-2.485 0-4.5 2.015-4.5 4.5 0 7.22 8.5 12 8.5 12s8.5-4.78 8.5-12z"
          />
        </svg>

        <span class="text-sm">
          Wishlist
        </span>

      </a>

    </div>



    <!-- FOOTER -->
    <div
      class="
        p-3
        border-t
        border-black/5
      "
    >

      <button
        id="logoutBtn"
        class="
          w-full
          h-11
          rounded-2xl
          bg-[#6B1A2A]
          text-white
          text-sm
          font-medium
          hover:opacity-90
          transition
        "
      >
        Logout
      </button>

    </div>

  </div>



  <!-- LOGGED OUT -->
  <div
    id="loggedOutContent"
    class="p-4"
  >

    <a
      href="/front/pages/auth.html"
      class="
        w-full
        h-11
        rounded-2xl
        bg-[#6B1A2A]
        text-white
        text-sm
        font-medium
        flex
        items-center
        justify-center
        hover:opacity-90
        transition
      "
    >
      Login / Signup
    </a>

  </div>

</div>




































  <!-- Mobile Search Bar (FULL WIDTH) -->
  <div class="md:hidden px-4 py-4 pb-3">
    <div class="relative w-full">
      <input
        id="mobileSearchInput"
        type="text"
        placeholder="Search jewellery..."
        class="w-full px-4 py-2 pr-10 rounded-full border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]/30 text-sm"
      />

      <!-- icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4 text-[#6B1A2A] absolute right-3 top-1/2 -translate-y-1/2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.65 5.65a7.5 7.5 0 0 0 10.6 10.6Z"
        />
      </svg>
    </div>
  </div>
</nav>



<!-- row 2  -->
<div
  id="categoryNav"
  class="hidden md:flex items-center justify-center gap-8 px-6 h-[44px] fixed left-0 right-0 bg-[#F9F6F2] z-[999] border-b border-black/10 transition-[top] duration-300"
>
  <ul class="flex items-center justify-center gap-8 w-full list-none">
    <!-- all jewellery  -->
    <li>
      <a
        href="/front/pages/products.html"
        data-nav="all jewellery"

        class="text-[#1A1A1A] text-[0.95rem] font-medium relative group transition-colors duration-250 hover:text-[#6B1A2A]"
      >
        All Jewellery
        <span
          class="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#6B1A2A] group-hover:w-full transition-all duration-250"
        ></span>
      </a>
    </li>
    <!-- rings  -->
    <li>
      <a
        href="/front/pages/products.html?subcategory=rings"
        data-nav="rings"
        class="text-[#1A1A1A] text-[0.95rem] font-medium relative group transition-colors duration-250 hover:text-[#6B1A2A]"
      >
        Rings
        <span
          class="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#6B1A2A] group-hover:w-full transition-all duration-250"
        ></span>
      </a>
    </li>
    <!-- necklaces  -->
    <li>
      <a
         href="/front/pages/products.html?subcategory=necklaces"
         data-nav="necklaces"
        class="text-[#1A1A1A] text-[0.95rem] font-medium relative group transition-colors duration-250 hover:text-[#6B1A2A]"
      >
        Necklaces
        <span
          class="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#6B1A2A] group-hover:w-full transition-all duration-250"
        ></span>
      </a>
    </li>
    <!-- earrings  -->
    <li>
      <a
      href="/front/pages/products.html?subcategory=earrings"
       data-nav="earrings"
        class="text-[#1A1A1A] text-[0.95rem] font-medium relative group transition-colors duration-250 hover:text-[#6B1A2A]"
      >
        Earrings
        <span
          class="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#6B1A2A] group-hover:w-full transition-all duration-250"
        ></span>
      </a>
    </li>
    <!-- bracelets  -->
    <li>
      <a
        href="/front/pages/products.html?subcategory=bracelets"
        data-nav="bracelets"
        class="text-[#1A1A1A] text-[0.95rem] font-medium relative group transition-colors duration-250 hover:text-[#6B1A2A]"
      >
        Bracelets
        <span
          class="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#6B1A2A] group-hover:w-full transition-all duration-250"
        ></span>
      </a>
    </li>
  </ul>
</div>

  `;

  document.getElementById("navbar-container").innerHTML = navbarHTML;

  const wishlistBtn =
  document.getElementById("wishlistBtn");

const cartBtn =
  document.getElementById("cartBtn");

 async function handleProtectedRoute(path) {

  try {

    await api.get("/v1/auth/me");

    window.location.href = path;

  } catch {

    sessionStorage.setItem(
      "redirectAfterLogin",
      path
    );

    await openAuthModal();

  }

}

  wishlistBtn.onclick = () =>
    handleProtectedRoute("/front/pages/wishlist.html");
  cartBtn.onclick = () => handleProtectedRoute("/front/pages/cart.html");

 const user =
  await getCurrentUser();

if (user) {

  await loadWishlistState();

}

  initializeNavbar();
  checkAuthState();
  initSearchPlaceholder();
  initNavbarScroll();
  setActiveNav();
  initSearchHandlers();
  updateWishlistCount();
}

loadNavbar();

// ─── Mobile Menu

function initializeNavbar() {
  let isOpen = false;

  const mainNav = document.getElementById("mainNav");
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navOverlay = document.getElementById("navOverlay");
  const drawerClose = document.getElementById("drawerClose");

  const userWrapper = document.querySelector(
    '[data-user="trigger"]',
  )?.parentElement;
  const userDropdown = document.getElementById("userDropdown");
  let userTimeout;

  if (userWrapper && userDropdown) {
    userWrapper.addEventListener("mouseenter", () => {
      clearTimeout(userTimeout);
      userDropdown.style.opacity = "1";
      userDropdown.style.pointerEvents = "auto";
    });
    userWrapper.addEventListener("mouseleave", () => {
      userTimeout = setTimeout(() => {
        userDropdown.style.opacity = "0";
        userDropdown.style.pointerEvents = "none";
      }, 150);
    });
  }

  const mobileSearchBtn = document.getElementById("mobileSearchBtn");
  const mobileSearchBar = document.getElementById("mobileSearchBar");
  const mobileSearchInput = document.getElementById("mobileSearchInput");

  mobileSearchBtn?.addEventListener("click", () => {
    const isHidden = mobileSearchBar.classList.contains("hidden");
    mobileSearchBar.classList.toggle("hidden");
    if (isHidden) mobileSearchInput?.focus();
  });

  if (!navToggle || !mobileMenu || !navOverlay) {
    console.warn("[Navbar] Missing required DOM elements for mobile menu");
    return;
  }

  function openMenu() {
    mobileMenu.classList.remove("translate-x-full");
    navOverlay.classList.remove("opacity-0", "pointer-events-none");
    document.body.classList.add("overflow-hidden");
    mainNav.style.transform = "translateY(-100%)";
    mobileSearchBar?.classList.add("hidden"); // ← ADD
    isOpen = true;
  }

  function closeMenu() {
    mobileMenu.classList.add("translate-x-full");
    navOverlay.classList.add("opacity-0", "pointer-events-none");
    document.body.classList.remove("overflow-hidden");
    mainNav.style.transform = "translateY(0)";
    isOpen = false;
  }

  function toggleMenu() {
    isOpen ? closeMenu() : openMenu();
  }

  navToggle.addEventListener("click", toggleMenu);
  drawerClose?.addEventListener("click", closeMenu);
  navOverlay.addEventListener("click", closeMenu);
  document
    .getElementById("mobileLoginBtn")
    ?.addEventListener("click", closeMenu); // ← YAHAN

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && isOpen) {
      closeMenu();
    }
  });
}

function initNavbarScroll() {
  const mainNav = document.getElementById("mainNav");
  const categoryNav = document.getElementById("categoryNav");

  if (!mainNav || !categoryNav) {
    console.warn("[Navbar] initNavbarScroll: element not found", {
      mainNav,
      categoryNav,
    });
    return;
  }

  const ROW1_H = 64;

  // Initial position
  categoryNav.style.top = ROW1_H + "px";

  let lastScrollY = window.scrollY;
  let isHidden = false;

  function handleScroll() {
    if (document.body.classList.contains("overflow-hidden")) return;

    const currentScrollY = window.scrollY;
    const scrollDiff = currentScrollY - lastScrollY;

    if (Math.abs(scrollDiff) < 5) return;

    if (scrollDiff > 0 && currentScrollY > 80 && !isHidden) {
      mainNav.style.transform = "translateY(-100%)";
      categoryNav.style.top = "0px";
      isHidden = true;
    } else if (scrollDiff < 0 && isHidden) {
      mainNav.style.transform = "translateY(0)";
      categoryNav.style.top = ROW1_H + "px";
      isHidden = false;
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
}

async function checkAuthState() {
  const wishlistBtn = document.getElementById("wishlistBtn");

  wishlistBtn?.classList.remove("hidden");

  const user = await getCurrentUser();

  if (user) {
    bindLogoutButtons();
  } else {
    bindLoginButtons();
  }
}

// ─── Button Binders ──────────────────────────────────────────

function bindLoginButtons() {
  const loginBtns = document.querySelectorAll(".loginBtn");

  loginBtns.forEach((btn) => {
    btn.textContent = "Login";
    btn.onclick = async (e) => {
      e.preventDefault();
      await openAuthModal();
    };
  });
}

function bindLogoutButtons() {
  const loginBtns = document.querySelectorAll(".loginBtn");

  loginBtns.forEach((btn) => {
    btn.textContent = "Logout";

    btn.onclick = async (e) => {
      e.preventDefault();

      btn.textContent = "Logging out...";
      btn.disabled = true;

      await logout();
    };
  });
}

// ─── Search Placeholder ──────────────────────────────────────

function initSearchPlaceholder() {
  const placeholders = [
    "Search for diamond jewellery",
    "Search for gold rings",
    "Search for earrings",
    "Search for necklaces",
  ];

  const input = document.getElementById("searchInput");
  if (!input) return;

  let index = 0;

  if (placeholderInterval) clearInterval(placeholderInterval);

  placeholderInterval = setInterval(() => {
    index = (index + 1) % placeholders.length;
    input.setAttribute("placeholder", placeholders[index]);
  }, 4000);
}

function setActiveNav() {
  const params = new URLSearchParams(window.location.search);
  const subcategory = params.get("subcategory");

  const isProductsPage = window.location.pathname.includes("products.html");

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.remove("text-[#6B1A2A]");

    const underline = link.querySelector("span");
    if (underline) underline.style.width = "0";

    if (isProductsPage && link.dataset.nav === subcategory) {
      link.classList.add("text-[#6B1A2A]");
      if (underline) underline.style.width = "100%";
    }
  });

  // default active (ONLY on products page)
  if (isProductsPage && !subcategory) {
    const all = document.querySelector('[data-nav="all jewellery"]');
    if (all) all.classList.add("text-[#6B1A2A]");
  }
}

function initSearchHandlers() {
  const desktopInput = document.getElementById("searchInput");
  const mobileInput = document.getElementById("mobileSearchInput");

  function handleSearch(input) {
    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const value = input.value.trim();

        const params = new URLSearchParams(window.location.search);

        if (value) {
          params.set("search", value);
        } else {
          params.delete("search");
        }

        window.location.href = `/front/pages/products.html?${params.toString()}`;
      }
    });
  }

  handleSearch(desktopInput);
  handleSearch(mobileInput);
}

document.getElementById("searchBtn")?.addEventListener("click", () => {
  const input = document.getElementById("searchInput");
  if (!input) return;

  const value = input.value.trim();
  const params = new URLSearchParams(window.location.search);

  if (value) {
    params.set("search", value);
  }

  window.location.href = `/front/pages/products.html?${params.toString()}`;
});

const params = new URLSearchParams(window.location.search);
const search = params.get("search");

if (search) {
  document.getElementById("pageTitle").textContent = `Results for "${search}"`;
}

function syncSearchInput() {
  const params = new URLSearchParams(window.location.search);
  const search = params.get("search");

  if (search) {
    const desktopInput = document.getElementById("searchInput");
    const mobileInput = document.getElementById("mobileSearchInput");

    if (desktopInput) desktopInput.value = search;
    if (mobileInput) mobileInput.value = search;
  }
}

function showEmpty() {
  const search = new URLSearchParams(window.location.search).get("search");

  grid.innerHTML = `
    <p class="col-span-full text-sm text-black/60 text-center">
      ${search ? `No results for "${search}"` : "No products found"}
    </p>
  `;
}
