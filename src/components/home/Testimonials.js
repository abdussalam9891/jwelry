"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { StarIcon } from "@/components/ui/icons";
import { getInitials } from "@/lib/format";
import { productUrl } from "@/lib/routes";
import { getTestimonials } from "@/lib/services/productService";

const MAX_COMMENT = 120;

function TestimonialCard({ review }) {
  const comment =
    review.comment.length > MAX_COMMENT
      ? `${review.comment.slice(0, MAX_COMMENT)}...`
      : review.comment;

  return (
    <Link href={productUrl(review.product?.slug)} className="group block pt-6">
      <div className="bg-white rounded-xl px-4 lg:px-5 pt-8 pb-4 text-center border border-black/5 shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:-translate-y-2 relative h-full">
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-4 border-white bg-[#6B1A2A] text-white flex items-center justify-center text-sm font-medium">
          {getInitials(review.userName)}
        </div>

        <h3 className="text-[0.95rem] font-medium mb-1">{review.userName}</h3>

        <div
          className="flex justify-center gap-0.5 mb-2"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {Array.from({ length: review.rating }, (_, i) => (
            <StarIcon key={i} className="w-4 h-4 text-yellow-500" />
          ))}
        </div>

        <p className="text-[0.85rem] text-black/60 leading-6 mb-3 line-clamp-3">
          &ldquo;{comment}&rdquo;
        </p>

        <span className="text-[0.8rem] text-[#6B1A2A] opacity-70 group-hover:opacity-100 transition">
          {review.product?.name
            ? `View ${review.product.name} →`
            : "View Product →"}
        </span>
      </div>
    </Link>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getTestimonials()
      .then((data) => setReviews(Array.isArray(data) ? data.slice(0, 4) : []))
      .catch((error) => console.error("Failed to load testimonials", error));
  }, []);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      data-reveal-group
    >
      {reviews.map((review) => (
        <TestimonialCard key={review._id} review={review} />
      ))}
    </div>
  );
}
