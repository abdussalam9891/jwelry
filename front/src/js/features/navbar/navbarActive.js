export function setActiveNav() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  const isProductsPage =
    window.location.pathname.includes("products.html");

  document.querySelectorAll("[data-nav]").forEach((link) => {
    
    const underline = link.querySelector("span");

    // Reset
    link.classList.remove("text-[#6B1A2A]");

    if (underline) {
      underline.style.width = "0";
    }

    // Active category
    if (
      isProductsPage &&
      link.dataset.nav === category
    ) {
      link.classList.add("text-[#6B1A2A]");

      if (underline) {
        underline.style.width = "100%";
      }
    }
  });

  // Default: All Jewellery
  if (isProductsPage && !category) {
    const all = document.querySelector(
      '[data-nav="all jewellery"]'
    );

    if (all) {
      all.classList.add("text-[#6B1A2A]");

      const underline = all.querySelector("span");

      if (underline) {
        underline.style.width = "100%";
      }
    }
  }
}
