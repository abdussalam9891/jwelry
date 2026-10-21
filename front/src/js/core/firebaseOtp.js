import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_CdN5iHskDweVhljzu3PiclPAc7d8VZU",
  authDomain: "gemora-b2009.firebaseapp.com",
  projectId: "gemora-b2009",
  storageBucket:
    "gemora-b2009.firebasestorage.app",
  messagingSenderId: "29987749786",
  appId:
    "1:29987749786:web:ceff2b64a1f9e136050423",
};

const app = initializeApp(
  firebaseConfig
);

export const auth =
  getAuth(app);

export {
  RecaptchaVerifier,
  signInWithPhoneNumber,
};
