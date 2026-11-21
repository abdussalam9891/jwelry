import path from "node:path";
import { fileURLToPath } from "node:url";

// Old static-site URLs (/pages/*.html) are still linked from emails, the
// backend's OAuth redirect, CMS content and search engines, so map every one
// of them onto the new routes. Query strings are passed through automatically.
const pageRedirects = [
  ["/index.html", "/"],
  ["/pages/products.html", "/products"],
  ["/pages/cart.html", "/cart"],
  ["/pages/checkout.html", "/checkout"],
  ["/pages/wishlist.html", "/wishlist"],
  ["/pages/orders.html", "/orders"],
  ["/pages/orderSuccess.html", "/order-success"],
  ["/pages/profile.html", "/profile"],
  ["/pages/login.html", "/login"],
  ["/pages/register.html", "/register"],
  ["/pages/auth.html", "/auth"],
  ["/pages/resetPassword.html", "/reset-password"],
  ["/pages/contact.html", "/contact"],
  ["/pages/about.html", "/about"],
  ["/pages/privacy.html", "/privacy"],
  ["/pages/termsAndConditions.html", "/terms"],
  ["/pages/terms.html", "/terms"],
  ["/pages/shipping.html", "/shipping"],
  ["/pages/returns.html", "/returns"],
  ["/pages/warranty.html", "/warranty"],
  ["/pages/collections.html", "/products"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root; a stray lockfile higher up the tree would
  // otherwise be picked as the root.
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },

  // Optional same-origin proxy: with API_PROXY_TARGET set, /api/* is
  // forwarded to that backend, so a local frontend can use a deployed API
  // whose CORS policy only allows the production origin. Pair it with
  // NEXT_PUBLIC_API_BASE=/api.
  async rewrites() {
    const target = process.env.API_PROXY_TARGET;

    return target
      ? [{ source: "/api/:path*", destination: `${target}/:path*` }]
      : [];
  },

  async redirects() {
    return [
      // Detail pages moved from ?slug= / ?id= to path segments.
      {
        source: "/pages/productDetails.html",
        has: [{ type: "query", key: "slug", value: "(?<slug>.+)" }],
        destination: "/products/:slug",
        permanent: true,
      },
      {
        source: "/pages/collection.html",
        has: [{ type: "query", key: "slug", value: "(?<slug>.+)" }],
        destination: "/collections/:slug",
        permanent: true,
      },
      {
        source: "/pages/orderDetails.html",
        has: [{ type: "query", key: "id", value: "(?<id>.+)" }],
        destination: "/orders/:id",
        permanent: true,
      },
      {
        source: "/pages/productDetails.html",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/pages/collection.html",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/pages/orderDetails.html",
        destination: "/orders",
        permanent: true,
      },
      ...pageRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      // Absolute asset URLs used in OG tags before the move to /public.
      {
        source: "/src/assets/:path*",
        destination: "/assets/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
