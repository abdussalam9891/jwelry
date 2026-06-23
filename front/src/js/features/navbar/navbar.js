import { createNavbar } from "../../components/navbar/navbar.js";

import { getCurrentUser, logout } from "../../core/authState.js";
import { loadCart } from "../cart.js";



import { loadWishlistState } from "../wishlist.js";

import { setActiveNav } from "./navbarActive.js";

import { checkAuthState, handleProtectedRoute } from "./navbarAuth.js";

import { initUserDropdown } from "./navbarDropdown.js";

import { initializeNavbar } from "./navbarMobile.js";

import { initNavbarScroll } from "./navbarScroll.js";

import { initSearchHandlers, initSearchPlaceholder,  initSearchButton,initSearchSuggestions} from "./navbarSearch.js";

export async function loadNavbar() {
  // GET USER FIRST
  const user = await getCurrentUser();

  // PASS USER TO NAVBAR
  document.getElementById("navbar-container").innerHTML = createNavbar(user);

  const wishlistBtn = document.getElementById("wishlistBtn");

  const cartBtn = document.getElementById("cartBtn");

  wishlistBtn.onclick = () => handleProtectedRoute("/pages/wishlist.html");

  cartBtn.onclick = () => handleProtectedRoute("/pages/cart.html");

  if (user) {
    await loadWishlistState();
    await loadCart();
  }

  initializeNavbar();
  initUserDropdown();
  await checkAuthState();

  initSearchPlaceholder();
  initNavbarScroll();
  setActiveNav();
  initSearchHandlers();
  initSearchButton();
  initSearchSuggestions();


  // MOBILE LOGOUT
  document
    .getElementById("mobileLogoutBtn")
    ?.addEventListener("click", async () => {
      await logout();
      window.location.reload();
    });
}
