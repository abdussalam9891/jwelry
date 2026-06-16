export function renderActiveFilters() {
  const params =
    new URLSearchParams(
      window.location.search
    );

  const container =
    document.getElementById(
      "activeFilters"
    );

  const chips = [];

  for (const [
    key,
    value,
  ] of params.entries()) {
    if (
      key === "page" ||
      key === "sort"
    ) {
      continue;
    }

    chips.push(`
      <button
        class="
          active-filter
        "
        data-remove="${key}"
      >
        ${value}
        ×
      </button>
    `);
  }

  container.innerHTML =
    chips.join("");
}
