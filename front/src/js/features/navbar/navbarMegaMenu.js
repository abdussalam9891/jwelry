// Makes the desktop mega menus (All Jewellery / per-category / Collections)
// usable without a mouse. Hover already works via CSS; this adds click/tap
// toggling for touch devices plus Escape-to-close and click-outside-to-close.
export function initMegaMenus() {
  const triggers = Array.from(
    document.querySelectorAll(".mega-trigger")
  );

  if (!triggers.length) return;

  function closeAll(exceptTrigger) {
    triggers.forEach((trigger) => {
      if (trigger === exceptTrigger) return;
      trigger.setAttribute("aria-expanded", "false");
      trigger.closest(".group")?.classList.remove("force-open");
    });
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      const group = trigger.closest(".group");
      if (!group) return;

      const isOpen = group.classList.contains("force-open");

      // Category links (<a>) both navigate AND open a menu — first tap
      // opens the panel, a second tap on an already-open trigger lets
      // the click through so keyboard/mouse users can still follow the link.
      if (trigger.tagName === "A" && !isOpen) {
        e.preventDefault();
      }

      closeAll(trigger);

      const next = !isOpen;
      group.classList.toggle("force-open", next);
      trigger.setAttribute("aria-expanded", String(next));
    });
  });

  // Capture phase so this still runs even if something else on the page
  // (e.g. the hero Swiper) stops the click from bubbling to document.
  document.addEventListener(
    "click",
    (e) => {
      if (e.target.closest(".mega-trigger, .mega-panel")) return;
      closeAll();
    },
    { capture: true }
  );

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const openTrigger = triggers.find(
      (t) => t.getAttribute("aria-expanded") === "true"
    );
    closeAll();
    openTrigger?.focus();
  });
}
