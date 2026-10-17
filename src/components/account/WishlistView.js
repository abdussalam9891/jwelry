"use client";

import { useEffect, useState } from "react";

import ProductCard from "@/components/product/ProductCard";
import Modal from "@/components/ui/Modal";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useWishlist } from "@/context/WishlistContext";
import { getProductById } from "@/lib/services/productService";
import { getWishlist } from "@/lib/services/wishlistService";

const optionClass = "border px-3 py-1 rounded transition";
const selectedClass = "bg-black text-white border-black";

// Picks the variant to move into the cart. A variant without a size matches
// any size choice.
function findVariant(product, material, size) {
  if (!material) return null;

  return (
    product.variants.find(
      (v) => v.material === material && (!v.size || !size || v.size === size),
    ) || null
  );
}

function MoveToCartModal({ productId, onClose, onMoved }) {
  const { addToCart } = useCart();
  const { remove: removeFromWishlist } = useWishlist();
  const showToast = useToast();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [material, setMaterial] = useState(null);
  const [size, setSize] = useState(null);
  const [showError, setShowError] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProductById(productId)
      .then((data) => {
        setProduct(data);
        setStatus(data?.variants?.length ? "ready" : "empty");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, [productId]);

  const materials = product
    ? [...new Set(product.variants.map((v) => v.material))]
    : [];
  const sizes = product
    ? [...new Set(product.variants.map((v) => v.size).filter(Boolean))]
    : [];

  async function confirm() {
    const variant = findVariant(product, material, size);

    if (!variant) {
      setShowError(true);
      return;
    }

    try {
      setSaving(true);
      await addToCart(product._id, variant._id);
      await removeFromWishlist(product._id);

      onClose();
      showToast("Added to cart");
      onMoved(product._id);
    } catch (err) {
      console.error(err);
      showToast("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      labelledBy="variantModalTitle"
      panelClassName="bg-white p-5 rounded-lg w-[90%] max-w-md"
    >
      <h2 id="variantModalTitle" className="text-lg font-semibold mb-4">
        Select Options
      </h2>

      {status === "loading" && (
        <p className="text-sm text-black/60">Loading options...</p>
      )}
      {status === "empty" && (
        <p className="text-sm text-black/60">No variants available</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500">Failed to load options</p>
      )}

      {status === "ready" && (
        <div className="space-y-4">
          <div>
            <p className="text-sm mb-1">Material</p>
            <div className="flex gap-2 flex-wrap">
              {materials.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMaterial(m);
                    setShowError(false);
                  }}
                  className={`${optionClass} ${m === material ? selectedClass : ""}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {sizes.length > 0 && (
            <div>
              <p className="text-sm mb-1">Size</p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      setShowError(false);
                    }}
                    className={`${optionClass} ${s === size ? selectedClass : ""}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showError && (
        <p className="text-red-500 text-sm mt-3">Please select all options</p>
      )}

      <button
        type="button"
        disabled={status !== "ready" || saving}
        onClick={confirm}
        className="w-full mt-4 bg-black text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Move to Cart
      </button>
    </Modal>
  );
}

export default function WishlistView() {
  const { remove, replaceIds } = useWishlist();
  const showToast = useToast();

  const [products, setProducts] = useState(null);
  const [error, setError] = useState(false);
  const [movingId, setMovingId] = useState(null);

  useEffect(() => {
    getWishlist()
      .then((items) => {
        setProducts(items);
        replaceIds(items);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [replaceIds]);

  function dropProduct(productId) {
    setProducts((current) =>
      current.filter((p) => String(p._id) !== String(productId)),
    );
  }

  async function handleRemove(productId) {
    const previous = products;
    dropProduct(productId);

    try {
      await remove(productId);
    } catch (err) {
      console.error(err);
      setProducts(previous);
      showToast("Failed to remove item");
    }
  }

  const count = products?.length || 0;

  let content;

  if (error) {
    content = (
      <p className="col-span-full text-sm text-red-500 text-center py-10">
        Failed to load wishlist
      </p>
    );
  } else if (!products) {
    content = (
      <div className="col-span-full text-sm text-black/60 animate-pulse text-center py-10">
        Loading wishlist...
      </div>
    );
  } else if (!products.length) {
    content = (
      <p className="col-span-full text-sm text-black/60 text-center py-10">
        Your wishlist is empty
      </p>
    );
  } else {
    content = products.map((product) => (
      <ProductCard
        key={product._id}
        product={product}
        onRemove={handleRemove}
        onMoveToCart={setMovingId}
      />
    ));
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold">
          My Wishlist
          <span className="text-black/60 text-lg font-normal ml-2">
            {count} item{count === 1 ? "" : "s"}
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{content}</div>

      {movingId && (
        <MoveToCartModal
          productId={movingId}
          onClose={() => setMovingId(null)}
          onMoved={dropProduct}
        />
      )}
    </>
  );
}
