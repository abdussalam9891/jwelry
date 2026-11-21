"use client";

import { useSearchParams } from "next/navigation";

// The order-success page is static; only the order id comes from the URL.
export default function OrderIdText() {
  return useSearchParams().get("id") || "--";
}
