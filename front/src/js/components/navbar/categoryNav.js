import { navLinks } from "./navLinks.js";

export function createCategoryNav() {

  const linksHTML = navLinks.map(link => {

    const href = link.slug
      ? `/front/pages/products.html?subcategory=${link.slug}`
      : "/front/pages/products.html";

    return `
      <li>
        <a
          href="${href}"
          data-nav="${link.nav}"
          class="text-[#1A1A1A] text-[0.95rem] font-medium relative group transition-colors duration-250 hover:text-[#6B1A2A]"
        >
          ${link.label}

          <span
            class="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#6B1A2A] group-hover:w-full transition-all duration-250"
          ></span>
        </a>
      </li>
    `;

  }).join("");

  return `
    <div
      id="categoryNav"
      class="hidden md:flex items-center justify-center gap-8 px-6 h-[44px] fixed left-0 right-0 bg-[#F9F6F2] z-[999] border-b border-black/10 transition-[top] duration-300"
    >
      <ul class="flex items-center justify-center gap-8 w-full list-none">
        ${linksHTML}
      </ul>
    </div>
  `;
}
