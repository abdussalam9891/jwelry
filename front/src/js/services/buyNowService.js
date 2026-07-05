export async function createBuyNowPreview(
  productId,
  variantId,
  quantity = 1
) {
  return await api.post("/v1/buy-now/preview", {
    productId,
    variantId,
    quantity,
  });
}

export async function createBuyNowOrder(payload) {
  return await api.post("/v1/buy-now/order", payload);
}
