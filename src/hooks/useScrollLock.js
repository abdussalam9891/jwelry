"use client";

import { useEffect } from "react";

let lockCount = 0;

// Adds `overflow-hidden` to <body> while `locked` is true. Counted so nested
// overlays (e.g. a modal opened from the mobile drawer) don't unlock early.
// The navbar's hide-on-scroll logic also reads this class.
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;

    lockCount += 1;
    document.body.classList.add("overflow-hidden");

    return () => {
      lockCount -= 1;

      if (lockCount === 0) {
        document.body.classList.remove("overflow-hidden");
      }
    };
  }, [locked]);
}
