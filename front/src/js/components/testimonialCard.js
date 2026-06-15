
function getInitials(name = "") {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function renderStars(rating) {
  return Array.from(
    { length: rating },
    () => `
      <svg
        class="w-4 h-4 text-yellow-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.951-.69z"/>
      </svg>
    `
  ).join("");
}

export function createTestimonialCard(
  review
) {
  const comment =
    review.comment.length > 120
      ? review.comment.slice(0, 120) + "..."
      : review.comment;

 return `
  <a
    href="/pages/productDetails.html?slug=${review.product.slug}"
    class="group block pt-6"
  >
    <div
      class="
      bg-white
      rounded-xl
      px-4
      lg:px-5
      pt-8
      pb-4
      text-center
      border border-black/5
      shadow-[0_8px_20px_rgba(0,0,0,0.04)]
      hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]
      transition-all duration-300
      group-hover:-translate-y-2
      relative
      h-full
      "
    >

      <!-- Avatar -->
      <div
        class="
        absolute
        -top-7
        left-1/2
        -translate-x-1/2
        w-14
        h-14
        rounded-full
        border-4
        border-white
        bg-[#6B1A2A]
        text-white
        flex
        items-center
        justify-center
        text-sm
        font-medium
        "
      >
        ${getInitials(review.userName)}
      </div>

      <!-- Name -->
      <h3
        class="text-[0.95rem] font-medium mb-1"
      >
        ${review.userName}
      </h3>

      <!-- Stars -->
      <div
        class="flex justify-center gap-0.5 mb-2"
      >
        ${renderStars(review.rating)}
      </div>

      <!-- Review -->
      <p
        class="
        text-[0.85rem]
        text-black/60
        leading-6
        mb-3
        line-clamp-3
        "
      >
        "${comment}"
      </p>

      <!-- CTA -->
      <span
        class="
        text-[0.8rem]
        text-[#6B1A2A]
        opacity-70
        group-hover:opacity-100
        transition
        "
      >
        ${
          review.product?.name
            ? `View ${review.product.name} →`
            : "View Product →"
        }
      </span>

    </div>
  </a>
`;
}
