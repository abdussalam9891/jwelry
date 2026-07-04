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
  const addToCartBtn = document.getElementById("addToCartBtn");
  const stickyAddBtn = document.getElementById("stickyAddToCartBtn");

  if (!variant) {
    productState.selectedVariantId = null;

    if (priceEl) priceEl.textContent = "Select options";
    if (originalEl) originalEl.textContent = "";
    if (stockEl) stockEl.textContent = "";

    [addToCartBtn, stickyAddBtn].forEach((btn) => {
      if (btn) btn.disabled = true;
    });

    return;
  }

  productState.selectedVariantId = variant._id;

  if (priceEl) {
    priceEl.textContent = `₹${variant.price}`;
  }

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

  [addToCartBtn, stickyAddBtn].forEach((btn) => {
    if (!btn) return;

    if (variant.stock === 0) {
      btn.disabled = true;
      btn.textContent = "Out of Stock";
      btn.classList.add(
        "opacity-50",
        "cursor-not-allowed"
      );
    } else {
      btn.disabled = false;
      btn.textContent = "ADD TO CART";
      btn.classList.remove(
        "opacity-50",
        "cursor-not-allowed"
      );
    }
  });
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

 