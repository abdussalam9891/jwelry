"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthBackdrop } from "./AuthFields";
import { REDIRECT_AFTER_LOGIN_KEY, useAuth } from "@/context/AuthContext";

// Landing page for the backend's Google OAuth redirect: confirms the session
// cookie is in place, then returns the visitor to where they started.
export default function AuthCallback() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    refreshUser().then((user) => {
      if (!user) {
        setFailed(true);
        return;
      }

      const redirect = sessionStorage.getItem(REDIRECT_AFTER_LOGIN_KEY);
      sessionStorage.removeItem(REDIRECT_AFTER_LOGIN_KEY);
      router.replace(redirect || "/");
    });
  }, [refreshUser, router]);

  return (
    <div className="min-h-screen bg-[#F9F6F2] overflow-hidden relative">
      <AuthBackdrop />

      <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-[420px] bg-white/80 backdrop-blur-xl border border-black/5 shadow-[0_20px_80px_rgba(0,0,0,0.08)] rounded-[32px] px-10 py-12 flex flex-col items-center">
          <img
            src="/assets/icon/logo.png"
            alt="Gemora"
            className="w-[110px] object-contain mb-8"
          />

          {!failed && (
            <div className="relative w-16 h-16 mb-7" aria-hidden="true">
              <div className="absolute inset-0 rounded-full border-[3px] border-[#6B1A2A]/10" />
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#6B1A2A] animate-spin" />
            </div>
          )}

          <h1 className="text-[1.35rem] font-semibold tracking-[-0.02em] text-[#1A1A1A]">
            Securing your session
          </h1>

          <p
            role="status"
            aria-live="polite"
            className="mt-3 text-sm leading-relaxed text-black/55 text-center max-w-[280px]"
          >
            {failed
              ? "Sign-in failed. Please try again."
              : "Please wait while we securely sign you into your account."}
          </p>

          {failed && (
            <button
              type="button"
              onClick={() => router.replace("/login")}
              className="btn-primary px-6 mt-6"
            >
              Back to Login
            </button>
          )}

          <div className="mt-8 w-full h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        </div>
      </main>
    </div>
  );
}
