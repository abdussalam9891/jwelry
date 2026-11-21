import api from "../api";

export async function getAnnouncementBar() {
  const res = await api.get("/v1/announcement");
  return res?.data;
}

export async function getSiteSettings() {
  const res = await api.get("/v1/site-settings");
  return res?.data;
}

export async function getCMSPage(slug) {
  const res = await api.get(`/v1/cms/${slug}`);
  return res?.data;
}

export async function getHeroBanners() {
  const response = await api.get("/v1/hero-banners");

  return (response?.data || []).map((banner) => ({
    id: banner._id,
    title: banner.title,
    desktopImage: banner.image.desktop.url,
    mobileImage: banner.image.mobile?.url || banner.image.desktop.url,
    navigationTarget: banner.navigationTarget,
  }));
}

export function subscribeNewsletter(email) {
  return api.post("/v1/newsletter/subscribe", { email });
}

export function submitContactForm(payload) {
  return api.post("/v1/contact", payload);
}

export async function checkPincode(pincode) {
  const res = await api.get(`/v1/delivery/${pincode}`);
  return res?.data;
}
