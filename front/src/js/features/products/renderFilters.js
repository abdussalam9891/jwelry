 
import {
  filterConfig,
} from "../../features/filterConfig.js";

export function renderCategoryFilters() {
  const container =
    document.getElementById(
      "categoryFilters"
    );

  if (!container) return;

  container.innerHTML =
    filterConfig.categories
      .map(
        (item) => `
          <label
            class="
              flex
              items-center
              gap-3
              cursor-pointer
            "
          >
            <input
              type="radio"
              name="category"
              value="${
                item.category ||
                item.slug
              }"
            >

            <span>
              ${item.label}
            </span>

          </label>
        `
      )
      .join("");
}

export function renderMaterialFilters() {
  const container =
    document.getElementById(
      "materialFilters"
    );

  if (!container) return;

  container.innerHTML =
    filterConfig.materials
      .map(
        (material) => `
          <label
            class="
              flex
              items-center
              gap-3
              cursor-pointer
            "
          >
            <input
              type="radio"
              name="material"
              value="${material}"
            >

            <span>
              ${material}
            </span>

          </label>
        `
      )
      .join("");
}

export function renderStyleFilters() {
  const container =
    document.getElementById(
      "styleFilters"
    );

  if (!container) return;

  container.innerHTML =
    filterConfig.styles
      .map(
        (style) => `
          <label
            class="
              flex
              items-center
              gap-3
              cursor-pointer
            "
          >
            <input
              type="checkbox"
              name="style"
              value="${style.value}"
            >

            <span>
              ${style.label}
            </span>

          </label>
        `
      )
      .join("");
}

export function renderProductTypes(
  category
) {
  const container =
    document.getElementById(
      "productTypeFilters"
    );

  if (!container) return;

  const categoryData =
    filterConfig.categories.find(
      (item) =>
        item.category ===
        category
    );

  if (!categoryData) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML =
    categoryData.productTypes
      .map(
        (type) => `
          <label
            class="
              flex
              items-center
              gap-3
              cursor-pointer
            "
          >
            <input
              type="radio"
              name="productType"
              value="${type.value}"
            >

            <span>
              ${type.label}
            </span>

          </label>
        `
      )
      .join("");
}

export function renderAllFilters() {
  renderCategoryFilters();

  renderMaterialFilters();

  renderStyleFilters();

  const category =
    new URLSearchParams(
      window.location.search
    ).get("category");

  renderProductTypes(
    category
  );
}

