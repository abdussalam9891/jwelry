import { navLinks } from "./navLinks.js";

export function createMobileDrawer(
  user = null
) {
  const linksHTML = navLinks
    .map((link) => {
      const href = link.slug
        ? `/front/pages/products.html?category=${link.slug}`
        : "/front/pages/products.html";

      return `
        <a
          href="${href}"
          class="
            py-3
            px-2
            text-[#1A1A1A]
            text-[15px]
            font-medium
            border-b
            border-black/5
            hover:text-[#6B1A2A]
            transition-colors
          "
        >
          ${link.label}
        </a>
      `;
    })
    .join("");

  const userSection = user
    ? `
      <div class="pb-5 border-b border-black/5">
        <div class="flex items-center gap-3">

          <div
            class="
              w-12
              h-12
              rounded-full
              overflow-hidden
              bg-[#F6EEF0]
              shrink-0
            "
          >
            ${
              user.avatar
                ? `
                  <img
                    src="${user.avatar}"
                    class="w-full h-full object-cover"
                  />
                `
                : `
                  <div
                    class="
                      w-full
                      h-full
                      flex
                      items-center
                      justify-center
                      text-[#6B1A2A]
                      font-semibold
                    "
                  >
                    ${user.name?.charAt(0) || "U"}
                  </div>
                `
            }
          </div>

          <div class="min-w-0 flex-1">
            <p class="font-semibold text-[15px] truncate">
              ${user.name}
            </p>

            <p class="text-sm text-black/45 truncate">
              ${user.email || user.phone}
            </p>
          </div>

        </div>
      </div>
    `
    : "";

const accountLinks = user
  ? `
    <div
      class="
        mt-5
        pb-4
        border-b
        border-black/5
        flex
        flex-col
      "
    >

      <!-- PROFILE -->
     <a
  href="/front/pages/profile.html"
  class="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white transition-all duration-200"
>
  <div class="flex items-center gap-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5 text-[#6B1A2A] shrink-0">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0"/>
    </svg>
    <span class="text-[15px] font-medium text-[#1A1A1A]">Profile</span>
  </div>
  <span class="text-black/25 text-xl">›</span>
</a>

      <!-- ORDERS -->
      <a
  href="/front/pages/orders.html"
  class="
    flex
    items-center
    justify-between
    px-3
    py-3
    rounded-xl
    hover:bg-white
    transition-all
    duration-200
  "
>
  <!-- LEFT -->
  <div
    class="
      flex
      items-center
      gap-3
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.8"
      stroke="currentColor"
      class="
        w-5
        h-5
        text-[#6B1A2A]
        shrink-0
      "
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
      />
    </svg>

    <span
      class="
        text-[15px]
        font-medium
        text-[#1A1A1A]
      "
    >
      Orders
    </span>
  </div>

  <!-- RIGHT ARROW -->
  <span
    class="
      text-black/25
      text-xl
      leading-none
    "
  >
    ›
  </span>
</a>

      <!-- WISHLIST -->
     <a
  href="/front/pages/wishlist.html"
  class="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white transition-all duration-200"
>
  <div class="flex items-center gap-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5 text-[#6B1A2A] shrink-0">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21.435 6.582a5.94 5.94 0 0 0-8.388 0L12 7.629l-1.047-1.047a5.94 5.94 0 1 0-8.388 8.388L12 21.75l9.435-9.03a5.94 5.94 0 0 0 0-8.388Z"/>
    </svg>
    <span class="text-[15px] font-medium text-[#1A1A1A]">Wishlist</span>
  </div>
  <span class="text-black/25 text-xl">›</span>
</a>
      <!-- CART -->
     <a
  href="/front/pages/cart.html"
  class="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white transition-all duration-200"
>
  <div class="flex items-center gap-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5 text-[#6B1A2A] shrink-0">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386a1.125 1.125 0 0 1 1.11.843l.383 1.437m0 0L6.75 14.25h10.5l1.621-6.072a1.125 1.125 0 0 0-1.088-1.428H5.13m0 0L4.5 3m2.25 11.25a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m9 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0"/>
    </svg>
    <span class="text-[15px] font-medium text-[#1A1A1A]">Cart</span>
  </div>
  <span class="text-black/25 text-xl">›</span>
</a>

    </div>
  `
  : "";

  const authSection = !user
  ? `
    <div
      class="
        mt-auto
        pt-5
        border-t
        border-black/5
      "
    >
      <a
        href="#"
        class="
          loginBtn
          w-full
          h-12
          rounded-2xl
          bg-[#6B1A2A]
          text-white
          font-medium
          flex
          items-center
          justify-center
          text-center
          hover:opacity-90
          transition
        "
      >
        Login / Signup
      </a>
    </div>
  `
  : "";

 const logoutSection = user
  ? `
    <div
      class="
        mt-auto
        pt-5
        border-t
        border-black/5
      "
    >
      <button
        id="mobileLogoutBtn"
        class="
          w-full
          h-12
          rounded-2xl
          bg-[#6B1A2A]
          text-white
          font-medium
          flex
          items-center
          justify-center
          text-center
          hover:opacity-90
          transition
        "
      >
        Logout
      </button>
    </div>
  `
  : "";

  return `
    <div
      id="navOverlay"
      class="
        fixed
        inset-0
        bg-black/40
        backdrop-blur-[2px]
        opacity-0
        pointer-events-none
        transition-opacity
        duration-300
        z-[998]
      "
    ></div>

    <div
      id="mobileMenu"
      class="
        fixed
        top-0
        right-0
        z-[999]
        w-full
        max-w-[320px]
        h-[100dvh]
        bg-[#F9F6F2]
        translate-x-full
        transition-transform
        duration-300
        flex
        flex-col
        overflow-y-auto
        px-5
        pt-5
        pb-6
      "
    >
      <button
        id="drawerClose"
        class="self-end text-xl text-black/60"
      >
        ✕
      </button>

      ${userSection}
      ${accountLinks}

      <nav class="flex flex-col gap-0 mt-5">
        ${linksHTML}
      </nav>

      ${logoutSection}
      ${authSection}
    </div>
  `;
}
