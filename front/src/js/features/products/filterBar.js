import {
  filterConfig,
} from "../../features/filterConfig.js";

export function renderFilterBar() {
 const params =
  new URLSearchParams(
    window.location.search
  );

const selectedCategory =
  params.get("category");

const selectedProductType =
  params.get("productType");

const selectedStyles =
  params.get("style")
    ?.split(",")
    .filter(Boolean) || [];

const categoryData =
  filterConfig.categories.find(
    (item) =>
      (
        item.category ||
        item.slug
      ) === selectedCategory
  );

const showProductType =
  categoryData?.productTypes
    ?.length;

/* ---------- LABELS ---------- */

const categoryLabel =
  categoryData?.label ||
  "Category";

const productTypeLabel =
  categoryData
    ?.productTypes
    ?.find(
      (type) =>
        type.value ===
        selectedProductType
    )?.label ||
  "Product Type";

let styleLabel =
  "Style";

if (
  selectedStyles.length === 1
) {
  styleLabel =
    filterConfig.styles.find(
      (style) =>
        style.value ===
        selectedStyles[0]
    )?.label || "Style";
}

if (
  selectedStyles.length > 1
) {
  const firstStyle =
    filterConfig.styles.find(
      (style) =>
        style.value ===
        selectedStyles[0]
    )?.label;

  styleLabel =
    `${firstStyle} +${
      selectedStyles.length -
      1
    }`;
}


const activeBtn = `
  bg-[#F8F3F0]
  border
  border-[#6B1A2A]/20
  text-[#6B1A2A]
  shadow-[0_6px_20px_rgba(107,26,42,0.08)]
`;

const defaultBtn = `
  bg-white
  border
  border-[#E8DFD8]
  text-black/70
  hover:border-[#6B1A2A]/25
  hover:text-[#6B1A2A]
  hover:bg-[#FCFAF8]
`;

  return `
    <div
      class="
        flex
        items-center
        justify-between
        gap-4

        py-2

        border-y
        border-black/8

        bg-white
      "
    >

      <div
        class="
          flex
          items-center
          gap-3
          overflow-x-auto
          no-scrollbar
        "
      >

        <!-- CATEGORY -->

        <button
          class="
            group
            h-11
            px-5

            inline-flex
            items-center
            gap-2

            rounded-full

            ${
              selectedCategory
                ? activeBtn
                : defaultBtn
            }

            text-sm
            font-medium

            transition-all
            duration-300
          "
          data-dropdown="category"
        >
          ${categoryLabel}

          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <!-- PRODUCT TYPE -->

        ${
          showProductType
            ? `
            <button
              class="
                group
                h-11
                px-5

                inline-flex
                items-center
                gap-2

                rounded-full

                ${
                  selectedProductType
                    ? activeBtn
                    : defaultBtn
                }

                text-sm
                font-medium

                transition-all
                duration-300
              "
              data-dropdown="productType"
            >
             ${productTypeLabel}

              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          `
            : ""
        }

        <!-- STYLE -->

        <button
          class="
            group
            h-11
            px-5

            inline-flex
            items-center
            gap-2

            rounded-full

            selectedStyles.length
  ? activeBtn
  : defaultBtn

            text-sm
            font-medium

            transition-all
            duration-300
          "
          data-dropdown="style"
        >
         ${styleLabel}

          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

      </div>

      <div
        class="
          flex
          items-center
          gap-5
        "
      >
 <button
  id="clearFilters"
  class="
    relative

    text-sm
    font-medium

    text-black/45

    hover:text-[#6B1A2A]

    transition-all
    duration-300

    after:absolute
    after:left-0
    after:-bottom-1

    after:h-px
    after:w-0

    after:bg-[#6B1A2A]

    hover:after:w-full

    after:transition-all
    after:duration-300
  "
>
  Clear All
</button>
      </div>

    </div>
  `;
}
