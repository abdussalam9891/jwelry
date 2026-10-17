"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useToast } from "@/context/ToastContext";
import {
  collections,
  jewelleryNavigation,
  jewelleryStyles,
  moreCategories,
} from "@/data/navigation";
import { EMAIL_REGEX } from "@/lib/format";
import { collectionUrl, productsUrl } from "@/lib/routes";
import {
  getSiteSettings,
  subscribeNewsletter,
} from "@/lib/services/contentService";

const linkClass = "hover:text-[var(--color-accent-gold)] transition-colors";

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/warranty", label: "Warranty" },
];

// Popular searches are real category x style combinations.
const POPULAR_SEARCHES = jewelleryNavigation.flatMap((category) =>
  jewelleryStyles.slice(0, 3).map((style) => ({
    href: productsUrl({ category: category.category, style: style.value }),
    label: `${style.label} ${category.label}`,
  })),
);

// Collapsible on mobile, always open (and non-interactive) on desktop.
function FooterColumn({ title, className, children }) {
  return (
    <div className={className}>
      <details open className="group">
        <summary className="flex items-center justify-between text-sm font-semibold tracking-[0.1em] uppercase text-white mb-4 cursor-pointer lg:cursor-default lg:pointer-events-none list-none [&::-webkit-details-marker]:hidden">
          <span>{title}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-white/50 transition-transform duration-300 group-open:rotate-180 lg:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19 9-7 7-7-7"
            />
          </svg>
        </summary>

        <ul className="space-y-2.5 text-sm text-white/70 mt-3 lg:mt-0 lg:pointer-events-auto">
          {children}
        </ul>
      </details>
    </div>
  );
}

function NewsletterForm() {
  const showToast = useToast();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const value = email.trim().toLowerCase();

    if (!value) {
      showToast("Please enter your email.");
      return;
    }

    if (!EMAIL_REGEX.test(value)) {
      showToast("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await subscribeNewsletter(value);
      showToast(response?.message);
      setEmail("");
    } catch (error) {
      showToast(error.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full md:w-auto max-w-sm">
      <input
        type="email"
        required
        maxLength={254}
        autoComplete="email"
        spellCheck="false"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        aria-label="Email address"
        className="flex-1 bg-white/5 border border-white/25 focus:border-[var(--color-accent-gold)] outline-none text-sm px-4 py-2.5 placeholder:text-white/40 transition-colors"
      />
      <button
        type="submit"
        disabled={submitting}
        className="border border-l-0 border-white/25 px-5 text-xs font-semibold uppercase tracking-wide hover:bg-[var(--color-accent-gold)] hover:border-[var(--color-accent-gold)] hover:text-[var(--color-brand-dark)] transition-colors"
      >
        {submitting ? "Joining..." : "Join"}
      </button>
    </form>
  );
}

export default function Footer() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    getSiteSettings()
      .then((data) => setSettings(data || {}))
      .catch((error) => console.error(error));
  }, []);

  const {
    storeName = "Gemora",
    email = "",
    phone = "",
    address = "",
    socialLinks = {},
  } = settings;

  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-brand-dark)] text-white pt-14 pb-8">
      <div className="container-main">
        {/* Newsletter strip */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-10 border-b border-white/15">
          <div>
            <p className="text-base font-medium tracking-wide">
              Join the Gemora list
            </p>
            <p className="text-sm text-white/60 mt-1">
              New arrivals, early access, no spam.
            </p>
          </div>
          <NewsletterForm />
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-9 py-10">
          {/* Brand */}
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-light mb-3 tracking-wide">
              {storeName}
            </h3>
            <p className="text-sm text-white/65 leading-relaxed max-w-xs mb-5">
              Timeless jewellery crafted to celebrate every moment.
            </p>

            <div className="flex gap-4">
              <a
                href={socialLinks.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Gemora on Instagram"
                className="text-white/70 hover:text-[var(--color-accent-gold)] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://pinterest.com/gemorajewellry/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Gemora on Pinterest"
                className="text-white/70 hover:text-[var(--color-accent-gold)] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>

          <FooterColumn title="Shop" className="lg:col-span-2">
            {jewelleryNavigation.map((category) => (
              <li key={category.category}>
                <Link
                  href={productsUrl({ category: category.category })}
                  className={linkClass}
                >
                  {category.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/products"
                className="text-[var(--color-accent-gold)] font-medium hover:text-white transition-colors"
              >
                View All →
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Collections" className="lg:col-span-2">
            {collections.slice(0, 5).map((collection) => (
              <li key={collection.slug}>
                <Link
                  href={collectionUrl(collection.slug)}
                  className={linkClass}
                >
                  {collection.name}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Explore" className="lg:col-span-2">
            {moreCategories.map((category) => (
              <li key={category.category}>
                <Link
                  href={productsUrl({ category: category.category })}
                  className={linkClass}
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <div className="lg:col-span-3">
            <FooterColumn title="Company">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <div className="mt-5 pt-5 border-t border-white/15 lg:border-none lg:pt-0 lg:mt-6 text-sm text-white/70 space-y-1.5">
              {address && <p>{address}</p>}
              <p>
                <a href={email ? `mailto:${email}` : "#"} className={linkClass}>
                  {email || "Not Available"}
                </a>
              </p>
              <p>
                <a href={phone ? `tel:${phone}` : "#"} className={linkClass}>
                  {phone || "Not Available"}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="py-6 border-t border-white/15">
          <p className="text-xs font-semibold tracking-[0.1em] uppercase text-white/50 mb-3">
            Popular Searches
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {POPULAR_SEARCHES.map((search) => (
              <Link
                key={search.href}
                href={search.href}
                className="text-white/50 hover:text-[var(--color-accent-gold)] transition-colors"
              >
                {search.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/55">
          <p>© {year} Gemora. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
