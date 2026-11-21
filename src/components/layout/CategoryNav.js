"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  collections,
  jewelleryNavigation,
  moreCategories,
} from "@/data/navigation";
import { collectionUrl, productsUrl } from "@/lib/routes";

// Outer layer of every flyout. It starts flush with the bottom of the
// category bar and its top padding is an invisible hover bridge, so the
// pointer never leaves the menu on its way down to the card. Hiding waits
// a beat so a pointer that slips off briefly doesn't slam the menu shut.
// Keyboard users open menus via :focus-visible (mouse clicks don't count,
// otherwise a clicked link would keep its menu open).
const panelClass =
  "mega-panel absolute top-full pt-3 opacity-0 invisible transition-all duration-200 delay-150 group-hover:opacity-100 group-hover:visible group-hover:delay-0 group-has-[:focus-visible]:opacity-100 group-has-[:focus-visible]:visible z-[var(--z-dropdown)]";

const cardClass = "bg-white border border-black/5";

const eyebrowClass =
  "text-[11px] uppercase tracking-[0.35em] text-black/40 mb-3";

const triggerClass =
  "mega-trigger text-[0.95rem] font-medium relative transition-colors hover:text-[#6B1A2A]";

const DISCOVER_LINKS = [
  { label: "Best Sellers", params: { tag: "best-seller" } },
  { label: "New Arrivals", params: { tag: "new" } },
  { label: "Gift Guide", params: { tag: "gifting" } },
  { label: "Under ₹5,000", params: { maxPrice: 5000 } },
  { label: "Under ₹10,000", params: { maxPrice: 10000 } },
  { label: "Under ₹2,000", params: { maxPrice: 2000 } },
];

function Underline({ active }) {
  return (
    <span
      className={`absolute bottom-[-4px] left-0 h-0.5 bg-[#6B1A2A] group-hover:w-full transition-all duration-300 ${
        active ? "w-full" : "w-0"
      }`}
    />
  );
}

// Desktop category row with mega menus. Mouse users get hover menus;
// touch users tap a trigger to open its menu (a second tap on a category
// follows its link); keyboard users get them on focus.
export default function CategoryNav({ activeCategory, style, navRef }) {
  const pathname = usePathname();
  const pointerType = useRef("mouse");

  const [openMenu, setOpenMenu] = useState(null);
  // A menu whose link was just clicked stays hidden until the pointer
  // leaves it, so the panel doesn't linger over the page it opened.
  const [dismissed, setDismissed] = useState(null);
  // While the page scrolls the bar can slide under a resting pointer; menus
  // ignore hover until the pointer genuinely moves again.
  const [scrollSuppressed, setScrollSuppressed] = useState(false);

  const onProducts = pathname === "/products";

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname, activeCategory]);

  useEffect(() => {
    function handleScroll() {
      setScrollSuppressed(true);
    }

    function handlePointerMove(e) {
      if (e.movementX || e.movementY) setScrollSuppressed(false);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    if (!openMenu) return;

    // Capture phase so this still runs if something on the page (e.g. the
    // hero Swiper) stops the click from bubbling.
    function handleClick(e) {
      if (e.target.closest(".mega-trigger, .mega-panel")) return;
      setOpenMenu(null);
    }

    function handleKeyDown(e) {
      if (e.key !== "Escape") return;
      document.querySelector(`[aria-controls="flyout-${openMenu}"]`)?.focus();
      setOpenMenu(null);
    }

    function handleScroll() {
      setOpenMenu(null);
    }

    document.addEventListener("click", handleClick, { capture: true });
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openMenu]);

  function handleTriggerClick(e, key, isLink) {
    // Mouse users already see the menu on hover: a click on a category
    // simply navigates, and a click on a button-only trigger does nothing.
    if (pointerType.current === "mouse") {
      if (isLink) dismiss(key, e);
      return;
    }

    const isOpen = openMenu === key;

    if (isLink && !isOpen) {
      e.preventDefault();
    }

    setOpenMenu(isOpen ? null : key);
  }

  function dismiss(key, e) {
    e.target.closest("a")?.blur();
    setOpenMenu(null);
    setDismissed(key);
  }

  function groupProps(key, extra = "") {
    const state =
      dismissed === key || (scrollSuppressed && openMenu !== key)
        ? "mega-dismissed"
        : openMenu === key
          ? "force-open"
          : "";

    return {
      className: `group h-full flex items-center ${extra} ${state}`,
      onPointerDown: (e) => {
        pointerType.current = e.pointerType;
      },
      onMouseLeave: () => {
        if (dismissed === key) setDismissed(null);
      },
      onClick: (e) => {
        if (e.target.closest(".mega-panel a")) dismiss(key, e);
      },
    };
  }

  return (
    <div
      id="categoryNav"
      ref={navRef}
      style={style}
      className="hidden md:flex items-center justify-center gap-10 px-6 h-[44px] fixed left-0 right-0 bg-[#F9F6F2] z-[var(--z-navbar)] border-b border-black/10"
    >
      <ul className="flex h-full items-center justify-center gap-8 list-none">
        {/* ALL JEWELLERY — panel is centred on the whole bar */}
        <li {...groupProps("all-jewellery")}>
          <button
            type="button"
            className={`${triggerClass} ${
              onProducts && !activeCategory
                ? "text-[#6B1A2A]"
                : "text-[#1A1A1A]"
            }`}
            aria-expanded={openMenu === "all-jewellery"}
            aria-haspopup="true"
            aria-controls="flyout-all-jewellery"
            onClick={(e) => handleTriggerClick(e, "all-jewellery", false)}
          >
            All Jewellery
          </button>

          <div
            id="flyout-all-jewellery"
            className={`${panelClass} left-1/2 -translate-x-1/2 w-[1280px] max-w-[95vw]`}
          >
            <div
              className={`${cardClass} rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.12)] p-5`}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <p className={eyebrowClass}>Shop By Category</p>

                  <div className="grid grid-cols-8 gap-3">
                    {[...jewelleryNavigation, ...moreCategories].map((item) => (
                      <Link
                        key={item.category}
                        href={productsUrl({ category: item.category })}
                        className="group/cat p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F6EEF0] transition"
                      >
                        <div className="overflow-hidden rounded-lg">
                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-[76px] object-cover group-hover/cat:scale-105 transition duration-700"
                          />
                        </div>
                        <p className="mt-1.5 text-center text-xs font-medium">
                          {item.label}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10 pt-4 border-t border-black/10">
                  <div>
                    <p className={eyebrowClass}>Collections</p>
                    <div className="grid grid-cols-3 gap-y-2 gap-x-6">
                      {collections.map((collection) => (
                        <Link
                          key={collection.slug}
                          href={collectionUrl(collection.slug)}
                          className="block hover:text-[#6B1A2A] transition"
                        >
                          {collection.name} Collection
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className={eyebrowClass}>Discover</p>
                    <div className="grid grid-cols-3 gap-y-2 gap-x-6">
                      {DISCOVER_LINKS.map((link) => (
                        <Link
                          key={link.label}
                          href={productsUrl(link.params)}
                          className="hover:text-[#6B1A2A]"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>

        {/* PER-CATEGORY MENUS — panels are centred under their label */}
        {jewelleryNavigation.map((category) => {
          const key = category.category;

          return (
            <li key={key} {...groupProps(key, "relative")}>
              <Link
                href={productsUrl({ category: key })}
                className={`${triggerClass} text-[#6B1A2A]`}
                aria-expanded={openMenu === key}
                aria-controls={`flyout-${key}`}
                onClick={(e) => handleTriggerClick(e, key, true)}
              >
                {category.label}
                <Underline active={onProducts && activeCategory === key} />
              </Link>

              <div
                id={`flyout-${key}`}
                className={`${panelClass} left-1/2 -translate-x-1/2 w-[420px]`}
              >
                <div
                  className={`${cardClass} rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.12)] p-6`}
                >
                  <div className="grid grid-cols-[1fr_140px] gap-6 items-start">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-black/40 mb-4">
                        Shop By Type
                      </p>

                      {category.productTypes.map((type) => (
                        <Link
                          key={type.value}
                          href={productsUrl({
                            category: key,
                            productType: type.value,
                          })}
                          className="block py-2 text-sm hover:text-[#6B1A2A] transition"
                        >
                          {type.label}
                        </Link>
                      ))}

                      <Link
                        href={productsUrl({ category: key })}
                        className="block mt-4 pt-4 border-t border-black/10 text-[#6B1A2A] font-medium"
                      >
                        View All {category.label}
                      </Link>
                    </div>

                    <img
                      src={category.image}
                      alt=""
                      className="w-full h-[140px] object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}

        {/* COLLECTIONS — panel is pinned to the right edge of the bar */}
        <li {...groupProps("collections")}>
          <button
            type="button"
            className={`${triggerClass} text-[#1A1A1A]`}
            aria-expanded={openMenu === "collections"}
            aria-haspopup="true"
            aria-controls="flyout-collections"
            onClick={(e) => handleTriggerClick(e, "collections", false)}
          >
            Collections
          </button>

          <div
            id="flyout-collections"
            className={`${panelClass} right-6 w-[620px] max-w-[85vw]`}
          >
            <div
              className={`${cardClass} rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.12)] p-5`}
            >
              <div className="grid grid-cols-3 gap-4">
                {collections.map((collection) => (
                  <Link
                    key={collection.slug}
                    href={collectionUrl(collection.slug)}
                    className="group/card"
                  >
                    <div className="overflow-hidden rounded-2xl">
                      <img
                        src={collection.image}
                        alt=""
                        className="w-full h-[80px] object-cover group-hover/card:scale-105 transition duration-700"
                      />
                    </div>
                    <h4 className="mt-1.5 text-sm font-light">
                      {collection.name} Collection
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
