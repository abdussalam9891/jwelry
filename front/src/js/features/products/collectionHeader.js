
import {
  collectionBannerConfig,
} from "./bannerConfig.js";

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
            class="
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-black/35
            "
          >
            Products
          </p>

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

        <select
          id="sortSelect"
          class="
  h-14

  min-w-[240px]

  px-6

  rounded-full

  border
  border-black/10

  bg-white

  text-sm
  font-medium

  text-black/75

  outline-none

  hover:border-[#6B1A2A]

  transition-all
  duration-300
"        >
          <option value="">
            Sort By
          </option>

          <option value="newest">
            Newest Arrivals
          </option>

          <option value="low">
            Price: Low to High
          </option>

          <option value="high">
            Price: High to Low
          </option>
        </select>

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

        <p
          class="
            uppercase
            tracking-[0.35em]
            text-[11px]
            text-white/80
            mb-4
          "
        >
          ${banner.eyebrow}
        </p>

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

        <p
          class="
            max-w-xl
            text-lg
            text-white/85
            leading-relaxed
          "
        >
          ${banner.description}
        </p>

      </div>

    </div>
  `;
}
