"use client";

import { usePathname } from "next/navigation";

import { REDIRECT_AFTER_LOGIN_KEY, useAuth } from "@/context/AuthContext";

// Renders children only for signed-in visitors; everyone else gets a sign-in
// prompt that brings them back here afterwards.
export default function RequireAuth({ children }) {
  const pathname = usePathname();
  const { user, loading, openLogin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm text-black/50">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-4">
        <h2 className="text-2xl font-semibold">Please sign in</h2>
        <p className="text-sm text-black/50">
          You need to be logged in to view this page.
        </p>
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem(REDIRECT_AFTER_LOGIN_KEY, pathname);
            openLogin();
          }}
          className="btn-primary px-6"
        >
          Login / Signup
        </button>
      </div>
    );
  }

  return children;
}
