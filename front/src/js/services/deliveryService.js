import api from "../core/api.js";

export async function checkPincode(pincode) {
  const { data } = await api.get(`/v1/delivery/${pincode}`);

  return data;
}
