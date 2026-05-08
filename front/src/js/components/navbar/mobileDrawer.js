import { navLinks } from "./navLinks.js";

export function createMobileDrawer() {

  const linksHTML = navLinks.map(link => {

    const href = link.slug
      ? `/front/pages/products.html?subcategory=${link.slug}`
      : "/front/pages/products.html";

    return `
      <a
        href="${href}"
        class="py-3 px-2 text-[#1A1A1A] text-[1rem] font-medium border-b border-black/5 hover:text-[#6B1A2A] transition-colors"
      >
        ${link.label}
      </a>
    `;

  }).join("");

  return `
    <div
      id="navOverlay"
      class="fixed inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 pointer-events-none transition-opacity duration-300 z-[998]"
    ></div>

    <div
      id="mobileMenu"
      class="fixed top-0 right-0 z-[999] w-full max-w-[320px] h-[100dvh] bg-[#F9F6F2] translate-x-full transition-transform duration-300 flex flex-col overflow-y-auto px-5 pt-5 pb-6"
    >

      <button id="drawerClose">
        ✕
      </button>

      <nav class="flex flex-col gap-0 mt-4">
        ${linksHTML}
      </nav>

      <div class="mt-6 pt-4 border-t border-black/5">
        <a
          href="#"
          class="loginBtn block py-2.5 px-3 text-center text-sm font-semibold border border-[#6B1A2A]"
        >
          Login / Signup
        </a>
      </div>

    </div>
  `;
}
