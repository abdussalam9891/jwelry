"use client";

import { useEffect, useState } from "react";

import ProductRow from "@/components/product/ProductRow";
import { useAuth } from "@/context/AuthContext";
import {
  addRecentlyViewed,
  getRecentlyViewed,
} from "@/lib/services/recentlyViewedService";
import {
  getSimilarProducts,
  getTrendingProducts,
} from "@/lib/services/productService";

function Section({ title, products }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl md:text-3xl font-light mb-6">{title}</h2>
      {products && <ProductRow products={products} />}
    </div>
  );
}

// Recently viewed (signed-in only), similar and trending strips below a product.
export default function RelatedProducts({ product }) {
  const { user } = useAuth();

  const [recent, setRecent] = useState([]);
  const [similar, setSimilar] = useState(null);
  const [trending, setTrending] = useState(null);

  useEffect(() => {
    if (!user) {
      setRecent([]);
      return;
    }

    let cancelled = false;

    // Record this view first so it shows up in the list.
    addRecentlyViewed(product._id)
      .catch((error) => console.error("Failed to save recently viewed:", error))
      .then(() => getRecentlyViewed())
      .then((response) => {
        if (!cancelled) setRecent(response?.products || []);
      })
      .catch((error) =>
        console.error("Failed to load recently viewed:", error),
      );

    return () => {
      cancelled = true;
    };
  }, [user, product._id]);

  useEffect(() => {
    let cancelled = false;

    Promise.all([getSimilarProducts(product.category), getTrendingProducts()])
      .then(([similarData, trendingData]) => {
        if (cancelled) return;
        setSimilar(similarData?.products || []);
        setTrending(trendingData?.products || []);
      })
      .catch((error) => console.error(error));

    return () => {
      cancelled = true;
    };
  }, [product.category]);

  return (
    <>
      {recent.length > 0 && (
        <Section title="Recently Viewed" products={recent} />
      )}
      <Section title="Similar Products" products={similar} />
      <Section title="You may also like" products={trending} />
    </>
  );
}
