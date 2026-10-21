import api from "../core/api.js";

export async function getAvailableCoupons(
  subtotal
) {
  return await api.get(
    `/v1/coupons?subtotal=${subtotal}`
  );
}

export async function validateCoupon(
  code,
  subtotal
) {
  return await api.post(
    "/v1/coupons/validate",
    {
      code,
      subtotal,
    }
  );
}

export async function getMyCouponRedemptions() {
  return await api.get(
    "/v1/coupons/my-redemptions"
  );
}
