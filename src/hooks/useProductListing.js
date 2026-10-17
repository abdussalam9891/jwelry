"use client";

import { useEffect, useState } from "react";

import { getProducts } from "@/lib/services/productService";

// Fetches a page of products for the given query string. Stale responses
// (from a query the user has already navigated away from) are dropped.
export function useProductListing(queryString) {
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    setState({ status: "loading" });

    getProducts(Object.fromEntries(new URLSearchParams(queryString)))
      .then((data) => {
        if (cancelled) return;

        const products = Array.isArray(data?.products) ? data.products : [];

        setState({
          status: "ready",
          products,
          total: data?.totalProducts || products.length,
          page: data?.page || 1,
          totalPages: products.length ? data?.totalPages || 1 : 0,
        });
      })
      .catch((error) => {
        console.error("[useProductListing]", error);
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [queryString]);

  return state;
}
