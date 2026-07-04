// description.js

export function renderDescription(product) {
  const desc = product.description;

  // Fallback
  if (!desc || typeof desc === "string") {
    return `
      <p class="text-[14px] leading-relaxed text-black/70">
        ${
          desc ||
          "Elegant handcrafted jewelry piece designed for modern style and everyday elegance."
        }
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
              `
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

export function renderDescriptionSection(product) {
  return `
    <div class="border-t pt-6">

      <h3 class="text-[1rem] sm:text-[1.1rem] font-medium text-black mb-3 tracking-wide">
        Product Description
      </h3>

      <div class="relative">

        <div
          id="descContent"
          class="text-[0.95rem] sm:text-[1rem] text-black/70 leading-relaxed overflow-hidden max-h-[90px] transition-all duration-300"
        >
          ${renderDescription(product)}
        </div>

        <div
          id="descFade"
          class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"
        ></div>

      </div>

      <button
        id="toggleDescBtn"
        class="text-[0.9rem] text-[#6B1A2A] mt-3 font-medium tracking-wide"
      >
        Show More
      </button>

    </div>
  `;
}

export function renderProductMeta(product, selectedMaterial) {
  return `
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
          <span class="text-black/60">Material</span>
          <span class="capitalize">
            ${selectedMaterial || product.variants?.[0]?.material || "-"}
          </span>
        </li>

        <li class="flex justify-between border-b pb-1">
          <span class="text-black/60">Gender</span>
          <span class="capitalize">
            ${product.targetAudience || "Unisex"}
          </span>
        </li>

      </ul>

    </div>
  `;
}
