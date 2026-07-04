function renderThumbnails(images = []) {
  return `
    <div class="flex md:flex-col gap-2   md:overflow-visible md:w-[80px]">

      ${images
        .map(
          (img) => `
        <img
          src="${img}"
          class="w-14 h-14 md:w-16 md:h-16 object-cover border rounded shrink-0"
          data-img="${img}"
        />
      `,
        )
        .join("")}

    </div>
  `;
}

function renderMainImage(img) {
  return `
    <div class="w-full rounded-xl overflow-hidden">
      <img
        id="mainProductImage"
        src="${img}"
       class="w-full h-[260px] sm:h-[320px] md:h-[420px] object-cover rounded-xl"
      />
    </div>
  `;
}




function renderProduct(product) {
  const container = document.getElementById("productContainer");

  container.innerHTML = `
    <div class="section-sm container-main max-w-7xl mx-auto px-4 md:px-6">

      <div class="grid grid-cols-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr] gap-6 md:gap-10 items-start">

        <!-- LEFT -->
        <div class="md:sticky md:top-24 self-start">
          <div class="flex flex-col md:flex-row gap-4">

            ${renderThumbnails(product.images?.map((img) => img.url))}

            <div class="w-full">
             ${renderMainImage(product.images?.[0]?.url)}
            </div>

          </div>
        </div>

        <!-- RIGHT -->
        <div>

          ${renderInfo(product)}



        </div>

      </div>

    </div>
  `;

  //  ADD THIS RIGHT HERE
  const prices = product.variants?.map((v) => v.price) || [];

  if (prices.length) {
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    const priceEl = document.getElementById("productPrice");

    if (priceEl) {
      priceEl.textContent = min === max ? `₹${min}` : `₹${min} – ₹${max}`;
    }
  }

  //  THEN attach events
  attachEvents(product);
}


function renderDescription(product) {
  const desc = product.description;

  // fallback
  if (!desc || typeof desc === "string") {
    return `
      <p class="text-[14px] leading-relaxed text-black/70">
        ${desc || "Elegant handcrafted jewelry piece designed for modern style and everyday elegance."}
      </p>
    `;
  }

  return `
    <div class="space-y-5 text-[14px] text-black/70">

      ${
        desc.short
          ? `
        <p class="leading-relaxed text-black/85 text-[15px]">
          ${desc.short}
        </p>
      `
          : ""
      }

      ${
        desc.design
          ? `
        <div class="border-l-2 border-[#6B1A2A]/40 pl-4">
          <p class="text-[12px] uppercase tracking-wider text-[#6B1A2A] mb-1">
            The Design
          </p>
          <p class="leading-relaxed text-black/75">
            ${desc.design}
          </p>
        </div>
      `
          : ""
      }

      ${
        desc.details?.length
          ? `
        <div>
          <p class="text-[12px] uppercase tracking-wider text-[#6B1A2A] mb-2">
            Product Details
          </p>
          <ul class="space-y-2">
            ${desc.details
              .map(
                (d) => `
              <li class="flex items-start gap-2 text-[14px]">
                <span class="text-[#6B1A2A] mt-[3px]">•</span>
                <span class="text-black/75">${d}</span>
              </li>
            `,
              )
              .join("")}
          </ul>
        </div>
      `
          : ""
      }

      ${
        desc.styling
          ? `
        <div class="bg-[#F9F6F2] border border-[#6B1A2A]/10 rounded-md p-4">
          <p class="text-[12px] uppercase tracking-wider text-[#6B1A2A] mb-1">
            Styling Tip
          </p>
          <p class="text-black/75 leading-relaxed text-[14px]">
            ${desc.styling}
          </p>
        </div>
      `
          : ""
      }

    </div>
  `;
}




function renderInfo(product) {
  return `
    <div class="w-full space-y-4 sm:space-y-5 md:space-y-6">

      <!-- TITLE -->
      <div class="space-y-1">
        <h1 class="text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
          ${product.name}
        </h1>

        <div class="flex items-center gap-2 text-xs sm:text-sm text-black/70">

        </div>
      </div>




       <!-- price -->
    <div class="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-2">

  <span id="productPrice">₹${product.price}</span>

  ${
    product.originalPrice
      ? `<span id="originalPrice" class="line-through text-black/40 text-sm sm:text-base">
          ₹${product.originalPrice}
        </span>`
      : ""
  }

</div>

<!-- STOCK -->
<div
  id="stockStatus"
  class="text-sm text-green-600"
></div>

      <!-- VARIANT -->
      <div>
      ${renderVariantOptions(product)}
      </div>



 <!-- Sticky Bottom CTA -->
  <!-- CTA -->
<div class="flex hidden md:flex flex-col sm:flex-row gap-3 mt-6">
  <!-- Wishlist -->
  <button
    id="wishlistBtn"
    data-id="${product._id}"
    class="wishlist-btn w-full sm:w-[56px] h-[52px] flex items-center justify-center border rounded-lg hover:bg-gray-50 transition order-3 sm:order-1"
    aria-label="Add to Wishlist"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 text-black/70"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.74 0-3.27.86-4 2.09-.73-1.23-2.26-2.09-4-2.09-2.761 0-5 2.015-5 4.5 0 6 9 11.25 9 11.25s9-5.25 9-11.25z"
      />
    </svg>
  </button>

  <div class="flex flex-1 gap-3 order-1 sm:order-2">
    <!-- Add to Cart -->
    <button
      id="addToCartBtn"
      class="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-black/90 transition"
    >
      ADD TO CART
    </button>

    <!-- Buy Now -->
    <button
      id="buyNowBtn"
      class="flex-1 bg-[#8B1E2D] text-white py-3 rounded-lg font-medium hover:bg-[#731826] transition"
    >
      BUY NOW
    </button>
  </div>
</div>



      <!-- OFFERS -->
      <div class="border rounded-xl p-3 sm:p-4 bg-black/[0.02]">
        <p class="font-medium mb-1">Offers</p>
        <div class="text-sm text-black/70">
          Extra 10% off above ₹1999
        </div>
      </div>




  <div>
      ${renderDeliveryChecker()}
      </div>









<div class="border-t pt-6">

  <!-- TITLE -->
  <h3 class="text-[1rem] sm:text-[1.1rem] font-medium text-black mb-3 tracking-wide">
    Product Description
  </h3>

  <!-- CONTENT -->
  <div class="relative">
    <div
      id="descContent"
      class="text-[0.95rem] sm:text-[1rem] text-black/70 leading-relaxed overflow-hidden max-h-[90px] transition-all duration-300"
    >
      ${renderDescription(product)}
    </div>

    <!-- Fade effect -->
    <div
      id="descFade"
      class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"
    ></div>
  </div>

  <!-- TOGGLE -->
  <button
    id="toggleDescBtn"
    class="text-[0.9rem] text-[#6B1A2A] mt-3 font-medium tracking-wide"
  >
    Show More
  </button>

</div>


<!-- DETAILS -->
<div class="pt-5">

  <h3 class="text-[1rem] sm:text-[1.1rem] font-medium text-black mb-3 tracking-wide">
    Product Details
  </h3>

  <ul class="space-y-2 text-[0.95rem] text-black/70">
    <li class="flex justify-between border-b pb-1">
      <span class="text-black/60">Category</span>
      <span class="capitalize">${product.category}</span>
    </li>

    <li class="flex justify-between border-b pb-1">
  <span class="text-black/60">
    Material
  </span>
  <span class="capitalize">
    ${selectedMaterial || product.variants?.[0]?.material || "-"}
  </span>
</li>

    <li class="flex justify-between border-b pb-1">
      <span class="text-black/60">Gender</span>
      <span class="capitalize">
  ${product.targetAudience || "unisex"}
</span>
    </li>
  </ul>

</div>








<!-- REVIEWS -->

<div class="border-t pt-6">

  <div
    class="flex items-center justify-between mb-4"
  >

    <div>

      <h3
        class="
        text-[1rem]
        sm:text-[1.1rem]
        font-medium
        text-black
        "
      >
        Customer Reviews
      </h3>

      <div
        class="
        flex
        items-center
        gap-2
        mt-2
        "
      >

        <span
          id="avgRating"
          class="
          text-2xl
          font-bold
          "
        >
          0.0
        </span>

        <span
          id="reviewCount"
          class="
          text-sm
          text-black/60
          "
        >
          (0)
        </span>

      </div>

    </div>

    <select
      id="reviewSort"
      class="
      border
      rounded-lg
      px-3
      py-2
      text-sm
      "
    >

      <option value="latest">
        Latest
      </option>

      <option value="highest">
        Highest Rating
      </option>

      <option value="lowest">
        Lowest Rating
      </option>

    </select>

  </div>

  <div
    id="ratingBreakdown"
    class="
    space-y-2
    mb-5
    "
  ></div>

  <div
    id="reviewsContainer"
    class="
    space-y-4
    "
  >

    <div
      class="
      text-sm
      text-black/50
      "
    >
      Loading reviews...
    </div>

  </div>

  <div
    id="reviewsPagination"
    class="
    flex
    justify-center
    gap-2
    mt-5
    "
  ></div>



  <div class="flex justify-end mb-4">

  <button
    id="writeReviewBtn"
    class="
    bg-[#6B1A2A]
    text-white
    px-4
    py-2
    rounded-lg
    "
  >
    Write Review
  </button>

</div>

</div>












      <!-- TRUST (SVG ICONS) -->
<div class="border border-[#6B1A2A]/10 rounded-2xl p-5 bg-[#F9F6F2] space-y-5">

  <!-- ITEM -->
  <div class="flex items-start gap-4">
    <div class="bg-white border border-[#6B1A2A]/10 p-2 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#6B1A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"  aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M3 7h13v10H3zM16 10h3l2 3v4h-5zM7.5 17.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm9 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
      </svg>
    </div>
    <div>
      <p class="text-[0.95rem] font-medium text-black">Free Delivery</p>
      <p class="text-[0.85rem] text-black/60">Arrives in 3–5 days</p>
    </div>
  </div>

  <!-- ITEM -->
  <div class="flex items-start gap-4">
    <div class="bg-white border border-[#6B1A2A]/10 p-2 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#6B1A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"  aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M4 4v6h6M20 20v-6h-6M5.5 9A7 7 0 0119 12m-14 0a7 7 0 0013.5 3"/>
      </svg>
    </div>
    <div>
      <p class="text-[0.95rem] font-medium text-black">Easy Returns</p>
      <p class="text-[0.85rem] text-black/60">7-day hassle-free returns</p>
    </div>
  </div>

  <!-- ITEM -->
  <div class="flex items-start gap-4">
    <div class="bg-white border border-[#6B1A2A]/10 p-2 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#6B1A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"  aria-hidden="true"   >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z"/>
      </svg>
    </div>
    <div>
      <p class="text-[0.95rem] font-medium text-black">Lifetime Warranty</p>
      <p class="text-[0.85rem] text-black/60">On plating & polish</p>
    </div>
  </div>

  <!-- ITEM -->
  <div class="flex items-start gap-4">
    <div class="bg-white border border-[#6B1A2A]/10 p-2 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#6B1A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"  aria-hidden="true" >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M12 11c1.1 0 2 .9 2 2v2h-4v-2c0-1.1.9-2 2-2zm6 0V9a6 6 0 10-12 0v2M5 11h14v10H5z"/>
      </svg>
    </div>
    <div>
      <p class="text-[0.95rem] font-medium text-black">Secure Checkout</p>
      <p class="text-[0.85rem] text-black/60">100% protected payments</p>
    </div>
  </div>

</div>






    </div>
  `;
}

function attachEvents(product) {
  // IMAGE SWITCH
  const mainImage = document.getElementById("mainProductImage");

  document.querySelectorAll("[data-img]").forEach((img) => {
    img.addEventListener("click", () => {
      if (!mainImage) return;

      mainImage.src = img.dataset.img;

      document
        .querySelectorAll("[data-img]")
        .forEach((i) => i.classList.remove("border-black"));

      img.classList.add("border-black");
    });
  });

  //  COMMON UI RESET
  function resetButtons(selector) {
    document.querySelectorAll(selector).forEach((b) => {
      b.classList.remove("bg-[#6B1A2A]", "text-white", "border-[#6B1A2A]");
      b.classList.add("border-black/20", "text-black/70", "bg-white");
    });
  }

  // MATERIAL
  document.querySelectorAll(".variant-material").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedMaterial = btn.dataset.material;

      updateSizeAvailability(product);

      resetButtons(".variant-material");

      btn.classList.add("bg-[#6B1A2A]", "text-white", "border-[#6B1A2A]");
      btn.classList.remove("border-black/20", "text-black/70", "bg-white");

      //  validate size with new material
      const match = product.variants.find(
        (v) =>
          v.material === selectedMaterial &&
          (selectedSize ? v.size === selectedSize : true),
      );

      if (!match) {
        selectedSize = null;
        resetButtons(".variant-size");
      }

      updateVariant(product);
      updateSizeAvailability(product);
      handleAddToCart(product); //   IMPORTANT
      initDeliveryChecker();
    });
  });

  //  SIZE
  document.querySelectorAll(".variant-size").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedSize = btn.dataset.size;

      resetButtons(".variant-size");

      btn.classList.add("bg-[#6B1A2A]", "text-white", "border-[#6B1A2A]");
      btn.classList.remove("border-black/20", "text-black/70", "bg-white");

      updateVariant(product);
    });
  });

  //show more/less description

  const desc = document.getElementById("descContent");
  const btn = document.getElementById("toggleDescBtn");

  if (desc && btn) {
    let expanded = false;

    btn.addEventListener("click", () => {
      expanded = !expanded;

      if (expanded) {
        desc.classList.remove("max-h-[80px]");
        desc.classList.add("max-h-[500px]");
        btn.textContent = "Show Less";
      } else {
        desc.classList.remove("max-h-[500px]");
        desc.classList.add("max-h-[80px]");
        btn.textContent = "Show More";
      }
    });

    // hide button if not needed
    setTimeout(() => {
      if (desc.scrollHeight <= 80) {
        btn.style.display = "none";
      }
    }, 0);
  }





  // REVIEW MODAL

  document.getElementById("writeReviewBtn")?.addEventListener("click", () => {
    document.getElementById("reviewModal")?.classList.remove("hidden");
  });

  document.getElementById("closeReviewModal")?.addEventListener("click", () => {
    document.getElementById("reviewModal")?.classList.add("hidden");
  });

  // REVIEW SUBMIT

  document
    .getElementById("submitReviewBtn")
    ?.addEventListener("click", async () => {
      try {
        const formData = new FormData();

        formData.append(
          "rating",
          document.getElementById("reviewRating").value,
        );

        formData.append(
          "comment",
          document.getElementById("reviewComment").value,
        );

        const files = document.getElementById("reviewImages").files;

        [...files].forEach((file) => formData.append("images", file));

        console.log(
          "Rating value:",
          document.getElementById("reviewRating").value,
        );

        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }

        if (editingReviewId) {
          await updateReview(editingReviewId, formData);
        } else {
          await createReview(currentProductId, formData);
        }

        showToast("Review submitted");

        location.reload();
      } catch (error) {
        console.error(error);

        showToast(error?.message || "Failed to submit review");
      }
    });
}




































































