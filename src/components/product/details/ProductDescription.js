"use client";

import { useLayoutEffect, useRef, useState } from "react";

const COLLAPSED_HEIGHT = 90;

const DEFAULT_DESCRIPTION =
  "Elegant handcrafted jewelry piece designed for modern style and everyday elegance.";

function DescriptionBody({ description }) {
  // Older products store a plain string; newer ones a structured object.
  if (!description || typeof description === "string") {
    return (
      <p className="text-[14px] leading-relaxed text-black/70">
        {description || DEFAULT_DESCRIPTION}
      </p>
    );
  }

  return (
    <div className="space-y-5 text-[14px] text-black/70">
      {description.short && (
        <p className="leading-relaxed text-black/85 text-[15px]">
          {description.short}
        </p>
      )}

      {description.design && (
        <div className="border-l-2 border-[#6B1A2A]/40 pl-4">
          <p className="text-[12px] uppercase tracking-wider text-[#6B1A2A] mb-1">
            The Design
          </p>
          <p className="leading-relaxed text-black/75">{description.design}</p>
        </div>
      )}

      {description.details?.length > 0 && (
        <div>
          <p className="text-[12px] uppercase tracking-wider text-[#6B1A2A] mb-2">
            Product Details
          </p>
          <ul className="space-y-2">
            {description.details.map((detail) => (
              <li key={detail} className="flex items-start gap-2 text-[14px]">
                <span className="text-[#6B1A2A] mt-[3px]">•</span>
                <span className="text-black/75">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {description.styling && (
        <div className="bg-[#F9F6F2] border border-[#6B1A2A]/10 rounded-md p-4">
          <p className="text-[12px] uppercase tracking-wider text-[#6B1A2A] mb-1">
            Styling Tip
          </p>
          <p className="text-black/75 leading-relaxed text-[14px]">
            {description.styling}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ProductDescription({ description }) {
  const contentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [collapsible, setCollapsible] = useState(true);

  useLayoutEffect(() => {
    setCollapsible((contentRef.current?.scrollHeight || 0) > COLLAPSED_HEIGHT);
  }, [description]);

  const clipped = collapsible && !expanded;

  return (
    <div className="border-t pt-6">
      <h3 className="text-[1rem] sm:text-[1.1rem] font-medium text-black mb-3 tracking-wide">
        Product Description
      </h3>

      <div className="relative">
        <div
          ref={contentRef}
          className={`text-[0.95rem] sm:text-[1rem] text-black/70 leading-relaxed overflow-hidden transition-all duration-300 ${
            clipped ? "max-h-[90px]" : "max-h-[500px]"
          }`}
        >
          <DescriptionBody description={description} />
        </div>

        {clipped && (
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {collapsible && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="text-[0.9rem] text-[#6B1A2A] mt-3 font-medium tracking-wide"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
