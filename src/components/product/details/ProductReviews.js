"use client";

import { useCallback, useEffect, useState } from "react";

import Modal from "@/components/ui/Modal";
import { StarIcon } from "@/components/ui/icons";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import {
  createReview,
  deleteReview,
  getProductReviews,
  updateReview,
} from "@/lib/services/productService";

const EMPTY_FORM = { rating: "", comment: "", files: [] };

function Stars({ rating }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon
          key={i}
          className={`w-4 h-4 ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, isOwn, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="font-medium text-sm">
            {review.userName || "Anonymous"}
          </span>

          {review.verifiedPurchase && (
            <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Verified Purchase
            </span>
          )}
        </div>

        <Stars rating={review.rating || 0} />
      </div>

      <p className="text-sm text-black/70 leading-relaxed">
        {review.comment || "No comment provided"}
      </p>

      {review.images?.length > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {review.images.map((image) => (
            <img
              key={image.url}
              src={image.url}
              alt=""
              className="w-16 h-16 object-cover rounded border"
            />
          ))}
        </div>
      )}

      <div className="mt-3 text-xs text-black/50">
        {new Date(review.createdAt).toLocaleDateString()}
      </div>

      {isOwn && (
        <div className="mt-2 flex gap-3">
          <button
            type="button"
            onClick={onEdit}
            className="text-sm text-blue-600 font-medium"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="text-sm text-red-600 font-medium"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductReviews({ productId }) {
  const { user, openLogin } = useAuth();
  const showToast = useToast();

  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("latest");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const loadReviews = useCallback(async () => {
    try {
      setData(await getProductReviews(productId, page, sort));
    } catch (error) {
      console.error(error);
    }
  }, [productId, page, sort]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const userId = user ? String(user.id || user._id) : null;

  function openNewReview() {
    if (!user) {
      openLogin();
      return;
    }

    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  }

  function openEditReview(review) {
    setEditingId(review._id);
    setForm({
      rating: String(review.rating),
      comment: review.comment || "",
      files: [],
    });
    setFormOpen(true);
  }

  async function submitReview() {
    const formData = new FormData();
    formData.append("rating", form.rating);
    formData.append("comment", form.comment);
    form.files.forEach((file) => formData.append("images", file));

    try {
      setSubmitting(true);

      if (editingId) {
        await updateReview(editingId, formData);
      } else {
        await createReview(productId, formData);
      }

      showToast("Review submitted");
      setFormOpen(false);

      if (page === 1) {
        await loadReviews();
      } else {
        setPage(1);
      }
    } catch (error) {
      console.error(error);
      showToast(error?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmDelete() {
    try {
      await deleteReview(deleteId);
      setDeleteId(null);
      showToast("Review deleted");

      if (page === 1) {
        await loadReviews();
      } else {
        setPage(1);
      }
    } catch (error) {
      console.error(error);
      showToast("Failed to delete review");
    }
  }

  const {
    reviews = [],
    averageRating = 0,
    numReviews = 0,
    ratingBreakdown = {},
    totalPages = 1,
  } = data || {};

  return (
    <div className="border-t pt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[1rem] sm:text-[1.1rem] font-medium text-black">
            Customer Reviews
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold">
              {Number(averageRating).toFixed(1)}
            </span>
            <span className="text-sm text-black/60">({numReviews})</span>
          </div>
        </div>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          aria-label="Sort reviews"
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="latest">Latest</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>

      {data && (
        <div className="space-y-2 mb-5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingBreakdown[star] || 0;
            const percentage = numReviews ? (count / numReviews) * 100 : 0;

            return (
              <div key={star} className="flex items-center gap-2">
                <span className="w-6 text-sm">{star}★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 rounded bg-[#6B1A2A]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs w-6 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-4">
        {!data ? (
          <div className="text-sm text-black/50">Loading reviews...</div>
        ) : reviews.length ? (
          reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              isOwn={userId !== null && String(review.user) === userId}
              onEdit={() => openEditReview(review)}
              onDelete={() => setDeleteId(review._id)}
            />
          ))
        ) : (
          <div className="text-gray-500 text-sm py-4">
            No reviews yet. Be the first to review this product.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="border px-3 py-2 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-2">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="border px-3 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <div className="flex justify-end mb-4 mt-5">
        <button
          type="button"
          onClick={openNewReview}
          className="bg-[#6B1A2A] text-white px-4 py-2 rounded-lg"
        >
          Write Review
        </button>
      </div>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        labelledBy="reviewModalTitle"
        className="items-center justify-center bg-black/50"
        panelClassName="bg-white rounded-xl p-6 w-full max-w-md"
      >
        <h3 id="reviewModalTitle" className="text-lg font-semibold mb-4">
          {editingId ? "Edit Review" : "Write Review"}
        </h3>

        <select
          value={form.rating}
          onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
          aria-label="Rating"
          className="w-full border p-2 rounded mb-3"
        >
          <option value="">Select Rating</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>

        <textarea
          rows={4}
          value={form.comment}
          onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
          placeholder="Write your review..."
          aria-label="Review"
          className="w-full border rounded p-2 mb-3"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) =>
            setForm((f) => ({ ...f, files: [...e.target.files] }))
          }
          aria-label="Review photos"
          className="mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setFormOpen(false)}
            className="border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={submitReview}
            className="btn-primary px-4 h-10"
          >
            {editingId ? "Update Review" : "Submit"}
          </button>
        </div>
      </Modal>

      <Modal
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        labelledBy="deleteReviewTitle"
        className="items-center justify-center bg-black/50"
        panelClassName="bg-white rounded-xl p-6 w-full max-w-md"
      >
        <h3 id="deleteReviewTitle" className="text-lg font-semibold">
          Delete Review
        </h3>
        <p className="mt-2 text-sm text-black/60">
          Are you sure you want to delete this review? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setDeleteId(null)}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
