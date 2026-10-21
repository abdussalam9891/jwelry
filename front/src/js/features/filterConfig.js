import {
  jewelleryNavigation,
  moreCategories,
  jewelleryStyles,
  audiences,
} from "../components/navbar/navbarNavigation.js";

export const MATERIALS = [
  "18K Gold",
  "22K Gold",
  "Silver",
  "Diamond",
  "Rose Gold",
  "White Gold",
  "Platinum",
  "Gemstone",
];

export const filterConfig = {
  categories: [
    ...jewelleryNavigation,
    ...moreCategories,
  ],

  styles: jewelleryStyles,

  audiences,

  materials: MATERIALS,
};
