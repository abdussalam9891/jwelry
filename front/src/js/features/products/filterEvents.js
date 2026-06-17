import { updateFilters } from "./updateFilter.js";
import {
  renderProductTypes,
} from "./renderFilters.js";

export function initFilterEvents() {
  document.addEventListener(
  "change",
  (e) => {
    const params =
      new URLSearchParams(
        window.location.search
      );

    if (
      e.target.matches(
        'input[name="category"]'
      )
    ) {
      params.set(
        "category",
        e.target.value
      );

      params.delete(
        "productType"
      );

      updateFilters(
        params
      );

      return;
    }

    if (
      e.target.matches(
        'input[name="productType"]'
      )
    ) {
      params.set(
        "productType",
        e.target.value
      );

      updateFilters(
        params
      );

      return;
    }

    /*
      STYLE FILTERS

      Don't reload here.
      User can select
      multiple styles.
    */


  }
);

  initClearFilters();

  initRemoveFilters();

  initApplyStyleFilters();
}

export function initDropdownEvents() {
  document.addEventListener(
    "click",
    (e) => {
      const trigger =
        e.target.closest(
          "[data-dropdown]"
        );

      if (!trigger) return;

      const type =
        trigger.dataset.dropdown;

      const panels = {
        category:
          "categoryPanel",

        material:
          "materialPanel",

        style:
          "stylePanel",

        productType:
          "productTypePanel",
      };

      Object.values(
        panels
      ).forEach((id) => {
        if (
          id !==
          panels[type]
        ) {
          document
            .getElementById(id)
            ?.classList.add(
              "hidden"
            );
        }
      });

      document
        .getElementById(
          panels[type]
        )
        ?.classList.toggle(
          "hidden"
        );
    }
  );

  document.addEventListener(
    "click",
    (e) => {
      if (
        e.target.closest(
          "[data-dropdown]"
        ) ||
        e.target.closest(
          "#filterDropdowns"
        )
      )
        return;

      document
        .querySelectorAll(
          "#filterDropdowns > div"
        )
        .forEach((panel) =>
          panel.classList.add(
            "hidden"
          )
        );
    }
  );
}


function initApplyStyleFilters() {
  document.addEventListener(
    "click",
    (e) => {
      if (
        e.target.id !==
        "applyStyleFilters"
      )
        return;

      const params =
        new URLSearchParams(
          window.location.search
        );

      const values =
        [
          ...document.querySelectorAll(
            'input[name="style"]:checked'
          ),
        ].map(
          (item) =>
            item.value
        );

      if (
        values.length
      ) {
        params.set(
          "style",
          values.join(",")
        );
      } else {
        params.delete(
          "style"
        );
      }

      updateFilters(
        params
      );
    }
  );
}

function initRemoveFilters() {
  document.addEventListener(
    "click",
    (e) => {
      const btn =
        e.target.closest(
          "[data-remove]"
        );

      if (!btn) return;

      const key =
        btn.dataset.remove;

      const params =
        new URLSearchParams(
          window.location.search
        );

      params.delete(key);

      updateFilters(
        params
      );
    }
  );
}



function initClearFilters() {
  const clearBtn =
    document.getElementById(
      "clearFilters"
    );

  clearBtn?.addEventListener(
    "click",
    () => {
      window.location.search =
        "";
    }
  );
}




export function syncFiltersFromURL() {
  const params =
    new URLSearchParams(
      window.location.search
    );

  document
    .querySelectorAll(
      "input[name]"
    )
    .forEach((input) => {
      const paramValue =
        params.get(
          input.name
        );

      if (
        !paramValue
      ) {
        input.checked =
          false;

        return;
      }

      if (
        input.type ===
        "checkbox"
      ) {
        input.checked =
          paramValue
            .split(",")
            .includes(
              input.value
            );
      } else {
        input.checked =
          paramValue ===
          input.value;
      }
    });
}
