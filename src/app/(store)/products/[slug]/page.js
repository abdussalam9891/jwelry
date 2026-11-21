import { cache } from "react";

import ProductDetails from "@/components/product/details/ProductDetails";
import { getServerApiBase, SITE_URL } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";
import { productUrl } from "@/lib/routes";

const FALLBACK_DESCRIPTION =
  "Explore premium jewellery from Gemora. View detailed product information, pricing, materials, and craftsmanship.";

// Server-side fetch for SEO only. The page itself still loads the product on
// the client, so a slow or failing API never blocks rendering for long.
const getProductForSeo = cache(async (slug) => {
  try {
    const res = await fetch(
      `${getServerApiBase()}/v1/products/slug/${encodeURIComponent(slug)}`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(4000) },
    );

    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
});

function productSeo(product) {
  // description is either a plain string or { short, design, details }
  const raw =
    typeof product.description === "string"
      ? product.description
      : product.description?.short || product.description?.design;

  const description = (
    raw || `Shop ${product.name} at Gemora. Handcrafted premium jewellery.`
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  const images = (product.images || []).map((img) => img?.url).filter(Boolean);

  return { description, images };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const path = productUrl(slug);
  const product = await getProductForSeo(slug);

  if (!product?.name) {
    return pageMetadata({
      title: "Product Details | Gemora",
      description: FALLBACK_DESCRIPTION,
      path,
    });
  }

  const { description, images } = productSeo(product);

  return pageMetadata({
    title: `${product.name} | Gemora`,
    description,
    path,
    ...(images[0] && { image: images[0] }),
  });
}

function ProductJsonLd({ product, slug }) {
  const { description, images } = productSeo(product);
  const inStock = (product.variants || []).some((v) => v.stock > 0);

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description,
    image: images,
    category: product.category,
    brand: { "@type": "Brand", name: "Gemora" },
    offers: {
      "@type": "Offer",
      url: new URL(productUrl(slug), SITE_URL).href,
      priceCurrency: "INR",
      price: product.price,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductForSeo(slug);

  return (
    <main className="container-main pt-6 pb-32">
      {product?.name && <ProductJsonLd product={product} slug={slug} />}
      <ProductDetails key={slug} slug={slug} />
    </main>
  );
}
