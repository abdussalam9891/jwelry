import { subscribeNewsletter } from "../services/newsLetterService.js";
import { showToast } from "../components/toast.js";

export function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  const input = document.getElementById("newsletterEmail");
  const button = document.getElementById("newsletterBtn");

  if (!form || !input || !button) return;

  form.addEventListener("submit", handleSubscribe);

  async function handleSubscribe(e) {
    e.preventDefault();
    const email = input.value.trim().toLowerCase();

if (!email) {
  showToast("Please enter your email.", "error");
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  showToast("Please enter a valid email address.", "error");
  return;
}


button.disabled = true;
    button.textContent = "Joining...";

    try {
      const response = await subscribeNewsletter(email);

      showToast(response.message, "success"); // your toast

      input.value = "";
    } catch (error) {
      showToast(
        error.message || "Something went wrong.",
        "error"
      );
    } finally {
      button.disabled = false;
      button.textContent = "Join";
    }
  }
}
