import { showToast } from "../components/toast.js";

import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../services/addressService.js";





let currentAddresses = [];

let currentMode = "manage";

let addressesContainer;

let selectedAddressId = null;




const addressModal =
  document.getElementById("addressModal");

const closeAddressModalBtn =
  document.getElementById(
    "closeAddressModal"
  );

const addressForm =
  document.getElementById("addressForm");

const addressId =
  document.getElementById("addressId");

const addressModalTitle =
  document.getElementById("addressModalTitle");

const deleteModal =
  document.getElementById("deleteAddressModal");

const cancelDeleteBtn =
  document.getElementById("cancelDeleteBtn");

const confirmDeleteBtn =
  document.getElementById("confirmDeleteBtn");

const addAddressBtn =
  document.getElementById("addAddressBtn");







  const fullName =
  document.getElementById("fullName");

const phone =
  document.getElementById("phone");

const email =
  document.getElementById("email");

const pincode =
  document.getElementById("pincode");

const state =
  document.getElementById("state");

const city =
  document.getElementById("city");

const addressLine1 =
  document.getElementById("addressLine1");

const addressLine2 =
  document.getElementById("addressLine2");

const landmark =
  document.getElementById("landmark");

const addressType =
  document.getElementById("addressType");

const addressCount =
  document.getElementById(
    "addressCount"
  );








    phone.addEventListener(
    "input",
    () => {

      phone.value =
        phone.value
          .replace(/\D/g, "")
          .slice(0, 10);

    }
  );

  pincode.addEventListener(
    "input",
    () => {

      pincode.value =
        pincode.value
          .replace(/\D/g, "")
          .slice(0, 6);

    }
  );

  fullName?.addEventListener(
    "input",
    () => {

      fullName.value =
        fullName.value.replace(
          /[^a-zA-Z\s]/g,
          ""
        );

    }
  );





// scroll lock

export function lockScroll() {

 document.body.classList.add(
  "overflow-hidden"
);
}

export function unlockScroll() {

  document.body.classList.remove(
  "overflow-hidden"
);
}



async function loadAddresses() {

  try {

    const res = await getAddresses();

    const addresses =
      res.addresses || [];

    currentAddresses =
      addresses;
if (addressCount) {
  addressCount.textContent =
    addresses.length;
}

    if (
      addresses.length === 0
    ) {

      addressesContainer.innerHTML =
        `
        <div class="text-center py-10">

          <p class="text-black/50">
            You haven't added any addresses yet.
          </p>

          <button
            id="emptyAddAddressBtn"
            class="
              mt-4
              px-4
              py-2
              rounded-xl
              bg-[#6B1A2A]
              text-white
            "
          >
            Add Address
          </button>

        </div>
      `;

      document
        .getElementById(
          "emptyAddAddressBtn"
        )
        ?.addEventListener(
          "click",
          () => {

            addressForm.reset();

            addressId.value =
              "";

            addressModalTitle.textContent =
              "Add Address";

            addressModal.classList.remove(
              "hidden"
            );

            addressModal.classList.add(
              "flex"
            );

          }
        );

      return;
    }

    renderAddresses(
      addresses
    );

  } catch (err) {

    console.error(
      "Failed to load addresses:",
      err
    );

    addressesContainer.innerHTML =
      `
      <div class="text-center py-10">

        <p class="text-red-500">
          Failed to load addresses.
        </p>

      </div>
    `;

    showToast(
      "Failed to load addresses"
    );
  }
}


function renderAddresses(addresses) {

 if (currentMode === "checkout") {

  addressesContainer.innerHTML = addresses
    .map(
      (address) => `
        <label
          class="
            block
            border
            border-black/10
            rounded-2xl
            p-5
            bg-white
            cursor-pointer
            hover:border-[#6B1A2A]
            transition
          "
        >

          <div class="flex gap-3">

            <input
              type="radio"
              name="selectedAddress"
              value="${address._id}"
              ${address.isDefault ? "checked" : ""}
              class="mt-1 accent-[#6B1A2A]"
            />

            <div class="flex-1">

              <div
                class="
                  flex
                  items-center
                  justify-between
                  mb-3
                "
              >

                <div
                  class="
                    flex
                    items-center
                    gap-2
                    flex-wrap
                  "
                >

                  <h4
                    class="
                      font-semibold
                      text-lg
                    "
                  >
                    ${address.fullName}
                  </h4>

                  ${
                    address.isDefault
                      ? `
                        <span
                          class="
                            inline-flex
                            items-center
                            px-2.5
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            bg-green-100
                            text-green-700
                          "
                        >
                          Default
                        </span>
                      `
                      : ""
                  }

                </div>

                <button
                  type="button"
                  class="
                    edit-address-btn
                    text-sm
                    text-[#6B1A2A]
                    font-medium
                    hover:underline
                  "
                  data-id="${address._id}"
                >
                  Edit
                </button>

              </div>

              <p
                class="
                  text-black/70
                  leading-relaxed
                "
              >
                ${address.addressLine1}
                ${
                  address.addressLine2
                    ? `<br>${address.addressLine2}`
                    : ""
                }
              </p>

              <p
                class="
                  text-black/70
                  mt-2
                "
              >
                ${address.city},
                ${address.state}
                -
                ${address.pincode}
              </p>

              <p
                class="
                  text-black/70
                  mt-1
                "
              >
                ${address.phone}
              </p>

            </div>

          </div>

        </label>
      `
    )
    .join("");

  bindAddressActions();

  return;
}

  // PROFILE / MANAGE MODE
  addressesContainer.innerHTML = addresses
    .map(
      (address) => `
        <div
          class="
            border
            border-black/10
            rounded-2xl
            p-5
            bg-white
            hover:shadow-md
            transition
          "
        >

          <div
            class="
              flex
              justify-between
              items-start
              gap-4
            "
          >

            <div class="flex-1">

              <div
                class="
                  flex
                  items-center
                  gap-2
                  flex-wrap
                  mb-3
                "
              >

                <h4
                  class="
                    font-semibold
                    text-lg
                  "
                >
                  ${address.fullName}
                </h4>

                ${
                  address.isDefault
                    ? `
                      <span
                        class="
                          inline-flex
                          items-center
                          px-2.5
                          py-1
                          rounded-full
                          text-xs
                          font-medium
                          bg-green-100
                          text-green-700
                        "
                      >
                        Default
                      </span>
                    `
                    : ""
                }

              </div>

              <p
                class="
                  text-black/70
                  leading-relaxed
                "
              >
                ${address.addressLine1}
                ${
                  address.addressLine2
                    ? `<br>${address.addressLine2}`
                    : ""
                }
              </p>

              <p
                class="
                  text-black/70
                  mt-2
                "
              >
                ${address.city},
                ${address.state}
                -
                ${address.pincode}
              </p>

              <p
                class="
                  text-black/70
                  mt-1
                "
              >
                ${address.phone}
              </p>

            </div>

          </div>

          <div
            class="
              flex
              flex-wrap
              gap-2
              mt-5
              pt-4
              border-t
              border-black/5
            "
          >

            ${
              !address.isDefault
                ? `
                  <button
                    class="
                      set-default-btn
                      px-3
                      py-2
                      rounded-xl
                      bg-green-50
                      text-green-700
                      text-sm
                      font-medium
                      hover:bg-green-100
                    "
                    data-id="${address._id}"
                  >
                    Set Default
                  </button>
                `
                : ""
            }

            <button
              class="
                edit-address-btn
                px-3
                py-2
                rounded-xl
                bg-blue-50
                text-blue-700
                text-sm
                font-medium
                hover:bg-blue-100
              "
              data-id="${address._id}"
            >
              Edit
            </button>

            <button
              class="
                delete-address-btn
                px-3
                py-2
                rounded-xl
                bg-red-50
                text-red-700
                text-sm
                font-medium
                hover:bg-red-100
              "
              data-id="${address._id}"
            >
              Delete
            </button>

          </div>

        </div>
      `
    )
    .join("");

  bindAddressActions();
}






function openAddAddressModal() {

  addressForm.reset();

  addressId.value = "";

  addressModalTitle.textContent =
    "Add Address";

  addressModal.classList.remove(
    "hidden"
  );

  addressModal.classList.add(
    "flex"
  );

  lockScroll();
}




function openEditAddressModal(
  id
) {

  const address =
    currentAddresses.find(
      a => a._id === id
    );

  if (!address) return;

  addressModalTitle.textContent =
    "Edit Address";

  addressId.value =
    address._id;

  fullName.value =
    address.fullName;

  phone.value =
    address.phone;

    email.value =
  address.email || "";

  pincode.value =
    address.pincode;

  state.value =
    address.state;

  city.value =
    address.city;

  addressLine1.value =
    address.addressLine1;

  addressLine2.value =
    address.addressLine2 || "";

  landmark.value =
    address.landmark || "";

  addressType.value =
    address.addressType;

  addressModal.classList.remove(
    "hidden"
  );

  addressModal.classList.add(
    "flex"
  );

  lockScroll();
}


function closeAddressModal() {

  addressModal.classList.add(
    "hidden"
  );

  addressModal.classList.remove(
    "flex"
  );

  addressForm.reset();

  addressId.value = "";

  unlockScroll();
}


function validateAddressForm() {

  const name =
    fullName.value.trim();

  const phoneNo =
    phone.value.trim();

  const pin =
    pincode.value.trim();

  const stateName =
    state.value.trim();

  const cityName =
    city.value.trim();

  const address1 =
    addressLine1.value.trim();

  if (name.length < 3) {

    showToast(
      "Name must be at least 3 characters"
    );

    return false;
  }

  if (
    !/^[0-9]{10}$/.test(
      phoneNo
    )
  ) {

    showToast(
      "Enter a valid 10 digit phone number"
    );

    return false;
  }

  if (
    !/^[0-9]{6}$/.test(
      pin
    )
  ) {

    showToast(
      "Enter a valid 6 digit pincode"
    );

    return false;
  }

  if (
    stateName.length < 2
  ) {

    showToast(
      "Enter a valid state"
    );

    return false;
  }

  if (
    cityName.length < 2
  ) {

    showToast(
      "Enter a valid city"
    );

    return false;
  }

  if (
    address1.length < 10
  ) {

    showToast(
      "Address is too short"
    );

    return false;
  }

  return true;
}



function bindAddressActions() {

  document
    .querySelectorAll(
      ".set-default-btn"
    )
    .forEach(btn => {

      btn.addEventListener(
        "click",
        () =>
          handleSetDefault(
            btn.dataset.id
          )
      );

    });

  document
    .querySelectorAll(
      ".delete-address-btn"
    )
    .forEach(btn => {

      btn.addEventListener(
        "click",
        () =>
          openDeleteModal(
    btn.dataset.id
  )
      );

    });

  document
    .querySelectorAll(
      ".edit-address-btn"
    )
    .forEach(btn => {

      btn.addEventListener(
        "click",
        () =>
          openEditAddressModal(
            btn.dataset.id
          )
      );

    });

}




function openDeleteModal(
  id
) {

  selectedAddressId =
    id;

  deleteModal.classList.remove(
    "hidden"
  );

  deleteModal.classList.add(
    "flex"
  );

  lockScroll();
}

function closeDeleteModal() {

  selectedAddressId =
    null;

  deleteModal.classList.add(
    "hidden"
  );

  deleteModal.classList.remove(
    "flex"
  );

  unlockScroll();
}


async function handleSetDefault(id) {
  try {

    await setDefaultAddress(id);

    await loadAddresses();

    showToast(
      "Default address updated"
    );

  } catch (err) {

    console.error(err);

    showToast(
      "Failed to update address"
    );
  }
}













confirmDeleteBtn?.addEventListener(
  "click",
  async () => {

    if (
      !selectedAddressId
    ) return;

    try {

     await deleteAddress(
  selectedAddressId
);

      closeDeleteModal();

      await loadAddresses();

      showToast(
        "Address deleted successfully"
      );

    } catch (err) {

      console.error(err);

      showToast(
        "Failed to delete address"
      );

    }

  }
);







function showAddressLoading() {

  addressesContainer.innerHTML =
    `
    <div class="space-y-4">

      <div
        class="
          animate-pulse
          h-24
          bg-white
          rounded-2xl
        "
      ></div>

      <div
        class="
          animate-pulse
          h-24
          bg-white
          rounded-2xl
        "
      ></div>

    </div>
  `;
}










addAddressBtn?.addEventListener(
  "click",
  openAddAddressModal
);















function bindModalEvents() {

  cancelDeleteBtn?.addEventListener(
    "click",
    closeDeleteModal
  );

  deleteModal?.addEventListener(
    "click",
    e => {
      if (e.target === deleteModal) {
        closeDeleteModal();
      }
    }
  );

  closeAddressModalBtn?.addEventListener(
    "click",
    closeAddressModal
  );

  addressModal?.addEventListener(
    "click",
    e => {
      if (e.target === addressModal) {
        closeAddressModal();
      }
    }
  );
}





function bindFormEvents() {

  addressForm?.addEventListener(
    "submit",
    async e => {

      e.preventDefault();

      if (
        !validateAddressForm()
      ) {
        return;
      }

    const payload = {
  fullName:
    fullName.value.trim(),

  phone:
    phone.value.trim(),

  email:
    email.value.trim(),

  pincode:
    pincode.value.trim(),

  state:
    state.value.trim(),

  city:
    city.value.trim(),

  addressLine1:
    addressLine1.value.trim(),

  addressLine2:
    addressLine2.value.trim(),

  landmark:
    landmark.value.trim(),

  addressType:
    addressType.value,
};

      try {

        if (
          addressId.value
        ) {

          await updateAddress(
            addressId.value,
            payload
          );

          showToast(
            "Address updated"
          );

        } else {

          await createAddress(
            payload
          );

          showToast(
            "Address added"
          );
        }

        closeAddressModal();

        await loadAddresses();

      } catch (err) {

        showToast(
          err.message ||
          "Failed to save address"
        );
      }

    }
  );
}















export async function initAddressManager({
  containerId,
  mode = "manage",
}) {

  addressesContainer =
    document.getElementById(
      containerId
    );

  currentMode = mode;

  bindModalEvents();

  bindFormEvents();

  await loadAddresses();
}
