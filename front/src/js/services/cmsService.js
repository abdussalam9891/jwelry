 

import api from "../core/api.js";

export async function getCMSPage(slug) {
  const res = await api.get(`/v1/cms/${slug}`);

  return res.data;
}
