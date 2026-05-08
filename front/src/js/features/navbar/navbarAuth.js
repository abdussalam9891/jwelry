import api from "../../core/api.js";

import {
  getCurrentUser,
  logout
}
from "../../core/authState.js";

import {
  openAuthModal
}
from "../../components/authModal.js";



export async function checkAuthState() {

  const wishlistBtn =
    document.getElementById(
      "wishlistBtn"
    );

  wishlistBtn?.classList.remove(
    "hidden"
  );

  const user =
    await getCurrentUser();

  if (user) {

    bindLogoutButtons();

  } else {

    bindLoginButtons();

  }

}



function bindLoginButtons() {

  const loginBtns =
    document.querySelectorAll(
      ".loginBtn"
    );

  loginBtns.forEach((btn) => {

    btn.textContent =
      "Login";

    btn.onclick =
      async (e) => {

        e.preventDefault();

        await openAuthModal();

      };

  });

}



function bindLogoutButtons() {

  const loginBtns =
    document.querySelectorAll(
      ".loginBtn"
    );

  loginBtns.forEach((btn) => {

    btn.textContent =
      "Logout";

    btn.onclick =
      async (e) => {

        e.preventDefault();

        btn.textContent =
          "Logging out...";

        btn.disabled = true;

        await logout();

      };

  });

}



export async function handleProtectedRoute(
  path
) {

  try {

    await api.get(
      "/v1/auth/me"
    );

    window.location.href =
      path;

  } catch {

    sessionStorage.setItem(
      "redirectAfterLogin",
      path
    );

    await openAuthModal();

  }

}
