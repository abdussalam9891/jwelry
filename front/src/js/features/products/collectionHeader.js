export function renderCollectionHeader() {
  return `
    <div
      class="
        flex
        justify-between
        items-end
        mb-10
      "
    >

      <div>

        <p
          class="
            uppercase
            tracking-[0.3em]
            text-black/40
            text-xs
          "
        >
          Collection
        </p>

        <h1
          id="pageTitle"
          class="
            text-5xl
            font-light
          "
        >
          All Jewellery
        </h1>

        <p
          id="productCount"
          class="
            mt-2
            text-black/50
          "
        >
          0 Products
        </p>

      </div>

      <div id="desktopSort"></div>

    </div>
  `;
}
