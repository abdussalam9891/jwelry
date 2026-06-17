export function updateFilters(params) {
  params.delete("page");

  window.location.search =
    params.toString();
}
