import api from "../core/api.js";

const Auth = {

  // 🔥 Get current authenticated user
  async getCurrentUser() {

    try {

      const res =
        await api.get("/v1/auth/me");

      return res.user;

    } catch {

      return null;

    }

  },

  // 🔥 Protect routes
  async requireAuth() {

    const user =
      await this.getCurrentUser();

    if (!user) {

      sessionStorage.setItem(
        "redirectAfterLogin",
        window.location.pathname
      );

      window.location.replace(
        "/front/pages/auth.html"
      );

      return null;

    }

    return user;

  },

  // 🔥 Logout
  async logout() {

    try {

      await api.post("/v1/auth/logout");

    } catch (err) {

      console.error(
        "Logout failed:",
        err
      );

    } finally {

      window.location.replace(
        "/front/index.html"
      );

    }

  },

};

export default Auth;
