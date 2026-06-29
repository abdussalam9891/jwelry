
export function initSort() {
  const desktopSort =
    document.getElementById(
      "sortSelect"
    );

  const mobileSort =
    document.getElementById(
      "sortSelectMobile"
    );

  syncSortSelect(
    desktopSort
  );

  syncSortSelect(
    mobileSort
  );

  desktopSort?.addEventListener(
    "change",
    handleSortChange
  );

  mobileSort?.addEventListener(
    "change",
    handleSortChange
  );
}

function handleSortChange(
  event
) {
  const params =
    new URLSearchParams(
      window.location.search
    );

  const value =
    event.target.value;

  switch (value) {
    case "low":
      params.set(
        "sort",
        "price_asc"
      );
      break;

    case "high":
      params.set(
        "sort",
        "price_desc"
      );
      break;

    case "newest":
      params.set(
        "sort",
        "newest"
      );
      break;

    default:
      params.delete(
        "sort"
      );
  }

  params.delete("page");

  window.location.search =
    params.toString();
}

function syncSortSelect(
  select
) {
  if (!select) return;

  const sort =
    new URLSearchParams(
      window.location.search
    ).get("sort");

  switch (sort) {
    case "price_asc":
      select.value = "low";
      break;

    case "price_desc":
      select.value = "high";
      break;

    case "newest":
      select.value =
        "newest";
      break;

    default:
      select.value = "";
  }
}


export function renderSort() {
  return `
    <select
      id="sortSelect"
      class="border border-black/10 rounded-md px-4 py-2 text-sm bg-white"
    >
      <option value="">Sort By</option>
      <option value="newest">Newest</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
    </select>
  `;
}
