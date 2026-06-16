 
export function initFilterEvents() {
  document.addEventListener(
    "change",
    (e) => {
      const params =
        new URLSearchParams(
          window.location.search
        );

      // CATEGORY
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
      }

      // MATERIAL
      if (
        e.target.matches(
          'input[name="material"]'
        )
      ) {
        params.set(
          "material",
          e.target.value
        );
      }

      // PRODUCT TYPE
      if (
        e.target.matches(
          'input[name="productType"]'
        )
      ) {
        params.set(
          "productType",
          e.target.value
        );
      }

      // STYLE
      if (
        e.target.matches(
          'input[name="style"]'
        )
      ) {
        const styles =
          document.querySelectorAll(
            'input[name="style"]:checked'
          );

        const values =
          Array.from(
            styles
          ).map(
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
      }

      params.delete("page");

      window.location.search =
        params.toString();
    }
  );

  const clearBtn =
    document.getElementById(
      "clearFilters"
    );

  clearBtn?.addEventListener(
    "click",
    () => {
      window.location.href =
        window.location.pathname;
    }
  );
}

