
let isOpen = false;


export function closeMobileDrawer() {
  const mainNav = document.getElementById("mainNav");
  const announcementBar = document.getElementById("announcementBar");
  const mobileMenu = document.getElementById("mobileMenu");
  const navOverlay = document.getElementById("navOverlay");
  const navToggle = document.getElementById("navToggle");

  if (!mobileMenu || !navOverlay) return;

  mainNav.style.transform = "translateY(0)";
  announcementBar.style.transform = "translateY(0)";

  mobileMenu.classList.add("-translate-x-full");

  navOverlay.classList.add(
    "opacity-0",
    "pointer-events-none"
  );

  document.body.classList.remove("overflow-hidden");

  navToggle?.setAttribute("aria-expanded", "false");

  isOpen = false;
}

export function initializeNavbar() {



  const mainNav =
    document.getElementById("mainNav");



  const navToggle =
    document.getElementById("navToggle");

  const mobileMenu =
    document.getElementById("mobileMenu");

    const announcementBar =
  document.getElementById("announcementBar");

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

    mainNav.style.transform = "translateY(-100%)";

    announcementBar.style.transform =
      "translateY(-100%)";

    mobileMenu.classList.remove(
      "-translate-x-full"
    );

    navOverlay.classList.remove(
      "opacity-0",
      "pointer-events-none"
    );

    document.body.classList.add(
      "overflow-hidden"
    );

    navToggle.setAttribute("aria-expanded", "true");

    isOpen = true;

  }

 function closeMenu() {
  closeMobileDrawer();
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      closeMenu();
      navToggle.focus();
    }
  });

}
