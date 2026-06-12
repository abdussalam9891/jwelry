import { navLinks } from "./navLinks.js";
import { collections } from "./collections.js";

export function createCategoryNav() {
  const linksHTML = navLinks
    .map((link) => {
      const href = link.slug
        ? `/pages/products.html?category=${link.slug}`
        : "/pages/products.html";

      return `
      <li>
        <a
          href="${href}"
          data-nav="${link.nav}"
          class="text-[#1A1A1A] text-[0.95rem] font-medium relative group transition-colors duration-250 hover:text-[#6B1A2A]"
        >
          ${link.label}

          <span
            class="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#6B1A2A] group-hover:w-full transition-all duration-250"
          ></span>
        </a>
      </li>
    `;
    })
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
    left-0
    right-0
    bg-[#F9F6F2]
    z-[999]
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



<li class="relative group">

  <button
    data-nav="all-jewellery"
    class="
      text-[#1A1A1A]
      text-[0.95rem]
      font-medium
      hover:text-[#6B1A2A]
    "
  >
    All Jewellery
  </button>

<div
  class="
    absolute
    top-full
    left-[-120px]
    mt-4
    w-[1100px]
    max-w-[90vw]
    bg-white
    rounded-[32px]
    shadow-[0_30px_100px_rgba(0,0,0,0.12)]
    border
    border-black/5
    p-10
    opacity-0
    invisible
    group-hover:opacity-100
    group-hover:visible
    transition-all
    duration-300
    z-50
  "
>

  <div
    class="
      grid
      grid-cols-[1.3fr_1fr_1fr_1.8fr]
      gap-10
    "
  >

    <!-- SHOP BY CATEGORY -->

    <div>

      <p
        class="
          text-[11px]
          uppercase
          tracking-[0.3em]
          text-black/40
          mb-6
        "
      >
        Shop By Category
      </p>

      <div class="grid grid-cols-2 gap-4">

        <a
          href="/pages/products.html?category=rings"
          class="
            group
            p-4
            rounded-2xl
            bg-[#FAF8F5]
            hover:bg-[#F6EEF0]
            transition
          "
        >
          <img
            src="/src/assets/images/ringNav.webp"
            class="
              w-full
              h-24
              object-cover
              rounded-xl
              mb-3
            "
          >

          <p class="font-medium">
            Rings
          </p>
        </a>

        <a
          href="/pages/products.html?category=necklaces"
          class="
            group
            p-4
            rounded-2xl
            bg-[#FAF8F5]
            hover:bg-[#F6EEF0]
            transition
          "
        >
          <img
            src="/src/assets/images/necklaceNav.webp"
            class="
              w-full
              h-24
              object-cover
              rounded-xl
              mb-3
            "
          >

          <p class="font-medium">
            Necklaces
          </p>
        </a>

        <a
          href="/pages/products.html?category=earrings"
          class="
            group
            p-4
            rounded-2xl
            bg-[#FAF8F5]
            hover:bg-[#F6EEF0]
            transition
          "
        >
          <img
            src="/src/assets/images/earringNav.webp"
            class="
              w-full
              h-24
              object-cover
              rounded-xl
              mb-3
            "
          >

          <p class="font-medium">
            Earrings
          </p>
        </a>

        <a
          href="/pages/products.html?category=bracelets"
          class="
            group
            p-4
            rounded-2xl
            bg-[#FAF8F5]
            hover:bg-[#F6EEF0]
            transition
          "
        >
          <img
            src="/src/assets/images/braceletNav.webp"
            class="
              w-full
              h-24
              object-cover
              rounded-xl
              mb-3
            "
          >

          <p class="font-medium">
            Bracelets
          </p>
        </a>

      </div>

    </div>

    <!-- COLLECTIONS -->

    <div>

      <p
        class="
          text-[11px]
          uppercase
          tracking-[0.3em]
          text-black/40
          mb-6
        "
      >
        Collections
      </p>

      <div class="space-y-4">

        ${collectionLinks}

      </div>

    </div>

    <!-- DISCOVER -->

    <div>

      <p
        class="
          text-[11px]
          uppercase
          tracking-[0.3em]
          text-black/40
          mb-6
        "
      >
        Discover
      </p>

      <div class="space-y-4">

        <a
          href="/pages/products.html?tag=best-seller"
          class="block hover:text-[#6B1A2A]"
        >
          Best Sellers
        </a>

        <a
          href="/pages/products.html?tag=new"
          class="block hover:text-[#6B1A2A]"
        >
          New Arrivals
        </a>

        <a
          href="/pages/products.html?tag=gifting"
          class="block hover:text-[#6B1A2A]"
        >
          Gift Guide
        </a>

        <a
          href="/pages/products.html?price=5000"
          class="block hover:text-[#6B1A2A]"
        >
          Under ₹5,000
        </a>

      </div>

    </div>

    <!-- EDITORIAL BANNER -->

    <a
      href="/pages/collection.html?slug=bridal"
      class="
        relative
        overflow-hidden
        rounded-[28px]
        group/banner
      "
    >

      <img
        src="/src/assets/images/bridal.jpg"
        class="
          w-full
          h-[340px]
          object-cover
          group-hover/banner:scale-105
          transition
          duration-700
        "
      >

      <div
        class="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/70
          via-black/20
          to-transparent
        "
      ></div>

      <div
        class="
          absolute
          bottom-8
          left-8
          text-white
        "
      >

        <p
          class="
            text-[11px]
            uppercase
            tracking-[0.25em]
            mb-3
          "
        >
          Featured Collection
        </p>

        <h3
          class="
            text-3xl
            font-light
            mb-2
          "
        >
          Bridal Collection
        </h3>

        <p class="text-white/80">
          Crafted for unforgettable moments
        </p>

      </div>

    </a>

  </div>

</div>

</li>

${linksHTML}



    <!-- COLLECTIONS MEGA MENU -->
    <li class="relative group">

      <button
        class="
          text-[#1A1A1A]
          text-[0.95rem]
          font-medium
          hover:text-[#6B1A2A]
        "
      >
        Collections
      </button>

      <div
 class="
  absolute
  top-full
  right-0
  mt-4
  w-[1000px]
  max-w-[90vw]
  bg-white
  rounded-[32px]
  shadow-[0_30px_100px_rgba(0,0,0,0.12)]
  border
  border-black/5
  p-8
  opacity-0
  invisible
  group-hover:opacity-100
  group-hover:visible
  transition-all
  duration-300
  z-50
"
>

  <div
    class="
      grid
      grid-cols-3
      gap-6
    "
  >

    <!-- BRIDAL -->

    <a
      href="/pages/collection.html?slug=bridal"
      class="group/card"
    >

      <div
        class="
          overflow-hidden
          rounded-3xl
        "
      >

        <img
          src="/src/assets/images/bridal.jpg"
          class="
            w-full
            h-[160px]
            object-cover
            group-hover/card:scale-105
            transition
            duration-700
          "
        />

      </div>

      <h4
        class="
          mt-4
          text-xl
          font-light
        "
      >
        Bridal Collection
      </h4>

      <p
        class="
          text-sm
          text-black/55
          mt-2
        "
      >
        Designed for life's biggest moments
      </p>

    </a>

    <!-- LUXURY -->

    <a
      href="/pages/collection.html?slug=luxury"
      class="group/card"
    >

      <div
        class="
          overflow-hidden
          rounded-3xl
        "
      >

        <img
          src="/src/assets/images/luxury.jpg"
          class="
            w-full
            h-[160px]
            object-cover
            group-hover/card:scale-105
            transition
            duration-700
          "
        />

      </div>

      <h4
        class="
          mt-4
          text-xl
          font-light
        "
      >
        Luxury Collection
      </h4>

      <p
        class="
          text-sm
          text-black/55
          mt-2
        "
      >
        Statement pieces crafted to stand out
      </p>

    </a>

    <!-- MINIMAL -->

    <a
      href="/pages/collection.html?slug=minimal"
      class="group/card"
    >

      <div
        class="
          overflow-hidden
          rounded-3xl
        "
      >

        <img
          src="/src/assets/images/minimal.jpg"
          class="
            w-full
            h-[160px]
            object-cover
            group-hover/card:scale-105
            transition
            duration-700
          "
        />

      </div>

      <h4
        class="
          mt-4
          text-xl
          font-light
        "
      >
        Minimal Collection
      </h4>

      <p
        class="
          text-sm
          text-black/55
          mt-2
        "
      >
        Everyday elegance with timeless simplicity
      </p>

    </a>


     <!-- wedding -->

    <a
  href="/pages/collection.html?slug=wedding"
  class="group/card"
>

  <div
    class="
      overflow-hidden
      rounded-3xl
    "
  >

    <img
      src="/src/assets/images/wedding.jpg"
      class="
        w-full
        h-[160px]
        object-cover
        group-hover/card:scale-105
        transition
        duration-700
      "
    />

  </div>

  <h4
    class="
      mt-4
      text-xl
      font-light
    "
  >
    Wedding Collection
  </h4>

  <p
    class="
      text-sm
      text-black/55
      mt-2
    "
  >
    Crafted to celebrate forever
  </p>

</a>



<!-- engagement -->

<a
  href="/pages/collection.html?slug=engagement"
  class="group/card"
>

  <div
    class="
      overflow-hidden
      rounded-3xl
    "
  >

    <img
      src="/src/assets/images/engagement.jpg"
      class="
        w-full
        h-[160px]
        object-cover
        group-hover/card:scale-105
        transition
        duration-700
      "
    />

  </div>

  <h4
    class="
      mt-4
      text-xl
      font-light
    "
  >
    Engagement Collection
  </h4>

  <p
    class="
      text-sm
      text-black/55
      mt-2
    "
  >
    Made for unforgettable proposals
  </p>

</a>




  </div>




</div>

    </li>

  </ul>

</div>
 `;
}




















































