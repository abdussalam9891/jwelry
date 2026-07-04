import Auth from "../../../core/auth.js";
import {
  getProductReviews,
  deleteReview,
   createReview,
  updateReview,
} from "../../../services/productService.js";

import {
  renderReviews,
  renderPagination,
} from "../reviewsRenderer.js";

import { openAuthModal } from "../../../components/authModal.js";

import { showToast } from "../utils.js";
import { productState } from "../state.js";



export function attachReviewModalEvents() {
  document
    .getElementById("writeReviewBtn")
    ?.addEventListener("click", async () => {
      const user = await Auth.getCurrentUser();

      if (!user) {
        await openAuthModal();
        return;
      }

      document
        .getElementById("reviewModal")
        ?.classList.remove("hidden");
    });

  document
    .getElementById("closeReviewModal")
    ?.addEventListener("click", () => {
      document
        .getElementById("reviewModal")
        ?.classList.add("hidden");
    });
}



export function attachReviewSubmitEvents() {
  document
    .getElementById("submitReviewBtn")
    ?.addEventListener("click", async () => {
      try {
        const formData = new FormData();

        formData.append(
          "rating",
          document.getElementById("reviewRating").value
        );

        formData.append(
          "comment",
          document.getElementById("reviewComment").value
        );

        const files =
          document.getElementById("reviewImages")?.files || [];

        [...files].forEach((file) =>
          formData.append("images", file)
        );

        if (productState.editingReviewId) {
          await updateReview(
            productState.editingReviewId,
            formData
          );
        } else {
          await createReview(
            productState.currentProduct._id,
            formData
          );
        }

        showToast("Review submitted");

        document
          .getElementById("reviewModal")
          ?.classList.add("hidden");

        location.reload();
      } catch (error) {
        console.error(error);

        showToast(
          error?.message ||
            "Failed to submit review"
        );
      }
    });
}




















/*Pagination*/

export function attachPaginationEvents(
  productId,
  page,
  totalPages,
  currentUser
) {
  const prevBtn = document.getElementById("prevReviewPage");
  const nextBtn = document.getElementById("nextReviewPage");

  if (prevBtn) {
    prevBtn.onclick = () => {
      if (page > 1) {
        loadReviewPage(productId, page - 1, currentUser);
      }
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      if (page < totalPages) {
        loadReviewPage(productId, page + 1, currentUser);
      }
    };
  }
}

/* Edit Review */

export function attachEditReviewEvents(reviews) {
  document
    .querySelectorAll(".edit-review-btn")
    .forEach((btn) => {
      btn.onclick = () => {
        const review = reviews.find(
          (r) => r._id === btn.dataset.id
        );

        if (!review) return;

        productState.editingReviewId = review._id;

        document.getElementById("reviewRating").value =
          review.rating;

        document.getElementById("reviewComment").value =
          review.comment;

        document.querySelector(
          "#reviewModal h3"
        ).textContent = "Edit Review";

        document.getElementById(
          "submitReviewBtn"
        ).textContent = "Update Review";

        document
          .getElementById("reviewModal")
          .classList.remove("hidden");
      };
    });
}

/*Delete Review*/

export function attachDeleteReviewEvents(
  productId,
  currentUser
) {
  document
    .querySelectorAll(".delete-review-btn")
    .forEach((btn) => {
      btn.onclick = () => {
        productState.reviewToDelete = btn.dataset.id;

        document
          .getElementById("deleteReviewModal")
          ?.classList.remove("hidden");
      };
    });

  const cancelBtn = document.getElementById(
    "cancelDeleteReview"
  );

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      productState.reviewToDelete = null;

      document
        .getElementById("deleteReviewModal")
        ?.classList.add("hidden");
    };
  }

  const confirmBtn = document.getElementById(
    "confirmDeleteReview"
  );

  if (confirmBtn) {
    confirmBtn.onclick = async () => {
      if (!productState.reviewToDelete) return;

      try {
        await deleteReview(
          productState.reviewToDelete
        );

        productState.reviewToDelete = null;

        document
          .getElementById("deleteReviewModal")
          ?.classList.add("hidden");

        showToast("Review deleted");

        await loadReviewPage(
          productId,
          1,
          currentUser
        );
      } catch (err) {
        console.error(err);
        showToast("Failed to delete review");
      }
    };
  }
}

/*Load Reviews*/

export async function loadReviewPage(
  productId,
  page,
  currentUser
) {
  try {
    const sort =
      document.getElementById("reviewSort")?.value ||
      "latest";

    const reviewData =
      await getProductReviews(
        productId,
        page,
        sort
      );

    renderReviews(
      reviewData,
      currentUser
    );

    renderPagination(reviewData);

    attachPaginationEvents(
      productId,
      reviewData.page,
      reviewData.totalPages,
      currentUser
    );

    attachEditReviewEvents(
      reviewData.reviews
    );

    attachDeleteReviewEvents(
      productId,
      currentUser
    );
  } catch (error) {
    console.error(error);
  }
}

/*Sort*/

export function attachReviewSort(
  productId,
  currentUser
) {
  const reviewSort =
    document.getElementById("reviewSort");

  if (!reviewSort) return;

  reviewSort.onchange = () => {
    loadReviewPage(
      productId,
      1,
      currentUser
    );
  };
}
