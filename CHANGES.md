# Changes

Notes on the batch of frontend work committed across 44 focused commits.
Grouped by area rather than by commit order — see `git log` for the literal
sequence.

## Design system foundations

- **CSS custom properties (`front/src/css/main.css`)**: introduced `:root`
  tokens for brand colors (`--color-brand`, `--color-brand-dark`,
  `--color-accent-gold`, `--color-cream`) and a layered z-index scale
  (`--z-sticky` → `--z-toast`) so stacking order is centralized instead of
  scattered arbitrary `z-[9999]`-style values sprinkled across the codebase.
- **`.page-content` offset bug**: the shared top-offset class was being
  silently overridden by Tailwind's CDN runtime (which injects its
  stylesheet *after* `main.css` and wins same-specificity ties), letting the
  fixed navbar cover page content. Fixed with `!important` plus a proper
  mobile breakpoint.
- **`.btn-primary` / `.btn-secondary`**: new reusable CTA button classes
  with visible `:focus-visible` outlines, rolled out to the product card,
  product review modal, etc.
- **Z-index token rollout**: every hardcoded `z-[N]` value across modals,
  toasts, dropdowns, the announcement bar, and most page templates was
  swapped for the new tokens (mostly one mechanical commit, plus token
  adoption folded into several page-specific commits below).

## Navbar

- **Scroll/offset bug fix**: the navbar's hide-on-scroll behavior measured
  the announcement bar's height once, synchronously, right after render —
  but Tailwind's async class compilation could still be mid-layout at that
  point, caching a too-small height forever and causing the category nav to
  overlap the announcement bar. Now uses a `ResizeObserver` to re-measure
  whenever the real DOM changes size, and exposes the live height as
  `--navbar-h` so other elements (like the products filter bar) can stick
  below it correctly instead of guessing a hardcoded offset.
- **Mobile search**: implemented the previously-stubbed-out mobile search
  panel — slide-down toggle with icon swap, focus management, outside-click
  and Escape to close.
- **Mega menus**: added click/tap + keyboard support (menus previously only
  opened on CSS `:hover`, which doesn't work for touch or keyboard users),
  with proper `aria-expanded`/`aria-controls`/`aria-haspopup` wiring and a
  denser, less sparse panel redesign.
- **Mobile drawer**: fixed the "Login / Signup" link being a fake
  `<a href="#">` (now a real `<button>`), and added `aria-expanded`
  announcements plus Escape-to-close on the hamburger menu.

## Scroll-reveal animation system

- Extracted the ad-hoc `IntersectionObserver` reveal logic that lived
  inline in `main.js` into a reusable module
  (`front/src/js/utils/scrollReveal.js`) with an `applyRevealStagger()`
  helper, so any dynamically re-rendered grid (products, testimonials,
  horizontal rails, homepage sections) can opt into the same staggered
  reveal-on-scroll animation instead of only working for markup that
  existed at initial page load. No-ops entirely under
  `prefers-reduced-motion`.
- Added hero and modal entrance keyframes to `animations.css`
  (`hero-fade-in`, `modal-backdrop`/`modal-panel`), and broadened the
  reduced-motion block into a sitewide safety net.
- Wired the new utility into: homepage category/collection grids, the
  product listing grid, horizontal product rails, the scrollable card rail,
  and testimonials.

## Homepage

- Hero banners are now cached in `localStorage` for an instant repeat-visit
  paint, with a "waking up our server" message shown only if a first-time
  visitor's fetch is still pending after 5 seconds (covers free-tier
  cold-start hosting).

## Product listing & filters

- Fixed a real bug in the style filter buttons: the active/inactive CSS
  class expression was missing its `${...}` template interpolation, so the
  literal JS expression string was being rendered as a class name — the
  buttons never visually showed as active.
- The sticky filter bar now sticks to `var(--navbar-h)` instead of a
  hardcoded offset, so it tracks the navbar's real (dynamic) height.
- Simplified the collection header/banner markup, which was duplicating the
  page's own title.

## Cart & checkout

- Cart and checkout each had their own hand-rolled header duplicating the
  real site navbar; both now use the shared navbar/footer components.
- Fixed the empty-cart state being pinned off-center to the left instead of
  centered on the page.

## Auth pages (login / register / reset password)

- `login.html`, `register.html`, `resetPassword.html`, and `auth.html` were
  all missing `main.css` and/or `animations.css` `<link>` tags — meaning
  design tokens and animation classes silently didn't apply on those pages.
  All now link the shared stylesheets.
- `register.html` had absolute `/src/...` asset paths that 404 unless the
  site is served from the domain root; switched to relative paths.
- Added `aria-label`s across form inputs and password-visibility toggles,
  and fixed the toggle's label to actually reflect "Show" vs. "Hide" state
  (same fix applied identically to all three pages' JS).
- `auth.html`'s status message is now `aria-live="polite"` so screen reader
  users hear sign-in success/failure, not just see it.

## Profile & order details

- Fixed a real validation bug on the profile page: the name input had
  `require` instead of `required`, so it was never actually validated.
- Order details page: merged the separate "Payment Info" card into
  "Payment Summary" (one less stacked card), and flattened the Shipping
  Address section — it previously rendered three nested bordered
  mini-cards (Recipient/Phone/Address) inside the section's own card.
  Also fixed the item count next to "Ordered Items", which was stuck on
  `--` because it was never actually set.

## Product cards & details

- Fixed a broken image fallback: the `onerror` placeholder path had a stray
  space (`placeholder .webp`), so it 404'd instead of showing a fallback.
- Added a subtle hover-lift to product cards and adopted `.btn-primary`.
- Product details page: refreshed the "Similar Products" / "You may also
  like" headings, adopted modal entrance animations.

## Static content pages

`about.html`, `contact.html`, `wishlist.html`, `collection.html`,
`returns.html`, `shipping.html` — mostly mobile top-spacing fixes (now that
the navbar is pinned via `--navbar-h`), z-index token adoption, and
scaling down a few oversized fixed-size hero headings that overflowed on
mid-size viewports.

## Housekeeping

- `footer.js`: removed leftover debug `console.log` calls and switched
  hardcoded hex colors to the new design tokens.
- `cartItem.js`: deleted ~350 lines of old commented-out draft
  implementations left above the live code, and added
  `type="button"`/`aria-label` to its icon-only buttons.

## Left untouched

A screenshot file that was previously sitting untracked at the repo root
is no longer present on disk, so there was nothing to leave out of this
batch of commits.
