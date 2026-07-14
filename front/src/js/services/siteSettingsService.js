 

import api from "../core/api.js";

export async function getSiteSettings() {
  const response = await api.get("/v1/site-settings");

  return response.data;
}
