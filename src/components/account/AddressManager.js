"use client";

import { useCallback, useEffect, useState } from "react";

import AddressFormModal from "./AddressFormModal";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/context/ToastContext";
import {
  deleteAddress,
  getAddresses,
  setDefaultAddress,
} from "@/lib/services/addressService";

function AddressLines({ address }) {
  return (
    <>
      <p className="text-black/70 leading-relaxed">
        {address.addressLine1}
        {address.addressLine2 && (
          <>
            <br />
            {address.addressLine2}
          </>
        )}
      </p>
      <p className="text-black/70 mt-2">
        {address.city}, {address.state} - {address.pincode}
      </p>
      <p className="text-black/70 mt-1">{address.phone}</p>
    </>
  );
}

function NameRow({ address, children }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2 flex-wrap">
        <h4 className="font-semibold text-lg">{address.fullName}</h4>
        {address.isDefault && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            Default
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// Lists the customer's addresses. In "checkout" mode they are selectable
// radios; in "manage" mode each has set-default / edit / delete actions.
export default function AddressManager({
  mode = "manage",
  selectedId,
  onSelect,
  onCountChange,
}) {
  const showToast = useToast();

  const [addresses, setAddresses] = useState(null);
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(null); // address object, {} for new
  const [deleteId, setDeleteId] = useState(null);

  const loadAddresses = useCallback(async () => {
    try {
      const res = await getAddresses();
      const list = res?.addresses || [];

      setAddresses(list);
      setError(false);
      onCountChange?.(list.length);

      return list;
    } catch (err) {
      console.error("Failed to load addresses:", err);
      setError(true);
      showToast("Failed to load addresses");
      return [];
    }
  }, [onCountChange, showToast]);

  useEffect(() => {
    loadAddresses().then((list) => {
      if (mode !== "checkout" || selectedId) return;
      const preferred = list.find((address) => address.isDefault);
      if (preferred) onSelect?.(preferred._id);
    });
    // Only on mount: later reloads must not override the customer's choice.
  }, []);

  async function handleSetDefault(id) {
    try {
      await setDefaultAddress(id);
      await loadAddresses();
      showToast("Default address updated");
    } catch (err) {
      console.error(err);
      showToast("Failed to update address");
    }
  }

  async function confirmDelete() {
    try {
      await deleteAddress(deleteId);
      setDeleteId(null);
      await loadAddresses();
      showToast("Address deleted successfully");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete address");
    }
  }

  const isCheckout = mode === "checkout";

  let list;

  if (error) {
    list = (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load addresses.</p>
      </div>
    );
  } else if (!addresses) {
    list = (
      <div className="space-y-4">
        <div className="animate-pulse h-24 bg-black/5 rounded-2xl" />
        <div className="animate-pulse h-24 bg-black/5 rounded-2xl" />
      </div>
    );
  } else if (!addresses.length) {
    list = (
      <div className="text-center py-10">
        <p className="text-black/50">
          You haven&apos;t added any addresses yet.
        </p>
        <button
          type="button"
          onClick={() => setEditing({})}
          className="mt-4 px-4 py-2 rounded-xl bg-[#6B1A2A] text-white"
        >
          Add Address
        </button>
      </div>
    );
  } else if (isCheckout) {
    list = addresses.map((address) => (
      <label
        key={address._id}
        className="block border border-black/10 rounded-2xl p-5 bg-white cursor-pointer hover:border-[#6B1A2A] transition"
      >
        <div className="flex gap-3">
          <input
            type="radio"
            name="selectedAddress"
            value={address._id}
            checked={selectedId === address._id}
            onChange={() => onSelect?.(address._id)}
            className="mt-1 accent-[#6B1A2A]"
          />

          <div className="flex-1">
            <NameRow address={address}>
              <button
                type="button"
                onClick={() => setEditing(address)}
                className="text-sm text-[#6B1A2A] font-medium hover:underline"
              >
                Edit
              </button>
            </NameRow>
            <AddressLines address={address} />
          </div>
        </div>
      </label>
    ));
  } else {
    list = addresses.map((address) => (
      <div
        key={address._id}
        className="border border-black/10 rounded-2xl p-5 bg-white hover:shadow-md transition"
      >
        <NameRow address={address} />
        <AddressLines address={address} />

        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-black/5">
          {!address.isDefault && (
            <button
              type="button"
              onClick={() => handleSetDefault(address._id)}
              className="px-3 py-2 rounded-xl bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100"
            >
              Set Default
            </button>
          )}

          <button
            type="button"
            onClick={() => setEditing(address)}
            className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => setDeleteId(address._id)}
            className="px-3 py-2 rounded-xl bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">
          {isCheckout ? "Select Delivery Address" : "Saved Addresses"}
        </h2>

        <button
          type="button"
          onClick={() => setEditing({})}
          className={
            isCheckout
              ? "text-sm text-[#6B1A2A] font-medium"
              : "px-4 py-2 rounded-xl bg-[#6B1A2A] text-white text-sm hover:opacity-90 transition"
          }
        >
          {isCheckout ? "+ Add New Address" : "Add Address"}
        </button>
      </div>

      <div className="space-y-4">{list}</div>

      {editing && (
        <AddressFormModal
          address={editing._id ? editing : null}
          onClose={() => setEditing(null)}
          onSaved={loadAddresses}
        />
      )}

      <Modal
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        labelledBy="deleteAddressTitle"
        className="items-center justify-center bg-black/50"
        panelClassName="bg-white rounded-3xl p-6 w-full max-w-md mx-4"
      >
        <h3 id="deleteAddressTitle" className="text-xl font-semibold mb-2">
          Delete Address
        </h3>
        <p className="text-black/60 mb-6">
          Are you sure you want to delete this address?
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setDeleteId(null)}
            className="px-4 py-2 rounded-xl border"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="px-4 py-2 rounded-xl bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
