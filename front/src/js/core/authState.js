import api from "../core/api.js";

export async function getCurrentUser() {

  try {

    const res =
      await api.get("/v1/auth/me");

    return res.user;

  } catch {

    return null;

  }

}

export async function logout() {

  try {

    await api.post("/v1/auth/logout");

  } finally {

    window.location.href =
      "/front/index.html";

  }

}
