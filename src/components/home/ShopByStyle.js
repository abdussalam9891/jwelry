"use client";

import { useEffect, useRef, useState } from "react";

import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/services/productService";

const TABS = [
  { type: "trending", label: "Trending", params: { tag: "trending" } },
  { type: "new", label: "New", params: { tag: "new" } },
  { type: "rings", label: "Rings", params: { category: "rings" } },
  { type: "earrings", label: "Earrings", params: { category: "earrings" } },
];

export default function ShopByStyle() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [productsByTab, setProductsByTab] = useState({});
  const [error, setError] = useState(false);
  const containerRef = useRef(null);

  const products = productsByTab[activeTab.type];

  useEffect(() => {
    containerRef.current?.scrollTo({ left: 0, behavior: "smooth" });

    // Each tab is fetched once and then served from state.
    if (productsByTab[activeTab.type]) return;

    let cancelled = false;
    setError(false);

    getProducts({ limit: 8, ...activeTab.params })
      .then((data) => {
        if (cancelled) return;

        if (!Array.isArray(data?.products)) {
          setError(true);
          return;
        }

        setProductsByTab((current) => ({
          ...current,
          [activeTab.type]: data.products.filter((p) => p && p._id),
        }));
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [activeTab, productsByTab]);

  let content;

  if (error) {
    content = (
      <div className="text-sm text-red-500 px-4">Failed to load products</div>
    );
  } else if (!products) {
    content = (
      <div className="text-sm text-gray-500 px-4">Loading products...</div>
    );
  } else if (!products.length) {
    content = (
      <p className="text-sm text-black/60 text-center py-6">
        No products found
      </p>
    );
  } else {
    content = products.map((product) => (
      <div
        key={product._id}
        className="w-[200px] min-w-[200px] flex-shrink-0 snap-start"
      >
        <ProductCard product={product} />
      </div>
    ));
  }

  return (
    <section className="section-sm bg-[#F9F6F2]/80 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 mb-4 reveal">
          <h2 className="text-lg font-semibold">Shop by Style</h2>
        </div>

        <div
          className="tabs flex gap-6 px-4 border-b overflow-x-auto scroll-smooth"
          role="tablist"
        >
          {TABS.map((tab) => (
            <button
              key={tab.type}
              type="button"
              role="tab"
              aria-selected={tab.type === activeTab.type}
              onClick={() => setActiveTab(tab)}
              className={`tab pb-2 ${tab.type === activeTab.type ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <div
            ref={containerRef}
            key={activeTab.type}
            className="drag-scroll flex gap-6 overflow-x-auto px-6 sm:px-4 py-6 scroll-smooth snap-x no-scrollbar"
            data-reveal-group
          >
            {content}
          </div>

          {/* Right fade hint */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white" />
        </div>
      </div>
    </section>
  );
}
