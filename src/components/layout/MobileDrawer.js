"use client";

import { useEffect } from "react";
import Link from "next/link";

import {
  CartIcon,
  ChevronDownIcon,
  HeartIcon,
  UserIcon,
} from "@/components/ui/icons";
import { useAuth } from "@/context/AuthContext";
import {
  collections,
  jewelleryNavigation,
  moreCategories,
} from "@/data/navigation";
import { collectionUrl, productsUrl } from "@/lib/routes";

const summaryClass =
  "list-none flex items-center justify-between cursor-pointer text-[15px] font-medium text-[#1A1A1A] [&::-webkit-details-marker]:hidden";

const chevronClass =
  "w-4 h-4 transition-transform duration-300 group-open:rotate-180";

const sectionLabelClass =
  "px-2 text-[11px] uppercase tracking-[0.25em] text-black/40";

const accountLinkClass =
  "flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white transition-all duration-200";

function AccountLink({ href, icon, label }) {
  return (
    <Link href={href} className={accountLinkClass}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[15px] font-medium text-[#1A1A1A]">{label}</span>
      </div>
      <span className="text-black/25 text-xl leading-none">›</span>
    </Link>
  );
}

function LinkGroup({ title, links }) {
  return (
    <details className="border border-black/5 rounded-2xl bg-[#F9F6F2] mt-4 overflow-hidden group">
      <summary className={`${summaryClass} py-4 px-4`}>
        <span>{title}</span>
        <ChevronDownIcon className={chevronClass} />
      </summary>

      <div className="flex flex-col pb-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-4 py-3 text-[14px] text-black/70 hover:text-[#6B1A2A] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

export default function MobileDrawer({ open, onClose }) {
  const { user, logout, openLogin } = useAuth();

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    function handleResize() {
      if (window.innerWidth >= 768) onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [open, onClose]);

  const accountIconClass = "w-5 h-5 text-[#6B1A2A] shrink-0";

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 z-[var(--z-overlay)] ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        id="mobileMenu"
        aria-hidden={!open}
        className={`fixed top-0 left-0 z-[var(--z-drawer)] w-full max-w-[320px] h-[100dvh] bg-[#F9F6F2] transition-transform duration-300 flex flex-col overflow-y-auto px-5 pt-5 pb-6 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="self-end text-xl text-black/60"
        >
          ✕
        </button>

        {user && (
          <>
            <div className="pb-5 border-b border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#F6EEF0] shrink-0">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#6B1A2A] font-semibold">
                      {user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[15px] truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-black/45 truncate">
                    {user.email || user.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pb-4 border-b border-black/5 flex flex-col">
              <AccountLink
                href="/profile"
                label="Profile"
                icon={
                  <UserIcon className={accountIconClass} strokeWidth={1.8} />
                }
              />
              <AccountLink
                href="/orders"
                label="Orders"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    aria-hidden="true"
                    className={accountIconClass}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                    />
                  </svg>
                }
              />
              <AccountLink
                href="/wishlist"
                label="Wishlist"
                icon={
                  <HeartIcon className={accountIconClass} strokeWidth={1.8} />
                }
              />
              <AccountLink
                href="/cart"
                label="Cart"
                icon={
                  <CartIcon className={accountIconClass} strokeWidth={1.8} />
                }
              />
            </div>
          </>
        )}

        <nav className="flex flex-col gap-0 mt-5">
          {jewelleryNavigation.map((category) => (
            <details
              key={category.category}
              className="border-b border-black/5 group"
            >
              <summary className={`${summaryClass} py-4 px-2`}>
                <span>{category.label}</span>
                <ChevronDownIcon className={chevronClass} />
              </summary>

              <div className="pb-3 pl-4 flex flex-col gap-1">
                {category.productTypes.map((type) => (
                  <Link
                    key={type.value}
                    href={productsUrl({
                      category: category.category,
                      productType: type.value,
                    })}
                    className="py-2 text-[14px] text-black/65 hover:text-[#6B1A2A]"
                  >
                    {type.label}
                  </Link>
                ))}

                <Link
                  href={productsUrl({ category: category.category })}
                  className="mt-2 pt-3 border-t border-black/5 text-[#6B1A2A] text-sm font-medium"
                >
                  View All {category.label}
                </Link>
              </div>
            </details>
          ))}

          <div className="mt-4">
            <p className={`${sectionLabelClass} mb-2`}>More Categories</p>
            <LinkGroup
              title="More Categories"
              links={moreCategories.map((category) => ({
                href: productsUrl({ category: category.category }),
                label: category.label,
              }))}
            />
          </div>

          <div className="mt-6">
            <p className={`${sectionLabelClass} mb-3`}>Collections</p>
            <LinkGroup
              title="Collections"
              links={collections.map((collection) => ({
                href: collectionUrl(collection.slug),
                label: collection.name,
              }))}
            />
          </div>
        </nav>

        <div className="mt-auto pt-5 border-t border-black/5">
          <button
            type="button"
            onClick={() => {
              if (user) {
                logout();
              } else {
                onClose();
                openLogin();
              }
            }}
            className="w-full h-12 rounded-2xl bg-[#6B1A2A] text-white font-medium flex items-center justify-center text-center hover:opacity-90 transition"
          >
            {user ? "Logout" : "Login / Signup"}
          </button>
        </div>
      </div>
    </>
  );
}
