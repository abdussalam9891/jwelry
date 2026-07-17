export const jewelleryStyles = [
  {
    label: "Bridal",
    value: "bridal",
  },

  {
    label: "Luxury",
    value: "luxury",
  },

  {
    label: "Minimal",
    value: "minimal",
  },

  {
    label: "Modern",
    value: "modern",
  },

  {
    label: "Vintage",
    value: "vintage",
  },

  {
    label: "Traditional",
    value: "traditional",
  },

  {
    label: "Party",
    value: "party",
  },

  {
    label: "Casual",
    value: "casual",
  },

  {
    label: "Office",
    value: "office",
  },
];

export const audiences = [
  {
    label: "Women",
    value: "women",
  },

  {
    label: "Men",
    value: "men",
  },

  {
    label: "Unisex",
    value: "unisex",
  },

  {
    label: "Kids",
    value: "kids",
  },
];

export const jewelleryNavigation = [
  {
    category: "rings",

    label: "Rings",

    image: "/src/assets/images/ringNav.webp",

    productTypes: [
      {
        label: "Engagement Rings",
        value: "engagement-ring",
      },

      {
        label: "Wedding Rings",
        value: "wedding-ring",
      },

      {
        label: "Statement Rings",
        value: "statement-ring",
      },
    ],
  },

  {
    category: "earrings",

    label: "Earrings",

    image: "/src/assets/images/earringNav.webp",

    productTypes: [
      {
        label: "Stud",
        value: "stud",
      },

      {
        label: "Hoop",
        value: "hoop",
      },

      {
        label: "Drop",
        value: "drop",
      },

      {
        label: "Dangler",
        value: "dangler",
      },

      {
        label: "Jhumka",
        value: "jhumka",
      },

      {
        label: "Huggie",
        value: "huggie",
      },
    ],
  },

  {
    category: "neckwears",

    label: "Neckwears",

    image: "/src/assets/images/necklaceNav.webp",

    productTypes: [
      {
        label: "Pendant",
        value: "pendant",
      },

      {
        label: "Chain",
        value: "chain",
      },

      {
        label: "Necklace",
        value: "necklace",
      },

      {
        label: "Choker",
        value: "choker",
      },

      {
        label: "Mangalsutra",
        value: "mangalsutra",
      },
    ],
  },

  {
    category: "bracelets",

    label: "Bracelets",

    image: "/src/assets/images/braceletNav.webp",

    productTypes: [
      {
        label: "Bracelet",
        value: "bracelet",
      },

      {
        label: "Cuff",
        value: "cuff",
      },
    ],
  },
];

export const moreCategories = [
  {
    label: "Bangles",
    category: "bangles",
    image: "/src/assets/images/bangleNav.webp",
  },

  {
    label: "Anklets",
    category: "anklets",
    image: "/src/assets/images/ankletNav.webp",
  },

  {
    label: "Nose Jewellery",
    category: "nose-jewellery",
    image: "/src/assets/images/noseNav.webp",
  },

  {
    label: "Jewellery Sets",
    category: "sets",
    image: "/src/assets/images/setNav.webp",
  },
];

export const collections = [
  {
    slug: "bridal",
    name: "Bridal",
    title: "Bridal Collection",
    image: "/src/assets/images/bridal.webp",
    description:
      "Timeless pieces crafted for life's most beautiful moments.",
  },

  {
    slug: "luxury",
    name: "Luxury",
    title: "Luxury Collection",
    image: "/src/assets/images/luxury.webp",
    description:
      "Statement jewellery designed to stand out.",
  },

  {
    slug: "minimal",
    name: "Minimal",
    title: "Minimal Collection",
    image: "/src/assets/images/minimal.webp",
    description:
      "Elegant simplicity for everyday wear.",
  },

  {
    slug: "traditional",
    name: "Traditional",
    title: "Traditional Collection",
    image: "/src/assets/images/traditional.webp",
    description:
      "Classic designs inspired by timeless heritage.",
  },

  {
    slug: "modern",
    name: "Modern",
    title: "Modern Collection",
    image: "/src/assets/images/modern.webp",
    description:
      "Contemporary jewellery with clean and elegant styling.",
  },

  {
    slug: "vintage",
    name: "Vintage",
    title: "Vintage Collection",
    image: "/src/assets/images/vintage.webp",
    description:
      "Inspired by iconic designs from a bygone era.",
  },
];




collections.forEach((c) => {
  const validStyle = jewelleryStyles.some((s) => s.value === c.slug);
  if (!validStyle) {
    console.warn(
      `[navbarNavigation] Collection "${c.slug}" has no matching entry in jewelleryStyles — its collection page will show an empty product grid.`
    );
  }
});
