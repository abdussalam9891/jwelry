"use client";

import { useEffect, useState } from "react";

import { getAvailableCoupons } from "@/lib/services/couponService";

function couponValue(coupon) {
  return coupon.discountType === "PERCENTAGE"
    ? `${coupon.discountValue}% OFF`
    : `₹${coupon.discountValue.toLocaleString()} OFF`;
}

// Lists the offers that apply to this order and the one currently applied.
export default function CouponSection({ pricing, onApply, onRemove }) {
  const [coupons, setCoupons] = useState([]);
  const subtotal = pricing.subtotal;
  const applied = pricing.coupon;

  useEffect(() => {
    getAvailableCoupons(subtotal)
      .then((data) => setCoupons(data?.applicableCoupons || []))
      .catch((err) => console.error(err));
  }, [subtotal]);

  return (
    <section className="mt-2 overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
        <div>
          <h3 className="text-[15px] font-semibold">Offers</h3>
          <p className="mt-1 text-[13px] text-black/45">
            Best available savings for this order
          </p>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-[#6B1A2A]"
          aria-hidden="true"
        >
          <path d="M3 9V6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75V9a2 2 0 0 0 0 6v2.25A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V15a2 2 0 0 0 0-6Z" />
          <path d="M9 7.5v9" />
          <path d="M13.5 9.5h.01" />
          <path d="M16.5 14.5h.01" />
          <path d="M16.8 9.2l-3.6 6.1" />
        </svg>
      </div>

      {applied && (
        <div className="px-6 py-5 border-b border-green-100 bg-green-50/40">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[14px] font-semibold text-green-700">
                {applied.code}
              </p>
              <p className="mt-1 text-[13px] text-green-600">
                ₹{(pricing.discount || 0).toLocaleString()} saved on this order
              </p>
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="text-[13px] font-medium text-[#6B1A2A] hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {coupons.length ? (
        coupons.map((coupon) => (
          <div
            key={coupon.code}
            className="flex items-center justify-between gap-5 px-6 py-5 border-b border-black/5 last:border-0"
          >
            <div className="flex-1">
              <p className="text-[14px] font-semibold tracking-wide">
                {coupon.code}
              </p>
              <p className="mt-2 text-[13px] text-black/75">
                {couponValue(coupon)}
              </p>
              <p className="mt-1 text-[12px] text-black/45">
                {coupon.minOrderAmount
                  ? `Minimum order ₹${coupon.minOrderAmount.toLocaleString()}`
                  : "No minimum purchase"}
              </p>
            </div>

            {applied?.code === coupon.code ? (
              <span className="text-[13px] font-medium text-green-600">
                Applied
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onApply(coupon.code)}
                className="shrink-0 h-10 min-w-[92px] rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium transition-all duration-200 hover:border-[#6B1A2A] hover:text-[#6B1A2A]"
              >
                Apply
              </button>
            )}
          </div>
        ))
      ) : (
        <div className="px-6 py-10 text-center">
          <p className="text-[14px] text-black/45">
            No offers are available for this order.
          </p>
        </div>
      )}
    </section>
  );
}
