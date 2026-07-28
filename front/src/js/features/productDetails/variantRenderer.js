export function renderVariantOptions(product) {
  if (!product.variants || product.variants.length === 0) return "";

  const materials = [...new Set(product.variants.map((v) => v.material))];

  const sizes = [
    ...new Set(product.variants.map((v) => v.size).filter(Boolean)),
  ];

  // Categories that need a size guide
  const showSizeGuide = ["rings", "bracelets", "bangles"].includes(
    (product.category || "").toLowerCase()
  );

  return `
    <div class="space-y-4">

      <!-- MATERIAL -->
      <div>
        <p class="text-sm font-medium mb-2">Choose Material</p>

        <div class="flex flex-wrap gap-2">
          ${materials
            .map(
              (m) => `
                <button
                  class="variant-material border px-3 py-2 text-sm rounded-lg transition hover:border-[#6B1A2A]"
                  data-material="${m}"
                >
                  ${m}
                </button>
              `
            )
            .join("")}
        </div>
      </div>

      ${
        sizes.length > 0
          ? `
      <!-- SIZE -->
      <div>

        <div class="flex items-center justify-between mb-2">

          <p class="text-sm font-medium">
            Select Size
          </p>

          ${
            showSizeGuide
              ? `
            <button
              id="sizeGuideBtn"
              type="button"
              class="text-sm font-medium text-[#6B1A2A] hover:underline transition"
            >
              View Size Guide
            </button>
          `
              : ""
          }

        </div>

        <div class="flex flex-wrap gap-2">

          ${sizes
            .map(
              (s) => `
              <button
                class="variant-size border px-3 py-2 text-sm rounded-lg transition hover:border-[#6B1A2A]"
                data-size="${s}"
              >
                ${s}
              </button>
            `
            )
            .join("")}

        </div>

      </div>
      `
          : ""
      }

    </div>
  `;
}
