import Link from "next/link";

// Price breakdown shared by the cart and checkout pages.
export default function OrderSummary({ pricing, showCheckoutButton = false }) {
  if (!pricing) {
    return <p className="text-sm text-red-500">Failed to load summary</p>;
  }

  const { subtotal = 0, savings = 0, shipping = 0, itemCount } = pricing;
  const total = pricing.total ?? subtotal;

  return (
    <>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-black/60">Items ({itemCount})</span>
          <span className="font-medium">₹{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-black/60">Shipping</span>
          <span className="font-medium text-green-600">
            {shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}
          </span>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-black/60">You Saved</span>
            <span className="font-semibold text-[#6B1A2A]">
              ₹{savings.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      <div className="border-t border-black/10 mt-5 pt-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-base font-semibold">Total</p>
            <p className="text-xs text-black/45 mt-1">Inclusive of all taxes</p>
          </div>

          <p className="text-[30px] leading-none font-bold tracking-tight text-right">
            ₹{Math.round(total).toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {showCheckoutButton && (
        <Link
          href="/checkout"
          className="mt-5 w-full h-12 rounded-xl bg-[#6B1A2A] text-white font-medium hover:opacity-90 transition shadow-sm flex items-center justify-center"
        >
          Checkout Securely
        </Link>
      )}
    </>
  );
}
