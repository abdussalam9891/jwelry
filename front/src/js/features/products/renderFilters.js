
import {
  filterConfig,
} from "../../features/filterConfig.js";

export function renderCategoryFilters() {
  const container =
    document.getElementById(
      "categoryFilters"
    );

  if (!container) return;

  container.innerHTML = `
    <div class="mb-6">

      <p
        class="
          uppercase
          tracking-[0.28em]
          text-[11px]
          text-black/40
          mb-2
        "
      >
        Browse By
      </p>

      <h3
        class="
          text-2xl
          md:text-3xl
          font-light
          text-black
        "
      >
        Categories
      </h3>

    </div>

    <div
      class="
        flex
        flex-wrap
        gap-3
      "
    >
      ${filterConfig.categories
        .map(
          (item) => `
            <label
              class="
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
                class="peer hidden"
              >

              <span
                class="
                  inline-flex
                  items-center
                  justify-center

                  h-11
                  px-5

                  rounded-full

                  bg-[#FAF8F6]

                  border
                  border-[#E7DED7]

                  text-sm
                  font-medium
                  text-black/75

                  transition-all
                  duration-300

                  hover:border-[#6B1A2A]
                  hover:text-[#6B1A2A]
                  hover:-translate-y-[1px]

                  peer-checked:bg-[#6B1A2A]
                  peer-checked:border-[#6B1A2A]
                  peer-checked:text-white

                  peer-checked:shadow-[0_8px_24px_rgba(107,26,42,0.18)]
                "
              >
                ${item.label}
              </span>
            </label>
          `
        )
        .join("")}
    </div>
  `;
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
        (
          item.category ||
          item.slug
        ) === category
    );

  if (
    !categoryData ||
    !categoryData.productTypes
      ?.length
  ) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <div class="mb-6">

      <p
        class="
          uppercase
          tracking-[0.28em]
          text-[11px]
          text-black/40
          mb-2
        "
      >
        Browse By
      </p>

      <h3
        class="
          text-2xl
          md:text-3xl
          font-light
          text-black
        "
      >
        Product Type
      </h3>

    </div>

    <div
      class="
        flex
        flex-wrap
        gap-3
      "
    >
      ${categoryData.productTypes
        .map(
          (type) => `
            <label
              class="
                cursor-pointer
              "
            >
              <input
                type="radio"
                name="productType"
                value="${type.value}"
                class="peer hidden"
              >

              <span
                class="
                  inline-flex
                  items-center
                  justify-center

                  h-11
                  px-5

                  rounded-full

                  bg-[#FAF8F6]

                  border
                  border-[#E7DED7]

                  text-sm
                  font-medium
                  text-black/75

                  transition-all
                  duration-300

                  hover:border-[#6B1A2A]
                  hover:text-[#6B1A2A]
                  hover:-translate-y-[1px]

                  peer-checked:bg-[#6B1A2A]
                  peer-checked:border-[#6B1A2A]
                  peer-checked:text-white

                  peer-checked:shadow-[0_8px_24px_rgba(107,26,42,0.18)]
                "
              >
                ${type.label}
              </span>
            </label>
          `
        )
        .join("")}
    </div>
  `;
}



// export function renderStyleFilters() {
//   const container =
//     document.getElementById(
//       "styleFilters"
//     );

//   if (!container) return;

//   container.innerHTML = `
//     <div class="mb-6">

//       <p
//         class="
//           uppercase
//           tracking-[0.28em]
//           text-[11px]
//           text-black/40
//           mb-2
//         "
//       >
//         Browse By
//       </p>

//       <h3
//         class="
//           text-2xl
//           md:text-3xl
//           font-light
//           text-black
//         "
//       >
//         Style
//       </h3>

//     </div>

//     <div
//       class="
//         flex
//         flex-wrap
//         gap-3
//       "
//     >
//       ${filterConfig.styles
//         .map(
//           (style) => `
//             <label
//               class="
//                 cursor-pointer
//               "
//             >
//               <input
//                 type="checkbox"
//                 name="style"
//                 value="${style.value}"
//                 class="peer hidden"
//               >

//               <span
//                 class="
//                   inline-flex
//                   items-center
//                   justify-center

//                   h-11
//                   px-5

//                   rounded-full

//                   bg-[#FAF8F6]

//                   border
//                   border-[#E7DED7]

//                   text-sm
//                   font-medium
//                   text-black/75

//                   transition-all
//                   duration-300

//                   hover:border-[#6B1A2A]
//                   hover:text-[#6B1A2A]
//                   hover:-translate-y-[1px]

//                   peer-checked:bg-[#6B1A2A]
//                   peer-checked:border-[#6B1A2A]
//                   peer-checked:text-white

//                   peer-checked:shadow-[0_8px_24px_rgba(107,26,42,0.18)]
//                 "
//               >
//                 ${style.label}
//               </span>
//             </label>
//           `
//         )
//         .join("")}
//     </div>
//   `;
// }


export function renderStyleFilters() {
  const container =
    document.getElementById(
      "styleFilters"
    );

  if (!container) return;

  container.innerHTML = `
    <div class="mb-6">

      <p
        class="
          uppercase
          tracking-[0.28em]
          text-[11px]
          text-black/40
          mb-2
        "
      >
        Browse By
      </p>

      <h3
        class="
          text-2xl
          md:text-3xl
          font-light
          text-black
        "
      >
        Style
      </h3>

    </div>

    <div
      class="
        flex
        flex-wrap
        gap-3
        mb-8
      "
    >
      ${filterConfig.styles
        .map(
          (style) => `
            <label
              class="
                cursor-pointer
              "
            >
              <input
                type="checkbox"
                name="style"
                value="${style.value}"
                class="peer hidden"
              >

              <span
                class="
                  inline-flex
                  items-center
                  justify-center

                  h-11
                  px-5

                  rounded-full

                  bg-[#FAF8F6]

                  border
                  border-[#E7DED7]

                  text-sm
                  font-medium
                  text-black/75

                  transition-all
                  duration-300

                  hover:border-[#6B1A2A]
                  hover:text-[#6B1A2A]

                  peer-checked:bg-[#6B1A2A]
                  peer-checked:border-[#6B1A2A]
                  peer-checked:text-white

                  peer-checked:shadow-[0_8px_24px_rgba(107,26,42,0.18)]
                "
              >
                ${style.label}
              </span>
            </label>
          `
        )
        .join("")}
    </div>

    <div
      class="
        flex
        items-center
        gap-3
      "
    >
      <button
        id="applyStyleFilters"
        class="
          h-11
          px-6

          rounded-full

          bg-[#6B1A2A]
          text-white

          text-sm
          font-medium

          hover:opacity-90

          transition
        "
      >
        Apply Filters
      </button>
    </div>
  `;
}


export function renderAllFilters() {
  renderCategoryFilters();

  renderStyleFilters();

  const params =
    new URLSearchParams(
      window.location.search
    );

  const category =
    params.get(
      "category"
    );

  if (category) {
    renderProductTypes(
      category
    );
  } else {
    const container =
      document.getElementById(
        "productTypeFilters"
      );

    if (container) {
      container.innerHTML =
        "";
    }
  }
}



export function renderFilterDropdowns() {
  return `
    <div
      id="categoryPanel"
      class="
        hidden

        bg-white

        border-b
        border-black/5

        shadow-[0_16px_50px_rgba(0,0,0,0.05)]

        px-8
        py-8
      "
    >
      <div
        class="
          max-w-7xl
          mx-auto
        "
      >
        <div id="categoryFilters"></div>
      </div>
    </div>

    <div
      id="stylePanel"
      class="
        hidden

        bg-white

        border-b
        border-black/5

        shadow-[0_16px_50px_rgba(0,0,0,0.05)]

        px-8
        py-8
      "
    >
      <div
        class="
          max-w-7xl
          mx-auto
        "
      >
        <div id="styleFilters"></div>
      </div>
    </div>

    <div
      id="productTypePanel"
      class="
        hidden

        bg-white

        border-b
        border-black/5

        shadow-[0_16px_50px_rgba(0,0,0,0.05)]

        px-8
        py-8
      "
    >
      <div
        class="
          max-w-7xl
          mx-auto
        "
      >
        <div id="productTypeFilters"></div>
      </div>
    </div>
  `;
}



