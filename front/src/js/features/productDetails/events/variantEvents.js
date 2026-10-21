import { productState } from "../state.js";
import { initDeliveryChecker } from "../../../components/deliveryChecker.js";

export function attachVariantEvents(product) {
  document
    .querySelectorAll(".variant-material")
    .forEach((btn) => {
      btn.onclick = () => {
        productState.selectedMaterial =
          btn.dataset.material;

        updateSizeAvailability(product);

        resetButtons(".variant-material");

        btn.classList.add(
          "bg-[#6B1A2A]",
          "text-white",
          "border-[#6B1A2A]"
        );

        btn.classList.remove(
          "border-black/20",
          "text-black/70",
          "bg-white"
        );

        const match = product.variants.find(
          (v) =>
            v.material ===
              productState.selectedMaterial &&
            (
              productState.selectedSize
                ? v.size ===
                  productState.selectedSize
                : true
            )
        );

        if (!match) {
          productState.selectedSize = null;
          resetButtons(".variant-size");
        }

        updateVariant(product);
        updateSizeAvailability(product);

        initDeliveryChecker();
      };
    });

  document
    .querySelectorAll(".variant-size")
    .forEach((btn) => {
      btn.onclick = () => {
        productState.selectedSize =
          btn.dataset.size;

        resetButtons(".variant-size");

        btn.classList.add(
          "bg-[#6B1A2A]",
          "text-white",
          "border-[#6B1A2A]"
        );

        btn.classList.remove(
          "border-black/20",
          "text-black/70",
          "bg-white"
        );

        updateVariant(product);
      };
    });
}




 


function updateVariant(product) {
  const variant = product.variants.find(
    (v) =>
      v.material === productState.selectedMaterial &&
      (v.size
        ? v.size === productState.selectedSize
        : true)
  );

  const priceEl = document.getElementById("productPrice");
  const originalEl = document.getElementById("originalPrice");
  const stockEl = document.getElementById("stockStatus");

  // No valid variant selected
  if (!variant) {
    productState.selectedVariantId = null;

    if (priceEl) priceEl.textContent = "Select options";
    if (originalEl) originalEl.textContent = "";
    if (stockEl) stockEl.textContent = "";

    updatePurchaseButtons(true);

    return;
  }

  productState.selectedVariantId = variant._id;

  // Price
  if (priceEl) {
    priceEl.textContent = `₹${variant.price}`;
  }

  // Original price
  if (originalEl) {
    if (
      product.originalPrice &&
      product.originalPrice > variant.price
    ) {
      originalEl.textContent = `₹${product.originalPrice}`;
    } else {
      originalEl.textContent = "";
    }
  }

  // Stock message
  if (stockEl) {
    if (variant.stock === 0) {
      stockEl.textContent = "Out of Stock";
      stockEl.className = "text-sm text-red-600";
    } else if (
      variant.stock <= product.lowStockThreshold
    ) {
      stockEl.textContent = `Only ${variant.stock} left`;
      stockEl.className = "text-sm text-orange-500";
    } else {
      stockEl.textContent = "";
      stockEl.className = "text-sm text-green-600";
    }
  }

  // Enable/disable Add to Cart + Buy Now
  updatePurchaseButtons(variant.stock === 0);
}



function updateSizeAvailability(product) {
  let firstAvailableSize = null;

  document
    .querySelectorAll(".variant-size")
    .forEach((btn) => {
      const size = btn.dataset.size;

      const available = product.variants.some(
        (v) =>
          v.material === productState.selectedMaterial &&
          v.size === size &&
          v.stock > 0
      );

      btn.disabled = !available;

      btn.classList.toggle(
        "opacity-40",
        !available
      );

      btn.classList.toggle(
        "cursor-not-allowed",
        !available
      );

      if (available && !firstAvailableSize) {
        firstAvailableSize = size;
      }

      if (
        !available &&
        productState.selectedSize === size
      ) {
        btn.classList.remove(
          "bg-[#6B1A2A]",
          "text-white"
        );

        productState.selectedSize = null;
      }
    });

  if (
    !productState.selectedSize &&
    firstAvailableSize
  ) {
    productState.selectedSize =
      firstAvailableSize;

    document
      .querySelector(
        `[data-size="${firstAvailableSize}"]`
      )
      ?.classList.add(
        "bg-[#6B1A2A]",
        "text-white"
      );
  }

  updateVariant(product);
}


function resetButtons(selector) {
  document.querySelectorAll(selector).forEach((btn) => {
    btn.classList.remove(
      "bg-[#6B1A2A]",
      "text-white",
      "border-[#6B1A2A]"
    );

    btn.classList.add(
      "border-black/20",
      "text-black/70",
      "bg-white"
    );
  });
}



function updatePurchaseButtons(isDisabled) {
  const buttons = [
    { id: "addToCartBtn", label: "ADD TO CART" },
    { id: "stickyAddToCartBtn", label: "ADD TO CART" },
    { id: "buyNowBtn", label: "BUY NOW" },
    { id: "stickyBuyNowBtn", label: "BUY NOW" },
  ];

  buttons.forEach(({ id, label }) => {
    const btn = document.getElementById(id);

    if (!btn) return;

    btn.disabled = isDisabled;
    btn.textContent = isDisabled ? "Out of Stock" : label;

    btn.classList.toggle("opacity-50", isDisabled);
    btn.classList.toggle("cursor-not-allowed", isDisabled);
  });
}
