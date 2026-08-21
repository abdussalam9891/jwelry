
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
        items-center
        justify-end
        gap-6

        pb-6
      "
    >

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

    </div>
  `;
}

