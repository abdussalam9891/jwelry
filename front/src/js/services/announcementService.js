import api from "./api.js";

export async function getAnnouncements() {
  return api.get("/announcements");
}
