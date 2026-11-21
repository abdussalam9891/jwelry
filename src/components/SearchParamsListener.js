"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Reports the current query string to a parent that lives outside a
// <Suspense> boundary. Rendering this inside <Suspense fallback={null}>
// lets layout-level components react to search params without opting the
// whole page out of static rendering.
export default function SearchParamsListener({ onChange }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    onChange(searchParams);
  }, [searchParams, onChange]);

  return null;
}
