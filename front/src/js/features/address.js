import api from "../core/api.js";

export async function getAddresses() {

  return await api.get(
    "/v1/addresses"
  );

}

export async function createAddress(data) {

  return await api.post(
    "/v1/addresses",
    data
  );

}
