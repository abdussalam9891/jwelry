import Link from "next/link";

import { productUrl } from "@/lib/routes";

function QuantityStepper({ quantity, onChange, compact }) {
  const buttonClass = compact ? "w-9 h-9" : "w-10 h-10 hover:bg-black/5";

  return (
    <div className="flex items-center rounded-full bg-[#F7F7F7] ring-1 ring-black/10 overflow-hidden">
      <button
        type="button"
        onClick={() => onChange(-1)}
        className={buttonClass}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span
        className={`${compact ? "w-8 text-sm" : "w-10"} text-center font-medium`}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(1)}
        className={buttonClass}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default function CartItem({
  item,
  busy,
  onQuantityChange,
  onRemove,
  onSaveForLater,
}) {
  const name = item.name || "Product";
  const image = item.image || "/assets/images/placeholder.webp";
  const price = item.price ?? 0;
  const { originalPrice } = item;
  const quantity = item.quantity || 1;
  const href = productUrl(item.slug);
  const material = item.variantDetails?.material || "";
  const size = item.variantDetails?.size || "";
  const savings =
    originalPrice && originalPrice > price ? originalPrice - price : 0;

  return (
    <div
      className={`rounded-3xl bg-white shadow-sm ring-1 ring-black/5 hover:shadow-lg transition-all ${
        busy ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* Desktop */}
      <div className="hidden md:flex gap-6 p-6">
        <Link href={href} className="shrink-0">
          <img
            src={image}
            alt={name}
            className="w-36 h-44 rounded-2xl object-cover bg-[#F7F5F3]"
          />
        </Link>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between gap-5">
            <div className="min-w-0">
              <Link href={href}>
                <h3 className="text-lg font-medium leading-snug hover:text-[#6B1A2A] transition line-clamp-2">
                  {name}
                </h3>
              </Link>

              {(material || size) && (
                <p className="mt-2 text-sm text-black/45">
                  {material}
                  {size ? ` • Size ${size}` : ""}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="w-9 h-9 rounded-full hover:bg-red-50 hover:text-red-500 transition"
              aria-label="Remove item"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <span className="text-3xl font-semibold">
              ₹{price.toLocaleString()}
            </span>

            {originalPrice && (
              <span className="text-black/35 line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}

            {savings > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                SAVE ₹{savings.toLocaleString()}
              </span>
            )}
          </div>

          <div className="mt-2 text-sm text-black/50">
            Delivery in 3–5 business days
          </div>

          <div className="mt-auto pt-6 flex items-center justify-between">
            <QuantityStepper quantity={quantity} onChange={onQuantityChange} />

            <button
              type="button"
              onClick={onSaveForLater}
              className="text-sm text-black/55 hover:text-[#6B1A2A]"
            >
              ♡ Save for later
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden p-4">
        <div className="flex gap-4">
          <Link href={href}>
            <img
              src={image}
              alt={name}
              className="w-24 h-28 rounded-xl object-cover bg-[#F7F5F3]"
            />
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between gap-2">
              <Link href={href} className="min-w-0">
                <h3 className="text-[15px] font-medium leading-snug line-clamp-2">
                  {name}
                </h3>
              </Link>

              <button
                type="button"
                onClick={onRemove}
                className="text-black/40"
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>

            {(material || size) && (
              <p className="mt-1 text-xs text-black/45">
                {material}
                {size ? ` • ${size}` : ""}
              </p>
            )}

            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className="text-xl font-semibold">
                ₹{price.toLocaleString()}
              </span>

              {originalPrice && (
                <span className="text-xs line-through text-black/35">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="mt-1 text-xs text-black/45">
              Delivery in 3–5 business days
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <QuantityStepper
                quantity={quantity}
                onChange={onQuantityChange}
                compact
              />

              <button
                type="button"
                onClick={onSaveForLater}
                className="text-xs text-black/55"
              >
                ♡ Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
