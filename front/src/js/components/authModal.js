import { CONFIG } from "../config.js";
import { showToast } from "../components/toast.js";
import {
  requestOtp,
  verifyOtp,
  login,
  register,
  verifyEmailOtp,
  forgotPassword,
} from "../services/authService.js";

let modal = null;
let isInitialized = false;

/* ---------------- INIT ---------------- */

async function initModal() {
  if (isInitialized) return;

  try {
    const res = await fetch(
      "/front/src/htmlComponents/authModal.html"
    );

    if (!res.ok) {
      throw new Error(
        `Auth modal failed to load: ${res.status}`
      );
    }

    const html = await res.text();
    document.body.insertAdjacentHTML(
      "beforeend",
      html
    );

    modal =
      document.getElementById("authModal");

    const closeBtn =
      document.getElementById(
        "closeModal"
      );

    if (!modal)
      throw new Error(
        "authModal not found"
      );

    /* close */
    closeBtn?.addEventListener(
      "click",
      closeAuthModal
    );

    modal.addEventListener(
      "click",
      (e) => {
        if (e.target === modal)
          closeAuthModal();
      }
    );

    /* google */
    document
      .getElementById("google-btn")
      ?.addEventListener(
        "click",
        () => {
          window.location.href = `${CONFIG.API_BASE}/v1/auth/google`;
        }
      );

    initTabs();
    initOtpAuth();
    initLoginAuth();
    initRegisterAuth();
    initEmailOtpVerify();
    initForgotPassword();
    

    isInitialized = true;
  } catch (err) {
    console.error(
      "[AuthModal]",
      err
    );
  }
}

/* ---------------- TABS ---------------- */

function initTabs() {
  document
    .getElementById("otpTab")
    ?.addEventListener(
      "click",
      () => switchTab("otp")
    );

  document
    .getElementById("loginTab")
    ?.addEventListener(
      "click",
      () => switchTab("login")
    );

  document
    .getElementById("registerTab")
    ?.addEventListener(
      "click",
      () => switchTab("register")
    );

  document
    .getElementById(
      "forgotPasswordBtn"
    )
    ?.addEventListener(
      "click",
      showForgotForm
    );

  document
    .getElementById(
      "backToLoginBtn"
    )
    ?.addEventListener(
      "click",
      backToLogin
    );
}

function switchTab(tab) {
  const forms = {
    otp: "otpForm",
    login: "loginForm",
    register: "registerForm",
  };

  const tabs = {
    otp: "otpTab",
    login: "loginTab",
    register: "registerTab",
  };

  /* hide forgot form */
  document
    .getElementById("forgotForm")
    ?.classList.add("hidden");

  /* hide all */
  Object.values(forms).forEach(
    (id) =>
      document
        .getElementById(id)
        ?.classList.add("hidden")
  );

  /* reset tab style */
  Object.values(tabs).forEach(
    (id) => {
      const btn =
        document.getElementById(
          id
        );

      btn?.classList.remove(
        "bg-white",
        "shadow-sm",
        "text-[#6B1A2A]"
      );
    }
  );

  /* show selected */
  document
    .getElementById(
      forms[tab]
    )
    ?.classList.remove("hidden");

  document
    .getElementById(
      tabs[tab]
    )
    ?.classList.add(
      "bg-white",
      "shadow-sm",
      "text-[#6B1A2A]"
    );
}

function showForgotForm() {
  document
    .getElementById("loginForm")
    ?.classList.add("hidden");

  document
    .getElementById("forgotForm")
    ?.classList.remove("hidden");
}

function backToLogin() {
  document
    .getElementById("forgotForm")
    ?.classList.add("hidden");

  document
    .getElementById("loginForm")
    ?.classList.remove("hidden");
}

/* ---------------- OTP ---------------- */

function initOtpAuth() {
  const phoneInput =
    document.getElementById(
      "phoneInput"
    );

  const otpInput =
    document.getElementById(
      "otpInput"
    );

  const otpSection =
    document.getElementById(
      "otpSection"
    );

  const requestOtpBtn =
    document.getElementById(
      "requestOtpBtn"
    );

  const verifyOtpBtn =
    document.getElementById(
      "verifyOtpBtn"
    );

  phoneInput?.addEventListener(
    "input",
    (e) => {
      e.target.value =
        e.target.value
          .replace(/\D/g, "")
          .slice(0, 10);
    }
  );

  otpInput?.addEventListener(
    "input",
    (e) => {
      e.target.value =
        e.target.value
          .replace(/\D/g, "")
          .slice(0, 6);
    }
  );

  requestOtpBtn.addEventListener("click",  async () => {

      try {
        const phone =
          phoneInput.value.trim();

        if (
          !/^[6-9]\d{9}$/.test(
            phone
          )
        ) {
          return showToast(
            "Enter valid mobile number"
          );
        }

        requestOtpBtn.disabled =
          true;
        requestOtpBtn.textContent =
          "Sending OTP...";

        await requestOtp(phone);

        otpSection.classList.remove(
          "hidden"
        );

        verifyOtpBtn.classList.remove(
          "hidden"
        );

        requestOtpBtn.classList.add(
          "hidden"
        );

        otpInput.focus();

        showToast("OTP sent");
      } catch (err) {
        showToast(
          err?.response?.data
            ?.message ||
            "Failed to send OTP"
        );
      } finally {
        requestOtpBtn.disabled =
          false;

        requestOtpBtn.textContent =
          "Request OTP";
      }
    }
)

  verifyOtpBtn.onclick =
    async () => {
      try {
        const phone =
          phoneInput.value.trim();

        const otp =
          otpInput.value.trim();

        if (
          !/^\d{6}$/.test(otp)
        ) {
          return showToast(
            "Enter valid OTP"
          );
        }

        verifyOtpBtn.disabled =
          true;

        verifyOtpBtn.textContent =
          "Verifying...";

        await verifyOtp(
          phone,
          otp
        );

        showToast(
          "Login successful"
        );

        closeAuthModal();
        window.location.reload();
      } catch (err) {
        showToast(
          err?.response?.data
            ?.message ||
            "Invalid OTP"
        );
      } finally {
        verifyOtpBtn.disabled =
          false;

        verifyOtpBtn.textContent =
          "Verify OTP";
      }
    };


}

/* ---------------- LOGIN ---------------- */

function initLoginAuth() {
  const loginBtn =
    document.getElementById(
      "loginBtn"
    );

  loginBtn.onclick =
    async () => {
      try {
        const email =
          document
            .getElementById(
              "loginEmail"
            )
            .value.trim();

        const password =
          document
            .getElementById(
              "loginPassword"
            )
            .value.trim();

        if (
          !email ||
          !password
        ) {
          return showToast(
            "Email and password required"
          );
        }

        loginBtn.disabled = true;
        loginBtn.textContent =
          "Logging in...";

        await login(
          email,
          password
        );

        showToast(
          "Login successful"
        );

        closeAuthModal();
        window.location.reload();
      } catch (err) {
        showToast(
          err?.response?.data
            ?.message ||
            "Login failed"
        );
      } finally {
        loginBtn.disabled = false;
        loginBtn.textContent =
          "Login";
      }
    };
}

/* ---------------- REGISTER ---------------- */

function initRegisterAuth() {
  const registerBtn =
    document.getElementById(
      "registerBtn"
    );

  registerBtn.onclick =
    async () => {
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
            .value.trim();

        const password =
          document
            .getElementById(
              "registerPassword"
            )
            .value.trim();

        const confirm =
          document
            .getElementById(
              "confirmPassword"
            )
            .value.trim();

        if (
          !name ||
          !email ||
          !password
        ) {
          return showToast(
            "All fields required"
          );
        }

        if (
          password !== confirm
        ) {
          return showToast(
            "Passwords do not match"
          );
        }

        registerBtn.disabled =
          true;

        registerBtn.textContent =
          "Creating...";

        await register(
          name,
          email,
          password
        );

        showToast(
          "Account created"
        );

        document
  .getElementById("registerForm")
  ?.classList.add("hidden");

document
  .getElementById("emailOtpForm")
  ?.classList.remove("hidden");

window.pendingVerifyEmail = email;

showToast("OTP sent to email");
      } catch (err) {
        showToast(
          err?.response?.data
            ?.message ||
            "Register failed"
        );
      } finally {
        registerBtn.disabled =
          false;

        registerBtn.textContent =
          "Create Account";
      }
    };
}


// view password while entering
function setupPasswordToggle(
  inputId,
  btnId
) {
  const input =
    document.getElementById(
      inputId
    );

  const btn =
    document.getElementById(
      btnId
    );

  if (!input || !btn) return;

  btn.addEventListener(
    "click",
    () => {
      input.type =
        input.type === "password"
          ? "text"
          : "password";
    }
  );
}


function initEmailOtpVerify() {
  const btn =
    document.getElementById(
      "verifyEmailOtpBtn"
    );

  const input =
    document.getElementById(
      "emailOtpInput"
    );

  btn?.addEventListener(
    "click",
    async () => {
      try {
        const otp =
          input.value.trim();

        if (!/^\d{6}$/.test(otp)) {
          return showToast(
            "Enter valid OTP"
          );
        }

        await verifyEmailOtp(
          window.pendingVerifyEmail,
          otp
        );

        showToast(
          "Email verified"
        );

        closeAuthModal();
        window.location.reload();
      } catch (err) {
        showToast(
          err?.response?.data
            ?.message ||
            "Verification failed"
        );
      }
    }
  );
}



/* ---------------- FORGOT ---------------- */

function initForgotPassword() {
  const resetBtn =
    document.getElementById(
      "resetBtn"
    );

  resetBtn.onclick =
    async () => {
      try {
        const email =
          document
            .getElementById(
              "forgotEmail"
            )
            .value.trim();

        if (!email) {
          return showToast(
            "Email required"
          );
        }

        resetBtn.disabled =
          true;

        resetBtn.textContent =
          "Sending...";

        await forgotPassword(
          email
        );

        showToast(
          "Reset link sent"
        );
      } catch (err) {
        showToast(
          err?.response?.data
            ?.message ||
            "Failed"
        );
      } finally {
        resetBtn.disabled =
          false;

        resetBtn.textContent =
          "Send Reset Link";
      }
    };
}

/* ---------------- PUBLIC ---------------- */

export async function openAuthModal() {
  await initModal();

  modal?.classList.remove(
    "hidden"
  );

  modal?.classList.add("flex");

  switchTab("otp");
}

function closeAuthModal() {
  modal?.classList.add(
    "hidden"
  );

  modal?.classList.remove(
    "flex"
  );
}
