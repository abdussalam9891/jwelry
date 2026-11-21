"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { PasswordInput } from "./AuthFields";
import { useToast } from "@/context/ToastContext";
import { resetPassword } from "@/lib/services/authService";

export default function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const showToast = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (token) return;

    showToast("Invalid reset link");
    const timer = setTimeout(() => router.replace("/login"), 1500);
    return () => clearTimeout(timer);
  }, [token, router, showToast]);

  async function handleSubmit(e) {
    e.preventDefault();

    const next = password.trim();

    if (!next || !confirmPassword.trim()) {
      showToast("All fields required");
      return;
    }

    if (next.length < 6) {
      showToast("Password must be at least 6 characters");
      return;
    }

    if (next !== confirmPassword.trim()) {
      showToast("Passwords do not match");
      return;
    }

    try {
      setSubmitting(true);
      await resetPassword(token, next);
      showToast("Password reset successful");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      console.error(err);
      showToast(err.message || "Reset failed");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#EADBC8] p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">
            Reset Password
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Create a new password for your Gemora account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </span>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              autoComplete="new-password"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </span>
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              autoComplete="new-password"
            />
          </label>

          <button
            type="submit"
            disabled={!token || submitting}
            className="w-full bg-[#6B1A2A] text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {submitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-[#6B1A2A] hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
