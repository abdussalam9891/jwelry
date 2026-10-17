import api from "../api";

export function getAddresses() {
  return api.get("/v1/addresses");
}

export function createAddress(data) {
  return api.post("/v1/addresses", data);
}

export function updateAddress(id, data) {
  return api.put(`/v1/addresses/${id}`, data);
}

export function deleteAddress(id) {
  return api.delete(`/v1/addresses/${id}`);
}

export function setDefaultAddress(id) {
  return api.patch(`/v1/addresses/${id}/default`);
}
