export function renderThumbnails(images = []) {
  return `
    <div class="flex md:flex-col gap-2 md:overflow-visible md:w-[80px]">
      ${images
        .map(
          (img) => `
          <img
            src="${img}"
            class="w-14 h-14 md:w-16 md:h-16 object-cover border rounded shrink-0 cursor-pointer"
            data-img="${img}"
          />
        `
        )
        .join("")}
    </div>
  `;
}

export function renderMainImage(image) {
  return `
    <div class="w-full rounded-xl overflow-hidden">
      <img
        id="mainProductImage"
        src="${image}"
        class="w-full h-[260px] sm:h-[320px] md:h-[420px] object-cover rounded-xl"
      />
    </div>
  `;
}

export function attachImageGalleryEvents() {
  const mainImage = document.getElementById("mainProductImage");

  if (!mainImage) return;

  document.querySelectorAll("[data-img]").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainImage.src = thumb.dataset.img;

      document.querySelectorAll("[data-img]").forEach((img) => {
        img.classList.remove("border-black");
      });

      thumb.classList.add("border-black");
    });
  });
}
