import { CONFIG } from "../config.js";
import { showToast } from "../components/toast.js";
 
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../core/firebaseOtp.js";

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
      document.getElementById(
        "authModal"
      );

    if (!modal) {
      throw new Error(
        "authModal not found"
      );
    }




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


if (
  !window.recaptchaVerifier
) {
  window.recaptchaVerifier =
    new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
}


    /* close */
    document
      .getElementById(
        "closeModal"
      )
      ?.addEventListener(
        "click",
        closeAuthModal
      );

    modal.addEventListener(
      "click",
      (e) => {
        if (e.target === modal) {
          closeAuthModal();
        }
      }
    );

    /* google */
    document
      .getElementById(
        "google-btn"
      )
      ?.addEventListener(
        "click",
        () => {
          window.location.href =
            `${CONFIG.API_BASE}/v1/auth/google`;
        }
      );

    /* auth pages */
    document
      .getElementById(
        "goToLoginBtn"
      )
      ?.addEventListener(
        "click",
        () => {
          window.location.href =
            "/front/pages/login.html";
        }
      );

    document
      .getElementById(
        "goToRegisterBtn"
      )
      ?.addEventListener(
        "click",
        () => {
          window.location.href =
            "/front/pages/register.html";
        }
      );

    initOtpAuth();

    isInitialized = true;
  } catch (err) {
    console.error(
      "[AuthModal]",
      err
    );
  }
}

/* ---------------- OTP AUTH ---------------- */

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

  /* request OTP */
  requestOtpBtn?.addEventListener(
    "click",
    async () => {
      try {
       const phone =
  phoneInput?.value
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





        requestOtpBtn.disabled =
          true;
        requestOtpBtn.textContent =
          "Sending OTP...";

       const confirmationResult =
  await signInWithPhoneNumber(
    auth,
    `+91${phone}`,
    window.recaptchaVerifier
  );

window.confirmationResult =
  confirmationResult;

        otpSection?.classList.remove(
          "hidden"
        );

        verifyOtpBtn?.classList.remove(
          "hidden"
        );

        requestOtpBtn.classList.add(
          "hidden"
        );

        otpInput?.focus();

        showToast(
          "OTP sent"
        );
      } catch (err) {
        showToast(
          err?.message ||
            "Failed to send OTP"
        );
      } finally {
        requestOtpBtn.disabled =
          false;
        requestOtpBtn.textContent =
          "Request OTP";
      }
    }
  );



  /* verify OTP */
 verifyOtpBtn?.addEventListener(
  "click",
  async () => {
    try {
      const otp =
        otpInput?.value.trim();

      if (
        !/^\d{6}$/.test(
          otp
        )
      ) {
        return showToast(
          "Enter valid OTP"
        );
      }

      verifyOtpBtn.disabled =
        true;
      verifyOtpBtn.textContent =
        "Verifying...";

      // verify via Firebase
      const result =
        await window
          .confirmationResult
          .confirm(otp);

      const user =
        result.user;

      // create backend session
      const res =
        await fetch(
          `${CONFIG.API_BASE}/v1/auth/firebase-login`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            credentials:
              "include",
            body: JSON.stringify({
              phone:
                user.phoneNumber,
            }),
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

      closeAuthModal();
      window.location.reload();
    } catch (err) {
      console.error(
        err
      );

      showToast(
        err?.message ||
          "Invalid OTP"
      );
    } finally {
      verifyOtpBtn.disabled =
        false;
      verifyOtpBtn.textContent =
        "Verify OTP";
    }
  }
);
}

/* ---------------- PUBLIC ---------------- */

export async function openAuthModal() {
  await initModal();

  modal?.classList.remove(
    "hidden"
  );

  modal?.classList.add(
    "flex"
  );

  document.body.style.overflow =
    "hidden";
}

function closeAuthModal() {
  modal?.classList.add(
    "hidden"
  );

  modal?.classList.remove(
    "flex"
  );

  document.body.style.overflow =
    "";
}






