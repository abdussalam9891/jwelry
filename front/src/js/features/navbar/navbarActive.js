export function setActiveNav() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const subcategory =
    params.get("subcategory");

  const isProductsPage =
    window.location.pathname.includes(
      "products.html"
    );

  document
    .querySelectorAll("[data-nav]")
    .forEach((link) => {

      link.classList.remove(
        "text-[#6B1A2A]"
      );

      const underline =
        link.querySelector("span");

      if (underline) {

        underline.style.width = "0";

      }

      if (
        isProductsPage &&
        link.dataset.nav === subcategory
      ) {

        link.classList.add(
          "text-[#6B1A2A]"
        );

        if (underline) {

          underline.style.width =
            "100%";

        }

      }

    });

  if (
    isProductsPage &&
    !subcategory
  ) {

    const all =
      document.querySelector(
        '[data-nav="all jewellery"]'
      );

    if (all) {

      all.classList.add(
        "text-[#6B1A2A]"
      );

    }

  }

}
