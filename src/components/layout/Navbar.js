"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import AnnouncementBar from "./AnnouncementBar";
import CategoryNav from "./CategoryNav";
import MobileDrawer from "./MobileDrawer";
import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropdown";
import SearchParamsListener from "@/components/SearchParamsListener";
import {
  CartIcon,
  CloseIcon,
  HeartIcon,
  SearchIcon,
} from "@/components/ui/icons";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useScrollLock } from "@/hooks/useScrollLock";

const HIDE_AFTER_Y = 80;
const SCROLL_THRESHOLD = 5;

function CountBadge({ count }) {
  if (!count) return null;

  return (
    <span className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#6B1A2A] text-white">
      {count}
    </span>
  );
}

const iconButtonClass =
  "flex flex-col items-center justify-center text-[11px] p-2 hover:bg-black/5 rounded-lg";

// Fixed three-row header: announcement bar, main bar, desktop category row.
// The main bar tucks away on scroll-down and returns on scroll-up; the
// visible height is published as --navbar-h for in-page sticky elements.
export default function Navbar() {
  const pathname = usePathname();
  const { goProtected } = useAuth();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [heights, setHeights] = useState({
    announcement: 0,
    nav: 64,
    category: 44,
  });
  const [params, setParams] = useState(null);

  const announcementRef = useRef(null);
  const navRef = useRef(null);
  const categoryRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const mobileSearchToggleRef = useRef(null);
  const mobileSearchPanelRef = useRef(null);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useScrollLock(drawerOpen);

  useEffect(() => {
    setDrawerOpen(false);
    setMobileSearchOpen(false);
  }, [pathname, params]);

  // Re-measure whenever a row changes size (fonts loading, the announcement
  // appearing or wrapping, switching to the mobile layout).
  useEffect(() => {
    function measure() {
      setHeights({
        announcement: announcementRef.current?.offsetHeight || 0,
        nav: navRef.current?.offsetHeight || 0,
        category: categoryRef.current?.offsetHeight || 0,
      });
    }

    measure();

    const observer = new ResizeObserver(measure);
    [announcementRef, navRef, categoryRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      // Ignore scroll while an overlay has locked the page.
      if (document.body.classList.contains("overflow-hidden")) return;

      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      if (Math.abs(diff) < SCROLL_THRESHOLD) return;

      if (diff > 0 && currentScrollY > HIDE_AFTER_Y) {
        setHidden(true);
      } else if (diff < 0) {
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rowOneHeight = heights.announcement + heights.nav;

  useEffect(() => {
    const offset = hidden
      ? heights.announcement + heights.category
      : rowOneHeight + heights.category;

    document.documentElement.style.setProperty("--navbar-h", `${offset}px`);
  }, [hidden, heights, rowOneHeight]);

  useEffect(() => {
    if (!mobileSearchOpen) return;

    requestAnimationFrame(() => mobileSearchRef.current?.focus());

    function handleClick(e) {
      if (
        mobileSearchPanelRef.current?.contains(e.target) ||
        mobileSearchToggleRef.current?.contains(e.target)
      ) {
        return;
      }
      setMobileSearchOpen(false);
    }

    function handleKeyDown(e) {
      if (e.key !== "Escape") return;
      setMobileSearchOpen(false);
      mobileSearchToggleRef.current?.focus();
    }

    function handleResize() {
      if (window.innerWidth >= 768) setMobileSearchOpen(false);
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileSearchOpen]);

  let navTransform = "translateY(0)";
  if (drawerOpen) navTransform = "translateY(-100%)";
  else if (hidden) navTransform = `translateY(-${rowOneHeight}px)`;

  const currentSearch = params?.get("search") || "";
  const activeCategory = params?.get("category") || null;

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsListener onChange={setParams} />
      </Suspense>

      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />

      <AnnouncementBar
        barRef={announcementRef}
        style={{ transform: drawerOpen ? "translateY(-100%)" : undefined }}
      />

      <nav
        id="mainNav"
        ref={navRef}
        style={{ top: heights.announcement, transform: navTransform }}
        className="fixed top-0 left-0 right-0 z-[calc(var(--z-navbar)+1)] bg-[#F9F6F2] transition-transform duration-300"
      >
        <div className="container-main flex items-center justify-between px-6 h-[64px] border-b border-black/5">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setDrawerOpen((open) => !open)}
              className="md:hidden p-2 flex flex-col gap-1.5"
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              aria-controls="mobileMenu"
            >
              <span className="block w-5 h-0.5 bg-[#6B1A2A]" />
              <span className="block w-5 h-0.5 bg-[#6B1A2A]" />
              <span className="block w-2.5 h-0.5 bg-[#6B1A2A]" />
            </button>

            <Link
              href="/"
              aria-label="Go to Gemora home"
              className="flex-shrink-0"
            >
              <img
                src="/assets/icon/logo.png"
                className="h-16 w-auto object-contain"
                alt="Gemora Logo"
                decoding="async"
              />
            </Link>
          </div>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="w-full max-w-md">
              <SearchBar
                id="searchInput"
                currentSearch={currentSearch}
                rotatePlaceholder
              />
            </div>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-end gap-3 md:gap-4">
            <button
              ref={mobileSearchToggleRef}
              type="button"
              onClick={() => setMobileSearchOpen((open) => !open)}
              aria-label="Toggle search"
              aria-expanded={mobileSearchOpen}
              aria-controls="mobileSearchPanel"
              className={`md:hidden ${iconButtonClass}`}
            >
              {mobileSearchOpen ? (
                <CloseIcon className="w-7 h-7 text-[#6B1A2A]" />
              ) : (
                <SearchIcon className="w-7 h-7 text-[#6B1A2A]" />
              )}
              <span className="mt-1 text-black/80 font-medium">Search</span>
            </button>

            <button
              id="wishlistBtn"
              type="button"
              onClick={() => goProtected("/wishlist")}
              aria-label="View wishlist"
              className={`${iconButtonClass} relative`}
            >
              <div className="relative">
                <HeartIcon className="w-7 h-7 text-[#6B1A2A]" />
                <CountBadge count={wishlistCount} />
              </div>
              <span className="mt-1 text-black/80 font-medium">Wishlist</span>
            </button>

            <button
              type="button"
              onClick={() => goProtected("/cart")}
              aria-label="Open shopping cart"
              className={iconButtonClass}
            >
              <div className="relative">
                <CartIcon className="w-7 h-7 text-[#6B1A2A]" />
                <CountBadge count={cartCount} />
              </div>
              <span className="mt-1 text-black/80 font-medium">Cart</span>
            </button>

            <UserDropdown />
          </div>
        </div>

        {/* Mobile Search Panel */}
        <div
          id="mobileSearchPanel"
          ref={mobileSearchPanelRef}
          className={`md:hidden absolute top-full left-0 right-0 px-4 py-4 bg-[#F9F6F2] border-b border-black/10 shadow-lg origin-top transition-all duration-200 z-[var(--z-dropdown)] ${
            mobileSearchOpen
              ? "scale-y-100 opacity-100 visible"
              : "scale-y-0 opacity-0 invisible pointer-events-none"
          }`}
        >
          <SearchBar
            id="mobileSearchInput"
            mobile
            currentSearch={currentSearch}
            inputRef={mobileSearchRef}
          />
        </div>
      </nav>

      <CategoryNav
        navRef={categoryRef}
        activeCategory={activeCategory}
        style={{ top: hidden ? heights.announcement : rowOneHeight }}
      />
    </>
  );
}
