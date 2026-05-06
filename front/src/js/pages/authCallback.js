import api from "../core/api.js";

const status =
  document.getElementById("status");

async function handleAuthCallback() {

  try {

    const res =
      await api.get("/v1/auth/me");

    if (!res.loggedIn) {

      throw new Error("Not logged in");

    }

    // 🔥 redirect back if needed
    const redirect =
      sessionStorage.getItem(
        "redirectAfterLogin"
      );

    sessionStorage.removeItem(
      "redirectAfterLogin"
    );

    window.location.replace(
      redirect || "/front/index.html"
    );

  } catch (err) {

    console.error(
      "Auth callback failed:",
      err
    );

    if (status) {

      status.textContent =
        "Sign-in failed. Please try again.";

    }

  }

}

handleAuthCallback();
