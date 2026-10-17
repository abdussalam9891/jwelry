"use client";

import { useState } from "react";

export default function ImageGallery({ images, name }) {
  const urls = (images || []).map((image) => image.url).filter(Boolean);
  const [selected, setSelected] = useState(urls[0]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex md:flex-col gap-2 md:overflow-visible md:w-[80px]">
        {urls.map((url, index) => (
          <button
            key={url}
            type="button"
            onClick={() => setSelected(url)}
            aria-label={`Show image ${index + 1}`}
            className="shrink-0"
          >
            <img
              src={url}
              alt=""
              className={`w-14 h-14 md:w-16 md:h-16 object-cover border rounded cursor-pointer ${
                url === selected ? "border-black" : ""
              }`}
            />
          </button>
        ))}
      </div>

      <div className="w-full rounded-xl overflow-hidden">
        {selected && (
          <img
            src={selected}
            alt={name}
            className="w-full h-[260px] sm:h-[320px] md:h-[420px] object-cover rounded-xl"
          />
        )}
      </div>
    </div>
  );
}
