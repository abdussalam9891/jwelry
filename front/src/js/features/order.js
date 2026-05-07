import api from "../core/api.js";

export async function createOrder(data) {

  return await api.post(
    "/v1/orders",
    data
  );

}
