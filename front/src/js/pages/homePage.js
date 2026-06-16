import {
  loadTestimonials,
} from "../features/homeTestimonials.js";

import {
  jewelleryNavigation,
  moreCategories,
  collections,
} from "../components/navbar/navbarNavigation.js";


const homepageCategories = [
  ...jewelleryNavigation,
  ...moreCategories,
];

function renderHomepageCategories() {
  const container =
    document.getElementById("homepageCategories");

  if (!container) return;

  container.innerHTML = homepageCategories
    .map(
      (category) => `
        <div class="text-center">

          <a
            href="./pages/products.html?category=${category.category}"
            class="block group"
          >

            <div
              class="
                overflow-hidden
                rounded-xl
                mb-3
                md:mb-4
              "
            >

              <img
                src="${category.image}"
                alt="${category.label}"
                class="
                  w-full
                  h-[180px]
                  sm:h-[220px]
                  md:h-[260px]
                  lg:h-[300px]
                  object-cover
                  transition
                  duration-500
                  ease-out
                  group-hover:scale-105
                "
              />

            </div>

            <h3
              class="
                text-base
                sm:text-lg
                md:text-xl
                font-light
                text-[#1A1A1A]
                transition
                duration-300
                group-hover:text-[#6B1A2A]
              "
            >
              ${category.label}
            </h3>

          </a>

        </div>
      `
    )
    .join("");
}


function renderCollections() {
  const container =
    document.getElementById("homepageCollections");

  if (!container) return;

  container.innerHTML = collections
    .map(
      (collection) => `
        <a
          href="/pages/collection.html?slug=${collection.slug}"
          class="
            group
            relative
            h-[240px]
            sm:h-[300px]
            lg:h-[380px]
            overflow-hidden
            rounded-2xl
          "
        >

          <img
            src="${collection.image}"
            alt="${collection.name}"
            class="
              w-full
              h-full
              object-cover
              transition
              duration-700
              group-hover:scale-105
            "
          />

          <div
            class="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/80
              via-black/20
              to-transparent
            "
          ></div>

          <div
            class="
              absolute
              bottom-5
              left-5
              sm:bottom-8
              sm:left-8
              text-white
            "
          >

            <p
              class="
                uppercase
                tracking-[0.3em]
                text-xs
                mb-2
              "
            >
              ${collection.name}
            </p>

            <h3
              class="
                text-xl
                sm:text-2xl
                lg:text-3xl
                font-light
                mb-3
              "
            >
              ${collection.name} Collection
            </h3>

            

          </div>

        </a>
      `
    )
    .join("");
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    loadTestimonials();
    renderHomepageCategories();
    renderCollections();
  }
);
