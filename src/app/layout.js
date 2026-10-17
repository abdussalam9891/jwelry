import { Cormorant_Garamond, Jost } from "next/font/google";

import Providers from "@/components/Providers";
import { metadataBase, pageMetadata } from "@/lib/metadata";

import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata = {
  metadataBase,
  ...pageMetadata({
    title: "Gemora | Premium Jewellery Store",
    description:
      "Discover handcrafted premium jewellery including rings, necklaces, earrings and bracelets. Timeless elegance crafted for every occasion.",
  }),
  keywords: [
    "Gemora",
    "jewellery",
    "rings",
    "necklaces",
    "earrings",
    "bracelets",
    "premium jewellery",
    "diamond jewellery",
    "gold jewellery",
  ],
  authors: [{ name: "Gemora" }],
  icons: { icon: "/assets/icon/logo.png" },
};

export const viewport = {
  themeColor: "#6B1A2A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jost.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
