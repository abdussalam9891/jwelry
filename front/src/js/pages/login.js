
import { CONFIG } from "../config.js";
import { login, forgotPassword } from "../services/authService.js";
import { auth } from "../core/firebaseOtp.js";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "../core/firebaseOtp.js";

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

/* ---------------- LOGIN ---------------- */
function initLogin() {
  const form =
    document.getElementById(
      "loginForm"
    );

  const btn =
    document.getElementById(
      "loginBtn"
    );

  if (!form || !btn) return;

  form.onsubmit = async (e) => {
    e.preventDefault();

    try {
      const email =
        document
          .getElementById(
            "loginEmail"
          )
          .value
          .trim()
          .toLowerCase();

      const password =
        document
          .getElementById(
            "loginPassword"
          )
          .value.trim();

      if (!email || !password) {
  return showToast(
    "Email and password required"
  );
}

if (!/^\S+@\S+\.\S+$/.test(email)) {
  return showToast(
    "Enter valid email"
  );
}

if (password.length < 6) {
  return showToast(
    "Password too short"
  );
}
      btn.disabled = true;
      btn.textContent =
        "Logging in...";

      await login(
        email,
        password
      );

      showToast(
        "Login successful"
      );

      setTimeout(() => {
        window.location.href = "/front/index.html"

      }, 800);
    } catch (err) {
      showToast(
        err?.message ||
          "Login failed"
      );
    } finally {
      btn.disabled = false;
      btn.textContent =
        "Login";
    }
  };
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

/* ---------------- OTP MODAL ---------------- */
function initOtpModal() {
  const modal =
    document.getElementById(
      "otpModal"
    );

  document.getElementById(
    "openOtpModal"
  ).onclick = () => {
    modal.classList.remove(
      "hidden"
    );
  };

  document.getElementById(
    "closeOtpModal"
  ).onclick = () => {
    modal.classList.add(
      "hidden"
    );
  };
}

let otpCountdown;
let timeLeft = 60;

function startOtpTimer() {
  const timer =
    document.getElementById("otpTimer");

  const resendBtn =
    document.getElementById(
      "resendOtpBtn"
    );

  timer.classList.remove("hidden");
  resendBtn.classList.add("hidden");

  timeLeft = 60;

  clearInterval(otpCountdown);

  otpCountdown = setInterval(() => {
    const mins = Math.floor(
      timeLeft / 60
    );

    const secs = String(
      timeLeft % 60
    ).padStart(2, "0");

    timer.textContent =
      `Resend OTP in ${mins}:${secs}`;

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(
        otpCountdown
      );

      timer.classList.add(
        "hidden"
      );

      resendBtn.classList.remove(
        "hidden"
      );
    }
  }, 1000);
}

function initOtpAuth() {
  const requestBtn =
    document.getElementById(
      "requestOtpBtn"
    );

  const verifyBtn =
    document.getElementById(
      "verifyOtpBtn"
    );

  const resendBtn =
    document.getElementById(
      "resendOtpBtn"
    );

  const otpSection =
    document.getElementById(
      "otpSection"
    );

  const phoneInput =
    document.getElementById(
      "phoneInput"
    );

  const otpInput =
    document.getElementById(
      "otpInput"
    );

  async function sendOtp() {
    const phone =
      phoneInput.value
        .trim()
        .replace(/\D/g, "");

    if (
      !/^[6-9]\d{9}$/.test(
        phone
      )
    ) {
      return showToast(
        "Enter valid mobile number"
      );
    }

    try {
      requestBtn.disabled =
        true;
      requestBtn.textContent =
        "Sending...";

      const confirmationResult =
        await signInWithPhoneNumber(
          auth,
          `+91${phone}`,
          window.recaptchaVerifier
        );

      window.confirmationResult =
        confirmationResult;

      showToast(
        "OTP sent"
      );

      otpSection.classList.remove(
        "hidden"
      );

      requestBtn.classList.add(
        "hidden"
      );

      verifyBtn.classList.remove(
        "hidden"
      );

      startOtpTimer();
      otpInput.focus();
    } catch (err) {
      console.error(err);

      showToast(
        err?.message ||
          "OTP request failed"
      );
    } finally {
      requestBtn.disabled =
        false;
      requestBtn.textContent =
        "Request OTP";
    }
  }

  requestBtn.onclick =
    sendOtp;

  resendBtn.onclick =
    sendOtp;

  verifyBtn.onclick =
    async () => {
      const otp =
        otpInput.value.trim();

      if (
        !/^\d{6}$/.test(otp)
      ) {
        return showToast(
          "Enter valid 6-digit OTP"
        );
      }

      try {
        verifyBtn.disabled =
          true;
        verifyBtn.textContent =
          "Verifying...";

        // Firebase verify
        const result =
          await window
            .confirmationResult
            .confirm(otp);

        const user =
          result.user;

        // backend session
        const res =
          await fetch(
            `${CONFIG.API_BASE}/v1/auth/firebase-login`,
            {
              method:
                "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              credentials:
                "include",
              body:
                JSON.stringify(
                  {
                    phone:
                      user.phoneNumber,
                  }
                ),
            }
          );

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data.message ||
              "Login failed"
          );
        }

        showToast(
          "Login successful"
        );

        setTimeout(
          () => {
            window.location.href =
              "/front/index.html";
          },
          700
        );
      } catch (err) {
        console.error(err);

        showToast(
          err?.message ||
            "OTP verification failed"
        );
      } finally {
        verifyBtn.disabled =
          false;
        verifyBtn.textContent =
          "Verify OTP";
      }
    };
}

/* ---------------- FORGOT MODAL ---------------- */
function initForgotModal() {
  const modal =
    document.getElementById(
      "forgotModal"
    );

  document.getElementById(
    "openForgotModal"
  ).onclick = () => {
    modal.classList.remove(
      "hidden"
    );
  };

  document.getElementById(
    "closeForgotModal"
  ).onclick = () => {
    modal.classList.add(
      "hidden"
    );
  };
}

/* ---------------- FORGOT PASSWORD ---------------- */
function initForgotPassword() {
  const btn =
    document.getElementById(
      "resetBtn"
    );

  btn.onclick =
    async () => {
      try {
        const email =
          document
            .getElementById(
              "forgotEmail"
            )
            .value
            .trim()
            .toLowerCase();

       if (!email) {
  return showToast(
    "Email required"
  );
}

if (!/^\S+@\S+\.\S+$/.test(email)) {
  return showToast(
    "Enter valid email"
  );
}

        btn.disabled = true;
        btn.textContent =
          "Sending...";

        await forgotPassword(
          email
        );

        showToast(
          "Reset link sent"
        );
      } catch (err) {
        showToast(
          err?.message ||
            "Failed to send reset link"
        );
      } finally {
        btn.disabled = false;
        btn.textContent =
          "Send Reset Link";
      }
    };
}

/* ---------------- INIT ---------------- */
document.addEventListener(
  "DOMContentLoaded",
  () => {
    if (
      !document.getElementById(
        "recaptcha-container"
      )
    ) {
      const div =
        document.createElement(
          "div"
        );

      div.id =
        "recaptcha-container";

      document.body.appendChild(
        div
      );
    }

    window.recaptchaVerifier =
      new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    initBackButton();
    initPasswordToggle();
    initLogin();
    initGoogleAuth();
    initOtpModal();
    initOtpAuth();
    initForgotModal();
    initForgotPassword();
  }
);
