import { checkPincode } from "../services/deliveryService.js";

const STORAGE_KEY = "gemora_pincode";

const ui = {};

let debounceTimer = null;
let lastVerifiedPincode = null;

export function renderDeliveryChecker() {
  return `
    <div
      class="
        border
        rounded-xl
        p-4
        bg-white
        space-y-4
      "
    >

      <h3
        class="
          text-[15px]
          font-medium
          text-black
        "
      >
        Delivery & Serviceability
      </h3>

      <!-- INPUT STATE -->
      <div id="deliveryInputSection">

        <div class="flex gap-2">

          <input
            id="deliveryPincode"
            type="text"
            inputmode="numeric"
            maxlength="6"
            autocomplete="postal-code"
            placeholder="Enter 6-digit PIN code"
            class="
              flex-1
              border
              rounded-lg
              px-4
              py-2.5
              text-sm
              outline-none
              focus:border-[#6B1A2A]
            "
          />

          <button
            id="checkDeliveryBtn"
             disabled
            class="
              px-5
              rounded-lg
              bg-black
              text-white
              text-sm
              font-medium
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Check
          </button>

        </div>

        <div
          id="deliveryResult"
          class="mt-3"
        ></div>

      </div>

      <!-- VERIFIED STATE -->
      <div
        id="deliveryVerified"
        class="
          hidden
          border
          border-[#6B1A2A]/10
          rounded-xl
          bg-[#F9F6F2]
          p-4
        "
      >

        <div class="flex justify-between items-start gap-4">

          <div class="flex gap-3">

            <div
              class="
                w-10
                h-10
                rounded-full
                bg-[#6B1A2A]/10
                text-[#6B1A2A]
                flex
                items-center
                justify-center
                shrink-0
              "
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z"
                />
                <circle
                  cx="12"
                  cy="11"
                  r="2.5"
                />
              </svg>

            </div>

            <div>

              <p class="font-medium text-black">
                Delivering to
              </p>

              <p
                id="deliveryLocation"
                class="text-sm text-black/60 mt-1"
              ></p>

              <p
                class="
                  text-xs
                  text-[#6B1A2A]
                  mt-2
                "
              >
                Usually delivered within 3–5 business days
              </p>

            </div>

          </div>

          <button
            id="changePincodeBtn"
            class="
              text-sm
              font-medium
              text-[#6B1A2A]
              hover:underline
            "
          >
            Change
          </button>

        </div>

      </div>

    </div>
  `;
}





export function initDeliveryChecker() {
  cacheElements();
  console.log(ui);

  if (
    !ui.input ||
    !ui.button ||
    !ui.result ||
    !ui.inputSection ||
    !ui.verifiedCard ||
    !ui.location
  ) {
    return;
  }

  debounceTimer = null;
  lastVerifiedPincode = null;

  setupAutofill();
  setupInputValidation();
  console.log("setupInputValidation");
  setupButton();
  setupChangeButton();
}



function cacheElements() {
  ui.inputSection = document.getElementById("deliveryInputSection");
  ui.verifiedCard = document.getElementById("deliveryVerified");
  ui.location = document.getElementById("deliveryLocation");
  ui.changeButton = document.getElementById("changePincodeBtn");

  ui.input = document.getElementById("deliveryPincode");
  ui.button = document.getElementById("checkDeliveryBtn");
  ui.result = document.getElementById("deliveryResult");
}





function setupInputValidation() {
  ui.input.addEventListener("keydown", (e) => {
    const allowed = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Home",
      "End",
      "Enter",
    ];

    if (allowed.includes(e.key)) {
      if (e.key === "Enter") {
        clearTimeout(debounceTimer);
        verifyPincode(ui.input.value.trim());
      }
      return;
    }

    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  });

  ui.input.addEventListener("input", (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    ui.input.value = value;

    clearTimeout(debounceTimer);

    ui.button.disabled = value.length !== 6;

    console.log(value.length);       // <-- add
    console.log(ui.button.disabled); // <-- add

    if (value.length === 0) {
      ui.result.innerHTML = "";
      lastVerifiedPincode = null;
      return;
    }

    if (value.length < 6) {
      showInputHint();
      return;
    }

    debounceTimer = setTimeout(() => {
      verifyPincode(value);
    }, 500);
  });
}


function setupButton() {
  ui.button.addEventListener("click", () => {
    clearTimeout(debounceTimer);

    verifyPincode(ui.input.value.trim());
  });
}



function setupChangeButton() {
  ui.changeButton?.addEventListener("click", () => {
    ui.verifiedCard.classList.add("hidden");

    ui.inputSection.classList.remove("hidden");

    ui.result.innerHTML = "";

    ui.input.focus();
    ui.input.select();

    lastVerifiedPincode = null;
  });
}



function isValidPincode(pincode) {
  return /^[1-9]\d{5}$/.test(pincode);
}
function savePincode(pincode) {
  localStorage.setItem(STORAGE_KEY, pincode);
}



function getSavedPincode() {
  return localStorage.getItem(STORAGE_KEY);
}
function clearSavedPincode() {
  localStorage.removeItem(STORAGE_KEY);
}



async function verifyPincode(pin) {
  if (pin === lastVerifiedPincode) return;

  if (!isValidPincode(pin)) {
    showError("Invalid PIN code");
    return;
  }

  lastVerifiedPincode = pin;

  ui.button.disabled = true;

  showLoading();

  try {
    const res = await checkPincode(pin);

     console.log("res =", res);
  console.log("res.data =", res.data);

    savePincode(pin);

    showVerifiedCard(res);
  } catch (err) {
    lastVerifiedPincode = null;

    clearSavedPincode();

    showError(
       err.response?.data?.message ??
    err.message ??
    "Unable to verify pincode"
    );
  } finally {
    ui.button.disabled = false;
  }
}

function setupAutofill() {
  const saved = getSavedPincode();

  if (!saved || !isValidPincode(saved)) {
    clearSavedPincode();
    return;
  }

  ui.input.value = saved;

  ui.button.disabled = false;

  verifyPincode(saved);
}







function showLoading() {
  ui.result.innerHTML = `
    <div class="flex items-center gap-3">

      <svg
        class="w-5 h-5 animate-spin text-[#6B1A2A]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="3"
          class="opacity-20"
        />

        <path
          fill="currentColor"
          d="M22 12a10 10 0 00-10-10v3a7 7 0 017 7h3z"
        />
      </svg>

      <span class="text-sm text-black/60">
        Checking delivery availability...
      </span>

    </div>
  `;
}


function showInputHint() {
  ui.result.innerHTML = `
    <span class="text-sm text-black/50">
      Enter a valid 6-digit PIN code
    </span>
  `;
}


function showError(message) {
  ui.verifiedCard.classList.add("hidden");
  ui.inputSection.classList.remove("hidden");

  ui.result.innerHTML = `
    <div class="flex items-start gap-3">

      <div
        class="
          flex
          items-center
          justify-center
          w-9
          h-9
          rounded-full
          bg-red-50
          text-red-600
          shrink-0
        "
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v4m0 4h.01M10.29 3.86l-8 14A1 1 0 003.17 19h17.66a1 1 0 00.88-1.5l-8-14a1 1 0 00-1.76 0z"
          />
        </svg>

      </div>

      <div>

        <p class="text-sm font-medium text-red-600">
          ${message}
        </p>

        <p class="text-xs text-black/50 mt-1">
          Please check the PIN code and try again.
        </p>

      </div>

    </div>
  `;
}


function showVerifiedCard(data) {
  console.log("showVerifiedCard received:", data);

  ui.location.textContent =
    `${data.postOffice}, ${data.district}, ${data.state}`;

  ui.result.innerHTML = "";

  ui.inputSection.classList.add("hidden");
  ui.verifiedCard.classList.remove("hidden");
}































// export function initDeliveryChecker() {
//   const inputSection = document.getElementById("deliveryInputSection");
// const verifiedCard = document.getElementById("deliveryVerified");
// const location = document.getElementById("deliveryLocation");
// const changeBtn = document.getElementById("changePincodeBtn");
//   const input = document.getElementById("deliveryPincode");
//   const button = document.getElementById("checkDeliveryBtn");
//   const result = document.getElementById("deliveryResult");

//   if (!input || !button || !result) return;

//   const STORAGE_KEY = "gemora_pincode";

//   let debounceTimer = null;
//   let lastVerifiedPincode = null;

//   // -------------------------
//   // Autofill
//   // -------------------------

//   const saved = localStorage.getItem(STORAGE_KEY);

// if (saved && /^[1-9][0-9]{5}$/.test(saved)) {
//   input.value = saved;
//   button.disabled = false;
//   verify(saved);
// }

//   // -------------------------
//   // Only numbers
//   // -------------------------

// input.addEventListener("input", (e) => {
//   let value = e.target.value.replace(/\D/g, "");

//   if (value.length > 6) {
//     value = value.slice(0, 6);
//   }

//   input.value = value;

//   clearTimeout(debounceTimer);

//   button.disabled = value.length !== 6;

//   if (value.length === 0) {
//     result.innerHTML = "";
//     lastVerifiedPincode = null;
//     return;
//   }

//   if (value.length < 6) {
//     result.innerHTML = `
//       <span class="text-black/50">
//         Enter a valid 6-digit PIN code
//       </span>
//     `;
//     return;
//   }

//   debounceTimer = setTimeout(() => {
//     verify(value);
//   }, 500);
// });

//   // -------------------------
//   // Enter Key
//   // -------------------------

//   input.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//       clearTimeout(debounceTimer);
//       verify(input.value.trim());
//     }
//   });

//   // -------------------------
//   // Button
//   // -------------------------

//   button.addEventListener("click", () => {
//     clearTimeout(debounceTimer);
//     verify(input.value.trim());
//   });


//   changeBtn?.addEventListener("click", () => {
//   verifiedCard.classList.add("hidden");
//   inputSection.classList.remove("hidden");

//   result.innerHTML = "";

//   input.focus();
//   input.select();

//   lastVerifiedPincode = null;
// });




//   // -------------------------
//   // Verify
//   // -------------------------

//  async function verify(pincode) {
//   if (pincode === lastVerifiedPincode) return;

//   if (!/^[1-9][0-9]{5}$/.test(pincode)) {
//     result.innerHTML = `
//       <p class="text-sm text-red-600">
//         Invalid PIN code
//       </p>
//     `;
//     return;
//   }

//   lastVerifiedPincode = pincode;

//   button.disabled = true;

//   // Loading
//  result.innerHTML = `
// <div class="flex items-center gap-3">

//   <svg
//     class="w-5 h-5 animate-spin text-[#6B1A2A]"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//   >
//     <circle
//       cx="12"
//       cy="12"
//       r="10"
//       stroke="currentColor"
//       stroke-width="3"
//       class="opacity-20"
//     />

//     <path
//       fill="currentColor"
//       d="M22 12a10 10 0 00-10-10v3a7 7 0 017 7h3z"
//     />
//   </svg>

//   <span class="text-sm text-black/60">
//     Checking delivery availability...
//   </span>

// </div>
// `;

//   try {
//     const res = await checkPincode(pincode);

//     localStorage.setItem(STORAGE_KEY, pincode);

//     location.textContent = `${res.data.district}, ${res.data.state}`;

// result.innerHTML = "";

// inputSection.classList.add("hidden");

// verifiedCard.classList.remove("hidden");

// //     // Success
// //    result.innerHTML = `
// // <div class="flex items-start gap-3">

// //   <div
// //     class="
// //       flex
// //       items-center
// //       justify-center
// //       w-9
// //       h-9
// //       rounded-full
// //       bg-[#6B1A2A]/10
// //       text-[#6B1A2A]
// //       shrink-0
// //     "
// //   >

// //     <svg
// //       xmlns="http://www.w3.org/2000/svg"
// //       class="w-5 h-5"
// //       fill="none"
// //       viewBox="0 0 24 24"
// //       stroke="currentColor"
// //       stroke-width="1.8"
// //     >
// //       <path
// //         stroke-linecap="round"
// //         stroke-linejoin="round"
// //         d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z"
// //       />

// //       <circle
// //         cx="12"
// //         cy="11"
// //         r="2.5"
// //       />
// //     </svg>

// //   </div>

// //   <div class="flex-1">

// //     <p class="text-sm font-medium text-black">
// //       Delivering to
// //     </p>

// //     <p class="text-sm text-black/60 mt-0.5">
// //       ${res.data.district}, ${res.data.state}
// //     </p>

// //     <p class="text-xs text-[#6B1A2A] mt-2">
// //       Usually delivered within 3–5 business days
// //     </p>

// //   </div>

// // </div>
// // `;
//   } catch (err) {
//   lastVerifiedPincode = null;

//   localStorage.removeItem(STORAGE_KEY);

//   verifiedCard.classList.add("hidden");
//   inputSection.classList.remove("hidden");

//   result.innerHTML = `
//     <div class="flex items-start gap-3">

//       <div
//         class="
//           flex
//           items-center
//           justify-center
//           w-9
//           h-9
//           rounded-full
//           bg-red-50
//           text-red-600
//           shrink-0
//         "
//       >

//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           class="w-5 h-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           stroke-width="2"
//         >
//           <path
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             d="M12 9v4m0 4h.01M10.29 3.86l-8 14A1 1 0 003.17 19h17.66a1 1 0 00.88-1.5l-8-14a1 1 0 00-1.76 0z"
//           />
//         </svg>

//       </div>

//       <div>

//         <p class="text-sm font-medium text-red-600">
//           ${
//             err.response?.data?.message ??
//             "Unable to verify pincode"
//           }
//         </p>

//         <p class="text-xs text-black/50 mt-1">
//           Please check the PIN code and try again.
//         </p>

//       </div>

//     </div>
//   `;

//   } finally {
//     button.disabled = false;
//   }
// }
// }
