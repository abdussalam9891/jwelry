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

import { updateDropdownUser } from "./navbarUser.js";


export async function checkAuthState() {
  const user =
    await getCurrentUser();

  const loggedInContent =
    document.getElementById(
      "loggedInContent"
    );

  const loggedOutContent =
    document.getElementById(
      "loggedOutContent"
    );

  if (user) {
    loggedInContent?.classList.remove(
      "hidden"
    );

    loggedOutContent?.classList.add(
      "hidden"
    );

    // inject backend user data
    updateDropdownUser(user);

    bindLogoutButtons();
  } else {
    loggedOutContent?.classList.remove(
      "hidden"
    );

    loggedInContent?.classList.add(
      "hidden"
    );

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
  const logoutBtn =
    document.getElementById("logoutBtn");

  if (!logoutBtn) return;

  logoutBtn.onclick = async (e) => {
    e.preventDefault();

    logoutBtn.textContent =
      "Logging out...";

    logoutBtn.disabled = true;

    await logout();
  };
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





