import api from "../core/api.js";

/* GET ANNOUNCEMENT BAR */

export async function getAnnouncementBar() {
  const res = await api.get("/v1/announcement");

  return res.data;
}
