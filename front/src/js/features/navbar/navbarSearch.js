



let placeholderInterval;
export function initSearchPlaceholder() {
  const placeholders = [
    "Search for diamond jewellery",
    "Search for gold rings",
    "Search for earrings",
    "Search for necklaces",
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
  const desktopInput = document.getElementById("searchInput");
  const mobileInput = document.getElementById("mobileSearchInput");

  function handleSearch(input) {
    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const value = input.value.trim();

        const params = new URLSearchParams(window.location.search);

        if (value) {
          params.set("search", value);
        } else {
          params.delete("search");
        }

        window.location.href = `/front/pages/products.html?${params.toString()}`;
      }
    });
  }

  handleSearch(desktopInput);
  handleSearch(mobileInput);
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

  const mobileSearchBtn =
    document.getElementById(
      "mobileSearchBtn"
    );

  const mobileSearchBar =
    document.getElementById(
      "mobileSearchBar"
    );

  const mobileSearchInput =
    document.getElementById(
      "mobileSearchInput"
    );

  if (
    !mobileSearchBtn ||
    !mobileSearchBar
  ) return;

  mobileSearchBtn.addEventListener(
    "click",
    () => {

      const isHidden =
        mobileSearchBar.classList.contains(
          "hidden"
        );

      mobileSearchBar.classList.toggle(
        "hidden"
      );

      if (isHidden) {

        mobileSearchInput?.focus();

      }

    }
  );

}




export function initSearchButton() {

  const searchBtn =
    document.getElementById(
      "searchBtn"
    );

  const input =
    document.getElementById(
      "searchInput"
    );

  if (
    !searchBtn ||
    !input
  ) return;

  searchBtn.addEventListener(
    "click",
    () => {

      const value =
        input.value.trim();

      const params =
        new URLSearchParams(
          window.location.search
        );

      if (value) {

        params.set(
          "search",
          value
        );

      }

      window.location.href =
        `/front/pages/products.html?${params.toString()}`;

    }
  );

}




function performSearch(value) {

  const params =
    new URLSearchParams(
      window.location.search
    );

  if (value) {

    params.set(
      "search",
      value
    );

  } else {

    params.delete(
      "search"
    );

  }

  window.location.href =
    `/front/pages/products.html?${params.toString()}`;

}
