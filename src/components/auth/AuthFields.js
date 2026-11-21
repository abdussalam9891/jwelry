"use client";

import { useState } from "react";

import { EyeIcon } from "@/components/ui/icons";
import { getApiBase } from "@/lib/config";

export const authInputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B1A2A] transition";

export function PasswordInput({ id, className = authInputClass, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? "text" : "password"}
        className={`${className} pr-11`}
        {...props}
      />

      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6B1A2A] transition"
      >
        <EyeIcon />
      </button>
    </div>
  );
}

export function GoogleButton({ className = "" }) {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = `${getApiBase()}/v1/auth/google`;
      }}
      className={`w-full border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition ${className}`}
    >
      <img
        src="/assets/icon/google.svg"
        alt=""
        aria-hidden="true"
        className="w-5 h-5"
      />
      <span className="text-sm font-medium">Continue with Google</span>
    </button>
  );
}

// Soft glow background shared by the standalone auth screens.
export function AuthBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] rounded-full bg-[#6B1A2A]/10 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-80px] w-[320px] h-[320px] rounded-full bg-[#D4AF37]/10 blur-3xl" />
    </div>
  );
}
