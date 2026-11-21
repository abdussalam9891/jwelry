"use client";

import { useState } from "react";

import Modal from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/icons";
import { useToast } from "@/context/ToastContext";
import { onlyDigits } from "@/hooks/usePhoneOtp";
import { EMAIL_REGEX } from "@/lib/format";
import { submitContactForm } from "@/lib/services/contentService";

const INQUIRY_TYPES = [
  "Order Support",
  "Product Inquiry",
  "Shipping",
  "Returns & Refunds",
  "Warranty",
  "Other",
];

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  category: "",
  orderNumber: "",
  subject: "",
  message: "",
};

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 focus:outline-none focus:border-[#6B1A2A] transition";

// Returns an error message, or null when the inquiry is valid.
function validate(values) {
  if (!/^[a-zA-Z\s.'-]{2,50}$/.test(values.name))
    return "Please enter a valid name.";
  if (!EMAIL_REGEX.test(values.email))
    return "Please enter a valid email address.";
  if (values.phone && !/^\d{10}$/.test(values.phone))
    return "Phone number must be 10 digits.";
  if (values.subject.length < 5)
    return "Subject must be at least 5 characters.";
  if (values.message.length < 10)
    return "Message must be at least 10 characters.";
  if (!values.category) return "Please select an inquiry type.";
  return null;
}

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const showToast = useToast();
  const [values, setValues] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function set(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting) return;

    const payload = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()]),
    );
    payload.email = payload.email.toLowerCase();

    const error = validate(payload);

    if (error) {
      showToast(error);
      return;
    }

    try {
      setSubmitting(true);
      await submitContactForm(payload);
      showToast("Message sent successfully.");
      setValues(EMPTY_FORM);
      setSent(true);
    } catch (err) {
      showToast(err?.message || "Failed to submit inquiry.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[32px] border border-black/5 p-8 md:p-12 shadow-sm"
      >
        <div className="mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#6B1A2A]/10 text-[#6B1A2A] text-sm mb-4">
            Customer Support
          </span>
          <h2 className="text-3xl font-light mb-3">Send Us A Message</h2>
          <p className="text-black/60 leading-relaxed">
            Have a question about an order, shipping, returns, or a product? Our
            team typically replies within 24 business hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <Field id="name" label="Full Name *">
            <input
              id="name"
              type="text"
              maxLength={50}
              required
              value={values.name}
              onChange={(e) =>
                set("name", e.target.value.replace(/[^a-zA-Z\s.'-]/g, ""))
              }
              placeholder="Enter your name"
              className={inputClass}
            />
          </Field>

          <Field id="email" label="Email Address *">
            <input
              id="email"
              type="email"
              required
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={(e) => set("email", e.target.value.trim().toLowerCase())}
              placeholder="you@example.com"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <Field id="phone" label="Phone Number">
            <input
              id="phone"
              type="tel"
              value={values.phone}
              onChange={(e) => set("phone", onlyDigits(e.target.value, 10))}
              placeholder="+91 XXXXX XXXXX"
              className={inputClass}
            />
          </Field>

          <Field id="category" label="Inquiry Type *">
            <select
              id="category"
              required
              value={values.category}
              onChange={(e) => set("category", e.target.value)}
              className={inputClass}
            >
              <option value="">Select Inquiry Type</option>
              {INQUIRY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mb-5">
          <Field id="orderNumber" label="Order Number">
            <input
              id="orderNumber"
              type="text"
              value={values.orderNumber}
              onChange={(e) => set("orderNumber", e.target.value)}
              placeholder="Optional"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="mb-5">
          <Field id="subject" label="Subject *">
            <input
              id="subject"
              type="text"
              required
              maxLength={120}
              value={values.subject}
              onChange={(e) => set("subject", e.target.value)}
              placeholder="Briefly describe your issue"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="mb-8">
          <Field id="message" label="Message *">
            <textarea
              id="message"
              required
              maxLength={1000}
              rows={6}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Please provide as much detail as possible..."
              className={`${inputClass} resize-none`}
            />
          </Field>
          <p className="text-xs text-black/40 mt-2">
            Include your order number if your inquiry relates to a purchase.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#6B1A2A] px-8 py-4 text-white font-medium hover:opacity-90 transition ${
            submitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {submitting && <Spinner className="h-5 w-5" />}
          <span>{submitting ? "Sending..." : "Send Message"}</span>
        </button>
      </form>

      <Modal
        open={sent}
        onClose={() => setSent(false)}
        labelledBy="contactSentTitle"
        className="items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        panelClassName="bg-white rounded-[32px] p-8 md:p-10 max-w-md w-full text-center"
      >
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h3 id="contactSentTitle" className="text-2xl font-light mb-3">
          Message Sent
        </h3>
        <p className="text-black/60 leading-relaxed mb-8">
          Thank you for contacting Gemora. Our support team will review your
          inquiry and get back to you within 24 business hours.
        </p>

        <button
          type="button"
          onClick={() => setSent(false)}
          className="w-full bg-[#6B1A2A] text-white py-3 rounded-xl hover:opacity-90 transition"
        >
          Continue Browsing
        </button>
      </Modal>
    </>
  );
}
