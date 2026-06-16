 
const drawer =
  document.getElementById(
    "mobileFilters"
  );

const overlay =
  document.getElementById(
    "filterOverlay"
  );

const openBtn =
  document.getElementById(
    "openFilters"
  );

const closeBtn =
  document.getElementById(
    "closeFilters"
  );

export function initMobileFilters() {
  openBtn?.addEventListener(
    "click",
    openDrawer
  );

  closeBtn?.addEventListener(
    "click",
    closeDrawer
  );

  overlay?.addEventListener(
    "click",
    closeDrawer
  );

  document.addEventListener(
    "keydown",
    (e) => {
      if (
        e.key === "Escape"
      ) {
        closeDrawer();
      }
    }
  );
}

export function openDrawer() {
  if (
    !drawer ||
    !overlay
  ) {
    return;
  }

  drawer.classList.remove(
    "translate-x-full"
  );

  overlay.classList.remove(
    "hidden"
  );

  document.body.classList.add(
    "overflow-hidden"
  );
}

export function closeDrawer() {
  if (
    !drawer ||
    !overlay
  ) {
    return;
  }

  drawer.classList.add(
    "translate-x-full"
  );

  overlay.classList.add(
    "hidden"
  );

  document.body.classList.remove(
    "overflow-hidden"
  );
}

