export function initNavbarScroll() {
  const mainNav = document.getElementById("mainNav");
  const categoryNav = document.getElementById("categoryNav");

  if (!mainNav || !categoryNav) {
    console.warn("[Navbar] initNavbarScroll: element not found", {
      mainNav,
      categoryNav,
    });
    return;
  }

  const ROW1_H = 64;

  // Initial position
  categoryNav.style.top = ROW1_H + "px";

  let lastScrollY = window.scrollY;
  let isHidden = false;

  function handleScroll() {
    if (document.body.classList.contains("overflow-hidden")) return;

    const currentScrollY = window.scrollY;
    const scrollDiff = currentScrollY - lastScrollY;

    if (Math.abs(scrollDiff) < 5) return;

    if (scrollDiff > 0 && currentScrollY > 80 && !isHidden) {
      mainNav.style.transform = "translateY(-100%)";
      categoryNav.style.top = "0px";
      isHidden = true;
    } else if (scrollDiff < 0 && isHidden) {
      mainNav.style.transform = "translateY(0)";
      categoryNav.style.top = ROW1_H + "px";
      isHidden = false;
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
}
