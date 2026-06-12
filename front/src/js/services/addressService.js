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

export async function updateAddress(
  id,
  data
) {
  return await api.put(
    `/v1/addresses/${id}`,
    data
  );
}

export async function deleteAddress(id) {
  return await api.delete(
    `/v1/addresses/${id}`
  );
}

export async function setDefaultAddress(
  id
) {
  return await api.patch(
    `/v1/addresses/${id}/default`
  );
}
