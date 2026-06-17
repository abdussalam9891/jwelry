export function renderActiveFilters() {
  const params = new URLSearchParams(window.location.search);

  const container =
    document.getElementById("activeFilters");

  if (!container) return;

  const chips = [];

  for (const [key, value] of params.entries()) {
    if (key === "page" || key === "sort") continue;

   chips.push(`
  <button
    class="
      group
      inline-flex
      items-center
      gap-2

      h-10
      px-4

      rounded-full

      bg-[#FAF8F6]
      border
      border-[#E7DED7]

      text-[13px]
      text-black/75

      hover:border-[#6B1A2A]
      hover:text-[#6B1A2A]

      transition-all
      duration-300
    "
    data-remove="${key}"
  >
    <span>
      ${formatFilterLabel(value)}
    </span>

    <span
      class="
        text-black/40
        group-hover:text-[#6B1A2A]
      "
    >
      ✕
    </span>
  </button>
`);
  }

 container.innerHTML = `
<div
  class="
    flex
    flex-wrap
    items-center
    gap-3
    py-2
  "
>

  ${chips.join("")}

  ${
    chips.length
      ? `
      <button
        id="clearAllFilters"
        class="
          text-sm
          text-black/45
          hover:text-[#6B1A2A]
          transition
        "
      >
        Clear all
      </button>
      `
      : ""
  }

</div>
`;
}
