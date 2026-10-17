import { SITE_URL } from "./config";

const DEFAULT_IMAGE = "/assets/images/og-image.png";

// Builds per-page metadata with matching Open Graph / Twitter tags.
export function pageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  index = true,
}) {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: "Gemora",
      title,
      description,
      url: path,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export const metadataBase = new URL(SITE_URL);
