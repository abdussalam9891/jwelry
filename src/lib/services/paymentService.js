import api from "../api";

export function verifyPayment(data) {
  return api.post("/v1/payment/verify", data);
}

export function paymentFailed(orderId) {
  return api.post("/v1/payment/failed", { orderId });
}
