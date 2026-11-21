"use client";

import { useEffect, useRef, useState } from "react";

import { checkPincode } from "@/lib/services/contentService";

const STORAGE_KEY = "gemora_pincode";
const PINCODE_REGEX = /^[1-9]\d{5}$/;

function readSavedPincode() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeSavedPincode(pincode) {
  try {
    if (pincode) {
      localStorage.setItem(STORAGE_KEY, pincode);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {}
}

// PIN code serviceability check. Remembers the last verified PIN and
// re-checks it automatically on the next product page.
export default function DeliveryChecker() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState("idle"); // idle | hint | loading | error | verified
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const inputRef = useRef(null);
  const lastVerifiedRef = useRef(null);

  async function verify(pin) {
    if (pin === lastVerifiedRef.current) return;

    if (!PINCODE_REGEX.test(pin)) {
      setError("Invalid PIN code");
      setStatus("error");
      return;
    }

    lastVerifiedRef.current = pin;
    setStatus("loading");

    try {
      const data = await checkPincode(pin);

      writeSavedPincode(pin);
      setLocation(`${data.postOffice}, ${data.district}, ${data.state}`);
      setStatus("verified");
    } catch (err) {
      lastVerifiedRef.current = null;
      writeSavedPincode(null);
      setError(err.message || "Unable to verify pincode");
      setStatus("error");
    }
  }

  useEffect(() => {
    const saved = readSavedPincode();

    if (saved && PINCODE_REGEX.test(saved)) {
      setPincode(saved);
      verify(saved);
    } else if (saved) {
      writeSavedPincode(null);
    }
  }, []);

  // Auto-check shortly after six digits are typed.
  useEffect(() => {
    if (pincode.length !== 6 || status === "verified") return;

    const timer = setTimeout(() => verify(pincode), 500);
    return () => clearTimeout(timer);
  }, [pincode]);

  function handleChange(e) {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);

    setPincode(value);

    if (value.length === 0) {
      lastVerifiedRef.current = null;
      setStatus("idle");
    } else if (value.length < 6) {
      setStatus("hint");
    }
  }

  return (
    <div className="border rounded-xl p-4 bg-white space-y-4">
      <h3 className="text-[15px] font-medium text-black">
        Delivery &amp; Serviceability
      </h3>

      {status === "verified" ? (
        <div className="border border-[#6B1A2A]/10 rounded-xl bg-[#F9F6F2] p-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#6B1A2A]/10 text-[#6B1A2A] flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z"
                  />
                  <circle cx="12" cy="11" r="2.5" />
                </svg>
              </div>

              <div>
                <p className="font-medium text-black">Delivering to</p>
                <p className="text-sm text-black/60 mt-1">{location}</p>
                <p className="text-xs text-[#6B1A2A] mt-2">
                  Usually delivered within 3–5 business days
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                lastVerifiedRef.current = null;
                setStatus("idle");
                requestAnimationFrame(() => inputRef.current?.select());
              }}
              className="text-sm font-medium text-[#6B1A2A] hover:underline"
            >
              Change
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              maxLength={6}
              autoComplete="postal-code"
              value={pincode}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") verify(pincode.trim());
              }}
              placeholder="Enter 6-digit PIN code"
              aria-label="PIN code"
              className="flex-1 border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#6B1A2A]"
            />

            <button
              type="button"
              disabled={pincode.length !== 6 || status === "loading"}
              onClick={() => verify(pincode.trim())}
              className="px-5 rounded-lg bg-black text-white text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check
            </button>
          </div>

          <div className="mt-3" aria-live="polite">
            {status === "hint" && (
              <span className="text-sm text-black/50">
                Enter a valid 6-digit PIN code
              </span>
            )}

            {status === "loading" && (
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 animate-spin text-[#6B1A2A]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="opacity-20"
                  />
                  <path
                    fill="currentColor"
                    d="M22 12a10 10 0 00-10-10v3a7 7 0 017 7h3z"
                  />
                </svg>
                <span className="text-sm text-black/60">
                  Checking delivery availability...
                </span>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-red-50 text-red-600 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v4m0 4h.01M10.29 3.86l-8 14A1 1 0 003.17 19h17.66a1 1 0 00.88-1.5l-8-14a1 1 0 00-1.76 0z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-medium text-red-600">{error}</p>
                  <p className="text-xs text-black/50 mt-1">
                    Please check the PIN code and try again.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
