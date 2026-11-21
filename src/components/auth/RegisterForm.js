"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  AuthBackdrop,
  GoogleButton,
  PasswordInput,
  authInputClass,
} from "./AuthFields";
import { BackToStoreButton } from "./LoginForm";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/context/ToastContext";
import { onlyDigits } from "@/hooks/usePhoneOtp";
import { register, verifyEmailOtp } from "@/lib/services/authService";

const primaryButtonClass =
  "w-full bg-[#6B1A2A] text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60";

// Returns an error message, or null when the form is valid.
function validate({ name, email, password, confirmPassword }) {
  if (!name || !email || !password || !confirmPassword)
    return "All fields required";
  if (!/^[A-Za-z\s]+$/.test(name)) return "Name must contain letters only";
  if (name.length < 2) return "Name too short";
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter valid email";
  if (password !== confirmPassword) return "Passwords do not match";
  if (password.length < 6) return "Min 6 characters required";
  return null;
}

export default function RegisterForm() {
  const router = useRouter();
  const showToast = useToast();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [pendingEmail, setPendingEmail] = useState(null);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);

  function set(key) {
    return (e) =>
      setValues((current) => ({ ...current, [key]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const normalized = {
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password.trim(),
      confirmPassword: values.confirmPassword.trim(),
    };

    const error = validate(normalized);

    if (error) {
      showToast(error);
      return;
    }

    try {
      setSubmitting(true);
      await register(normalized.name, normalized.email, normalized.password);
      setPendingEmail(normalized.email);
      showToast("OTP sent to email");
    } catch (err) {
      showToast(err?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerify() {
    if (!otp) {
      showToast("OTP required");
      return;
    }

    try {
      setVerifying(true);
      await verifyEmailOtp(pendingEmail, otp);
      showToast("Email verified");
      router.push("/login");
    } catch (err) {
      showToast(err?.message || "Verification failed");
      setVerifying(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F6F2] overflow-hidden relative">
      <AuthBackdrop />

      <main className="relative z-10 min-h-[90vh] flex items-center justify-center px-6 m-4">
        <div className="w-full max-w-[430px] bg-white/85 backdrop-blur-xl border border-black/5 shadow-[0_20px_80px_rgba(0,0,0,0.08)] rounded-[32px] px-8 py-8">
          <BackToStoreButton />

          <img
            src="/assets/icon/logo.png"
            alt="Gemora"
            className="w-[110px] mx-auto"
          />

          <h1 className="text-[1.5rem] font-semibold text-center text-[#1A1A1A]">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-black/55 text-center mb-4">
            Join Gemora and start shopping.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              required
              minLength={2}
              maxLength={50}
              value={values.name}
              onChange={set("name")}
              placeholder="Full name"
              aria-label="Full name"
              className={authInputClass}
            />

            <input
              type="email"
              required
              autoComplete="email"
              value={values.email}
              onChange={set("email")}
              placeholder="Email address"
              aria-label="Email address"
              className={authInputClass}
            />

            <PasswordInput
              required
              minLength={6}
              autoComplete="new-password"
              value={values.password}
              onChange={set("password")}
              placeholder="Password"
              aria-label="Password"
            />

            <PasswordInput
              required
              minLength={6}
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={set("confirmPassword")}
              placeholder="Confirm password"
              aria-label="Confirm password"
            />

            <button
              type="submit"
              disabled={submitting}
              className={primaryButtonClass}
            >
              {submitting ? "Creating..." : "Create Account"}
            </button>
          </form>

          <GoogleButton className="mt-5" />

          <p className="text-sm text-center mt-6 text-gray-500">
            Already have an account?
            <Link
              href="/login"
              className="text-[#6B1A2A] font-medium hover:underline ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </main>

      <Modal
        open={Boolean(pendingEmail)}
        onClose={() => setPendingEmail(null)}
        labelledBy="verifyEmailTitle"
        panelClassName="bg-white rounded-3xl p-7 w-full max-w-[390px] shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
      >
        <h2
          id="verifyEmailTitle"
          className="text-xl font-semibold text-[#111] mb-1"
        >
          Verify Email
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Enter the 6-digit code we sent to your email.
        </p>

        <input
          type="tel"
          inputMode="numeric"
          value={otp}
          onChange={(e) => setOtp(onlyDigits(e.target.value, 6))}
          placeholder="Enter OTP"
          aria-label="6-digit verification code"
          className={`${authInputClass} mb-4`}
        />

        <button
          type="button"
          disabled={verifying}
          onClick={handleVerify}
          className={primaryButtonClass}
        >
          {verifying ? "Verifying..." : "Verify Email"}
        </button>

        <button
          type="button"
          onClick={() => setPendingEmail(null)}
          className="mt-5 w-full text-sm text-gray-500 hover:text-[#6B1A2A] transition"
        >
          Back
        </button>
      </Modal>
    </div>
  );
}
