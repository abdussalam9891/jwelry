import {
  resetPassword,
} from "../services/authService.js";

import {
  showToast,
} from "../components/toast.js";

/* ---------------- ELEMENTS ---------------- */
const form =
  document.getElementById(
    "resetPasswordForm"
  );

const newPasswordInput =
  document.getElementById(
    "newPassword"
  );

const confirmPasswordInput =
  document.getElementById(
    "confirmPassword"
  );

const resetBtn =
  document.getElementById(
    "resetPasswordBtn"
  );

/* ---------------- TOKEN ---------------- */
const params =
  new URLSearchParams(
    window.location.search
  );

const token =
  params.get("token");

/* ---------------- GUARD ---------------- */


if (!token) {
  showToast(
    "Invalid reset link"
  );

  setTimeout(() => {
    window.location.href =
      "/front/pages/login.html";
  }, 1500);

  throw new Error(
    "Missing reset token"
  );
}

/* ---------------- SUBMIT ---------------- */


form?.addEventListener(
  "submit",
  async (e) => {
    e.preventDefault();

    try {
      const password =
        newPasswordInput.value.trim();

      const confirmPassword =
        confirmPasswordInput.value.trim();

      if (
        !password ||
        !confirmPassword
      ) {
        return showToast(
          "All fields required"
        );
      }

      if (
        password.length < 6
      ) {
        return showToast(
          "Password must be at least 6 characters"
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

      resetBtn.disabled =
        true;

      resetBtn.textContent =
        "Resetting...";

      await resetPassword(
        token,
        password
      );

      showToast(
        "Password reset successful"
      );

      setTimeout(() => {
        window.location.href =
          "/front/pages/login.html";
      }, 1500);
    } catch (err) {
      console.error(err);

      showToast(
        err?.response?.data
          ?.message ||
          err.message ||
          "Reset failed"
      );
    } finally {
      resetBtn.disabled =
        false;

      resetBtn.textContent =
        "Reset Password";
    }
  }
);

/* ---------------- TOGGLE ---------------- */

function initPasswordToggle() {
  document
    .querySelectorAll(
      ".toggle-password"
    )
    .forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          const input =
            document.getElementById(
              btn.dataset.target
            );

          if (!input) return;

          input.type =
            input.type ===
            "password"
              ? "text"
              : "password";
        }
      );
    });
}

initPasswordToggle();
