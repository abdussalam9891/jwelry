"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { heroSlides } from "@/data/heroSlides";

const SLIDE_MS = 5000;
const SWIPE_PX = 40;

// With only a few slides, a card that wraps from one end of the strip to
// the other would be seen crossing the screen. Repeating the set keeps
// every wrap off-screen.
const items =
  heroSlides.length > 1 && heroSlides.length < 5
    ? [...heroSlides, ...heroSlides]
    : heroSlides;
const ITEM_COUNT = items.length;
const SLIDE_COUNT = heroSlides.length;

// Position of item k relative to the active one, in [-half, half).
function offsetOf(k, active) {
  const half = Math.floor(ITEM_COUNT / 2);
  return ((((k - active) % ITEM_COUNT) + ITEM_COUNT + half) % ITEM_COUNT) - half;
}

const copyAlign = {
  left: "md:left-0 md:pl-[6%]",
  right: "md:right-0 md:pr-[6%]",
};

const scrimByTheme = {
  dark: {
    base: "bg-gradient-to-t from-black/75 via-black/25 via-45% to-transparent",
    left: "md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:via-40% md:to-transparent",
    right: "md:bg-gradient-to-l md:from-black/70 md:via-black/30 md:via-40% md:to-transparent",
  },
  light: {
    base: "bg-gradient-to-t from-[#F9F6F2] from-5% via-[#F9F6F2]/50 via-45% to-transparent",
    left: "md:bg-gradient-to-r md:from-[#F9F6F2]/95 md:from-0% md:via-[#F9F6F2]/60 md:via-40% md:to-transparent",
    right: "md:bg-gradient-to-l md:from-[#F9F6F2]/95 md:from-0% md:via-[#F9F6F2]/60 md:via-40% md:to-transparent",
  },
};

function SlideCopy({ slide }) {
  const dark = slide.theme !== "light";

  return (
    <div
      className={`absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-6 text-center md:inset-x-auto md:inset-y-0 md:w-[44%] md:justify-center md:pb-0 ${
        copyAlign[slide.align] || copyAlign.right
      } ${dark ? "text-white" : "text-[#300708]"}`}
    >
      <p
        className={`text-[10px] font-medium uppercase tracking-[0.3em] md:text-xs ${
          dark ? "text-white/80" : "text-[#832729]"
        }`}
      >
        {slide.eyebrow}
      </p>

      <p className="mt-2 font-serif text-[34px] font-normal leading-none md:mt-3 md:text-[48px] lg:text-[64px]">
        {slide.title}
      </p>

      <p className="mt-1.5 font-serif text-base font-light tracking-[0.06em] md:mt-3 md:text-[22px] lg:text-[28px]">
        {slide.subtitle}
      </p>

      <span
        className={`mt-4 inline-flex h-8 items-center rounded-full px-5 text-[10px] font-medium uppercase tracking-[0.15em] md:mt-7 md:h-10 md:px-9 md:text-xs md:ring-1 md:ring-offset-[3px] md:ring-offset-transparent ${
          dark
            ? "bg-[#832729] text-white md:bg-white md:text-[#300708] md:ring-white/70"
            : "bg-[#832729] text-white md:ring-[#832729]/50"
        }`}
      >
        Explore Now
      </span>
    </div>
  );
}

// Centred campaign carousel: the active card sits in the middle with its
// neighbours peeking in at either side. Autoplays, pauses on hover/focus,
// and supports swipe, dot and neighbour-click navigation.
export default function HeroSlider() {
  // `prev` lets each card tell a one-step move (animated) from a wrap to
  // the far end of the strip (instant, off-screen).
  const [position, setPosition] = useState({ active: 0, prev: 0 });
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef(null);

  const { active, prev } = position;

  const go = useCallback((index) => {
    setPosition((current) => ({
      active: ((index % ITEM_COUNT) + ITEM_COUNT) % ITEM_COUNT,
      prev: current.active,
    }));
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || SLIDE_COUNT < 2) return;

    const timer = setTimeout(() => go(active + 1), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [active, paused, reducedMotion, go]);

  // Dots address slides; jump to the nearest copy of the chosen one.
  function goToSlide(slideIndex) {
    let target = active;
    let best = Infinity;

    items.forEach((_, k) => {
      if (k % SLIDE_COUNT !== slideIndex) return;
      const distance = Math.abs(offsetOf(k, active));
      if (distance < best) {
        best = distance;
        target = k;
      }
    });

    go(target);
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;

    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(dx) < SWIPE_PX) return;
    go(active + (dx < 0 ? 1 : -1));
  }

  const activeSlide = active % SLIDE_COUNT;

  return (
    <section
      className="hero-fade-in bg-white pb-2 pt-3 md:pt-1"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="relative overflow-hidden [--gap:10px] [--w:90vw] md:[--gap:30px] md:[--w:min(84vw,1400px)]"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sizes the strip: one card's footprint. */}
        <div
          aria-hidden="true"
          className="invisible mx-auto aspect-square w-[var(--w)] md:aspect-[5/2]"
        />

        {items.map((slide, k) => {
          const offset = offsetOf(k, active);
          const wrapped = Math.abs(offset - offsetOf(k, prev)) > 1;
          const isActive = offset === 0;
          const isFirst = k === 0;

          return (
            <Link
              key={`${slide.id}-${k}`}
              href={slide.href}
              tabIndex={isActive ? 0 : -1}
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`${(k % SLIDE_COUNT) + 1} of ${SLIDE_COUNT}: ${slide.eyebrow} — ${slide.title}`}
              onClick={(e) => {
                // A peeking neighbour slides into place rather than navigating.
                if (isActive) return;
                e.preventDefault();
                go(k);
              }}
              className={`absolute top-0 block h-full w-[var(--w)] overflow-hidden rounded-[10px] bg-[#EFE9E1] left-[calc(50%-var(--w)/2)] ${
                wrapped ? "" : "transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              }`}
              style={{
                transform: `translateX(calc(${offset} * (var(--w) + var(--gap))))`,
              }}
            >
              <picture>
                <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
                <img
                  src={slide.desktopImage}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                  loading={isFirst ? "eager" : "lazy"}
                  fetchPriority={isFirst ? "high" : "auto"}
                  decoding="async"
                  draggable={false}
                />
              </picture>

              <div
                className={`absolute inset-0 ${
                  (scrimByTheme[slide.theme] || scrimByTheme.dark).base
                } ${
                  (scrimByTheme[slide.theme] || scrimByTheme.dark)[
                    slide.align === "left" ? "left" : "right"
                  ]
                }`}
              />

              <SlideCopy slide={slide} />
            </Link>
          );
        })}
      </div>

      {SLIDE_COUNT > 1 && (
        <div className="mt-2 flex justify-center md:mt-3">
          {heroSlides.map((slide, index) => {
            const isCurrent = index === activeSlide;

            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Show slide ${index + 1}: ${slide.label}`}
                aria-current={isCurrent}
                className="p-1.5"
              >
                <span
                  className={`block h-2 w-2 rotate-45 transition-colors duration-300 ${
                    isCurrent ? "bg-[#832729]" : "bg-black/20 hover:bg-black/40"
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
