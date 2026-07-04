export function renderVariantOptions(product) {
  if (!product.variants || product.variants.length === 0) return "";

  const materials = [...new Set(product.variants.map((v) => v.material))];
  const sizes = [
    ...new Set(product.variants.map((v) => v.size).filter(Boolean)),
  ];

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
              class="variant-material border px-3 py-2 text-sm rounded-lg"
              data-material="${m}"
            >
              ${m}
            </button>
          `,
            )
            .join("")}
        </div>
      </div>

      ${
        sizes.length > 0
          ? `
      <!-- SIZE -->
      <div>
        <p class="text-sm font-medium mb-2">Select Size</p>
        <div class="flex flex-wrap gap-2">
          ${sizes
            .map(
              (s) => `
            <button
              class="variant-size border px-3 py-2 text-sm rounded-lg"
              data-size="${s}"
            >
              ${s}
            </button>
          `,
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
