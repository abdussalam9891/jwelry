"use client";

import { useEffect, useRef, useState } from "react";

import { firebaseLogin } from "@/lib/services/authService";

const RESEND_SECONDS = 60;

export const onlyDigits = (value, max) =>
  value.replace(/\D/g, "").slice(0, max);

// Phone + SMS OTP sign-in via Firebase, finished by creating a backend
// session. Render <div ref={recaptchaRef} /> somewhere in the component.
export function usePhoneOtp({ showToast, onSuccess }) {
  const recaptchaRef = useRef(null);
  const confirmationRef = useRef(null);

  const [phone, setPhoneValue] = useState("");
  const [otp, setOtpValue] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  async function sendOtp() {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      showToast("Enter valid mobile number");
      return;
    }

    try {
      setSending(true);

      // Firebase is only needed once someone actually asks for an OTP.
      const { sendPhoneOtp } = await import("@/lib/firebase");

      confirmationRef.current = await sendPhoneOtp(phone, recaptchaRef.current);

      setOtpSent(true);
      setSecondsLeft(RESEND_SECONDS);
      showToast("OTP sent");
    } catch (err) {
      console.error(err);
      showToast(err?.message || "Failed to send OTP");
    } finally {
      setSending(false);
    }
  }

  async function verifyOtp() {
    if (!/^\d{6}$/.test(otp)) {
      showToast("Enter valid 6-digit OTP");
      return;
    }

    try {
      setVerifying(true);

      const result = await confirmationRef.current.confirm(otp);

      await firebaseLogin(result.user.phoneNumber);

      showToast("Login successful");
      await onSuccess?.();
    } catch (err) {
      console.error(err);
      showToast(err?.message || "Invalid OTP");
    } finally {
      setVerifying(false);
    }
  }

  return {
    recaptchaRef,
    phone,
    setPhone: (value) => setPhoneValue(onlyDigits(value, 10)),
    otp,
    setOtp: (value) => setOtpValue(onlyDigits(value, 6)),
    otpSent,
    sending,
    verifying,
    secondsLeft,
    sendOtp,
    verifyOtp,
  };
}
