import api from "../core/api.js";

export async function getPaymentConfig() {
  return await api.get(
    "/v1/payment/config"
  );
}

export async function verifyPayment(
  data
) {
  return await api.post(
    "/v1/payment/verify",
    data
  );
}

export async function paymentFailed(
  orderId
) {
  return await api.post(
    "/v1/payment/failed",
    {
      orderId,
    }
  );
}
