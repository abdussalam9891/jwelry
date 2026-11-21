import { SITE_URL } from "@/lib/config";

// Account, cart and checkout pages carry a noindex robots meta tag instead of
// a Disallow rule, so crawlers can still read it and drop them from results.
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
