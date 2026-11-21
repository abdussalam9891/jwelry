"use client";

import { useEffect } from "react";

import { initScrollReveal } from "@/lib/scrollReveal";

// Wires `.reveal`, `.section-heading` and `[data-reveal-group]` markup to the
// scroll-reveal observers, including content rendered after data loads:
// any DOM insertion schedules one re-scan on the next frame.
export default function ScrollReveal() {
  useEffect(() => {
    let frame = null;

    function scan() {
      frame = null;
      initScrollReveal(document);
    }

    scan();

    const observer = new MutationObserver(() => {
      if (frame === null) frame = requestAnimationFrame(scan);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
