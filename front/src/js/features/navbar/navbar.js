import {
  createNavbar
}
from "../../components/navbar/navbar.js";

import {
  getCurrentUser
}
from "../../core/authState.js";

import {
  updateWishlistCount
}
from "../../core/wishlistCount.js";

import {
  loadWishlistState
}
from "../wishlist.js";

import {
  setActiveNav
}
from "./navbarActive.js";

import {
  checkAuthState,
  handleProtectedRoute
}
from "./navbarAuth.js";

import {
  initUserDropdown
}
from "./navbarDropdown.js";

import {
  initializeNavbar
}
from "./navbarMobile.js";

import {
  initNavbarScroll
}
from "./navbarScroll.js";

import {
  initSearchPlaceholder,
  initSearchHandlers
}
from "./navbarSearch.js";






export async function loadNavbar() {

   

  document.getElementById(
    "navbar-container"
  ).innerHTML =
    createNavbar();

  const wishlistBtn =
    document.getElementById(
      "wishlistBtn"
    );

  const cartBtn =
    document.getElementById(
      "cartBtn"
    );

  wishlistBtn.onclick = () =>
    handleProtectedRoute(
      "/front/pages/wishlist.html"
    );

  cartBtn.onclick = () =>
    handleProtectedRoute(
      "/front/pages/cart.html"
    );

  const user =
    await getCurrentUser();

  if (user) {

    await loadWishlistState();

  }

  initializeNavbar();

  initUserDropdown();

  await checkAuthState();

  initSearchPlaceholder();

  initNavbarScroll();

  setActiveNav();

  initSearchHandlers();

  updateWishlistCount();

}
