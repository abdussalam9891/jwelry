"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import DeliveryChecker from "./DeliveryChecker";
import ImageGallery from "./ImageGallery";
import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";
import ShareButton from "./ShareButton";
import SizeGuideModal from "./SizeGuideModal";
import TrustSection from "./TrustSection";
import VariantSelector from "./VariantSelector";
import { HeartIcon } from "@/components/ui/icons";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useWishlist } from "@/context/WishlistContext";
import { CHECKOUT_PREVIEW_KEY } from "@/lib/checkout";
import { previewCheckout } from "@/lib/services/orderService";
import { getProductBySlug } from "@/lib/services/productService";

const SIZE_GUIDE_CATEGORIES = ["rings", "bracelets", "bangles"];

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function stockMessage(variant, lowStockThreshold) {
  if (!variant) return null;

  if (variant.stock === 0) {
    return { text: "Out of Stock", className: "text-sm text-red-600" };
  }

  if (variant.stock <= lowStockThreshold) {
    return {
      text: `Only ${variant.stock} left`,
      className: "text-sm text-orange-500",
    };
  }

  return null;
}

export default function ProductDetails({ slug }) {
  const router = useRouter();
  const { user, openLogin } = useAuth();
  const { addToCart } = useCart();
  const { has: inWishlist, toggle: toggleWishlist } = useWishlist();
  const showToast = useToast();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [material, setMaterial] = useState(null);
  const [size, setSize] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setStatus("loading");
    setMaterial(null);
    setSize(null);

    getProductBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        setProduct(data);
        setStatus("ready");
        document.title = `${data.name} | Gemora`;
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const variants = product?.variants || [];
  const materials = useMemo(
    () => unique(variants.map((v) => v.material)),
    [variants],
  );
  const sizes = useMemo(() => unique(variants.map((v) => v.size)), [variants]);

  // Before a material is picked every size is offered; afterwards only
  // sizes in stock for that material.
  function isSizeAvailable(candidate, forMaterial = material) {
    if (!forMaterial) return true;

    return variants.some(
      (v) => v.material === forMaterial && v.size === candidate && v.stock > 0,
    );
  }

  function selectMaterial(next) {
    const available = sizes.filter((s) => isSizeAvailable(s, next));

    setMaterial(next);
    setSize((current) =>
      current && available.includes(current) ? current : available[0] || null,
    );
  }

  const variant = material
    ? variants.find(
        (v) => v.material === material && (v.size ? v.size === size : true),
      )
    : null;

  if (status === "loading") {
    return <div className="py-10">Loading product...</div>;
  }

  if (status === "error" || !product) {
    return <div className="text-center py-10">Failed to load product</div>;
  }

  let priceLabel = `₹${product.price}`;

  if (material) {
    priceLabel = variant ? `₹${variant.price}` : "Select options";
  } else if (variants.length) {
    const prices = variants.map((v) => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    priceLabel = min === max ? `₹${min}` : `₹${min} – ₹${max}`;
  }

  const showOriginalPrice = variant
    ? product.originalPrice > variant.price
    : Boolean(product.originalPrice);

  const stock = stockMessage(variant, product.lowStockThreshold);
  const outOfStock = variant?.stock === 0;

  const showSizeGuide =
    sizes.length > 0 &&
    SIZE_GUIDE_CATEGORIES.includes((product.category || "").toLowerCase());

  // Returns false (after telling the user why) when the selection is incomplete.
  function validateSelection() {
    if (!variants.length) return true;

    if (variants.some((v) => v.material) && !material) {
      showToast("Please select material");
      return false;
    }

    if (variants.some((v) => v.size) && !size) {
      showToast("Please select size");
      return false;
    }

    if (!variant) {
      showToast("Please select a valid combination");
      return false;
    }

    return true;
  }

  async function handleAddToCart() {
    if (!validateSelection()) return;

    if (!user) {
      openLogin();
      return;
    }

    try {
      await addToCart(product._id, variant?._id || null);
      showToast("Added to cart");
    } catch (err) {
      console.error(err);
      showToast("Failed to add to cart");
    }
  }

  async function handleBuyNow() {
    if (!validateSelection()) return;

    if (!user) {
      openLogin();
      return;
    }

    try {
      const preview = await previewCheckout({
        mode: "buyNow",
        productId: product._id,
        variantId: variant?._id || null,
        quantity: 1,
      });

      sessionStorage.setItem(CHECKOUT_PREVIEW_KEY, JSON.stringify(preview));
      router.push("/checkout?mode=buyNow");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to proceed to checkout");
    }
  }

  const wishlisted = inWishlist(product._id);
  const purchaseDisabledClass = outOfStock
    ? "opacity-50 cursor-not-allowed"
    : "";

  return (
    <>
      <div className="section-sm container-main max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr] gap-6 md:gap-10 items-start">
          <div className="md:sticky md:top-24 self-start">
            <ImageGallery images={product.images} name={product.name} />
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
                {product.name}
              </h1>
            </div>

            <div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-2">
                <span>{priceLabel}</span>

                {showOriginalPrice && (
                  <span className="line-through text-black/40 text-sm sm:text-base">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              {stock && <div className={stock.className}>{stock.text}</div>}
            </div>

            <VariantSelector
              materials={materials}
              sizes={sizes}
              selectedMaterial={material}
              selectedSize={size}
              isSizeAvailable={isSizeAvailable}
              onSelectMaterial={selectMaterial}
              onSelectSize={setSize}
              onOpenSizeGuide={
                showSizeGuide ? () => setSizeGuideOpen(true) : null
              }
            />

            <div className="mt-5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => toggleWishlist(product._id)}
                  aria-pressed={wishlisted}
                  aria-label={
                    wishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                  }
                  className={`group h-12 rounded-xl border bg-white flex items-center justify-center gap-2.5 transition-all duration-300 hover:border-[#6B1A2A] hover:bg-[#FCFAF8] hover:text-[#6B1A2A] active:scale-[0.98] ${
                    wishlisted
                      ? "border-[#6B1A2A] text-[#6B1A2A]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  <HeartIcon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      wishlisted ? "fill-[#6B1A2A]" : ""
                    }`}
                    strokeWidth={1.7}
                  />
                  <span className="text-sm font-medium tracking-wide">
                    Wishlist
                  </span>
                </button>

                <ShareButton title={product.name} />
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex gap-3 mt-6">
              <button
                type="button"
                disabled={outOfStock}
                onClick={handleAddToCart}
                className={`flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-black/90 transition ${purchaseDisabledClass}`}
              >
                {outOfStock ? "Out of Stock" : "ADD TO CART"}
              </button>

              <button
                type="button"
                disabled={outOfStock}
                onClick={handleBuyNow}
                className={`flex-1 bg-[#8B1E2D] text-white py-3 rounded-lg font-medium hover:bg-[#731826] transition ${purchaseDisabledClass}`}
              >
                {outOfStock ? "Out of Stock" : "BUY NOW"}
              </button>
            </div>

            {/* Mobile sticky CTA */}
            <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-2xl z-[var(--z-sticky)] p-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={outOfStock}
                  onClick={handleAddToCart}
                  className={`flex-1 bg-black text-white py-3 rounded-lg font-medium ${purchaseDisabledClass}`}
                >
                  {outOfStock ? "Out of Stock" : "ADD TO CART"}
                </button>

                <button
                  type="button"
                  disabled={outOfStock}
                  onClick={handleBuyNow}
                  className={`flex-1 bg-[#8B1E2D] text-white py-3 rounded-lg font-medium ${purchaseDisabledClass}`}
                >
                  {outOfStock ? "Out of Stock" : "BUY NOW"}
                </button>
              </div>
            </div>

            <DeliveryChecker />

            <ProductDescription description={product.description} />

            <div className="pt-5">
              <h3 className="text-[1rem] sm:text-[1.1rem] font-medium text-black mb-3 tracking-wide">
                Product Details
              </h3>

              <ul className="space-y-2 text-[0.95rem] text-black/70">
                <li className="flex justify-between border-b pb-1">
                  <span className="text-black/60">Category</span>
                  <span className="capitalize">{product.category}</span>
                </li>
                <li className="flex justify-between border-b pb-1">
                  <span className="text-black/60">Material</span>
                  <span className="capitalize">
                    {material || variants[0]?.material || "-"}
                  </span>
                </li>
                <li className="flex justify-between border-b pb-1">
                  <span className="text-black/60">Gender</span>
                  <span className="capitalize">
                    {product.targetAudience || "Unisex"}
                  </span>
                </li>
              </ul>
            </div>

            <ProductReviews productId={product._id} />

            <TrustSection />
          </div>
        </div>
      </div>

      <RelatedProducts product={product} />

      {showSizeGuide && (
        <SizeGuideModal
          open={sizeGuideOpen}
          onClose={() => setSizeGuideOpen(false)}
          category={product.category}
        />
      )}
    </>
  );
}
