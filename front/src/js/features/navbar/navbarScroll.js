export function initNavbarScroll() {
  const mainNav =
    document.getElementById(
      "mainNav"
    );

  const categoryNav =
    document.getElementById(
      "categoryNav"
    );

  const announcementBar =
    document.getElementById(
      "announcementBar"
    );

  if (
    !mainNav ||
    !categoryNav
  ) {
    console.warn(
      "[Navbar] initNavbarScroll: element not found",
      {
        mainNav,
        categoryNav,
      }
    );

    return;
  }

  // These start as best-effort synchronous reads, then get corrected by the
  // ResizeObserver below — Tailwind is loaded via the CDN runtime, which
  // compiles utility classes (e.g. the announcement bar's h-10) async after
  // they're written to the DOM, so a one-time measurement here can catch it
  // mid-layout and cache a too-small height forever.
  let announcementHeight =
    announcementBar
      ?.offsetHeight || 0;

  let navbarHeight =
    mainNav.offsetHeight;

  let ROW1_H =
    announcementHeight +
    navbarHeight;

  let isHidden = false;

  // Exposes the navbar's current visible height as a CSS var so in-page
  // sticky elements (e.g. the products filter bar) can stick right below
  // it instead of relying on a hardcoded offset that breaks whenever the
  // navbar grows/shrinks (announcement bar, hide-on-scroll, mobile layout).
  function setNavOffset(hidden) {
    const offset = hidden
      ? announcementHeight + categoryNav.offsetHeight
      : ROW1_H + categoryNav.offsetHeight;

    document.documentElement.style.setProperty(
      "--navbar-h",
      `${offset}px`
    );
  }

  function applyLayout() {
    // Pin the navbar directly below the announcement bar — never a
    // hardcoded offset, since the announcement bar can be absent (0px)
    // or present (40px).
    mainNav.style.top =
      `${announcementHeight}px`;

    categoryNav.style.top = isHidden
      ? `${announcementHeight}px`
      : `${ROW1_H}px`;

    setNavOffset(isHidden);
  }

  applyLayout();

  // Re-measure whenever these elements actually change size (Tailwind's
  // async class compilation finishing, web fonts loading, the announcement
  // message wrapping to a second line, etc.) instead of trusting the single
  // synchronous snapshot above — that's what let the category nav and page
  // content end up pinned 16px too high, overlapping the announcement bar.
  const resizeObserver = new ResizeObserver(() => {
    announcementHeight =
      announcementBar
        ?.offsetHeight || 0;

    navbarHeight =
      mainNav.offsetHeight;

    ROW1_H =
      announcementHeight +
      navbarHeight;

    applyLayout();
  });

  if (announcementBar) {
    resizeObserver.observe(
      announcementBar
    );
  }

  resizeObserver.observe(
    mainNav
  );

  resizeObserver.observe(
    categoryNav
  );

  let lastScrollY =
    window.scrollY;

  function handleScroll() {
    if (
      document.body.classList.contains(
        "overflow-hidden"
      )
    ) {
      return;
    }

    const currentScrollY =
      window.scrollY;

    const scrollDiff =
      currentScrollY -
      lastScrollY;

    if (
      Math.abs(
        scrollDiff
      ) < 5
    ) {
      return;
    }

    // Scroll Down
    if (
      scrollDiff > 0 &&
      currentScrollY > 80 &&
      !isHidden
    ) {
      // Slide mainNav fully above the viewport (past the announcement bar),
      // not just by its own height — otherwise it overlaps and covers the
      // still-visible announcement bar instead of tucking away behind it.
      mainNav.style.transform =
        `translateY(-${ROW1_H}px)`;

      // Category nav moves just below announcement bar
      categoryNav.style.top =
        `${announcementHeight}px`;

      setNavOffset(true);

      isHidden = true;
    }

    // Scroll Up
    else if (
      scrollDiff < 0 &&
      isHidden
    ) {
      mainNav.style.transform =
        "translateY(0)";

      categoryNav.style.top =
        `${ROW1_H}px`;

      setNavOffset(false);

      isHidden = false;
    }

    lastScrollY =
      currentScrollY;
  }

  window.addEventListener(
    "scroll",
    handleScroll,
    {
      passive: true,
    }
  );
}
