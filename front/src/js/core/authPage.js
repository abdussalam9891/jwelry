import { CONFIG } from "../config.js";
import api from "../core/api.js";

const status = document.getElementById("status");

//   Handle Google auth callback
async function handleAuth() {
  try {
    const res = await api.get("/v1/auth/me");

    if (!res.loggedIn) {
      throw new Error("Not logged in");
    }

    //   redirect back if needed
    const redirect = sessionStorage.getItem("redirectAfterLogin");

    sessionStorage.removeItem("redirectAfterLogin");

    window.location.replace(redirect || "/index.html");
  } catch (err) {
    console.error(err);

    if (status) {
      status.textContent = "Sign-in failed. Redirecting...";
    }

    setTimeout(() => {
      window.location.replace("/pages/auth.html?error=auth_failed");
    }, 1500);
  }
}

//   Google button
document.getElementById("google-btn")?.addEventListener("click", () => {
  window.location.href = `${CONFIG.API_BASE}/v1/auth/google`;
});

if (window.location.pathname.includes("auth.html")) {
  handleAuth();
}
