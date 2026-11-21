import api from "../api";

export function previewCheckout(data) {
  return api.post("/v1/orders/preview", data);
}

export function createOrder(data) {
  return api.post("/v1/orders", data);
}

export function getMyOrders() {
  return api.get("/v1/orders/my-orders");
}

export function getOrderById(id) {
  return api.get(`/v1/orders/${id}`);
}
