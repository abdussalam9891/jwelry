export function attachImageEvents() {
  const mainImage = document.getElementById("mainProductImage");

  document.querySelectorAll("[data-img]").forEach((img) => {
    img.onclick = () => {
      if (!mainImage) return;

      mainImage.src = img.dataset.img;

      document
        .querySelectorAll("[data-img]")
        .forEach((i) => i.classList.remove("border-black"));

      img.classList.add("border-black");
    };
  });
}
