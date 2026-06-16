
import {
  getProducts,
} from "../../services/productService.js";

import {
  createProductCard,
} from "../../components/productCard.js";

import {
  loadWishlistState,
} from "../wishlist.js";

import {
  renderPagination,
} from "../../features/products/pagination.js";

import {
  updateProductCount,
} from "./productCount.js";

const grid =
  document.getElementById(
    "productsGrid"
  );

function showLoading() {
  if (!grid) return;

  grid.innerHTML = `
    <div
      class="
        col-span-full
        py-16
        text-center
        text-black/50
      "
    >
      Loading products...
    </div>
  `;
}

function showError() {
  if (!grid) return;

  grid.innerHTML = `
    <div
      class="
        col-span-full
        py-16
        text-center
        text-red-500
      "
    >
      Something went wrong.
    </div>
  `;
}

function showEmpty() {
  if (!grid) return;

  const search =
    new URLSearchParams(
      window.location.search
    )
      .get("search")
      ?.trim() || "";

  grid.innerHTML = `
    <div
      class="
        col-span-full
        flex
        flex-col
        items-center
        justify-center
        py-20
        text-center
      "
    >

      <p
        class="
          text-lg
          font-medium
        "
      >
        ${
          search
            ? `No results for "${search}"`
            : "No products found"
        }
      </p>

      <p
        class="
          mt-2
          text-black/50
        "
      >
        Try another search
        or filter.
      </p>

    </div>
  `;
}

export async function loadProducts() {
  if (!grid) return;

  try {
    showLoading();

    const params =
      Object.fromEntries(
        new URLSearchParams(
          window.location.search
        )
      );

    const data =
      await getProducts(
        params
      );

    const products =
      data?.products || [];

    updateProductCount(
      data?.totalProducts ||
        products.length
    );

    if (
      !Array.isArray(
        products
      ) ||
      products.length === 0
    ) {
      showEmpty();

      renderPagination(
        1,
        0
      );

      return;
    }

    grid.innerHTML =
      products
        .map((product) =>
          createProductCard(
            product,
            {
              showWishlistButton:
                true,
            }
          )
        )
        .join("");

    await loadWishlistState();

    renderPagination(
      data.page || 1,
      data.totalPages ||
        1
    );
  } catch (error) {
    console.error(
      "[loadProducts]",
      error
    );

    showError();
  }
}

