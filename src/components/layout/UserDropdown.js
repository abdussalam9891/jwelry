"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import {
  CartIcon,
  HeartIcon,
  OrdersIcon,
  UserIcon,
} from "@/components/ui/icons";
import { useAuth } from "@/context/AuthContext";

const menuLinkClass =
  "flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#F8F8F8] transition";

export default function UserDropdown() {
  const { user, logout, openLogin } = useAuth();

  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const closeTimer = useRef(null);

  function show() {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function hide() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <button
        type="button"
        aria-label="Open profile menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col items-center justify-center text-[11px] p-2 hover:bg-black/5 rounded-lg"
      >
        <UserIcon className="w-7 h-7 text-[#6B1A2A]" />
        <span className="mt-1 text-black/80 font-medium">Profile</span>
      </button>

      <div
        className={`absolute right-0 mt-3 w-80 bg-white rounded-3xl border border-black/5 shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition-all duration-200 z-[var(--z-dropdown)] overflow-hidden ${
          open
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none translate-y-2"
        }`}
      >
        {user ? (
          <div>
            <div className="px-5 pt-5 pb-4 border-b border-black/5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-[#F6EEF0] flex items-center justify-center text-[#6B1A2A] font-semibold text-lg shrink-0">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{user.name?.charAt(0)?.toUpperCase() || "U"}</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[15px] text-black truncate">
                    {user.name || "User"}
                  </p>
                  <p className="text-sm text-black/45 truncate mt-0.5">
                    {user.email || ""}
                  </p>
                  <Link
                    href="/profile"
                    className="mt-2 inline-block text-xs font-medium text-[#6B1A2A] hover:underline"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-2">
              <Link href="/orders" className={menuLinkClass}>
                <OrdersIcon
                  className="w-5 h-5 text-black/60 shrink-0"
                  strokeWidth={1.8}
                />
                <span className="text-sm font-medium">Orders</span>
              </Link>

              <Link href="/wishlist" className={menuLinkClass}>
                <HeartIcon
                  className="w-5 h-5 text-black/60 shrink-0"
                  strokeWidth={1.8}
                />
                <span className="text-sm font-medium">Wishlist</span>
              </Link>

              <Link href="/cart" className={menuLinkClass}>
                <CartIcon
                  className="w-5 h-5 text-black/60 shrink-0"
                  strokeWidth={1.8}
                />
                <span className="text-sm font-medium">Cart</span>
              </Link>
            </div>

            <div className="border-t border-black/5 px-4 py-3">
              <button
                type="button"
                disabled={loggingOut}
                onClick={async () => {
                  setLoggingOut(true);
                  await logout();
                  setLoggingOut(false);
                }}
                className="w-full text-sm font-medium py-2.5 rounded-xl text-[#6B1A2A] hover:bg-[#F9F3F4] transition"
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5">
            <p className="text-sm font-medium text-black">Welcome</p>
            <p className="text-xs text-black/50 mt-1">
              Login to access orders, wishlist &amp; profile
            </p>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openLogin();
              }}
              className="mt-4 w-full h-11 rounded-xl bg-[#6B1A2A] text-white text-sm font-medium flex items-center justify-center hover:opacity-90 transition"
            >
              Login / Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
