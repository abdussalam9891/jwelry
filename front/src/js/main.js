
import {
  getTestimonials,
} from "../js/services/reviewService.js";

import { loadNavbar }
from "./features/navbar/navbar.js";

import { initScrollReveal } from "./utils/scrollReveal.js";

document.addEventListener("DOMContentLoaded", async () => {

  await loadNavbar();







async function loadTestimonials() {
  try {
    const reviews =
      await getTestimonials();

    renderTestimonials(
      reviews
    );
  } catch (error) {
    console.error(error);
  }
}













  initScrollReveal();

});
