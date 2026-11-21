// Human-readable title for the /products listing, built from its filters.
// `params` is anything with a get(key) method (URLSearchParams, or the
// searchParams hook value on the client).

const AUDIENCE_LABELS = {
  women: "Women's",
  men: "Men's",
  kids: "Kids'",
  unisex: "Unisex",
};

const TAG_LABELS = {
  trending: "Trending",
  new: "New Arrival",
};

function formatLabel(value) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function listingTitle(params) {
  const search = params.get("search")?.trim();

  if (search) {
    return `Search Results for "${search}"`;
  }

  const parts = [];
  const tag = params.get("tag");
  const audience = params.get("targetAudience");
  const material = params.get("material");
  const type =
    params.get("productType") ||
    params.get("subcategory") ||
    params.get("category");

  if (TAG_LABELS[tag]) parts.push(TAG_LABELS[tag]);
  if (AUDIENCE_LABELS[audience]) parts.push(AUDIENCE_LABELS[audience]);
  if (material) parts.push(formatLabel(material));
  if (type) parts.push(formatLabel(type));

  return parts.join(" ") || "All Jewellery";
}
