"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/ui/Modal";
import { useToast } from "@/context/ToastContext";
import { onlyDigits } from "@/hooks/usePhoneOtp";
import { createAddress, updateAddress } from "@/lib/services/addressService";

const EMPTY_ADDRESS = {
  fullName: "",
  phone: "",
  email: "",
  pincode: "",
  city: "",
  state: "",
  addressType: "HOME",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
};

const inputClass =
  "w-full border rounded-xl px-4 h-11 outline-none focus:border-[#6B1A2A]";

function Field({ label, required, optional, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
        {optional && (
          <span className="text-black/50 font-normal"> (Optional)</span>
        )}
      </span>
      {children}
    </label>
  );
}

// Returns an error message, or null when the address is valid.
function validate(values) {
  if (values.fullName.trim().length < 3)
    return "Name must be at least 3 characters";
  if (!/^[0-9]{10}$/.test(values.phone.trim()))
    return "Enter a valid 10 digit phone number";
  if (!/^[0-9]{6}$/.test(values.pincode.trim()))
    return "Enter a valid 6 digit pincode";
  if (values.state.trim().length < 2) return "Enter a valid state";
  if (values.city.trim().length < 2) return "Enter a valid city";
  if (values.addressLine1.trim().length < 10) return "Address is too short";
  return null;
}

export default function AddressFormModal({ address, onClose, onSaved }) {
  const showToast = useToast();
  const [values, setValues] = useState(EMPTY_ADDRESS);
  const [saving, setSaving] = useState(false);

  const editing = Boolean(address?._id);

  useEffect(() => {
    setValues(
      address
        ? {
            ...EMPTY_ADDRESS,
            ...Object.fromEntries(
              Object.keys(EMPTY_ADDRESS).map((key) => [
                key,
                address[key] ?? EMPTY_ADDRESS[key],
              ]),
            ),
          }
        : EMPTY_ADDRESS,
    );
  }, [address]);

  function set(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const error = validate(values);

    if (error) {
      showToast(error);
      return;
    }

    const payload = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ]),
    );

    try {
      setSaving(true);

      if (editing) {
        await updateAddress(address._id, payload);
        showToast("Address updated");
      } else {
        await createAddress(payload);
        showToast("Address added");
      }

      onClose();
      await onSaved();
    } catch (err) {
      showToast(err.message || "Failed to save address");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      labelledBy="addressModalTitle"
      className="items-start justify-center bg-black/40 p-4 pt-24 overflow-y-auto"
      panelClassName="bg-white w-full max-w-lg rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 id="addressModalTitle" className="text-xl font-semibold">
          {editing ? "Edit Address" : "Add Address"}
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="w-9 h-9 rounded-full flex items-center justify-center text-xl text-black/50 hover:bg-black/5 transition"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Full Name" required>
          <input
            value={values.fullName}
            onChange={(e) =>
              set("fullName", e.target.value.replace(/[^a-zA-Z\s]/g, ""))
            }
            maxLength={50}
            placeholder="Enter full name"
            className={inputClass}
            required
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Phone Number" required>
            <input
              type="tel"
              inputMode="numeric"
              value={values.phone}
              onChange={(e) => set("phone", onlyDigits(e.target.value, 10))}
              placeholder="Phone number"
              className={inputClass}
              required
            />
          </Field>

          <Field label="Email" optional>
            <input
              type="email"
              maxLength={100}
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="your@email.com"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Pincode" required>
            <input
              inputMode="numeric"
              value={values.pincode}
              onChange={(e) => set("pincode", onlyDigits(e.target.value, 6))}
              placeholder="Pincode"
              className={inputClass}
              required
            />
          </Field>

          <Field label="City" required>
            <input
              value={values.city}
              onChange={(e) => set("city", e.target.value)}
              placeholder="City"
              className={inputClass}
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="State" required>
            <input
              value={values.state}
              onChange={(e) => set("state", e.target.value)}
              placeholder="State"
              className={inputClass}
              required
            />
          </Field>

          <Field label="Address Type">
            <select
              value={values.addressType}
              onChange={(e) => set("addressType", e.target.value)}
              className={inputClass}
            >
              <option value="HOME">Home</option>
              <option value="WORK">Work</option>
              <option value="OTHER">Other</option>
            </select>
          </Field>
        </div>

        <Field label="House / Flat / Building" required>
          <input
            value={values.addressLine1}
            onChange={(e) => set("addressLine1", e.target.value)}
            placeholder="House / Flat / Building"
            className={inputClass}
            required
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Address Line 2" optional>
            <input
              value={values.addressLine2}
              onChange={(e) => set("addressLine2", e.target.value)}
              placeholder="Road / Area"
              className={inputClass}
            />
          </Field>

          <Field label="Landmark" optional>
            <input
              value={values.landmark}
              onChange={(e) => set("landmark", e.target.value)}
              placeholder="Landmark"
              className={inputClass}
            />
          </Field>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full h-12 rounded-xl bg-[#6B1A2A] text-white font-medium hover:opacity-90 transition disabled:opacity-60"
        >
          Save Address
        </button>
      </form>
    </Modal>
  );
}
