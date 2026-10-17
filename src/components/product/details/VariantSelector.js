const optionClass =
  "border px-3 py-2 text-sm rounded-lg transition hover:border-[#6B1A2A]";

const selectedClass = "bg-[#6B1A2A] text-white border-[#6B1A2A]";

export default function VariantSelector({
  materials,
  sizes,
  selectedMaterial,
  selectedSize,
  isSizeAvailable,
  onSelectMaterial,
  onSelectSize,
  onOpenSizeGuide,
}) {
  if (!materials.length) return null;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium mb-2">Choose Material</p>

        <div className="flex flex-wrap gap-2">
          {materials.map((material) => (
            <button
              key={material}
              type="button"
              aria-pressed={material === selectedMaterial}
              onClick={() => onSelectMaterial(material)}
              className={`${optionClass} ${
                material === selectedMaterial ? selectedClass : ""
              }`}
            >
              {material}
            </button>
          ))}
        </div>
      </div>

      {sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Select Size</p>

            {onOpenSizeGuide && (
              <button
                type="button"
                onClick={onOpenSizeGuide}
                className="text-sm font-medium text-[#6B1A2A] hover:underline transition"
              >
                View Size Guide
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const available = isSizeAvailable(size);

              return (
                <button
                  key={size}
                  type="button"
                  disabled={!available}
                  aria-pressed={size === selectedSize}
                  onClick={() => onSelectSize(size)}
                  className={`${optionClass} ${
                    size === selectedSize ? selectedClass : ""
                  } ${available ? "" : "opacity-40 cursor-not-allowed"}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
