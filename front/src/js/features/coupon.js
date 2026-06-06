let appliedCoupon = null;

export function setAppliedCoupon(
  coupon
) {
  appliedCoupon = coupon;
}

export function getAppliedCoupon() {
  return appliedCoupon;
}

export function clearCoupon() {
  appliedCoupon = null;
}
