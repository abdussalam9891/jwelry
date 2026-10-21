 
export function renderPagination(
  currentPage,
  totalPages
) {
  const container =
    document.getElementById(
      "pagination"
    );

  if (!container) return;

  container.innerHTML = "";

  if (totalPages <= 1) return;

  container.className =
    "flex items-center justify-center gap-2 mt-14 flex-wrap";

  const params =
    new URLSearchParams(
      window.location.search
    );

  // PREV
  if (currentPage > 1) {
    container.appendChild(
      createPageBtn({
        label: "←",
        page:
          currentPage - 1,
        params,
      })
    );
  }

  const pages =
    getVisiblePages(
      currentPage,
      totalPages
    );

  pages.forEach((page) => {
    if (page === "...") {
      const span =
        document.createElement(
          "span"
        );

      span.textContent =
        "...";

      span.className =
        "px-2 text-black/40";

      container.appendChild(
        span
      );

      return;
    }

    container.appendChild(
      createPageBtn({
        label: page,
        page,
        params,
        isActive:
          page ===
          currentPage,
      })
    );
  });

  // NEXT
  if (
    currentPage <
    totalPages
  ) {
    container.appendChild(
      createPageBtn({
        label: "→",
        page:
          currentPage + 1,
        params,
      })
    );
  }
}

function createPageBtn({
  label,
  page,
  params,
  isActive = false,
}) {
  const btn =
    document.createElement(
      "button"
    );

  const newParams =
    new URLSearchParams(
      params
    );

  newParams.set(
    "page",
    page
  );

  btn.textContent = label;

  btn.className = `
    min-w-[42px]
    h-10
    px-3
    rounded-full
    border
    text-sm
    font-medium
    transition-all
    duration-200

    ${
      isActive
        ? `
          bg-[#6B1A2A]
          text-white
          border-[#6B1A2A]
        `
        : `
          bg-white
          text-black/70
          border-black/10
          hover:border-[#6B1A2A]
          hover:text-[#6B1A2A]
        `
    }
  `;

  btn.addEventListener(
    "click",
    () => {
      window.location.search =
        newParams.toString();
    }
  );

  return btn;
}

function getVisiblePages(
  currentPage,
  totalPages
) {
  const pages = [];

  if (totalPages <= 7) {
    for (
      let i = 1;
      i <= totalPages;
      i++
    ) {
      pages.push(i);
    }

    return pages;
  }

  pages.push(1);

  if (currentPage > 3) {
    pages.push("...");
  }

  const start =
    Math.max(
      2,
      currentPage - 1
    );

  const end =
    Math.min(
      totalPages - 1,
      currentPage + 1
    );

  for (
    let i = start;
    i <= end;
    i++
  ) {
    pages.push(i);
  }

  if (
    currentPage <
    totalPages - 2
  ) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}

