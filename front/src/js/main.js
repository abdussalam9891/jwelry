
import {
  getTestimonials,
} from "../js/services/reviewService.js";

import { loadNavbar }
from "./features/navbar/navbar.js";

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













  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }

    });

  }, {
    threshold: 0.15
  });

  document
    .querySelectorAll(".reveal")
    .forEach(el => observer.observe(el));




  const headingObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("heading-revealed");
      }

    });

  }, {
    threshold: 0.3
  });

  document
    .querySelectorAll(".section-heading")
    .forEach(el => headingObserver.observe(el));

});
