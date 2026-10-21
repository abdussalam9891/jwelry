// reviewService.js
import api from "../core/api.js"

export async function getTestimonials() {
  return api.get(
    "/v1/reviews/testimonials"
  );
}
