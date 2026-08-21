import {
  loadTestimonials,
} from "../features/homeTestimonials.js";

import {
  jewelleryNavigation,
  moreCategories,
  collections,
} from "../components/navbar/navbarNavigation.js";

import { getHeroBanners } from "../services/heroBannerService.js";

import { applyRevealStagger } from "../utils/scrollReveal.js";


const homepageCategories = [
  ...jewelleryNavigation,
  ...moreCategories,
];



let heroBanners = [];

const HERO_CACHE_KEY = "gemora_hero_banners";

async function loadHeroBanner() {
  const cached = readCachedHeroBanners();

  let loadingMessageTimer = null;

  if (cached && cached.length) {
    // Instant paint from last successful load; fetch below refreshes it silently.
    renderHeroSlides(cached);
    initializeHeroSwiper(cached.length);
  } else {
    // No cache (first-ever visit) — the static skeleton in index.html is
    // already showing. Only nudge the user if the fetch is genuinely slow
    // (e.g. Render free-tier cold start).
    loadingMessageTimer = setTimeout(showHeroLoadingMessage, 5000);
  }

  try {
    const banners = await getHeroBanners();

    clearTimeout(loadingMessageTimer);
    hideHeroLoadingMessage();

    if (!banners.length) return;

    const changed =
      !cached || JSON.stringify(banners) !== JSON.stringify(cached);

    if (changed) {
      renderHeroSlides(banners);
      initializeHeroSwiper(banners.length);   // ← pass count
    }

    cacheHeroBanners(banners);
  } catch (error) {
    clearTimeout(loadingMessageTimer);
    hideHeroLoadingMessage();
    console.error(error);
  }
}

function readCachedHeroBanners() {
  try {
    const raw = localStorage.getItem(HERO_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function cacheHeroBanners(banners) {
  try {
    localStorage.setItem(HERO_CACHE_KEY, JSON.stringify(banners));
  } catch {
    // localStorage unavailable/full — caching is a nice-to-have, skip silently.
  }
}

function showHeroLoadingMessage() {
  const el = document.getElementById("hero-loading-message");
  if (!el) return;
  el.classList.remove("hidden");
  el.classList.add("flex");
}

function hideHeroLoadingMessage() {
  const el = document.getElementById("hero-loading-message");
  if (!el) return;
  el.classList.add("hidden");
  el.classList.remove("flex");
}




let heroSwiperInstance = null;

function initializeHeroSwiper(bannerCount) {
  if (heroSwiperInstance) {
    heroSwiperInstance.destroy(true, true);
  }
  heroSwiperInstance = new Swiper(".heroSwiper", {
    loop: bannerCount > 1,
    effect: "fade",
    speed: 700,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
  });
}







// function initializeHeroSwiper(bannerCount) {
//   new Swiper(".heroSwiper", {
//     loop: bannerCount > 1,   // ← use it here
//     effect: "fade",
//     speed: 700,
//     autoplay: { delay: 5000, disableOnInteraction: false },
//     pagination: { el: ".swiper-pagination", clickable: true },
//   });
// }


function renderHeroSlides(banners) {
  const wrapper = document.getElementById("hero-swiper-wrapper");

  wrapper.innerHTML = banners
    .map(
      (banner) => `
      <div class="swiper-slide h-full">
        <a href="${getBannerLink(banner.navigationTarget)}" class="block h-full w-full">
          <picture>
            <source media="(max-width:767px)" srcset="${banner.mobileImage}">
            <img
              src="${banner.desktopImage}"
              alt="${banner.title || "Hero Banner"}"
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






function getBannerLink(target) {
  if (!target) return "#";

  switch (target.type) {
    case "page":
      switch (target.value) {
        case "home":
          return "/";

        case "products":
          return "/pages/products.html";

        case "collections":
          return "/pages/collections.html";

        default:
          return "/";
      }

    case "category":
      return `/pages/products.html?category=${encodeURIComponent(
        target.value
      )}`;

    case "collection":
      return `/pages/collection.html?slug=${encodeURIComponent(
        target.value
      )}&style=${encodeURIComponent(
        target.value
      )}&page=1`;

    case "product":
      return `/pages/productDetails.html?slug=${encodeURIComponent(
        target.value
      )}`;

    case "external":
      return target.value;

    default:
      return "#";
  }
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

  applyRevealStagger(container);
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

  applyRevealStagger(container);
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    loadTestimonials();
    renderHomepageCategories();
    renderCollections();
  }
);
