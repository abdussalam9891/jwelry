"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { SearchIcon } from "@/components/ui/icons";
import { getSearchSuggestions } from "@/lib/services/productService";

const PLACEHOLDERS = [
  "Search for diamond jewellery",
  "Search for gold rings",
  "Search for earrings",
  "Search for Neckwears",
];

export default function SearchBar({
  id,
  mobile = false,
  currentSearch = "",
  rotatePlaceholder = false,
  inputRef,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState(currentSearch);
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(-1);
  const requestRef = useRef(0);
  const wrapperRef = useRef(null);

  // Mirror ?search= when it changes (e.g. after navigating to results).
  useEffect(() => {
    setValue(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    if (!rotatePlaceholder) return;

    const timer = setInterval(() => {
      setPlaceholderIndex((index) => (index + 1) % PLACEHOLDERS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [rotatePlaceholder]);

  useEffect(() => {
    if (!open) return;

    function handleClick(e) {
      if (!wrapperRef.current?.contains(e.target)) setOpen(false);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  useEffect(() => {
    const query = value.trim();

    if (query.length < 2 || query === currentSearch) {
      setOpen(false);
      return;
    }

    const requestId = ++requestRef.current;

    const timer = setTimeout(async () => {
      try {
        const results = await getSearchSuggestions(query);

        if (requestId !== requestRef.current) return;

        setSuggestions(Array.isArray(results) ? results : []);
        setOpen(true);
      } catch (err) {
        console.error(err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [value, currentSearch]);

  function performSearch(term) {
    // Keep active filters when searching from the listing page itself.
    const params = new URLSearchParams(
      pathname === "/products" ? window.location.search : "",
    );

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    params.delete("page");
    setOpen(false);

    const query = params.toString();
    router.push(query ? `/products?${query}` : "/products");
  }

  const placeholder =
    placeholderIndex >= 0
      ? PLACEHOLDERS[placeholderIndex]
      : "Search jewellery...";

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        id={id}
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") performSearch(value.trim());
        }}
        placeholder={placeholder}
        aria-label="Search jewellery"
        autoComplete="off"
        className={`w-full px-4 py-2 pr-10 rounded-full border border-black/10 ${
          mobile ? "bg-white text-sm" : "bg-[#F9F6F2]"
        } focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]/30`}
      />

      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-black/10 overflow-hidden z-[var(--z-dropdown)]">
          {suggestions.map((item) => (
            <button
              key={item._id || item.name}
              type="button"
              onClick={() => performSearch(item.name)}
              className="block w-full text-left p-3 hover:bg-gray-100 cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => performSearch(value.trim())}
        aria-label="Search products"
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <SearchIcon
          className={`${mobile ? "w-4 h-4" : "w-5 h-5"} text-[#6B1A2A]`}
        />
      </button>
    </div>
  );
}
