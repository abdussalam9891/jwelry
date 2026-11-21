import { collectionUrl } from "@/lib/routes";

// Curated homepage hero. Each slide is a rounded campaign card: the photo
// fills it (cropped to 5:2 on laptops, 1:1 on phones) and the copy sits on
// top. `align` places the copy on laptops (phones always centre it at the
// bottom); `theme` is "dark" for white copy over a dark photo, "light" for
// maroon copy over a bright one.
export const heroSlides = [
  {
    id: "diamonds",
    label: "Diamonds",
    eyebrow: "The Diamond Edit",
    title: "Lumière",
    subtitle: "Brilliance, quietly worn",
    desktopImage: "/assets/images/hero/diamonds-desktop.webp",
    mobileImage: "/assets/images/hero/diamonds-mobile.webp",
    alt: "Diamond necklace, bracelet, ring and earrings on black velvet",
    href: collectionUrl("luxury"),
    align: "right",
    theme: "dark",
  },
  {
    id: "bridal",
    label: "Bridal",
    eyebrow: "Wedding Signatures",
    title: "Saath",
    subtitle: "Made for your forever",
    desktopImage: "/assets/images/hero/bridal-desktop.webp",
    mobileImage: "/assets/images/hero/bridal-mobile.webp",
    alt: "Bride wearing a delicate pendant and solitaire ring",
    href: collectionUrl("bridal"),
    align: "left",
    theme: "light",
  },
  {
    id: "heritage",
    label: "Heritage",
    eyebrow: "Heritage Gold",
    title: "Virasat",
    subtitle: "Rooted in tradition",
    desktopImage: "/assets/images/hero/heritage-desktop.webp",
    mobileImage: "/assets/images/hero/heritage-mobile.webp",
    alt: "Gold choker, jhumkas, maang tikka and bangles on a red bridal plate",
    href: collectionUrl("traditional"),
    align: "left",
    theme: "dark",
  },
];
