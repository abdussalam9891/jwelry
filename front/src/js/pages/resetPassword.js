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
      "/front/index.html"
;
  }, 1500);
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

      /* validation */
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

      /* API */
      await resetPassword(
        token,
        password
      );

      showToast(
        "Password reset successful"
      );

      /* redirect */
      setTimeout(() => {
        window.location.href =
          "/front/index.html"
;
      }, 1500);
    } catch (err) {
      console.error(err);

      showToast(
        err?.response?.data
          ?.message ||
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
