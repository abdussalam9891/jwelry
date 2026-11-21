import api from "../api";

export function getAvailableCoupons(subtotal) {
  return api.get(`/v1/coupons?subtotal=${subtotal}`);
}
