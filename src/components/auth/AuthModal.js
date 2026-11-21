"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Modal from "@/components/ui/Modal";
import { GoogleButton, authInputClass } from "./AuthFields";
import { REDIRECT_AFTER_LOGIN_KEY, useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { usePhoneOtp } from "@/hooks/usePhoneOtp";

export default function AuthModal({ open, onClose }) {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const showToast = useToast();

  const otp = usePhoneOtp({
    showToast,
    onSuccess: async () => {
      await refreshUser();
      onClose();

      const redirect = sessionStorage.getItem(REDIRECT_AFTER_LOGIN_KEY);

      if (redirect) {
        sessionStorage.removeItem(REDIRECT_AFTER_LOGIN_KEY);
        router.push(redirect);
      }
    },
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="authModalTitle"
      className="items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      panelClassName="w-full max-w-[420px] bg-white rounded-3xl p-8 relative shadow-xl"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100"
      >
        ✕
      </button>

      <img
        src="/assets/icon/logo.png"
        alt="Gemora"
        className="w-[100px] mx-auto mb-6"
      />

      <h2
        id="authModalTitle"
        className="text-xl font-semibold text-center text-[#6B1A2A]"
      >
        Welcome to Gemora
      </h2>

      <p className="text-sm text-gray-500 text-center mt-2 mb-6">
        Continue your shopping journey
      </p>

      <GoogleButton className="mb-4" />

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
          placeholder="Enter OTP"
          aria-label="6-digit OTP"
          className={`${authInputClass} mb-4`}
        />
      )}

      {otp.otpSent ? (
        <button
          type="button"
          onClick={otp.verifyOtp}
          disabled={otp.verifying}
          className="w-full bg-[#6B1A2A] text-white py-3 rounded-xl disabled:opacity-60"
        >
          {otp.verifying ? "Verifying..." : "Verify OTP"}
        </button>
      ) : (
        <button
          type="button"
          onClick={otp.sendOtp}
          disabled={otp.sending}
          className="w-full bg-[#6B1A2A] text-white py-3 rounded-xl disabled:opacity-60"
        >
          {otp.sending ? "Sending OTP..." : "Request OTP"}
        </button>
      )}

      <div ref={otp.recaptchaRef} />

      <div className="flex items-center gap-3 my-5">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="mt-5 text-center">
        <Link
          href="/login"
          onClick={onClose}
          className="text-sm font-medium text-[#6B1A2A] hover:underline"
        >
          Sign In
        </Link>

        <span className="mx-2 text-gray-300">•</span>

        <Link
          href="/register"
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-[#6B1A2A] transition"
        >
          Create account
        </Link>
      </div>
    </Modal>
  );
}
