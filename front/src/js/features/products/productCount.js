 
export function updateProductCount(
  count = 0
) {
  const el =
    document.getElementById(
      "productCount"
    );

  if (!el) return;

  el.textContent =
    `${count.toLocaleString()} Products`;
}

