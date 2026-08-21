import {
  getSearchSuggestions,
} from "../../services/productService.js";



let placeholderInterval;
export function initSearchPlaceholder() {
  const placeholders = [
    "Search for diamond jewellery",
    "Search for gold rings",
    "Search for earrings",
    "Search for Neckwears",
  ];

  const input = document.getElementById("searchInput");
  if (!input) return;

  let index = 0;

  if (placeholderInterval) clearInterval(placeholderInterval);

  placeholderInterval = setInterval(() => {
    index = (index + 1) % placeholders.length;
    input.setAttribute("placeholder", placeholders[index]);
  }, 4000);
}

export function initSearchHandlers() {
  document.querySelectorAll("[data-search-input]").forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        performSearch(input.value.trim());
      }
    });
  });
}

function syncSearchInput() {
  const params = new URLSearchParams(window.location.search);
  const search = params.get("search");

  if (search) {
    const desktopInput = document.getElementById("searchInput");
    const mobileInput = document.getElementById("mobileSearchInput");

    if (desktopInput) desktopInput.value = search;
    if (mobileInput) mobileInput.value = search;
  }
}

export function initMobileSearch() {
  const toggleBtn = document.getElementById("mobileSearchToggle");
  const panel = document.getElementById("mobileSearchPanel");
  const input = document.getElementById("mobileSearchInput");

  if (!toggleBtn || !panel) return;

  const searchIcon = toggleBtn.querySelector("[data-search-icon]");
  const closeIcon = toggleBtn.querySelector("[data-close-icon]");

  let isOpen = false;

  function openPanel() {
    panel.classList.remove(
      "scale-y-0",
      "opacity-0",
      "invisible",
      "pointer-events-none"
    );
    panel.classList.add("scale-y-100", "opacity-100", "visible");

    searchIcon?.classList.add("hidden");
    closeIcon?.classList.remove("hidden");

    toggleBtn.setAttribute("aria-expanded", "true");

    isOpen = true;

    // Focus after the panel becomes visible so mobile keyboards behave.
    requestAnimationFrame(() => input?.focus());
  }

  function closePanel() {
    panel.classList.add(
      "scale-y-0",
      "opacity-0",
      "invisible",
      "pointer-events-none"
    );
    panel.classList.remove("scale-y-100", "opacity-100", "visible");

    searchIcon?.classList.remove("hidden");
    closeIcon?.classList.add("hidden");

    toggleBtn.setAttribute("aria-expanded", "false");

    isOpen = false;
  }

  toggleBtn.addEventListener("click", () => {
    isOpen ? closePanel() : openPanel();
  });

  document.addEventListener("click", (e) => {
    if (!isOpen) return;
    if (panel.contains(e.target) || toggleBtn.contains(e.target)) return;

    closePanel();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      closePanel();
      toggleBtn.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && isOpen) {
      closePanel();
    }
  });
}

export function initSearchButton() {
  document.querySelectorAll("[data-search-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.parentElement.querySelector(
        "[data-search-input]"
      );

      performSearch(input?.value.trim());
    });
  });
}

function performSearch(value) {
  const params = new URLSearchParams(window.location.search);

  if (value) {
    params.set("search", value);
  } else {
    params.delete("search");
  }

  window.location.href = `/pages/products.html?${params.toString()}`;
}



export function initSearchSuggestions() {
  document
    .querySelectorAll("[data-search-input]")
    .forEach((input) => {
      const dropdown =
        document.getElementById(
          `${input.id}-suggestions`
        );

      input.addEventListener(
        "input",
        async (e) => {
          const value =
            e.target.value.trim();

          if (value.length < 2) {
            dropdown?.classList.add(
              "hidden"
            );
            return;
          }

         const suggestions =
  await getSearchSuggestions(
    value
  );

        

          dropdown.innerHTML =
            suggestions
              .map(
                (item) => `
                <div
                  class="p-3 hover:bg-gray-100 cursor-pointer"
                  data-name="${item.name}"
                >
                  ${item.name}
                </div>
              `
              )
              .join("");

          dropdown.classList.remove(
            "hidden"
          );
        }
      );

      dropdown?.addEventListener(
        "click",
        (e) => {
          const item =
            e.target.closest(
              "[data-name]"
            );

          if (!item) return;

          performSearch(
            item.dataset.name
          );
        }
      );
    });
}
