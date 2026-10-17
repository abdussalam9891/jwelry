"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import { getBannerLink } from "@/lib/routes";
import { getHeroBanners } from "@/lib/services/contentService";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const HERO_CACHE_KEY = "gemora_hero_banners";
const SLOW_LOAD_MS = 5000;

function readCachedBanners() {
  try {
    const raw = localStorage.getItem(HERO_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function cacheBanners(banners) {
  try {
    localStorage.setItem(HERO_CACHE_KEY, JSON.stringify(banners));
  } catch {
    // Caching is a nice-to-have; skip when storage is unavailable or full.
  }
}

export default function HeroSlider() {
  const [banners, setBanners] = useState([]);
  const [slowLoad, setSlowLoad] = useState(false);

  useEffect(() => {
    const cached = readCachedBanners();
    let slowTimer = null;

    if (cached?.length) {
      // Instant paint from the last successful load; the fetch below
      // refreshes it silently.
      setBanners(cached);
    } else {
      // First-ever visit: only nudge the user if the API is genuinely slow
      // (e.g. a free-tier cold start).
      slowTimer = setTimeout(() => setSlowLoad(true), SLOW_LOAD_MS);
    }

    getHeroBanners()
      .then((fresh) => {
        if (!fresh.length) return;

        if (!cached || JSON.stringify(fresh) !== JSON.stringify(cached)) {
          setBanners(fresh);
        }

        cacheBanners(fresh);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        clearTimeout(slowTimer);
        setSlowLoad(false);
      });

    return () => clearTimeout(slowTimer);
  }, []);

  return (
    <section className="mt-16 md:mt-32 hero-fade-in">
      <div className="relative h-[42svh] min-h-[380px] max-h-[520px] overflow-hidden">
        {banners.length ? (
          <Swiper
            // Remount when the slide set changes so loop/autoplay reset cleanly.
            key={banners.map((banner) => banner.id).join(",")}
            className="heroSwiper h-full"
            modules={[Autoplay, EffectFade, Pagination]}
            loop={banners.length > 1}
            effect="fade"
            speed={700}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={banner.id}>
                <a
                  href={getBannerLink(banner.navigationTarget)}
                  className="block h-full w-full"
                >
                  <picture>
                    <source
                      media="(max-width:767px)"
                      srcSet={banner.mobileImage}
                    />
                    <img
                      src={banner.desktopImage}
                      alt={banner.title || "Hero Banner"}
                      className="block h-full w-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </picture>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // Default artwork until real banners load.
          <img
            src="/assets/images/heronew.webp"
            alt="Gemora Jewellery"
            className="block h-full w-full object-cover"
          />
        )}

        {slowLoad && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <span className="bg-black/60 text-white text-sm px-4 py-2 rounded-full">
              Just a moment — waking up our server for you, thanks for your
              patience
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
