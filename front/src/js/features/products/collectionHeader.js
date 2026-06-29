
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
        lg:flex-row
        lg:items-end
        lg:justify-between
        gap-6

        pb-6
      "
    >

      <!-- LEFT -->

      <div class="max-w-3xl">



        <h1
          id="pageTitle"
          class="
            text-5xl
            md:text-7xl
            font-light
            leading-none
            tracking-[-0.04em]
          "
        >
          All Jewellery
        </h1>

        <p
          class="
            mt-4
            text-lg
            md:text-xl
            text-black/55
            leading-relaxed
            max-w-2xl
          "
        >
          Discover timeless pieces crafted with exceptional materials,
          designed to be worn every day and treasured forever.
        </p>

      </div>

      <!-- RIGHT -->

      <div
        class="
          flex
          items-center
          gap-5
        "
      >

        <div
          class="
            text-right
          "
        >



          <p
            id="productCount"
            class="
  text-3xl
  font-light
  tracking-[-0.03em]
  text-black/80
"
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

      <div
        class="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/65
          via-black/35
          to-transparent
        "
      ></div>

      <div
        class="
          absolute
          left-8
          md:left-14
          bottom-8
          md:bottom-14
          text-white
        "
      >



        <h2
          class="
            text-5xl
            md:text-7xl
            font-light
            leading-[0.95]
            tracking-[-0.04em]
            mb-5
          "
        >
          ${banner.title}
        </h2>



      </div>

    </div>
  `;
}

