"use client";

import Link from "next/link";

import { useWishlist } from "@/context/WishlistContext";
import { productUrl } from "@/lib/routes";

const PLACEHOLDER = "/assets/images/placeholder.webp";

function fallbackToPlaceholder(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = PLACEHOLDER;
}

function WishlistToggle({ productId }) {
  const { has, toggle } = useWishlist();
  const active = has(productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={`wishlist-btn absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded-full backdrop-blur transition ${
        active ? "active" : ""
      }`}
    >
      <svg
        className="w-6 h-6 transition duration-200"
        viewBox="0 0 24 24"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    </button>
  );
}

// Product tile used by every grid and carousel. Pass onRemove/onMoveToCart
// for the wishlist page variant (remove button instead of the heart).
export default function ProductCard({ product, onRemove, onMoveToCart }) {
  const productId = product._id || product.id;

  const img1 = product.images?.[0]?.url || PLACEHOLDER;
  const img2 = product.images?.[1]?.url || img1;

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  return (
    <div className="group relative w-full transition-transform duration-300 ease-out hover:-translate-y-1">
      {onRemove ? (
        <button
          type="button"
          onClick={() => onRemove(productId)}
          aria-label="Remove from wishlist"
          className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow hover:bg-red-50 transition text-sm"
        >
          ✕
        </button>
      ) : (
        <WishlistToggle productId={productId} />
      )}

      <Link href={productUrl(product.slug)} className="block">
        <div className="relative overflow-hidden bg-[#F9F6F2] rounded-md">
          <img
            src={img1}
            alt={product.name}
            onError={fallbackToPlaceholder}
            className="w-full aspect-[4/5] object-cover transition duration-500 group-hover:opacity-0"
            loading="lazy"
          />

          <img
            src={img2}
            alt=""
            aria-hidden="true"
            onError={fallbackToPlaceholder}
            className="w-full aspect-[4/5] object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
            loading="lazy"
          />

          {product.isBestSeller && (
            <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 bg-white/90 rounded shadow-sm">
              BESTSELLER
            </span>
          )}

          {hasDiscount && (
            <span className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 bg-black text-white rounded">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        <div className="mt-2 space-y-1 px-3">
          <h3 className="text-[0.9rem] font-medium leading-snug line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-1">
            <span className="text-[0.9rem] font-semibold">
              ₹{(product.price ?? 0).toLocaleString()}
            </span>

            {hasDiscount && (
              <span className="text-[0.8rem] line-through text-black/40">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>

      {onMoveToCart && (
        <button
          type="button"
          onClick={() => onMoveToCart(productId)}
          className="btn-primary w-full mt-2 h-9 text-xs"
        >
          Move to Cart
        </button>
      )}
    </div>
  );
}
