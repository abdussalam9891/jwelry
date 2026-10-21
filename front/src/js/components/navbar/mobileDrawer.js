import {
  jewelleryNavigation,
  collections,
  moreCategories,
} from "./navbarNavigation.js";

const chevron = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="w-4 h-4 text-black/35 transition-transform duration-300 group-open:rotate-180 group-open:text-[#6B1A2A]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
    aria-hidden="true"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
`;

const summaryClass =
  "list-none [&::-webkit-details-marker]:hidden flex items-center justify-between py-4 cursor-pointer select-none";

function sectionLabel(text) {
  return `
    <p class="flex items-center gap-3 mb-1 text-[10px] uppercase tracking-[0.3em] text-[#C6A96A]">
      <span>${text}</span>
      <span class="flex-1 h-px bg-[#C6A96A]/25"></span>
    </p>
  `;
}

function subLink(href, label) {
  return `
    <a
      href="${href}"
      class="py-2.5 text-[14px] text-black/60 hover:text-[#6B1A2A] active:text-[#6B1A2A] transition-colors"
    >
      ${label}
    </a>
  `;
}

function accordion(title, body) {
  return `
    <details class="group border-b border-black/[0.06] last:border-b-0">
      <summary class="${summaryClass}">
        <span class="font-['Cormorant_Garamond'] text-[19px] font-medium tracking-wide text-[#1A1A1A] group-open:text-[#6B1A2A] transition-colors">
          ${title}
        </span>
        ${chevron}
      </summary>
      <div class="flex flex-col pb-4 pl-4 ml-0.5 border-l border-[#C6A96A]/40">
        ${body}
      </div>
    </details>
  `;
}

export function createMobileDrawer(user = null) {
  const linksHTML = jewelleryNavigation
    .map((category) =>
      accordion(
        category.label,
        `
          ${category.productTypes
            .map((type) =>
              subLink(
                `/pages/products.html?category=${category.category}&productType=${type.value}`,
                type.label
              )
            )
            .join("")}

          <a
            href="/pages/products.html?category=${category.category}"
            class="mt-1 pt-2.5 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] font-medium text-[#6B1A2A]"
          >
            View All ${category.label}
            <span aria-hidden="true">→</span>
          </a>
        `
      )
    )
    .join("");

  const moreCategoriesHTML = accordion(
    "More Categories",
    moreCategories
      .map((category) =>
        subLink(`/pages/products.html?category=${category.slug}`, category.label)
      )
      .join("")
  );

  const collectionLinks = accordion(
    "Collections",
    collections
      .map((collection) =>
        subLink(`/pages/collection.html?slug=${collection.slug}`, collection.name)
      )
      .join("")
  );

  const userSection = user
    ? `
      <div class="relative overflow-hidden rounded-2xl bg-[#6B1A2A] text-white p-4">
        <div class="absolute -right-8 -top-8 w-28 h-28 rounded-full border border-[#C6A96A]/30"></div>
        <div class="absolute -right-2 -bottom-10 w-20 h-20 rounded-full border border-[#C6A96A]/20"></div>

        <div class="relative flex items-center gap-3">
          <div class="w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-[#C6A96A]/70 ring-offset-2 ring-offset-[#6B1A2A] bg-white/10">
            ${
              user.avatar
                ? `<img src="${user.avatar}" alt="" class="w-full h-full object-cover" />`
                : `
                  <div class="w-full h-full flex items-center justify-center font-['Cormorant_Garamond'] text-xl font-semibold text-[#C6A96A]">
                    ${user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                `
            }
          </div>

          <div class="min-w-0 flex-1">
            <p class="text-[10px] uppercase tracking-[0.25em] text-[#C6A96A]">
              Welcome back
            </p>
            <p class="font-['Cormorant_Garamond'] text-[20px] font-medium leading-tight truncate">
              ${user.name}
            </p>
            <p class="text-[12px] text-white/60 truncate">
              ${user.email || user.phone}
            </p>
          </div>
        </div>
      </div>
    `
    : `
      <div class="relative overflow-hidden rounded-2xl bg-[#6B1A2A] text-white p-5">
        <div class="absolute -right-8 -top-8 w-28 h-28 rounded-full border border-[#C6A96A]/30"></div>
        <p class="relative text-[10px] uppercase tracking-[0.3em] text-[#C6A96A]">
          Welcome to Gemora
        </p>
        <p class="relative mt-1 font-['Cormorant_Garamond'] text-[22px] leading-snug">
          Sign in for wishlists, orders &amp; exclusive offers
        </p>
      </div>
    `;

  const accountTile = (href, label, path) => `
    <a
      href="${href}"
      class="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-white border border-black/[0.05] shadow-[0_1px_2px_rgba(0,0,0,0.03)] active:scale-[0.97] transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="w-5 h-5 text-[#6B1A2A]">
        <path stroke-linecap="round" stroke-linejoin="round" d="${path}" />
      </svg>
      <span class="text-[11px] tracking-wide text-black/70">${label}</span>
    </a>
  `;

  const accountLinks = user
    ? `
      <div class="grid grid-cols-4 gap-2 mt-3">
        ${accountTile(
          "/pages/profile.html",
          "Profile",
          "M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0"
        )}
        ${accountTile(
          "/pages/orders.html",
          "Orders",
          "M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
        )}
        ${accountTile(
          "/pages/wishlist.html",
          "Wishlist",
          "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        )}
        ${accountTile(
          "/pages/cart.html",
          "Cart",
          "M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
        )}
      </div>
    `
    : "";

  const footerButtonClass =
    "w-full h-12 rounded-full text-[13px] uppercase tracking-[0.2em] font-medium flex items-center justify-center transition active:scale-[0.98]";

  const authSection = !user
    ? `
      <button
        type="button"
        class="loginBtn ${footerButtonClass} bg-[#6B1A2A] text-white shadow-[0_8px_20px_-8px_rgba(107,26,42,0.6)] hover:bg-[#5A1E2A]"
      >
        Login / Signup
      </button>
    `
    : "";

  const logoutSection = user
    ? `
      <button
        id="mobileLogoutBtn"
        type="button"
        class="${footerButtonClass} border border-[#6B1A2A]/30 text-[#6B1A2A] hover:bg-[#6B1A2A] hover:text-white"
      >
        Logout
      </button>
    `
    : "";

  return `
    <div
      id="navOverlay"
      class="fixed inset-0 bg-black/45 backdrop-blur-[3px] opacity-0 pointer-events-none transition-opacity duration-300 z-[var(--z-overlay)]"
    ></div>

    <div
      id="mobileMenu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      class="fixed top-0 left-0 z-[var(--z-drawer)] w-[88vw] max-w-[360px] h-[100dvh] bg-[#F9F6F2] rounded-r-[28px] shadow-[8px_0_40px_rgba(0,0,0,0.18)] -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col overflow-hidden"
    >
      <!-- HEADER -->
      <div class="flex items-center justify-between px-5 pt-5 pb-4 border-b border-black/[0.06]">
        <a href="/index.html" aria-label="Go to Gemora home" class="flex items-center">
          <img src="/src/assets/icon/logo.png" alt="Gemora" class="h-11 w-auto object-contain" decoding="async" />
        </a>

        <button
          id="drawerClose"
          type="button"
          aria-label="Close navigation menu"
          class="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-black/[0.06] text-black/60 hover:text-[#6B1A2A] active:scale-95 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- BODY -->
      <div class="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
        ${userSection}
        ${accountLinks}

        <nav class="mt-7" aria-label="Shop">
          ${sectionLabel("Shop Jewellery")}
          ${linksHTML}

          <div class="mt-7">
            ${sectionLabel("Discover")}
            ${moreCategoriesHTML}
            ${collectionLinks}
          </div>
        </nav>
      </div>

      <!-- FOOTER -->
      <div class="px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t border-black/[0.06] bg-[#F9F6F2]">
        ${logoutSection}
        ${authSection}
        <p class="mt-3 text-center text-[10px] uppercase tracking-[0.25em] text-black/35">
          Crafted with care · Gemora
        </p>
      </div>
    </div>
  `;
}
