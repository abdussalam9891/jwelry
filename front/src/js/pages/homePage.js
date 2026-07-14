import {
  loadTestimonials,
} from "../features/homeTestimonials.js";

import {
  jewelleryNavigation,
  moreCategories,
  collections,
} from "../components/navbar/navbarNavigation.js";

import { getHeroBanners } from "../services/heroBannerService.js";


const homepageCategories = [
  ...jewelleryNavigation,
  ...moreCategories,
];



let heroBanners = [];

async function loadHeroBanner() {
  try {
    const response = await getHeroBanners();

    const banners = response.data;

    if (!banners.length) return;

    renderHeroSlides(banners);

    initializeHeroSwiper();
  } catch (error) {
    console.error(error);
  }
}


function renderHeroSlides(banners) {
  const wrapper = document.getElementById(
    "hero-swiper-wrapper"
  );

  wrapper.innerHTML = banners
    .map(
      (banner) => `

      <div class="swiper-slide h-full">

       <a
  href="${getBannerLink(banner.link)}"
  class="block h-full w-full"
>

          <picture>

            <source
              media="(max-width:767px)"
              srcset="${banner.mobileImage}"
            >

            <img
              src="${banner.desktopImage}"
              alt="Hero Banner"
              class="block h-full w-full object-cover"
              loading="lazy"
            >

          </picture>

        </a>

      </div>

    `
    )
    .join("");
}


function initializeHeroSwiper() {
  new Swiper(".heroSwiper", {
    loop: true,

    effect: "fade",

    speed: 700,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },



    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}



function getBannerLink(link) {
  if (!link || typeof link !== "string") {
    return "#";
  }

  const trimmedLink = link.trim();

  if (!trimmedLink) {
    return "#";
  }

  if (
    trimmedLink.startsWith("http://") ||
    trimmedLink.startsWith("https://")
  ) {
    return trimmedLink;
  }

  return trimmedLink.startsWith("/")
    ? trimmedLink
    : `/${trimmedLink}`;
}

loadHeroBanner();







function renderHomepageCategories() {
  const container = document.getElementById("homepageCategories");

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
              "
            >

              <img
                src="${category.image}"
                alt="${category.label}"
                class="
                  w-full
                  aspect-[5/4]
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
                text-sm
                sm:text-base
                md:text-lg
                lg:text-xl
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
  const container = document.getElementById("homepageCollections");

  if (!container) return;

  container.innerHTML = collections
    .map(
      (collection) => `
        <a
          href="/pages/collection.html?slug=${collection.slug}"
          class="
            group
            relative
            aspect-[5/4]
            overflow-hidden
            rounded-xl
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
              ease-out
              group-hover:scale-105
            "
          />

          <div
            class="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/65
              via-black/15
              to-transparent
            "
          ></div>

          <div
            class="
              absolute
              bottom-3
              left-3
              sm:bottom-5
              sm:left-5
              text-white
            "
          >

            <p
              class="
                uppercase
                tracking-[0.25em]
                text-[10px]
                sm:text-xs
                mb-1
              "
            >
              ${collection.name}
            </p>

            <h3
              class="
                text-base
                sm:text-xl
                lg:text-2xl
                font-light
                leading-tight
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
