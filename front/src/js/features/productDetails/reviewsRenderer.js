// reviewRenderer.js

export function renderReviewsSection() {
  return `
    <div class="border-t pt-6">

      <div class="flex items-center justify-between mb-4">

        <div>
          <h3 class="text-[1rem] sm:text-[1.1rem] font-medium text-black">
            Customer Reviews
          </h3>

          <div class="flex items-center gap-2 mt-2">
            <span
              id="avgRating"
              class="text-2xl font-bold"
            >
              0.0
            </span>

            <span
              id="reviewCount"
              class="text-sm text-black/60"
            >
              (0)
            </span>
          </div>
        </div>

        <select
          id="reviewSort"
          class="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="latest">Latest</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>

      </div>

      <div
        id="ratingBreakdown"
        class="space-y-2 mb-5"
      ></div>

      <div
        id="reviewsContainer"
        class="space-y-4"
      >
        <div class="text-sm text-black/50">
          Loading reviews...
        </div>
      </div>

      <div
        id="reviewsPagination"
        class="flex justify-center gap-2 mt-5"
      ></div>

      <div class="flex justify-end mb-4">
        <button
          id="writeReviewBtn"
          class="bg-[#6B1A2A] text-white px-4 py-2 rounded-lg"
        >
          Write Review
        </button>
      </div>

    </div>
  `;
}







function renderStars(rating) {
  return `
    <div class="flex items-center gap-1">
      ${[1, 2, 3, 4, 5]
        .map(
          (i) => `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 ${i <= rating ? "text-yellow-500" : "text-gray-300"}"
          fill="currentColor"
          viewBox="0 0 20 20"
           aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.96c.3.922-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.176 0l-3.37 2.45c-.784.57-1.838-.196-1.539-1.118l1.286-3.96a1 1 0 00-.364-1.118L2.176 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z"/>
        </svg>
      `,
        )
        .join("")}
    </div>
  `;
}



export function renderPagination(reviewData) {
  const container = document.getElementById("reviewsPagination");

  if (!container) return;

  const { page = 1, totalPages = 1 } = reviewData;

  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <button
      id="prevReviewPage"
      class="border px-3 py-2 rounded"
      ${page === 1 ? "disabled" : ""}
    >
      Prev
    </button>

    <span class="px-3 py-2">
      ${page} / ${totalPages}
    </span>

    <button
      id="nextReviewPage"
      class="border px-3 py-2 rounded"
      ${page === totalPages ? "disabled" : ""}
    >
      Next
    </button>
  `;
}




 



function renderReviewSummary(averageRating, numReviews) {
  const avgEl = document.getElementById("avgRating");
  const countEl = document.getElementById("reviewCount");

  if (!avgEl || !countEl) return;

  avgEl.textContent = Number(averageRating).toFixed(1);
  countEl.textContent = `(${numReviews})`;
}



function renderRatingBreakdown(ratingBreakdown, numReviews) {
  const breakdownEl = document.getElementById("ratingBreakdown");

  if (!breakdownEl) return;

  breakdownEl.innerHTML = [5, 4, 3, 2, 1]
    .map((star) => {
      const count = ratingBreakdown[star] || 0;
      const percentage = numReviews ? (count / numReviews) * 100 : 0;

      return `
        <div class="flex items-center gap-2">

          <span class="w-6 text-sm">
            ${star}★
          </span>

          <div class="flex-1 h-2 bg-gray-200 rounded">
            <div
              class="h-2 rounded bg-[#6B1A2A]"
              style="width:${percentage}%"
            ></div>
          </div>

          <span class="text-xs w-6 text-right">
            ${count}
          </span>

        </div>
      `;
    })
    .join("");
}



function renderEmptyReviews(container) {
  container.innerHTML = `
    <div class="text-gray-500 text-sm py-4">
      No reviews yet. Be the first to review this product.
    </div>
  `;
}



function renderReviewCards(reviews, currentUser) {
  return reviews
    .map((r) => {
      const name = r.userName || "Anonymous";
      const rating = r.rating || 0;
      const comment = r.comment || "No comment provided";

      return `
        <div class="border rounded-lg p-4 bg-white shadow-sm">

          <div class="flex justify-between items-center mb-2">

            <div>

              <span class="font-medium text-sm">
                ${name}
              </span>

              ${
                r.verifiedPurchase
                  ? `
                    <span
                      class="ml-2 text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full"
                    >
                      Verified Purchase
                    </span>
                  `
                  : ""
              }

            </div>

            ${renderStars(rating)}

          </div>

          <p class="text-sm text-black/70 leading-relaxed">
            ${comment}
          </p>

          ${
            r.images?.length
              ? `
                <div class="flex gap-2 mt-3 flex-wrap">

                  ${r.images
                    .map(
                      (img) => `
                        <img
                          src="${img.url}"
                          class="w-16 h-16 object-cover rounded border"
                        />
                      `
                    )
                    .join("")}

                </div>
              `
              : ""
          }

          <div class="mt-3 text-xs text-black/50">
            ${new Date(r.createdAt).toLocaleDateString()}
          </div>

          ${
            currentUser && String(r.user) === String(currentUser.id)
              ? `
                <div class="mt-2 flex gap-3">

                  <button
                    class="edit-review-btn text-sm text-blue-600 font-medium"
                    data-id="${r._id}"
                  >
                    Edit
                  </button>

                  <button
                    class="delete-review-btn text-sm text-red-600 font-medium"
                    data-id="${r._id}"
                  >
                    Delete
                  </button>

                </div>
              `
              : ""
          }

        </div>
      `;
    })
    .join("");
}






export function renderReviews(reviewData, currentUser) {
  const {
    reviews = [],
    averageRating = 0,
    numReviews = 0,
    ratingBreakdown = {},
  } = reviewData;

  const container = document.getElementById("reviewsContainer");

  if (!container) return;

  renderReviewSummary(averageRating, numReviews);

  renderRatingBreakdown(ratingBreakdown, numReviews);

  if (!reviews.length) {
    renderEmptyReviews(container);
    return;
  }

  container.innerHTML = renderReviewCards(
    reviews,
    currentUser
  );
}

