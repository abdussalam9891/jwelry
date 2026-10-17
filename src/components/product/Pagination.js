import Link from "next/link";

// 1 … 4 5 6 … 20 — always shows first/last plus the current page's neighbours.
function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [1];

  if (currentPage > 3) pages.push("...");

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (currentPage < totalPages - 2) pages.push("...");

  pages.push(totalPages);

  return pages;
}

const baseClass =
  "min-w-[42px] h-10 px-3 rounded-full border text-sm font-medium transition-all duration-200 inline-flex items-center justify-center";

const idleClass =
  "bg-white text-black/70 border-black/10 hover:border-[#6B1A2A] hover:text-[#6B1A2A]";

const activeClass = "bg-[#6B1A2A] text-white border-[#6B1A2A]";

export default function Pagination({
  basePath,
  currentPage,
  totalPages,
  queryString,
}) {
  if (totalPages <= 1) return null;

  function hrefFor(page) {
    const params = new URLSearchParams(queryString);
    params.set("page", page);
    return `${basePath}?${params.toString()}`;
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 mt-14 flex-wrap"
    >
      {currentPage > 1 && (
        <Link
          href={hrefFor(currentPage - 1)}
          aria-label="Previous page"
          className={`${baseClass} ${idleClass}`}
        >
          ←
        </Link>
      )}

      {getVisiblePages(currentPage, totalPages).map((page, index) =>
        page === "..." ? (
          <span key={`gap-${index}`} className="px-2 text-black/40">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={hrefFor(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`${baseClass} ${page === currentPage ? activeClass : idleClass}`}
          >
            {page}
          </Link>
        ),
      )}

      {currentPage < totalPages && (
        <Link
          href={hrefFor(currentPage + 1)}
          aria-label="Next page"
          className={`${baseClass} ${idleClass}`}
        >
          →
        </Link>
      )}
    </nav>
  );
}
