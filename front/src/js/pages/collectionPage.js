import { getProducts } from "../services/productService.js";

const slug =
  new URLSearchParams(
    location.search
  ).get("slug");

const collectionConfig = {
  bridal: {
    title: "Bridal Collection",

    image:
      "/src/assets/images/bridal.jpg",

    description:
      "Timeless pieces crafted for life's most beautiful moments.",
  },

  luxury: {
    title: "Luxury Collection",

    image:
      "/src/assets/images/luxury.jpg",

    description:
      "Statement jewellery designed to stand out.",
  },

  minimal: {
    title: "Minimal Collection",

    image:
      "/src/assets/images/minimal.jpg",

    description:
      "Elegant simplicity for everyday wear.",
  },

  wedding: {
    title: "Wedding Collection",

    image:
      "/src/assets/images/wedding.jpg",

    description:
      "Celebrate forever with handcrafted wedding jewellery.",
  },

  engagement: {
    title: "Engagement Collection",

    image:
      "/src/assets/images/engagement.jpg",

    description:
      "Made for unforgettable proposals.",
  },

  
};

async function loadCollection() {
  const config =
    collectionConfig[slug];

  if (!config) return;

  document.getElementById(
    "heroTitle"
  ).textContent =
    config.title;

  document.getElementById(
    "heroDescription"
  ).textContent =
    config.description;

  document.getElementById(
    "heroImage"
  ).src =
    config.image;

  document.getElementById(
    "productsHeading"
  ).textContent =
    config.title;

  const data =
    await getProducts({
      subcategory: slug,
      limit: 50,
    });

  renderProducts(
    data.products
  );
}

function renderProducts(
  products
) {
  const grid =
    document.getElementById(
      "productsGrid"
    );

  grid.innerHTML =
    products
      .map(
        (product) => `
      <a
        href="/pages/productDetails.html?slug=${product.slug}"
        class="group"
      >

        <div
          class="bg-[#F9F6F2] aspect-square overflow-hidden"
        >

          <img
            src="${product.images?.[0]?.url}"
            class="
              w-full
              h-full
              object-cover
              group-hover:scale-105
              transition
              duration-500
            "
          />

        </div>

        <h3
          class="mt-4 text-sm"
        >
          ${product.name}
        </h3>

        <p
          class="mt-2 text-black/70"
        >
          ₹${product.price.toLocaleString()}
        </p>

      </a>
    `
      )
      .join("");
}

loadCollection();
