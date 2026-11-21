"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import AddressManager from "./AddressManager";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { onlyDigits } from "@/hooks/usePhoneOtp";
import { formatDate } from "@/lib/format";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from "@/lib/services/profileService";

function VerificationBadge({ verified, unverifiedClass }) {
  return verified ? (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.814a.75.75 0 0 0-1.22-.872l-3.236 4.53-1.545-1.545a.75.75 0 1 0-1.06 1.06l2.167 2.167a.75.75 0 0 0 1.14-.094l3.754-5.246Z"
          clipRule="evenodd"
        />
      </svg>
      Verified
    </span>
  ) : (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${unverifiedClass}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      Not Verified
    </span>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-black/50">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function StatCard({ href, value, label }) {
  const content = (
    <>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-sm text-black/50">{label}</p>
    </>
  );

  const className = "bg-white rounded-3xl p-5 text-center shadow-sm";

  return href ? (
    <Link href={href} className={`${className} hover:shadow-md transition`}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}

// Returns an error message, or null when valid.
function validateProfile({ name, phone }) {
  if (name.length < 3) return "Name must be at least 3 characters";
  if (name.length > 50) return "Name is too long";
  if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can contain only letters";
  if (phone && !/^[0-9]{10}$/.test(phone))
    return "Enter a valid 10 digit phone number";
  return null;
}

function EditProfileModal({ user, onClose, onSaved }) {
  const showToast = useToast();
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");

  async function handleSubmit(e) {
    e.preventDefault();

    const values = { name: name.trim(), phone: phone.trim() };
    const error = validateProfile(values);

    if (error) {
      showToast(error);
      return;
    }

    try {
      const res = await updateProfile(values);
      onSaved(res.user);
      onClose();
      showToast("Profile updated");
    } catch (err) {
      showToast(err.message || "Failed to update profile");
    }
  }

  const inputClass =
    "w-full border rounded-xl p-2.5 outline-none focus:border-[#6B1A2A]";

  return (
    <Modal
      open
      onClose={onClose}
      labelledBy="editProfileTitle"
      className="items-center justify-center bg-black/50 p-4"
      panelClassName="bg-white rounded-3xl w-full max-w-md p-6"
    >
      <div className="flex justify-between items-center mb-5">
        <h2 id="editProfileTitle" className="text-xl font-semibold">
          Edit Profile
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="w-9 h-9 rounded-full hover:bg-black/5"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="block text-sm text-black/60 mb-1">Name</span>
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))
            }
            minLength={3}
            maxLength={50}
            required
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="block text-sm text-black/60 mb-1">Phone</span>
          <input
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(onlyDigits(e.target.value, 10))}
            className={inputClass}
          />
        </label>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-[#6B1A2A] text-white"
        >
          Save Changes
        </button>
      </form>
    </Modal>
  );
}

export default function ProfileView() {
  const { refreshUser } = useAuth();
  const showToast = useToast();
  const avatarInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const [error, setError] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getProfile()
      .then((profile) => {
        setUser(profile.user);
        setStats(profile.stats || {});
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        showToast("Failed to load profile");
      });
  }, [showToast]);

  const handleAddressCount = useCallback(
    (count) => setStats((current) => ({ ...current, addressCount: count })),
    [],
  );

  async function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await uploadAvatar(file);
      setUser((current) => ({ ...current, avatar: res.user.avatar }));
      setAvatarFailed(false);
      refreshUser();
      showToast("Profile photo updated");
    } catch (err) {
      console.error(err);
      showToast("Failed to update photo");
    }
  }

  function handleProfileSaved(updated) {
    setUser((current) => ({
      ...current,
      name: updated.name,
      phone: updated.phone,
    }));
    refreshUser();
  }

  const showAvatar = user?.avatar && !avatarFailed;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#1A1A1A]">
            My Account
          </h1>
          <p className="text-black/50 mt-2">
            Manage your profile, addresses and preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard href="/orders" value={stats.orderCount || 0} label="Orders" />
        <StatCard
          href="/wishlist"
          value={stats.wishlistCount || 0}
          label="Wishlist"
        />
        <StatCard value={stats.addressCount || 0} label="Addresses" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* SIDEBAR */}
        <div>
          <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-24">
            <div className="flex flex-col items-center text-center">
              {showAvatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  onError={() => setAvatarFailed(true)}
                  className="w-28 h-28 rounded-full object-cover"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-[#F6EEF0] flex items-center justify-center text-4xl font-semibold text-[#6B1A2A]">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}

              <h2 className="text-xl font-semibold mt-4">
                {error
                  ? "Unable to load profile"
                  : user
                    ? user.name || "User"
                    : "Loading..."}
              </h2>
              <p className="text-black/50 mt-1">
                {user?.email || (user ? "-" : "")}
              </p>

              <div className="flex flex-col gap-3 mt-6 w-full">
                <button
                  type="button"
                  disabled={!user}
                  onClick={() => setEditing(true)}
                  className="w-full py-3 rounded-xl bg-[#6B1A2A] text-white font-medium hover:opacity-90 transition"
                >
                  Edit Profile
                </button>

                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="w-full py-3 rounded-xl border border-black/10 hover:bg-black/[0.02] transition"
                >
                  Change Photo
                </button>

                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  aria-label="Profile photo"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6">
            <h3 className="font-semibold text-lg mb-5">Account Details</h3>
            <div className="grid md:grid-cols-2 gap-5">
              <Detail label="Name" value={user?.name || "-"} />
              <Detail label="Email" value={user?.email || "-"} />
              <Detail
                label="Phone"
                value={user ? user.phone || "Not Added" : "-"}
              />
              <Detail
                label="Member Since"
                value={
                  user?.createdAt
                    ? formatDate(user.createdAt, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"
                }
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <h3 className="font-semibold text-lg mb-5">Security</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Email Status</span>
                {user ? (
                  <VerificationBadge
                    verified={user.isEmailVerified}
                    unverifiedClass="bg-red-50 text-red-600"
                  />
                ) : (
                  <span className="font-medium">-</span>
                )}
              </div>
              <div className="flex justify-between">
                <span>Phone Status</span>
                {user ? (
                  <VerificationBadge
                    verified={user.isPhoneVerified}
                    unverifiedClass="bg-gray-100 text-gray-600"
                  />
                ) : (
                  <span className="font-medium">-</span>
                )}
              </div>
              <div className="flex justify-between">
                <span>Last Login</span>
                <span className="font-medium">
                  {user?.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleDateString("en-IN")
                    : user
                      ? "Never"
                      : "-"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6">
            <AddressManager mode="manage" onCountChange={handleAddressCount} />
          </div>
        </div>
      </div>

      {editing && user && (
        <EditProfileModal
          user={user}
          onClose={() => setEditing(false)}
          onSaved={handleProfileSaved}
        />
      )}
    </>
  );
}
