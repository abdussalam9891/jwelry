import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import CollectionListing from "@/components/product/CollectionListing";
import { collections } from "@/data/navigation";
import { pageMetadata } from "@/lib/metadata";
import { collectionUrl } from "@/lib/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

function findCollection(slug) {
  return collections.find((collection) => collection.slug === slug);
}

export async function generateMetadata({ params }) {
  const collection = findCollection((await params).slug);

  if (!collection) return {};

  return pageMetadata({
    title: `${collection.title} | Gemora`,
    description: collection.description,
    path: collectionUrl(collection.slug),
    image: collection.image,
  });
}

export default async function CollectionPage({ params }) {
  const collection = findCollection((await params).slug);

  if (!collection) notFound();

  return (
    <main>
      <section className="relative mt-16 md:mt-28 h-[38svh] min-h-[320px] sm:h-[42svh] lg:h-[46svh] lg:min-h-[420px] overflow-hidden">
        <img
          src={collection.image}
          alt={collection.title}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/5" />

        <div className="container-main relative z-10 flex h-full items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight mb-5">
              {collection.title}
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-white/85 leading-relaxed mb-8">
              {collection.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#productsSection"
                className="rounded-full bg-white px-5 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-base font-medium text-black transition hover:scale-[1.02]"
              >
                Explore Collection
              </a>

              <Link
                href="/products"
                className="rounded-full border border-white px-5 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-base text-white transition hover:bg-white hover:text-black"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="productsSection" className="py-24">
        <div className="container-main">
          <Suspense fallback={null}>
            <CollectionListing collection={collection} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
