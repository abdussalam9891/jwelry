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
import Modal from "@/components/ui/Modal";
import { REDIRECT_AFTER_LOGIN_KEY, useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { usePhoneOtp } from "@/hooks/usePhoneOtp";
import { forgotPassword, login } from "@/lib/services/authService";

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const modalPanelClass =
  "bg-white rounded-3xl p-7 w-full max-w-[390px] shadow-[0_20px_60px_rgba(0,0,0,0.12)]";

const primaryButtonClass =
  "w-full bg-[#6B1A2A] text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60";

const closeButtonClass =
  "mt-5 w-full text-sm text-gray-500 hover:text-[#6B1A2A] transition";

function formatCountdown(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export function BackToStoreButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-[#fdf6f7] hover:text-[#7a1c2e] hover:border-[#7a1c2e] transition-all duration-200 mb-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>Back to Store</span>
    </button>
  );
}

function OtpLoginModal({ open, onClose, onSuccess }) {
  const showToast = useToast();
  const otp = usePhoneOtp({ showToast, onSuccess });

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="otpLoginTitle"
      className="items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      panelClassName={modalPanelClass}
    >
      <h2 id="otpLoginTitle" className="text-xl font-semibold text-[#111] mb-1">
        Quick Login
      </h2>
      <p className="text-sm text-gray-500 mb-5">Sign in with OTP</p>

      <input
        type="tel"
        value={otp.phone}
        onChange={(e) => otp.setPhone(e.target.value)}
        placeholder="Enter mobile number"
        aria-label="Mobile number"
        className={`${authInputClass} mb-4`}
      />

      {otp.otpSent && (
        <input
          type="tel"
          autoFocus
          value={otp.otp}
          onChange={(e) => otp.setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          aria-label="6-digit OTP"
          className={`${authInputClass} mb-4`}
        />
      )}

      {otp.otpSent ? (
        <button
          type="button"
          disabled={otp.verifying}
          onClick={otp.verifyOtp}
          className={primaryButtonClass}
        >
          {otp.verifying ? "Verifying..." : "Verify OTP"}
        </button>
      ) : (
        <button
          type="button"
          disabled={otp.sending}
          onClick={otp.sendOtp}
          className={primaryButtonClass}
        >
          {otp.sending ? "Sending..." : "Request OTP"}
        </button>
      )}

      {otp.otpSent && (
        <div className="text-center mt-4">
          {otp.secondsLeft > 0 ? (
            <p className="text-sm text-gray-500">
              Resend OTP in {formatCountdown(otp.secondsLeft)}
            </p>
          ) : (
            <button
              type="button"
              disabled={otp.sending}
              onClick={otp.sendOtp}
              className="text-sm text-[#6B1A2A] font-medium hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      )}

      <div ref={otp.recaptchaRef} />

      <button type="button" onClick={onClose} className={closeButtonClass}>
        Close
      </button>
    </Modal>
  );
}

function ForgotPasswordModal({ open, onClose }) {
  const showToast = useToast();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    const value = email.trim().toLowerCase();

    if (!value) {
      showToast("Email required");
      return;
    }

    if (!EMAIL_PATTERN.test(value)) {
      showToast("Enter valid email");
      return;
    }

    try {
      setSending(true);
      await forgotPassword(value);
      showToast("Reset link sent");
    } catch (err) {
      showToast(err?.message || "Failed to send reset link");
    } finally {
      setSending(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="forgotPasswordTitle"
      className="items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      panelClassName={modalPanelClass}
    >
      <h2
        id="forgotPasswordTitle"
        className="text-xl font-semibold text-[#111] mb-1"
      >
        Reset Password
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Enter your email and we’ll send a secure reset link.
      </p>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        aria-label="Email address"
        className={`${authInputClass} mb-4`}
      />

      <button
        type="button"
        disabled={sending}
        onClick={handleSend}
        className={primaryButtonClass}
      >
        {sending ? "Sending..." : "Send Reset Link"}
      </button>

      <button type="button" onClick={onClose} className={closeButtonClass}>
        Close
      </button>
    </Modal>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const showToast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  async function finishLogin() {
    await refreshUser();

    const redirect = sessionStorage.getItem(REDIRECT_AFTER_LOGIN_KEY);
    sessionStorage.removeItem(REDIRECT_AFTER_LOGIN_KEY);

    router.replace(redirect || "/");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!normalizedEmail || !trimmedPassword) {
      showToast("Email and password required");
      return;
    }

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      showToast("Enter valid email");
      return;
    }

    if (trimmedPassword.length < 6) {
      showToast("Password too short");
      return;
    }

    try {
      setSubmitting(true);
      await login(normalizedEmail, trimmedPassword);
      showToast("Login successful");
      await finishLogin();
    } catch (err) {
      showToast(err?.message || "Login failed");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F6F2] overflow-hidden relative">
      <AuthBackdrop />

      <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-[430px] bg-white/85 backdrop-blur-xl border border-black/5 shadow-[0_20px_80px_rgba(0,0,0,0.08)] rounded-[32px] px-8 py-10 relative">
          <BackToStoreButton />

          <img
            src="/assets/icon/logo.png"
            alt="Gemora"
            className="w-[110px] mx-auto"
          />

          <h1 className="text-[1.5rem] font-semibold text-center text-[#1A1A1A]">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-black/55 text-center mb-6">
            Sign in to continue to Gemora.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              autoComplete="email"
              className={authInputClass}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              aria-label="Password"
              autoComplete="current-password"
            />

            <button
              type="submit"
              disabled={submitting}
              className={primaryButtonClass}
            >
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex justify-between text-sm mt-4">
            <button
              type="button"
              onClick={() => setOtpOpen(true)}
              className="text-[#6B1A2A] hover:underline"
            >
              Quick Login (OTP)
            </button>
            <button
              type="button"
              onClick={() => setForgotOpen(true)}
              className="text-[#6B1A2A] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <GoogleButton className="mt-5" />

          <p className="text-sm text-center mt-6 text-gray-500">
            Don’t have an account?
            <Link
              href="/register"
              className="text-[#6B1A2A] font-medium hover:underline ml-1"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>

      <OtpLoginModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onSuccess={finishLogin}
      />
      <ForgotPasswordModal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
    </div>
  );
}
