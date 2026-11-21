"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { ChevronDownIcon } from "@/components/ui/icons";
import { filterCategories, jewelleryStyles } from "@/data/navigation";

const activeBtn =
  "bg-[#F8F3F0] border border-[#6B1A2A]/20 text-[#6B1A2A] shadow-[0_6px_20px_rgba(107,26,42,0.08)]";

const defaultBtn =
  "bg-white border border-[#E8DFD8] text-black/70 hover:border-[#6B1A2A]/25 hover:text-[#6B1A2A] hover:bg-[#FCFAF8]";

const chipClass =
  "inline-flex items-center justify-center h-11 px-5 rounded-full border text-sm font-medium transition-all duration-300";

const chipIdle =
  "bg-[#FAF8F6] border-[#E7DED7] text-black/75 hover:border-[#6B1A2A] hover:text-[#6B1A2A]";

const chipSelected =
  "bg-[#6B1A2A] border-[#6B1A2A] text-white shadow-[0_8px_24px_rgba(107,26,42,0.18)]";

function DropdownButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group h-11 px-5 inline-flex items-center gap-2 rounded-full shrink-0 ${
        active ? activeBtn : defaultBtn
      } text-sm font-medium transition-all duration-300`}
    >
      {label}
      <ChevronDownIcon className="w-4 h-4" />
    </button>
  );
}

function PanelHeading({ title }) {
  return (
    <div className="mb-6">
      <p className="uppercase tracking-[0.28em] text-[11px] text-black/40 mb-2">
        Browse By
      </p>
      <h3 className="text-2xl md:text-3xl font-light text-black">{title}</h3>
    </div>
  );
}

function Chip({ selected, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`${chipClass} ${selected ? chipSelected : chipIdle}`}
    >
      {children}
    </button>
  );
}

// Category / product type / style filters for the listing page. Category and
// type apply immediately; styles are multi-select and apply on "Apply".
export default function FilterBar({ queryString }) {
  const router = useRouter();
  const containerRef = useRef(null);
  const [openPanel, setOpenPanel] = useState(null);

  const params = new URLSearchParams(queryString);
  const selectedCategory = params.get("category");
  const selectedProductType = params.get("productType");
  const selectedStyles = params.get("style")?.split(",").filter(Boolean) || [];

  const [draftStyles, setDraftStyles] = useState(selectedStyles);

  const categoryData = filterCategories.find(
    (item) => item.category === selectedCategory,
  );

  const productTypes = categoryData?.productTypes || [];

  useEffect(() => {
    setOpenPanel(null);
    setDraftStyles(
      new URLSearchParams(queryString)
        .get("style")
        ?.split(",")
        .filter(Boolean) || [],
    );
  }, [queryString]);

  useEffect(() => {
    if (!openPanel) return;

    function handleClick(e) {
      if (!containerRef.current?.contains(e.target)) setOpenPanel(null);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openPanel]);

  function applyFilters(update) {
    const next = new URLSearchParams(queryString);
    update(next);
    next.delete("page");

    const query = next.toString();
    router.push(query ? `/products?${query}` : "/products");
  }

  function togglePanel(name) {
    setOpenPanel((current) => (current === name ? null : name));
  }

  const productTypeLabel =
    productTypes.find((type) => type.value === selectedProductType)?.label ||
    "Product Type";

  const styleLabelFor = (value) =>
    jewelleryStyles.find((style) => style.value === value)?.label;

  let styleLabel = "Style";
  if (selectedStyles.length === 1) {
    styleLabel = styleLabelFor(selectedStyles[0]) || "Style";
  } else if (selectedStyles.length > 1) {
    styleLabel = `${styleLabelFor(selectedStyles[0])} +${selectedStyles.length - 1}`;
  }

  return (
    <div ref={containerRef}>
      <div className="flex flex-wrap items-center justify-between gap-3 py-3 bg-white">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <DropdownButton
            label={categoryData?.label || "Category"}
            active={Boolean(selectedCategory)}
            onClick={() => togglePanel("category")}
          />

          {productTypes.length > 0 && (
            <DropdownButton
              label={productTypeLabel}
              active={Boolean(selectedProductType)}
              onClick={() => togglePanel("productType")}
            />
          )}

          <DropdownButton
            label={styleLabel}
            active={selectedStyles.length > 0}
            onClick={() => togglePanel("style")}
          />
        </div>

        <div className="flex items-center ml-auto md:ml-0">
          <button
            type="button"
            onClick={() => router.push("/products")}
            className="relative text-sm font-medium text-[#6B1A2A] transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#6B1A2A] hover:after:w-full after:transition-all after:duration-300"
          >
            Clear All
          </button>
        </div>
      </div>

      {openPanel && (
        <div className="bg-white border-b border-black/5 shadow-[0_16px_50px_rgba(0,0,0,0.05)] px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {openPanel === "category" && (
              <>
                <PanelHeading title="Categories" />
                <div className="flex flex-wrap gap-3">
                  {filterCategories.map((item) => (
                    <Chip
                      key={item.category}
                      selected={item.category === selectedCategory}
                      onClick={() =>
                        applyFilters((next) => {
                          next.set("category", item.category);
                          next.delete("productType");
                        })
                      }
                    >
                      {item.label}
                    </Chip>
                  ))}
                </div>
              </>
            )}

            {openPanel === "productType" && (
              <>
                <PanelHeading title="Product Type" />
                <div className="flex flex-wrap gap-3">
                  {productTypes.map((type) => (
                    <Chip
                      key={type.value}
                      selected={type.value === selectedProductType}
                      onClick={() =>
                        applyFilters((next) =>
                          next.set("productType", type.value),
                        )
                      }
                    >
                      {type.label}
                    </Chip>
                  ))}
                </div>
              </>
            )}

            {openPanel === "style" && (
              <>
                <PanelHeading title="Style" />
                <div className="flex flex-wrap gap-3 mb-8">
                  {jewelleryStyles.map((style) => (
                    <Chip
                      key={style.value}
                      selected={draftStyles.includes(style.value)}
                      onClick={() =>
                        setDraftStyles((current) =>
                          current.includes(style.value)
                            ? current.filter((value) => value !== style.value)
                            : [...current, style.value],
                        )
                      }
                    >
                      {style.label}
                    </Chip>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    applyFilters((next) => {
                      if (draftStyles.length) {
                        next.set("style", draftStyles.join(","));
                      } else {
                        next.delete("style");
                      }
                    })
                  }
                  className="h-11 px-6 rounded-full bg-[#6B1A2A] text-white text-sm font-medium hover:opacity-90 transition"
                >
                  Apply Filters
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
