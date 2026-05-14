import { openAuthModal } from "../components/authModal.js";
import Auth from "../core/auth.js";
import { initWishlist, loadWishlistState  } from "../features/wishlist.js";
import { renderHorizontalSection } from "../components/horizontalProducts.js";
import { CONFIG } from "../config.js";

document.addEventListener("DOMContentLoaded", loadProduct);






let selectedMaterial = null;
let selectedSize = null;
let selectedVariantId = null;



async function loadProduct() {
  const container = document.getElementById("productContainer");
  if (!container) return;

  const slug = new URLSearchParams(window.location.search).get("slug");

  if (!slug) {
    container.innerHTML = "Product not found";
    return;
  }

  try {
    container.innerHTML = "Loading product...";

    // 1. Fetch product
    const res = await fetch(`${CONFIG.API_BASE}/v1/products/slug/${slug}`);
    if (!res.ok) throw new Error("Product fetch failed");

    const product = await res.json();

    // 2. Render UI
    renderProduct(product);

    // ❌ REMOVE this (wishlist already handled globally)
    // attachEvents(product);

    // ✅ INIT GLOBAL WISHLIST SYSTEM
    initWishlist();

    // ✅ LOAD STATE + APPLY UI
    await loadWishlistState();

    // 3. Fetch reviews
    const reviewsRes = await fetch(
      `${CONFIG.API_BASE}/v1/reviews/${product._id}`
    );

    if (!reviewsRes.ok) throw new Error("Reviews fetch failed");

    const reviews = await reviewsRes.json();

    // 4. Render reviews
    renderReviews(reviews);


    //  5. Fetch similar products (same subcategory)
const similarRes = await fetch(
  `${CONFIG.API_BASE}/v1/products?subcategory=${product.subcategory}&limit=10`
);

const similarData = await similarRes.json();

//  6. Render similar section
await renderHorizontalSection({
  containerId: "similarSection",
  products: similarData.products || []
});


//  7. Fetch recommended (trending)
const recRes = await fetch(
  `${CONFIG.API_BASE}/v1/products?tag=trending&limit=10`
);

const recData = await recRes.json();

//  8. Render recommended section
await renderHorizontalSection({
  containerId: "recommendSection",
  products: recData.products || []
});

  } catch (err) {
    console.error(err);
    container.innerHTML = "Failed to load product";
  }
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

      ${desc.short ? `
        <p class="leading-relaxed text-black/85 text-[15px]">
          ${desc.short}
        </p>
      ` : ""}

      ${desc.design ? `
        <div class="border-l-2 border-[#6B1A2A]/40 pl-4">
          <p class="text-[12px] uppercase tracking-wider text-[#6B1A2A] mb-1">
            The Design
          </p>
          <p class="leading-relaxed text-black/75">
            ${desc.design}
          </p>
        </div>
      ` : ""}

      ${desc.details?.length ? `
        <div>
          <p class="text-[12px] uppercase tracking-wider text-[#6B1A2A] mb-2">
            Product Details
          </p>
          <ul class="space-y-2">
            ${desc.details.map(d => `
              <li class="flex items-start gap-2 text-[14px]">
                <span class="text-[#6B1A2A] mt-[3px]">•</span>
                <span class="text-black/75">${d}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      ` : ""}

      ${desc.styling ? `
        <div class="bg-[#F9F6F2] border border-[#6B1A2A]/10 rounded-md p-4">
          <p class="text-[12px] uppercase tracking-wider text-[#6B1A2A] mb-1">
            Styling Tip
          </p>
          <p class="text-black/75 leading-relaxed text-[14px]">
            ${desc.styling}
          </p>
        </div>
      ` : ""}

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

            ${renderThumbnails(product.images?.map( (img) => img.url))}

            <div class="w-full">
             ${renderMainImage(product.images?.[0]?.url)}
            </div>

          </div>
        </div>

        <!-- RIGHT -->
        <div>

          ${renderInfo(product)}

          <div class="mt-10">
            <h2 class="text-lg font-semibold mb-2">
              Reviews <span id="reviewCount">(0)</span>
            </h2>

            <div class="mb-3 text-sm text-black/60">
              <span id="avgRating">0.0</span> Average rating
            </div>

            <div id="reviewsContainer" class="space-y-3"></div>
          </div>

        </div>

      </div>

    </div>
  `;

  //  ADD THIS RIGHT HERE
  const prices = product.variants?.map(v => v.price) || [];

  if (prices.length) {
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    const priceEl = document.getElementById("productPrice");

    if (priceEl) {
      priceEl.textContent =
        min === max ? `₹${min}` : `₹${min} – ₹${max}`;
    }
  }

  //  THEN attach events
  attachEvents(product);
}

function renderThumbnails(images = []) {
  return `
    <div class="flex md:flex-col gap-2   md:overflow-visible md:w-[80px]">

      ${images.map(img => `
        <img
          src="${img}"
          class="w-14 h-14 md:w-16 md:h-16 object-cover border rounded shrink-0"
          data-img="${img}"
        />
      `).join("")}

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



  function renderVariantOptions(product) {
  if (!product.variants || product.variants.length === 0) return "";

  const materials = [...new Set(product.variants.map(v => v.material))];
  const sizes = [...new Set(product.variants.map(v => v.size).filter(Boolean))];

  return `
    <div class="space-y-4">

      <!-- MATERIAL -->
      <div>
        <p class="text-sm font-medium mb-2">Choose Material</p>
        <div class="flex flex-wrap gap-2">
          ${materials.map(m => `
            <button
              class="variant-material border px-3 py-2 text-sm rounded-lg"
              data-material="${m}"
            >
              ${m}
            </button>
          `).join("")}
        </div>
      </div>

      ${
        sizes.length > 0
          ? `
      <!-- SIZE -->
      <div>
        <p class="text-sm font-medium mb-2">Select Size</p>
        <div class="flex flex-wrap gap-2">
          ${sizes.map(s => `
            <button
              class="variant-size border px-3 py-2 text-sm rounded-lg"
              data-size="${s}"
            >
              ${s}
            </button>
          `).join("")}
        </div>
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
           <span>4.4 (34 reviews)</span>
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

      <!-- VARIANT -->
      <div>
      ${renderVariantOptions(product)}
      </div>

      <!-- DELIVERY -->
      <div class="border rounded-xl p-3 sm:p-4 bg-black/[0.02] space-y-3">

        <p class="text-sm sm:text-base font-medium">
          Estimated Delivery
        </p>

        <div class="flex flex-col sm:flex-row gap-2">
          <input
          id="pincodeInput"
            type="text"
            placeholder="Enter pincode"
            class="w-full border px-3 py-2 rounded"
          />
          <button id="checkPincodeBtn" class="w-full sm:w-auto px-4 py-2 bg-black text-white rounded">
            Check
          </button>
          <p id="deliveryResult" class="text-xs text-[#6B1A2A]"></p>
        </div>



      </div>

      <!-- CTA -->
      <div class="flex gap-3">
        <button
          id="addToCartBtn"
          class="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-black/90 transition"
        >
          ADD TO CART
        </button>

       <button
  id="wishlistBtn"
  data-id="${product._id}"
  class="wishlist-btn border px-4 rounded"
>
          <!-- Heart -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-black/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.74 0-3.27.86-4 2.09-.73-1.23-2.26-2.09-4-2.09-2.761 0-5 2.015-5 4.5 0 6 9 11.25 9 11.25s9-5.25 9-11.25z"/>
          </svg>
        </button>
      </div>




      <!-- OFFERS -->
      <div class="border rounded-xl p-3 sm:p-4 bg-black/[0.02]">
        <p class="font-medium mb-1">Offers</p>
        <div class="text-sm text-black/70">
          Extra 10% off above ₹1999
        </div>
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
      <span class="text-black/60">Type</span>
      <span class="capitalize">${product.subcategory}</span>
    </li>

    <li class="flex justify-between border-b pb-1">
      <span class="text-black/60">Gender</span>
      <span class="capitalize">${product.gender || "Unisex"}</span>
    </li>
  </ul>

</div>












      <!-- TRUST (SVG ICONS) -->
<div class="border border-[#6B1A2A]/10 rounded-2xl p-5 bg-[#F9F6F2] space-y-5">

  <!-- ITEM -->
  <div class="flex items-start gap-4">
    <div class="bg-white border border-[#6B1A2A]/10 p-2 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#6B1A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#6B1A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#6B1A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#6B1A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  document.querySelectorAll(selector).forEach(b => {
    b.classList.remove("bg-[#6B1A2A]", "text-white", "border-[#6B1A2A]");
    b.classList.add("border-black/20", "text-black/70", "bg-white");
  });
}


// MATERIAL
document.querySelectorAll(".variant-material").forEach(btn => {
  btn.addEventListener("click", () => {

    selectedMaterial = btn.dataset.material;

    updateSizeAvailability(product);

    resetButtons(".variant-material");

    btn.classList.add("bg-[#6B1A2A]", "text-white", "border-[#6B1A2A]");
    btn.classList.remove("border-black/20", "text-black/70", "bg-white");

    // 🔥 validate size with new material
    const match = product.variants.find(v =>
      v.material === selectedMaterial &&
      (selectedSize ? v.size === selectedSize : true)
    );

    if (!match) {
      selectedSize = null;
      resetButtons(".variant-size");
    }

    updateVariant(product);
    updateSizeAvailability(product); // 🔥 IMPORTANT
  });
});


// 🔥 SIZE
document.querySelectorAll(".variant-size").forEach(btn => {
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













  const addToCartBtn = document.getElementById("addToCartBtn");

addToCartBtn?.addEventListener("click", async () => {

  // 🔥 smarter validation
  if (product.variants.length) {

    const hasSize = product.variants.some(v => v.size);
    const hasMaterial = product.variants.some(v => v.material);

    if (hasMaterial && !selectedMaterial) {
      showToast("Please select material");
      return;
    }

    if (hasSize && !selectedSize) {
      showToast("Please select size");
      return;
    }

    if (!selectedVariantId) {
      showToast("Please select valid combination");
      return;
    }
  }




  const user =
  await Auth.getCurrentUser();

if (!user) {

  await openAuthModal();

  return;

}

try {

  await fetch(
    `${CONFIG.API_BASE}/v1/cart/${product._id}`,
    {
      method: "POST",

      credentials: "include",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        variantId: selectedVariantId
      })

    }
  );

  showToast("Added to cart");

} catch (err) {

  console.error(err);

  showToast("Failed to add to cart");

}




});




  // 📦 PINCODE (unchanged)
  const pincodeInput = document.getElementById("pincodeInput");
  const checkBtn = document.getElementById("checkPincodeBtn");
  const resultEl = document.getElementById("deliveryResult");

  if (pincodeInput && checkBtn && resultEl) {
    const handleCheck = async () => {
      const pincode = pincodeInput.value.trim();

      if (!/^[1-9][0-9]{5}$/.test(pincode)) {
        resultEl.textContent = "Enter a valid 6-digit pincode";
        resultEl.className = "text-xs text-red-500";
        return;
      }

      resultEl.textContent = "Checking...";
      resultEl.className = "text-xs text-black/60";

      try {
        const res = await fetch(`${CONFIG.API_BASE}/v1/delivery/${pincode}`);
        const data = await res.json();

        if (!data.available) {
          resultEl.textContent = "Delivery not available";
          resultEl.className = "text-xs text-red-500";
          return;
        }

        resultEl.textContent = `Delivery by ${data.estimatedDate}`;
        resultEl.className = "text-xs text-[#6B1A2A]";

      } catch (err) {
        console.error(err);
        resultEl.textContent = "Something went wrong";
        resultEl.className = "text-xs text-red-500";
      }
    };

    checkBtn.addEventListener("click", handleCheck);

    pincodeInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleCheck();
    });
  }
}

function updateVariant(product) {

  const variant = product.variants.find(v =>
    v.material === selectedMaterial &&
    (v.size ? v.size === selectedSize : true)
  );

  const priceEl = document.getElementById("productPrice");
  const originalEl = document.getElementById("originalPrice");

  if (!variant) {
    selectedVariantId = null;
    priceEl.textContent = "Select options";
    if (originalEl) originalEl.textContent = "";
    return;
  }

  selectedVariantId = variant._id;

  // ✅ current price
  priceEl.textContent = `₹${variant.price}`;

  // 🔥 FIX: make original price ALWAYS higher
  if (originalEl) {
    const fakeOriginal = variant.price + 2000; // tweak value
    originalEl.textContent = `₹${fakeOriginal}`;
  }
}



function updateSizeAvailability(product) {

  let firstAvailableSize = null;

  document.querySelectorAll(".variant-size").forEach(btn => {
    const size = btn.dataset.size;

    const isAvailable = product.variants.some(v =>
      v.material === selectedMaterial && v.size === size
    );

    // disable / enable
    btn.disabled = !isAvailable;

    btn.classList.toggle("opacity-40", !isAvailable);
    btn.classList.toggle("cursor-not-allowed", !isAvailable);

    // track first available
    if (isAvailable && !firstAvailableSize) {
      firstAvailableSize = size;
    }

    // ❌ remove active if invalid
    if (!isAvailable && selectedSize === size) {
      btn.classList.remove("bg-[#6B1A2A]", "text-white");
      selectedSize = null;
    }
  });

  // 🔥 AUTO SELECT (important UX)
  if (!selectedSize && firstAvailableSize) {
    selectedSize = firstAvailableSize;

    const btn = document.querySelector(`[data-size="${firstAvailableSize}"]`);
    btn?.classList.add("bg-[#6B1A2A]", "text-white");
  }
}




function renderReviews(reviews) {
  const container = document.getElementById("reviewsContainer");
  const avgEl = document.getElementById("avgRating");
  const countEl = document.getElementById("reviewCount");

  // 🛡️ Guard: DOM check
  if (!container || !avgEl || !countEl) return;

  // 🛡️ Guard: Validate input
  if (!Array.isArray(reviews)) {
    console.error("Invalid reviews data:", reviews);
    container.innerHTML = `<p class="text-red-500">Failed to load reviews</p>`;
    avgEl.textContent = "--";
    countEl.textContent = "(0)";
    return;
  }

  // 🛡️ Empty state
  if (reviews.length === 0) {
    container.innerHTML = `
      <div class="text-gray-500 text-sm py-4">
        No reviews yet. Be the first to review this product.
      </div>
    `;
    avgEl.textContent = "0.0";
    countEl.textContent = "(0)";
    return;
  }

  // 🧠 Calculate average
  const total = reviews.reduce((sum, r) => {
    const rating = typeof r.rating === "number" ? r.rating : 0;
    return sum + rating;
  }, 0);

  const avg = (total / reviews.length).toFixed(1);

  avgEl.textContent = avg;
  countEl.textContent = `(${reviews.length})`;

  // 🔥 Limit reviews (avoid UI overload)
  const limitedReviews = reviews.slice(0, 5);

  // 🎯 Render reviews
  container.innerHTML = limitedReviews
    .map((r) => {
      const name = r.user?.name || "Anonymous";
      const rating = r.rating ?? 0;
      const comment = r.comment || "No comment provided";

      return `
        <div class="border rounded-lg p-4 bg-white shadow-sm">

          <div class="flex justify-between items-center mb-2">
            <span class="font-medium text-sm">${name}</span>
            ${renderStars(rating)}
          </div>

          <p class="text-sm text-black/70 leading-relaxed">
            ${comment}
          </p>

        </div>
      `;
    })
    .join("");

  // ➕ Optional: Show more button (basic)
  if (reviews.length > 5) {
    container.innerHTML += `
      <button class="text-sm text-black/60 mt-2 underline">
        View all reviews
      </button>
    `;
  }
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
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.96c.3.922-.755 1.688-1.54 1.118l-3.37-2.45a1 1 0 00-1.176 0l-3.37 2.45c-.784.57-1.838-.196-1.539-1.118l1.286-3.96a1 1 0 00-.364-1.118L2.176 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z"/>
        </svg>
      `
        )
        .join("")}
    </div>
  `;
}





function showToast(message) {
  const toast = document.createElement("div");

  toast.className = `
    fixed bottom-5 left-1/2 -translate-x-1/2
    bg-black text-white px-4 py-2 rounded shadow
    text-sm z-50
  `;

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2000);
}
