/*
  Shared scroll-reveal system.

  Extends the original main.js IntersectionObserver (`.reveal` /
  `.section-heading`) into a reusable module so dynamically-rendered
  content (product grids re-rendered after fetch/filter/tab-switch) can
  opt in with `applyRevealStagger()` instead of only working for markup
  that already existed at DOMContentLoaded.
*/

const registered = new WeakSet();

let revealObserver = null;
let headingObserver = null;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ensureObservers() {
  if (revealObserver) return;

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  headingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("heading-revealed");
        headingObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.3 },
  );
}

/**
 * Observe every `.reveal` / `.section-heading` element under `root`
 * (root itself included). Safe to call repeatedly — already-registered
 * elements are skipped. No-ops under reduced motion since the CSS
 * shows that content immediately without JS.
 */
export function observeReveal(root = document) {
  if (prefersReducedMotion()) return;

  ensureObservers();

  const collect = (selector) => {
    const matches =
      root.nodeType === 1 && root.matches?.(selector) ? [root] : [];
    if (root.querySelectorAll) {
      matches.push(...root.querySelectorAll(selector));
    }
    return matches;
  };

  collect(".reveal").forEach((el) => {
    if (registered.has(el)) return;
    registered.add(el);
    revealObserver.observe(el);
  });

  collect(".section-heading").forEach((el) => {
    if (registered.has(el)) return;
    registered.add(el);
    headingObserver.observe(el);
  });
}

function getColumnCount(container, fallback) {
  const style = window.getComputedStyle(container);
  if (style.display.includes("grid")) {
    const cols = style.gridTemplateColumns.split(" ").filter(Boolean);
    if (cols.length > 0) return cols.length;
  }
  return fallback;
}

/**
 * Mark a container's direct children as reveal targets with a short,
 * coordinated stagger, then observe them. Call this every time a grid
 * is (re)rendered — filtered, sorted, paginated, tab-switched — since
 * innerHTML replacement destroys any previous observation.
 *
 * Stagger resets every `size` items (default: matches the container's
 * own CSS grid column count) so a long grid never makes later cards
 * wait several hundred ms — each "row" cascades in on its own.
 */
export function applyRevealStagger(container, { step = 50, size } = {}) {
  if (!container) return;

  const columnSize = size || getColumnCount(container, 4);

  Array.from(container.children).forEach((item, i) => {
    item.classList.add("reveal");
    item.style.setProperty("--reveal-delay", `${(i % columnSize) * step}ms`);
  });

  observeReveal(container);
}

/**
 * Wire up whatever `.reveal` / `.section-heading` markup already exists,
 * plus any static `[data-reveal-group]` containers (their direct children
 * get auto-staggered — no JS render hook needed for hand-authored grids).
 */
export function initScrollReveal(root = document) {
  observeReveal(root);

  const groups =
    root.nodeType === 1 && root.matches?.("[data-reveal-group]")
      ? [root]
      : Array.from(root.querySelectorAll?.("[data-reveal-group]") || []);

  groups.forEach((group) => applyRevealStagger(group));
}
