import api from "../core/api.js";





export async function getHeroBanners() {
  const response = await api.get("/v1/hero-banners");

  return response.data.map((banner) => ({
    id: banner._id,
    title: banner.title,

    desktopImage: banner.image.desktop.url,

    mobileImage:
      banner.image.mobile?.url ||
      banner.image.desktop.url,

    navigationTarget: banner.navigationTarget,

    isActive: banner.isActive,

    startDate: banner.startDate,

    endDate: banner.endDate,
  }));
}
