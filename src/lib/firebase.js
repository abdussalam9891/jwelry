import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_CdN5iHskDweVhljzu3PiclPAc7d8VZU",
  authDomain: "gemora-b2009.firebaseapp.com",
  projectId: "gemora-b2009",
  storageBucket: "gemora-b2009.firebasestorage.app",
  messagingSenderId: "29987749786",
  appId: "1:29987749786:web:ceff2b64a1f9e136050423",
};

const app = getApps()[0] || initializeApp(firebaseConfig);

export const auth = getAuth(app);

let verifier = null;
let verifierContainer = null;

// One invisible reCAPTCHA per container element. The auth modal and the
// login page each render their own container, so rebuild the verifier when
// the container changes instead of reusing one bound to a detached node.
function getRecaptchaVerifier(container) {
  if (verifier && verifierContainer === container) {
    return verifier;
  }

  verifier?.clear();
  verifier = new RecaptchaVerifier(auth, container, { size: "invisible" });
  verifierContainer = container;

  return verifier;
}

// Sends an SMS OTP to an Indian mobile number and resolves with the
// confirmation object whose confirm(otp) completes the sign-in.
export function sendPhoneOtp(phone, container) {
  return signInWithPhoneNumber(
    auth,
    `+91${phone}`,
    getRecaptchaVerifier(container),
  );
}
