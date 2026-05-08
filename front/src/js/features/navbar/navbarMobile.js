export function initializeNavbar() {

  let isOpen = false;

  const mainNav =
    document.getElementById("mainNav");

  const navToggle =
    document.getElementById("navToggle");

  const mobileMenu =
    document.getElementById("mobileMenu");

  const navOverlay =
    document.getElementById("navOverlay");

  const drawerClose =
    document.getElementById("drawerClose");

  if (
    !navToggle ||
    !mobileMenu ||
    !navOverlay
  ) {

    console.warn(
      "[Navbar] Missing mobile menu elements"
    );

    return;

  }

  function openMenu() {

    mobileMenu.classList.remove(
      "translate-x-full"
    );

    navOverlay.classList.remove(
      "opacity-0",
      "pointer-events-none"
    );

    document.body.classList.add(
      "overflow-hidden"
    );

    mainNav.style.transform =
      "translateY(-100%)";

    isOpen = true;

  }

  function closeMenu() {

    mobileMenu.classList.add(
      "translate-x-full"
    );

    navOverlay.classList.add(
      "opacity-0",
      "pointer-events-none"
    );

    document.body.classList.remove(
      "overflow-hidden"
    );

    mainNav.style.transform =
      "translateY(0)";

    isOpen = false;

  }

  function toggleMenu() {

    isOpen
      ? closeMenu()
      : openMenu();

  }

  navToggle.addEventListener(
    "click",
    toggleMenu
  );

  drawerClose?.addEventListener(
    "click",
    closeMenu
  );

  navOverlay.addEventListener(
    "click",
    closeMenu
  );

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth >= 768 &&
        isOpen
      ) {

        closeMenu();

      }

    }
  );

}
