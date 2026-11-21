import { SITE_URL } from "@/lib/config";
import { collections, filterCategories } from "@/data/navigation";
import { collectionUrl, productsUrl } from "@/lib/routes";

const STATIC_PAGES = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/products", changeFrequency: "daily", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/shipping", changeFrequency: "yearly", priority: 0.3 },
  { path: "/returns", changeFrequency: "yearly", priority: 0.3 },
  { path: "/warranty", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap() {
  const pages = [
    ...STATIC_PAGES,
    ...filterCategories.map(({ category }) => ({
      path: productsUrl({ category }),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    ...collections.map(({ slug }) => ({
      path: collectionUrl(slug),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
  ];

  return pages.map(({ path, ...rest }) => ({
    url: new URL(path, SITE_URL).href,
    ...rest,
  }));
}
