import api from "../core/api.js";

export async function getHeroBanners() {
  return await api.get("/v1/hero-banners");
}
