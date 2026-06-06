import { showToast }
  from "../components/toast.js";

import {
  submitContactForm,
} from "../services/contactService.js";




const successModal =
  document.getElementById(
    "successModal"
  );

const closeSuccessModal =
  document.getElementById(
    "closeSuccessModal"
  );

const form =
  document.getElementById("contactForm");

const nameInput =
  document.getElementById("name");

const emailInput =
  document.getElementById("email");

const phoneInput =
  document.getElementById("phone");

const submitBtn =
  document.getElementById(
    "submitBtn"
  );

/* -------------------------
   INPUT RESTRICTIONS
------------------------- */

// Phone → digits only
phoneInput?.addEventListener(
  "input",
  () => {
    phoneInput.value =
      phoneInput.value
        .replace(/\D/g, "")
        .slice(0, 10);
  }
);

// Name → letters only
nameInput?.addEventListener(
  "input",
  () => {
    nameInput.value =
      nameInput.value.replace(
        /[^a-zA-Z\s.'-]/g,
        ""
      );
  }
);

// Email cleanup
emailInput?.addEventListener(
  "blur",
  () => {
    emailInput.value =
      emailInput.value
        .trim()
        .toLowerCase();
  }
);

/* -------------------------
   VALIDATION
------------------------- */

function validateForm() {

  const name =
    nameInput.value.trim();

  const email =
    emailInput.value
      .trim()
      .toLowerCase();

  const phone =
    phoneInput.value.trim();

  const subject =
    document
      .getElementById("subject")
      .value
      .trim();

  const message =
    document
      .getElementById("message")
      .value
      .trim();

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const nameRegex =
    /^[a-zA-Z\s.'-]{2,50}$/;

  if (!nameRegex.test(name)) {

    showToast(
      "Please enter a valid name."
    );

    return false;
  }

  if (!emailRegex.test(email)) {

    showToast(
      "Please enter a valid email address."
    );

    return false;
  }

  if (
    phone &&
    !/^\d{10}$/.test(phone)
  ) {

    showToast(
      "Phone number must be 10 digits."
    );

    return false;
  }

  if (subject.length < 5) {

    showToast(
      "Subject must be at least 5 characters."
    );

    return false;
  }

  if (message.length < 10) {

    showToast(
      "Message must be at least 10 characters."
    );

    return false;
  }

  return true;
}


/* -------------------------
   SUBMIT
------------------------- */

let isSubmitting = false;

form?.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    const category =
      document
        .getElementById(
          "category"
        )
        .value;

    if (!category) {

      showToast(
        "Please select an inquiry type."
      );

      return;
    }

    const payload = {

      name:
        nameInput.value.trim(),

      email:
        emailInput.value
          .trim()
          .toLowerCase(),

      phone:
        phoneInput.value.trim(),

      category,

      orderNumber:
        document
          .getElementById(
            "orderNumber"
          )
          .value
          .trim(),

      subject:
        document
          .getElementById(
            "subject"
          )
          .value
          .trim(),

      message:
        document
          .getElementById(
            "message"
          )
          .value
          .trim(),

    };

    try {

      isSubmitting = true;

      submitBtn.disabled =
        true;

      submitBtn.classList.add(
        "opacity-70",
        "cursor-not-allowed"
      );

      submitBtn.innerHTML = `
        <svg
          class="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>

          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>

        Sending...
      `;

      await submitContactForm(
        payload
      );

      showToast(
  "Message sent successfully."
);

openSuccessModal();

      form.reset();

      emailInput.value = "";
      nameInput.value = "";
      phoneInput.value = "";

    } catch (error) {

      showToast(
        error?.message ||
        "Failed to submit inquiry."
      );

    } finally {

      isSubmitting = false;

      submitBtn.disabled =
        false;

      submitBtn.classList.remove(
        "opacity-70",
        "cursor-not-allowed"
      );

      submitBtn.innerHTML = `
        <span>
          Send Message
        </span>
      `;

    }

  }
);




function openSuccessModal() {

  successModal?.classList.remove(
    "hidden"
  );

}

function closeModal() {

  successModal?.classList.add(
    "hidden"
  );

}


closeSuccessModal?.addEventListener(
  "click",
  closeModal
);

successModal?.addEventListener(
  "click",
  (e) => {

    if (
      e.target === successModal
    ) {
      closeModal();
    }

  }
);

