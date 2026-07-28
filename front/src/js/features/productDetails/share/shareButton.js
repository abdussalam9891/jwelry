export function renderShareButton() {
  return `
    <button
      id="shareBtn"
      type="button"
      class="
        flex-1
        h-12
        rounded-xl
        border
        border-gray-200
        bg-white
        px-4
        flex
        items-center
        justify-center
        gap-2.5
        text-gray-700
        transition-all
        duration-300
        hover:border-[#6B1A2A]
        hover:text-[#6B1A2A]
        hover:bg-[#FAF6F4]
        active:scale-[0.98]
      "
      aria-label="Share Product"
    >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.6" y1="13.5" x2="15.4" y2="17.5"></line>
        <line x1="15.4" y1="6.5" x2="8.6" y2="10.5"></line>
      </svg>

      <span class="text-sm font-medium tracking-wide">
        Share
      </span>

    </button>
  `;
}
