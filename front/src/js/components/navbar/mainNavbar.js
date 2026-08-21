import { createSearchBar } from "./searchBar.js";
import { createUserDropdown } from "./userDropdown.js";

export function createMainNavbar() {
  return `
    <nav
      id="mainNav"
      class="fixed top-0 left-0 right-0 z-[calc(var(--z-navbar)+1)] bg-[#F9F6F2] transition-transform duration-300"
    >

      <div
        class="container-main flex items-center justify-between px-6 h-[64px] border-b border-black/5"
      >

        <!-- LEFT -->
        <div class="flex items-center gap-4">

          <!-- Mobile Hamburger -->
          <button
            id="navToggle"
            type="button"
            class="md:hidden p-2 flex flex-col gap-1.5"
            aria-label="Open navigation menu"
            aria-expanded="false"
            aria-controls="mobileMenu"
          >
            <span class="block w-5 h-0.5 bg-[#6B1A2A]"></span>
            <span class="block w-5 h-0.5 bg-[#6B1A2A]"></span>
            <span class="block w-2.5 h-0.5 bg-[#6B1A2A]"></span>
          </button>

          <!-- Logo -->
          <a href="/index.html" aria-label="Go to Gemora home" class="flex-shrink-0">
            <img
              src="/src/assets/icon/logo.png"
              class="h-16 w-auto object-contain"
              alt="Gemora Logo"
              decoding="async"
            />
          </a>

        </div>

        <!-- SEARCH -->
        <div class="hidden md:flex flex-1 justify-center px-6">

          <div class="w-full max-w-md">
            ${createSearchBar()}
          </div>

        </div>

        <!-- RIGHT ICONS -->
        <div class="flex items-end gap-3 md:gap-4">

          <!-- Mobile Search Toggle -->
          <button
            id="mobileSearchToggle"
            type="button"
            aria-label="Toggle search"
            aria-expanded="false"
            aria-controls="mobileSearchPanel"
            class="md:hidden flex flex-col items-center justify-center text-[11px] p-2 hover:bg-black/5 rounded-lg"
          >

            <svg
              data-search-icon
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              class="w-7 h-7 text-[#6B1A2A]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.65 5.65a7.5 7.5 0 0 0 10.6 10.6Z"
              />
            </svg>

            <svg
              data-close-icon
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              class="hidden w-7 h-7 text-[#6B1A2A]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>

            <span class="mt-1 text-black/80 font-medium">
              Search
            </span>

          </button>

          <!-- Wishlist -->
          <button
            id="wishlistBtn"
            aria-label="View wishlist"
            class="flex flex-col items-center justify-center text-[11px] p-2 hover:bg-black/5 rounded-lg relative"
          >

            <div class="relative">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                 aria-hidden="true"
                class="w-7 h-7 text-[#6B1A2A]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.74 0-3.27.86-4 2.09-.73-1.23-2.26-2.09-4-2.09-2.761 0-5 2.015-5 4.5 0 6 9 11.25 9 11.25s9-5.25 9-11.25Z"
                />
              </svg>

              <span
                id="wishlistCount"
                class="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#6B1A2A] text-white hidden"
              >
                0
              </span>

            </div>

            <span class="mt-1 text-black/80 font-medium">
              Wishlist
            </span>

          </button>

          <!-- Cart -->
          <button
            id="cartBtn"
            aria-label="Open shopping cart"
            class="flex flex-col items-center justify-center text-[11px] p-2 hover:bg-black/5 rounded-lg"
          >

          <div class="relative">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
               aria-hidden="true"
              class="w-7 h-7 text-[#6B1A2A]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386a1.125 1.125 0 0 1 1.11.843l.383 1.437m0 0L6.75 14.25h10.5l1.621-6.072a1.125 1.125 0 0 0-1.088-1.428H5.13m0 0L4.5 3m2.25 11.25a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m9 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0"
              />
            </svg>

             <span
    id="cartCount"
   class="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#6B1A2A] text-white hidden"
  >
    0
  </span>

            </div>

            <span class="mt-1 text-black/80 font-medium">
              Cart
            </span>

          </button>

          <!-- User -->
          <div class="relative hidden md:block">

            <button
              data-user="trigger"
              aria-label="Open profile menu"
              class="flex flex-col items-center justify-center text-[11px] p-2 hover:bg-black/5 rounded-lg"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                 aria-hidden="true"
                class="w-7 h-7 text-[#6B1A2A]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0"
                />
              </svg>

              <span class="mt-1 text-black/80 font-medium">
                Profile
              </span>

            </button>

            ${createUserDropdown()}

          </div>

        </div>

      </div>

      <!-- Mobile Search Panel -->
      <div
        id="mobileSearchPanel"
        class="
          md:hidden
          absolute
          top-full
          left-0
          right-0
          px-4
          py-4
          bg-[#F9F6F2]
          border-b
          border-black/10
          shadow-lg
          origin-top
          scale-y-0
          opacity-0
          invisible
          pointer-events-none
          transition-all
          duration-200
          z-[var(--z-dropdown)]
        "
      >

        ${createSearchBar("mobileSearchInput", true)}

      </div>

    </nav>
  `;
}
