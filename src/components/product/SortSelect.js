"use client";

import { useRouter } from "next/navigation";

// UI option -> API `sort` value
const SORT_VALUES = {
  newest: "newest",
  low: "price_asc",
  high: "price_desc",
};

export default function SortSelect({ basePath, queryString }) {
  const router = useRouter();
  const params = new URLSearchParams(queryString);

  const current =
    Object.keys(SORT_VALUES).find(
      (key) => SORT_VALUES[key] === params.get("sort"),
    ) || "";

  function handleChange(e) {
    const next = new URLSearchParams(queryString);
    const sort = SORT_VALUES[e.target.value];

    if (sort) {
      next.set("sort", sort);
    } else {
      next.delete("sort");
    }

    next.delete("page");
    router.push(`${basePath}?${next.toString()}`);
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      aria-label="Sort products"
      className="border border-black/10 rounded-md px-4 py-2 text-sm bg-white"
    >
      <option value="">Sort By</option>
      <option value="newest">Newest</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
    </select>
  );
}
