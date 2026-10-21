 import {
  jewelleryNavigation,
  collections,
  moreCategories,
} from "./navbarNavigation.js";

export function createCategoryNav() {
 const linksHTML = jewelleryNavigation
  .map((category) => {

    const productTypeLinks =
      category.productTypes
        .map(
          (type) => `
            <a
              href="/pages/products.html?category=${category.category}&productType=${type.value}"
              class="
                block
                py-2
                text-sm
                hover:text-[#6B1A2A]
                transition
              "
            >
              ${type.label}
            </a>
          `
        )
        .join("");

    const flyoutId = `flyout-${category.category}`;

    return `
      <li class="relative group">

      <a
  href="/pages/products.html?category=${category.category}"
  data-nav="${category.category}"
  class="
    mega-trigger
    text-[#6B1A2A]
    text-[0.95rem]
    font-medium
    relative
    transition-colors
    hover:text-[#6B1A2A]
    active-nav
  "
  aria-expanded="false"
  aria-controls="${flyoutId}"
>
  ${category.label}

  <span
    class="
      absolute
      bottom-[-4px]
      left-0
      w-0
      h-0.5
      bg-[#6B1A2A]
      group-hover:w-full
      transition-all
      duration-300
      nav-underline
    "
  ></span>
</a>

        <div
          id="${flyoutId}"
          class="
            mega-panel
            absolute
            top-full
            left-1/2
            -translate-x-1/2
            mt-4
            w-[420px]
            bg-white
            rounded-3xl
            shadow-[0_20px_80px_rgba(0,0,0,0.12)]
            border
            border-black/5
            p-6
            opacity-0
            invisible
            group-hover:opacity-100
            group-hover:visible
            group-focus-within:opacity-100
            group-focus-within:visible
            transition-all
            duration-300
            z-[var(--z-dropdown)]
          "
        >

          <div
            class="
              grid
              grid-cols-[1fr_140px]
              gap-6
              items-start
            "
          >

            <div>

              <p
                class="
                  text-[11px]
                  uppercase
                  tracking-[0.25em]
                  text-black/40
                  mb-4
                "
              >
                Shop By Type
              </p>

              ${productTypeLinks}

              <a
                href="/pages/products.html?category=${category.category}"
                class="
                  block
                  mt-4
                  pt-4
                  border-t
                  border-black/10
                  text-[#6B1A2A]
                  font-medium
                "
              >
                View All ${category.label}
              </a>

            </div>

            <div>

              <img
                src="${category.image}"
                class="
                  w-full
                  h-[140px]
                  object-cover
                  rounded-2xl
                "
              />

            </div>

          </div>

        </div>

      </li>
    `;
  })
  .join("");



const categoryCardsHTML = [...jewelleryNavigation, ...moreCategories]
  .map(
    (item) => `
      <a
        href="/pages/products.html?category=${item.category || item.slug}"
        class="
          group/cat
          p-1.5
          rounded-lg
          bg-[#FAF8F5]
          hover:bg-[#F6EEF0]
          transition
        "
      >

        <div class="overflow-hidden rounded-lg">
          <img
            src="${item.image}"
            class="
              w-full
              h-[76px]
              object-cover
              group-hover/cat:scale-105
              transition
              duration-700
            "
          >
        </div>

        <p
          class="
            mt-1.5
            text-center
            text-xs
            font-medium
          "
        >
          ${item.label}
        </p>

      </a>
    `
  )
  .join("");





    const collectionLinks =
  collections
    .map(
      (collection) => `
        <a
          href="/pages/collection.html?slug=${collection.slug}"
          class="
            block
            hover:text-[#6B1A2A]
            transition
          "
        >
          ${collection.name} Collection
        </a>
      `
    )
    .join("");

    const collectionCardsHTML = collections
  .map(
    (collection) => `
      <a
        href="/pages/collection.html?slug=${collection.slug}"
        class="group/card"
      >

        <div
          class="
            overflow-hidden
            rounded-2xl
          "
        >

          <img
            src="${collection.image}"
            class="
              w-full
              h-[80px]
              object-cover
              group-hover/card:scale-105
              transition
              duration-700
            "
          />

        </div>

        <h4
          class="
            mt-1.5
            text-sm
            font-light
          "
        >
          ${collection.name} Collection
        </h4>

      </a>
    `
  )
  .join("");

 return `
 <div
  id="categoryNav"
  class="
    hidden md:flex
    items-center
    justify-center
    gap-10
    px-6
    h-[44px]
    fixed
    top-[104px]
    left-0
    right-0
    bg-[#F9F6F2]
    z-[var(--z-navbar)]
    border-b
    border-black/10
    transition-[top]
    duration-300
  "
>

  <ul
    class="
      flex
      items-center
      justify-center
      gap-8
      list-none
    "
  >



<li class="group">

  <button
    type="button"
    data-nav="all-jewellery"
    class="
      mega-trigger
      text-[#1A1A1A]
      text-[0.95rem]
      font-medium
      hover:text-[#6B1A2A]
    "
    aria-expanded="false"
    aria-haspopup="true"
    aria-controls="flyout-all-jewellery"
  >
    All Jewellery
  </button>

  <div
   id="flyout-all-jewellery"
   class="
  mega-panel
  absolute
  top-full
  left-1/2
  -translate-x-1/2
  mt-4
  w-[1280px]
  max-w-[95vw]
  bg-white
  rounded-3xl
  shadow-[0_30px_100px_rgba(0,0,0,0.12)]
  border
  border-black/5
  p-5
  opacity-0
  invisible
  group-hover:opacity-100
  group-hover:visible
  group-focus-within:opacity-100
  group-focus-within:visible
  transition-all
  duration-300
  z-[var(--z-dropdown)]
"
  >

    <div class="flex flex-col gap-4">

      <!-- SHOP BY CATEGORY -->

      <div>

        <p
          class="
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-black/40
            mb-3
          "
        >
          Shop By Category
        </p>

        <div
          class="
            grid
            grid-cols-8
            gap-3
          "
        >
          ${categoryCardsHTML}
        </div>

      </div>

      <!-- COLLECTIONS + DISCOVER -->

      <div
        class="
          grid
          grid-cols-2
          gap-10
          pt-4
          border-t
          border-black/10
        "
      >

        <div>

          <p
            class="
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-black/40
              mb-3
            "
          >
            Collections
          </p>

          <div
            class="
              grid
              grid-cols-3
              gap-y-2
              gap-x-6
            "
          >
            ${collectionLinks}
          </div>

        </div>

        <div>

          <p
            class="
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-black/40
              mb-3
            "
          >
            Discover
          </p>

          <div
            class="
              grid
              grid-cols-3
              gap-y-2
              gap-x-6
            "
          >

            <a
              href="/pages/products.html?tag=best-seller"
              class="hover:text-[#6B1A2A]"
            >
              Best Sellers
            </a>

            <a
              href="/pages/products.html?tag=new"
              class="hover:text-[#6B1A2A]"
            >
              New Arrivals
            </a>

            <a
              href="/pages/products.html?tag=gifting"
              class="hover:text-[#6B1A2A]"
            >
              Gift Guide
            </a>

            <a
              href="/pages/products.html?maxPrice=5000"
              class="hover:text-[#6B1A2A]"
            >
              Under ₹5,000
            </a>

              <a
              href="/pages/products.html?maxPrice=10000"
              class="hover:text-[#6B1A2A]"
            >
              Under ₹10,000
            </a>

              <a
              href="/pages/products.html?maxPrice=2000"
              class="hover:text-[#6B1A2A]"
            >
              Under ₹2,000
            </a>

          </div>

        </div>

      </div>





    </div>

  </div>

</li>

${linksHTML}



    <!-- COLLECTIONS MEGA MENU -->
    <li class="group">

      <button
        type="button"
        class="
          mega-trigger
          text-[#1A1A1A]
          text-[0.95rem]
          font-medium
          hover:text-[#6B1A2A]
        "
        aria-expanded="false"
        aria-haspopup="true"
        aria-controls="flyout-collections"
      >
        Collections
      </button>

      <div
 id="flyout-collections"
 class="
  mega-panel
  absolute
  top-full
  right-0
  mt-4
  w-[620px]
  max-w-[85vw]
  bg-white
  rounded-2xl
  shadow-[0_30px_100px_rgba(0,0,0,0.12)]
  border
  border-black/5
  p-5
  opacity-0
  invisible
  group-hover:opacity-100
  group-hover:visible
  group-focus-within:opacity-100
  group-focus-within:visible
  transition-all
  duration-300
  z-[var(--z-dropdown)]
"
>



  <div
  class="
    grid
    grid-cols-3
    gap-4
  "
>
  ${collectionCardsHTML}
</div>







</div>

    </li>

  </ul>

</div>
 `;
}





































































































