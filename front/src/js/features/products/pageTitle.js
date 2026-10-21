import { updateSeo } from "../../utils/seo.js";

export function setPageTitle() {
  const titleEl =
    document.getElementById(
      "pageTitle"
    );

  const breadcrumbEl =
    document.getElementById(
      "breadcrumbCurrent"
    );

  if (!titleEl) return;

  const params =
    new URLSearchParams(
      window.location.search
    );

  const search =
    params.get("search");

  const category =
    params.get("category");

  const subcategory =
    params.get(
      "subcategory"
    );

  const productType =
    params.get(
      "productType"
    );

  const material =
    params.get("material");

  const audience =
    params.get(
      "targetAudience"
    );

  const tag =
    params.get("tag");

  // SEARCH
  if (search) {
    const title =
      `Search Results for "${search}"`;

    titleEl.textContent =
      title;

    if (breadcrumbEl) {
      breadcrumbEl.textContent =
        title;
    }

    document.title =
      `${title} | Gemora`;

    return;
  }

  const parts = [];

  // TAG
  if (tag === "trending") {
    parts.push(
      "Trending"
    );
  }

  if (tag === "new") {
    parts.push(
      "New Arrival"
    );
  }

  // AUDIENCE
  const audienceMap = {
    women: "Women's",
    men: "Men's",
    kids: "Kids'",
    unisex: "Unisex",
  };

  if (
    audienceMap[
      audience
    ]
  ) {
    parts.push(
      audienceMap[
        audience
      ]
    );
  }

  // MATERIAL
  if (material) {
    parts.push(
      formatLabel(
        material
      )
    );
  }

  // PRODUCT TYPE
  if (productType) {
    parts.push(
      formatLabel(
        productType
      )
    );
  }

  // SUBCATEGORY
  else if (
    subcategory
  ) {
    parts.push(
      formatLabel(
        subcategory
      )
    );
  }

  // CATEGORY
  else if (
    category
  ) {
    parts.push(
      formatLabel(
        category
      )
    );
  }

  let title =
    parts.join(" ");

  if (!title) {
    title =
      "All Jewellery";
  }

  titleEl.textContent =
    title;

  if (
    breadcrumbEl
  ) {
    breadcrumbEl.textContent =
      title;
  }

  // Category listings are worth indexing on their own; every other filter
  // combination points back to the plain category (or all-products) page.
  updateSeo({
    title,
    description: `Shop ${title.toLowerCase()} at Gemora. Handcrafted premium jewellery for every occasion.`,
    path: category
      ? `/pages/products?category=${encodeURIComponent(category)}`
      : "/pages/products",
  });
}

function formatLabel(
  value
) {
  return value
    .replace(
      /-/g,
      " "
    )
    .replace(
      /\b\w/g,
      (char) =>
        char.toUpperCase()
    );
}

