export function createSearchBar(id = "searchInput", mobile = false) {
  return `
    <div class="relative w-full">
      <input
        id="${id}"
        type="text"
        placeholder="Search jewellery..."
        class="
          w-full px-4 py-2 pr-10 rounded-full
          border border-black/10
          ${mobile ? "bg-white text-sm" : "bg-[#F9F6F2]"}
          focus:outline-none
          focus:ring-2
          focus:ring-[#6B1A2A]/30
        "
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="${mobile ? "w-4 h-4" : "w-5 h-5"} text-[#6B1A2A] absolute right-3 top-1/2 -translate-y-1/2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.65 5.65a7.5 7.5 0 0 0 10.6 10.6Z"
        />
      </svg>
    </div>
  `;
}
