import { createSearchBar } from "./searchBar.js";
import { createUserDropdown } from "./userDropdown.js";

export function createMainNavbar() {

  return `
    <nav
      id="mainNav"
      class="fixed top-0 left-0 right-0 z-[1000] bg-[#F9F6F2] transition-transform duration-300"
    >

      <div
        class="container-main flex items-center justify-between px-6 h-[64px] border-b border-black/5"
      >

        <!-- LEFT -->
        <div class="flex items-center gap-4">

          <!-- Mobile Hamburger -->
          <button
            id="navToggle"
            class="md:hidden p-2 flex flex-col gap-1.5"
          >
            <span class="block w-5 h-0.5 bg-[#6B1A2A]"></span>
            <span class="block w-5 h-0.5 bg-[#6B1A2A]"></span>
            <span class="block w-3 h-0.5 bg-[#6B1A2A]"></span>
          </button>

          <!-- Logo -->
          <a href="/front/index.html" class="flex-shrink-0">
            <img
              src="/front/src/assets/icon/logo.png"
              class="h-16 w-auto object-contain"
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

          <!-- Wishlist -->
          <button
            id="wishlistBtn"
            class="flex flex-col items-center justify-center text-[11px] p-2 hover:bg-black/5 rounded-lg relative"
          >

            <div class="relative">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
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
            class="flex flex-col items-center justify-center text-[11px] p-2 hover:bg-black/5 rounded-lg"
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-7 h-7 text-[#6B1A2A]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386a1.125 1.125 0 0 1 1.11.843l.383 1.437m0 0L6.75 14.25h10.5l1.621-6.072a1.125 1.125 0 0 0-1.088-1.428H5.13m0 0L4.5 3m2.25 11.25a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m9 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0"
              />
            </svg>

            <span class="mt-1 text-black/80 font-medium">
              Cart
            </span>

          </button>

          <!-- User -->
          <div class="relative hidden md:block">

            <button
              data-user="trigger"
              class="flex flex-col items-center justify-center text-[11px] p-2 hover:bg-black/5 rounded-lg"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
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

      <!-- Mobile Search -->
      <div class="md:hidden px-4 py-4 pb-3">

        ${createSearchBar("mobileSearchInput", true)}

      </div>

    </nav>
  `;
}
