import { CONFIG } from "../config.js";
import api from "../core/api.js";
import { showToast } from "../components/toast.js";

let modal = null;
let isInitialized = false;

// ─── Init (lazy — sirf tab load hoga jab pehli baar chahiye) ─

async function initModal() {
  if (isInitialized) return;

  try {
    const res = await fetch("/front/src/htmlComponents/authModal.html");
    if (!res.ok) throw new Error(`Auth modal failed to load: ${res.status}`);

    const html = await res.text();
    document.body.insertAdjacentHTML("beforeend", html);

    modal = document.getElementById("authModal");
    const closeBtn = document.getElementById("closeModal");

    if (!modal) throw new Error("authModal element not found in HTML");

    // Close button
    closeBtn?.addEventListener("click", closeAuthModal);

    // Click outside to close
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeAuthModal();
    });

    // Google login
    document.getElementById("google-btn")?.addEventListener("click", () => {
      window.location.href = `${CONFIG.API_BASE}/v1/auth/google`;
    });

    initOtpAuth();

    isInitialized = true;
  } catch (err) {
    console.error("[AuthModal]", err);
  }
}



function initOtpAuth() {
  const phoneInput =
    document.getElementById("phoneInput");

  const otpInput =
    document.getElementById("otpInput");

  const otpSection =
    document.getElementById("otpSection");

  const requestOtpBtn =
    document.getElementById("requestOtpBtn");

  const verifyOtpBtn =
    document.getElementById("verifyOtpBtn");

    // PHONE: allow only numbers, max 10
phoneInput?.addEventListener(
  "input",
  (e) => {
    e.target.value =
      e.target.value
        .replace(/\D/g, "")
        .slice(0, 10);
  }
);

// OTP: allow only numbers, max 6
otpInput?.addEventListener(
  "input",
  (e) => {
    e.target.value =
      e.target.value
        .replace(/\D/g, "")
        .slice(0, 6);
  }
);

  if (
    !phoneInput ||
    !requestOtpBtn ||
    !verifyOtpBtn
  )
    return;

  // REQUEST OTP
  requestOtpBtn.onclick =
    async () => {
      try {
        const phone =
          phoneInput.value.trim();


       if (!/^[6-9]\d{9}$/.test(phone)) {
  return showToast(
    "Enter valid 10-digit mobile number"
  );
}

        requestOtpBtn.disabled = true;
        requestOtpBtn.textContent =
          "Sending OTP...";

        await api.post(
          "/v1/auth/request-otp",
          { phone }
        );

        otpSection.classList.remove(
          "hidden"
        );

        requestOtpBtn.classList.add(
          "hidden"
        );

        otpInput.focus();

        showToast("OTP sent");
      } catch (err) {
        console.error(err);

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
    };

  // VERIFY OTP
  verifyOtpBtn.onclick =
    async () => {
      try {
        const phone =
          phoneInput.value.trim();

        const otp =
          otpInput.value.trim();

      if (!/^\d{6}$/.test(otp)) {
  return showToast(
    "Enter valid OTP"
  );
}

        verifyOtpBtn.disabled =
          true;

        verifyOtpBtn.textContent =
          "Verifying...";

        await api.post(
          "/v1/auth/verify-otp",
          {
            phone,
            otp,
          }
        );

        showToast(
          "Login successful"
        );

        closeAuthModal();

        window.location.reload();
      } catch (err) {
        console.error(err);

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

// ─── Public API ──────────────────────────────────────────────

export async function openAuthModal() {
  await initModal(); // pehli baar fetch karega, baad mein skip
  modal?.classList.remove("hidden");
  modal?.classList.add("flex");
}

function closeAuthModal() {
  modal?.classList.add("hidden");
  modal?.classList.remove("flex");
}
