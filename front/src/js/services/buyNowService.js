import api from "../core/api.js";

export async function createBuyNowPreview(
  productId,
  variantId,
  quantity = 1
) {
  const { data } = await api.post("/v1/buy-now/preview", {
    productId,
    variantId,
    quantity,
  });

  return data;
}

export async function createBuyNowOrder(payload) {
  const { data } = await api.post("/v1/buy-now/order", payload);

  return data;
}
