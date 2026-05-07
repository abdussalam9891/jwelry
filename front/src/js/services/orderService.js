import api from "../core/api.js";

export async function getMyOrders() {

  return await api.get(
    "/v1/orders/my-orders"
  );

}


export async function getOrderById(id) {

  return await api.get(
    `/v1/orders/${id}`
  );

}
