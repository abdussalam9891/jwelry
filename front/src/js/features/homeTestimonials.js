import {
  getTestimonials,
} from "../services/reviewService.js";

import {
  createTestimonialCard,
} from "../components/testimonialCard.js";

export async function loadTestimonials() {
  try {
    const reviews =
      await getTestimonials();

    const grid =
      document.getElementById(
        "testimonialGrid"
      );

    if (!grid) return;

    grid.innerHTML =
      reviews
        .slice(0, 4)
        .map(
          createTestimonialCard
        )
        .join("");
  } catch (error) {
    console.error(
      "Failed to load testimonials",
      error
    );
  }
}
