import { CONFIG } from "../config.js";

import {
  register,
  verifyEmailOtp,
} from "../services/authService.js";



// back to home
function initBackButton() {
  const btn =
    document.getElementById(
      "backBtn"
    );

  if (!btn) return;

  btn.onclick = () => {
    window.location.href = "/front/index.html";
  };
}












/* ---------------- TOAST ---------------- */
function showToast(message) {
  const toast =
    document.getElementById("toast");

  toast.textContent = message;
  toast.classList.remove("hidden");

  clearTimeout(toast._timeout);

  toast._timeout = setTimeout(() => {
    toast.classList.add("hidden");
  }, 2500);
}






/* ---------------- PASSWORD TOGGLE ---------------- */
function initPasswordToggle() {
  document
    .querySelectorAll(".toggle-password")
    .forEach((btn) => {
      btn.onclick = () => {
        const input =
          document.getElementById(
            btn.dataset.target
          );

        if (!input) return;

        input.type =
          input.type === "password"
            ? "text"
            : "password";
      };
    });
}

/* ---------------- GOOGLE ---------------- */
function initGoogleAuth() {
  const btn =
    document.getElementById(
      "google-btn"
    );

  if (!btn) return;

  btn.onclick = () => {
  window.location.href =
    `${CONFIG.API_BASE}/v1/auth/google`;
};
}

/* ---------------- REGISTER ---------------- */
let pendingEmail = "";

function initRegister() {
  const form =
    document.getElementById(
      "registerForm"
    );

  const btn =
    document.getElementById(
      "registerBtn"
    );

  if (!form || !btn) return;

  form.onsubmit =
    async (e) => {
      e.preventDefault();

      try {
        const name =
          document
            .getElementById(
              "registerName"
            )
            .value.trim();

        const email =
          document
            .getElementById(
              "registerEmail"
            )
            .value
            .trim()
            .toLowerCase();

        const password =
          document
            .getElementById(
              "registerPassword"
            )
            .value.trim();

        const confirmPassword =
          document
            .getElementById(
              "confirmPassword"
            )
            .value.trim();

        /* validation */
        if (
          !name ||
          !email ||
          !password ||
          !confirmPassword
        ) {
          return showToast(
            "All fields required"
          );
        }

        /* name validation */
if (!/^[A-Za-z\s]+$/.test(name)) {
  return showToast(
    "Name must contain letters only"
  );
}

if (name.length < 2) {
  return showToast(
    "Name too short"
  );
}


        /* email validation */
if (!/^\S+@\S+\.\S+$/.test(email)) {
  return showToast(
    "Enter valid email"
  );
}

        if (
          password !==
          confirmPassword
        ) {
          return showToast(
            "Passwords do not match"
          );
        }

        if (
          password.length < 6
        ) {
          return showToast(
            "Min 6 characters required"
          );
        }

        btn.disabled = true;
        btn.textContent =
          "Creating...";

        await register(
          name,
          email,
          password
        );

        pendingEmail = email;

        showToast(
          "OTP sent to email"
        );

        document
          .getElementById(
            "verifyModal"
          )
          .classList.remove(
            "hidden"
          );
      } catch (err) {
        showToast(
          err?.message ||
            "Registration failed"
        );
      } finally {
        btn.disabled =
          false;
        btn.textContent =
          "Create Account";
      }
    };
}

/* ---------------- VERIFY EMAIL OTP ---------------- */
function initVerifyEmailOtp() {
  const btn =
    document.getElementById(
      "verifyEmailOtpBtn"
    );

  btn.onclick =
    async () => {
      try {
        const otp =
          document
            .getElementById(
              "emailOtpInput"
            )
            .value.trim();

        if (!otp) {
          return showToast(
            "OTP required"
          );
        }

        btn.disabled = true;
        btn.textContent =
          "Verifying...";

        await verifyEmailOtp(
          pendingEmail,
          otp
        );

        showToast(
          "Email verified"
        );

        setTimeout(() => {
          window.location.href =
            "/front/pages/login.html";
        }, 800);
      } catch (err) {
        showToast(
          err?.message ||
            "Verification failed"
        );
      } finally {
        btn.disabled =
          false;
        btn.textContent =
          "Verify Email";
      }
    };
}

/* ---------------- MODAL ---------------- */
function initVerifyModal() {
  const modal =
    document.getElementById(
      "verifyModal"
    );

  document.getElementById(
    "backToRegisterBtn"
  ).onclick = () => {
    modal.classList.add(
      "hidden"
    );
  };
}

/* ---------------- INIT ---------------- */
document.addEventListener(
  "DOMContentLoaded",
  () => {
    initBackButton();
    initPasswordToggle();
    initGoogleAuth();
    initRegister();
    initVerifyEmailOtp();
    initVerifyModal();
  }
);
