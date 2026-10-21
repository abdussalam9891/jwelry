
import {
  collectionBannerConfig,
} from "./bannerConfig.js";
import {
  renderSort,

} from "../../features/products/sort.js";

export function renderCollectionHeader() {
  return `
    <div
      class="
        flex
        flex-col
        sm:flex-row
        sm:items-center
        justify-between
        gap-3
        sm:gap-6

        pb-6
      "
    >

      <!-- LEFT -->
      <h1
        id="pageTitle"
        class="
          text-2xl
          md:text-4xl
          font-light
          leading-tight
        "
      >
        All Jewellery
      </h1>

      <!-- RIGHT -->

      <div
        class="
          flex
          items-center
          justify-between
          gap-5
        "
      >

        <div
          class="
            shrink-0
            sm:text-right
          "
        >



          <p
            id="productCount"
            class="
  whitespace-nowrap
  text-xl
  sm:text-3xl
  font-light
  tracking-[-0.03em]
  text-black/80
"
          >
            0
          </p>

        </div>

       ${renderSort()}
      </div>

    </div>
  `;
}


export function renderCollectionBanner() {
  const category =
    new URLSearchParams(
      window.location.search
    ).get("category");

  const banner =
    collectionBannerConfig[
      category
    ] ||
    collectionBannerConfig.default;

  return `
    <div
      class="
        relative
        overflow-hidden
        rounded-[40px]
        h-[320px]
        md:h-[460px]
      "
    >

      <img
        src="${banner.image}"
        alt="${banner.title}"
        class="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      >

    </div>
  `;
}

