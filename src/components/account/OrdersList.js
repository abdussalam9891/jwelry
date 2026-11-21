"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { capitalize, formatDate } from "@/lib/format";
import { orderUrl } from "@/lib/routes";
import { getMyOrders } from "@/lib/services/orderService";

function OrderCard({ order }) {
  const firstItem = order.items?.[0];
  const title = firstItem?.name || "Jewellery Item";
  const totalItems =
    order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <Link
      href={orderUrl(order._id)}
      className="block bg-white border border-black/5 rounded-3xl p-5 hover:border-[#E6D7DB] hover:shadow-md hover:-translate-y-[1px] transition"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-black/40 mb-1">
            Order ID
          </p>
          <p className="text-sm font-semibold text-[#6B1A2A]">
            #{order._id?.slice(-8)?.toUpperCase()}
          </p>
        </div>

        <div className="px-3 py-1 rounded-full bg-[#F8EEF1] border border-[#E8D7DC] text-[#6B1A2A] text-xs font-semibold shrink-0">
          {order.orderStatus ? capitalize(order.orderStatus) : "Confirmed"}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#F3F3F3] shrink-0">
          {firstItem?.image && (
            <img
              src={firstItem.image}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-medium truncate">{title}</h3>
          <p className="text-sm text-black/55 mt-1">
            {totalItems} item{totalItems > 1 ? "s" : ""} • ₹
            {order.totalPrice?.toLocaleString()}
          </p>
          <p className="text-xs text-black/40 mt-2">
            Ordered on{" "}
            {formatDate(order.createdAt, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="hidden sm:flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            aria-hidden="true"
            className="w-5 h-5 text-black/25"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

function NoOrders() {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 rounded-full bg-[#F8EEF1] flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className="w-10 h-10 text-[#6B1A2A]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5v10.125c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 0 1 3.75 17.625V7.5m16.5 0-2.28-2.28a1.125 1.125 0 0 0-.795-.33H6.825c-.298 0-.584.118-.795.33L3.75 7.5m16.5 0H3.75"
          />
        </svg>
      </div>

      <h2 className="text-3xl font-semibold tracking-tight mb-3">
        No orders yet
      </h2>
      <p className="text-sm text-black/50 max-w-sm leading-6 mb-8">
        You haven’t placed any orders yet. Start exploring timeless jewellery
        collections crafted for every moment.
      </p>

      <Link
        href="/"
        className="h-12 px-7 inline-flex items-center justify-center rounded-xl bg-[#6B1A2A] text-white text-sm font-medium hover:opacity-90 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function OrdersList() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMyOrders()
      .then((data) => setOrders(data?.orders || []))
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  if (error) return <p className="text-red-500">Failed to load orders</p>;
  if (!orders)
    return <p className="text-sm text-black/50">Loading orders...</p>;
  if (!orders.length) return <NoOrders />;

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}
