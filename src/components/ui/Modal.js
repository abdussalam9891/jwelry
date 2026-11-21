"use client";

import { useEffect } from "react";

import { useScrollLock } from "@/hooks/useScrollLock";

// Fixed backdrop + panel dialog. Closes on Escape and on backdrop click, and
// locks page scrolling while open.
export default function Modal({
  open,
  onClose,
  labelledBy,
  className = "items-center justify-center p-4 bg-black/40",
  panelClassName = "",
  children,
}) {
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose?.();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`modal-backdrop fixed inset-0 z-[var(--z-modal)] flex ${className}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`modal-panel ${panelClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
