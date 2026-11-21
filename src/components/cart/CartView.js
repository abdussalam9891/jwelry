"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import Modal from "@/components/ui/Modal";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useWishlist } from "@/context/WishlistContext";

function EmptyCart() {
  return (
    <div className="lg:col-span-3 min-h-[65vh] flex flex-col items-center justify-center text-center">
      <div className="mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className="w-16 h-16 text-black/20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386a1.5 1.5 0 0 1 1.415 1.022L5.64 6.75m0 0h12.72a1.5 1.5 0 0 1 1.45 1.885l-1.12 4.5a1.5 1.5 0 0 1-1.45 1.115H8.126a1.5 1.5 0 0 1-1.45-1.115L5.64 6.75Zm0 0L4.5 3.75M9.75 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-sm text-black/50 mb-6">
        Looks like you haven’t added anything yet.
      </p>

      <Link
        href="/products"
        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#6B1A2A] text-white text-sm hover:opacity-90 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function CartView() {
  const {
    items,
    pricing,
    count,
    loaded,
    loadCart,
    changeQuantity,
    removeItem,
  } = useCart();
  const { add: addToWishlist } = useWishlist();
  const showToast = useToast();

  const [busyId, setBusyId] = useState(null);
  const [removeId, setRemoveId] = useState(null);

  useEffect(() => {
    loadCart().catch((err) => console.error(err));
  }, [loadCart]);

  async function withBusy(id, action) {
    setBusyId(id);
    try {
      await action();
    } finally {
      setBusyId(null);
    }
  }

  async function handleQuantityChange(id, delta) {
    await withBusy(id, async () => {
      try {
        await changeQuantity(id, delta);
      } catch (err) {
        showToast(err.message);
      }
    });
  }

  async function handleSaveForLater(item) {
    await withBusy(item._id, async () => {
      try {
        await addToWishlist(item.productId);
        await removeItem(item._id);
        showToast("Moved to wishlist");
      } catch (err) {
        console.error(err);
        showToast("Failed to move item");
      }
    });
  }

  async function confirmRemove() {
    const id = removeId;
    setRemoveId(null);

    await withBusy(id, async () => {
      try {
        await removeItem(id);
      } catch (err) {
        console.error(err);
        showToast("Failed to remove item");
      }
    });
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold">
          My Cart
          <span className="text-black/60 text-lg font-normal ml-2">
            {count} item{count === 1 ? "" : "s"}
          </span>
        </h1>
      </div>

      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {!loaded ? (
            <p className="lg:col-span-3 text-sm text-black/50">
              Loading cart...
            </p>
          ) : !items.length ? (
            <EmptyCart />
          ) : (
            <>
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    busy={busyId === item._id}
                    onQuantityChange={(delta) =>
                      handleQuantityChange(item._id, delta)
                    }
                    onRemove={() => setRemoveId(item._id)}
                    onSaveForLater={() => handleSaveForLater(item)}
                  />
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
                  <h2 className="text-[1.35rem] font-semibold mb-5">
                    Order Summary
                  </h2>
                  <OrderSummary pricing={pricing} showCheckoutButton />
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Modal
        open={Boolean(removeId)}
        onClose={() => setRemoveId(null)}
        labelledBy="removeItemTitle"
        panelClassName="bg-white p-6 rounded-xl w-80"
      >
        <h2 id="removeItemTitle" className="font-semibold mb-4">
          Remove item?
        </h2>

        <button
          type="button"
          onClick={confirmRemove}
          className="w-full bg-[#6B1A2A] hover:opacity-90 text-white py-2 rounded mb-2"
        >
          Remove
        </button>

        <button
          type="button"
          onClick={() => setRemoveId(null)}
          className="w-full border py-2 rounded"
        >
          Cancel
        </button>
      </Modal>
    </>
  );
}
