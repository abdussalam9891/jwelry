export function renderFilterBar() {
  return `
    <div
      class="
        hidden
        md:flex
        justify-between
        mb-6
      "
    >

      <div
        class="
          flex
          gap-3
          flex-wrap
        "
      >

        <button
          class="filter-pill"
          data-dropdown="category"
        >
          Category
        </button>

        <button
          class="filter-pill"
          data-dropdown="material"
        >
          Material
        </button>

        <button
          class="filter-pill"
          data-dropdown="style"
        >
          Style
        </button>

        <button
          class="filter-pill"
          data-dropdown="price"
        >
          Price
        </button>

      </div>

      <button
        id="clearFilters"
      >
        Clear All
      </button>

    </div>
  `;
}
