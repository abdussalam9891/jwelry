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

// export function initMobileSearch() {
//   const mobileSearchBtn = document.getElementById("mobileSearchBtn");

//   const mobileSearchBar = document.getElementById("mobileSearchBar");

//   const mobileSearchInput = document.getElementById("mobileSearchInput");

//   if (!mobileSearchBtn || !mobileSearchBar) return;

//   mobileSearchBtn.addEventListener("click", () => {
//     const isHidden = mobileSearchBar.classList.contains("hidden");

//     mobileSearchBar.classList.toggle("hidden");

//     if (isHidden) {
//       mobileSearchInput?.focus();
//     }
//   });
// }

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
