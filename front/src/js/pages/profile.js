import Auth from "../core/auth.js";
import api from "../core/api.js";
import { showToast } from "../components/toast.js";
















let currentAddresses = [];


/* ---------------- ELEMENTS ---------------- */




const editProfileBtn =
  document.getElementById(
    "editProfileBtn"
  );

const profileModal =
  document.getElementById(
    "profileModal"
  );

const closeProfileModal =
  document.getElementById(
    "closeProfileModal"
  );

const profileForm =
  document.getElementById(
    "profileForm"
  );

const profileName =
  document.getElementById(
    "profileName"
  );

const profilePhone =
  document.getElementById(
    "profilePhone"
  );










const avatar =
  document.getElementById("avatar");

const avatarFallback =
  document.getElementById(
    "avatarFallback"
  );


  const changeAvatarBtn =
  document.getElementById(
    "changeAvatarBtn"
  );

const avatarInput =
  document.getElementById(
    "avatarInput"
  );

changeAvatarBtn?.addEventListener(
  "click",
  () => avatarInput.click()
);

avatarInput?.addEventListener(
  "change",
  uploadAvatar
);

const userName =
  document.getElementById(
    "userName"
  );

const userEmail =
  document.getElementById(
    "userEmail"
  );

const detailName =
  document.getElementById(
    "detailName"
  );

const detailEmail =
  document.getElementById(
    "detailEmail"
  );

const detailPhone =
  document.getElementById(
    "detailPhone"
  );

const memberSince =
  document.getElementById(
    "memberSince"
  );

const lastLogin =
  document.getElementById(
    "lastLogin"
  );

const emailVerification =
  document.getElementById(
    "emailVerification"
  );

const phoneVerification =
  document.getElementById(
    "phoneVerification"
  );

const addressesContainer =
  document.getElementById(
    "addressesContainer"
  );

  const deleteModal =
  document.getElementById(
    "deleteAddressModal"
  );

const cancelDeleteBtn =
  document.getElementById(
    "cancelDeleteBtn"
  );

const confirmDeleteBtn =
  document.getElementById(
    "confirmDeleteBtn"
  );

let selectedAddressId =
  null;

const ordersCount =
  document.getElementById(
    "ordersCount"
  );

const wishlistCount =
  document.getElementById(
    "wishlistCount"
  );

const addressCount =
  document.getElementById(
    "addressCount"
  );



  const addressModal =
  document.getElementById(
    "addressModal"
  );

const addressForm =
  document.getElementById(
    "addressForm"
  );

const addressModalTitle =
  document.getElementById(
    "addressModalTitle"
  );

const addressId =
  document.getElementById(
    "addressId"
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


profilePhone?.addEventListener(
  "input",
  () => {

    profilePhone.value =
      profilePhone.value
        .replace(/\D/g, "")
        .slice(0, 10);

  }
);


profileName?.addEventListener(
  "input",
  () => {

    profileName.value =
      profileName.value.replace(
        /[^a-zA-Z\s]/g,
        ""
      );

  }
);









/* ---------------- INIT ---------------- */

document.addEventListener(
  "DOMContentLoaded",
  init
);

async function init() {
  try {

    showAddressLoading();

    const authUser =
      await Auth.requireAuth();

    if (!authUser) return;

    const profile =
      await api.get(
        "/v1/auth/me"
      );

    renderUser(
      profile.user,
      profile.stats
    );

    await loadAddresses();



  } catch (err) {

    console.error(
      "Profile load failed",
      err
    );

    showProfileError();

  }
}

/* ---------------- USER ---------------- */

function renderUser(
  user,
  stats = {}
) {

  userName.textContent =
    user.name || "User";

  userEmail.textContent =
    user.email || "-";

  detailName.textContent =
    user.name || "-";

  detailEmail.textContent =
    user.email || "-";

  detailPhone.textContent =
    user.phone ||
    "Not Added";

  memberSince.textContent =
    user.createdAt
      ? new Date(
          user.createdAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )
      : "-";

  lastLogin.textContent =
    user.lastLoginAt
      ? new Date(
          user.lastLoginAt
        ).toLocaleDateString(
          "en-IN"
        )
      : "Never";

  avatarFallback.textContent =
    user.name
      ?.charAt(0)
      ?.toUpperCase() || "U";

  /* Avatar */

  if (user.avatar) {

    avatar.src =
      user.avatar;

    avatar.onload = () => {

      avatar.classList.remove(
        "hidden"
      );

      avatarFallback.classList.add(
        "hidden"
      );
    };

    avatar.onerror = () => {

      avatar.classList.add(
        "hidden"
      );

      avatarFallback.classList.remove(
        "hidden"
      );
    };
  }

  /* Stats */

  ordersCount.textContent =
    stats.orderCount || 0;

  wishlistCount.textContent =
    stats.wishlistCount || 0;

  addressCount.textContent =
    stats.addressCount || 0;

  /* Verification */

 emailVerification.innerHTML =
  user.isEmailVerified
    ? `
    <span
      class="
        inline-flex
        items-center
        gap-2
        px-3
        py-1
        rounded-full
        bg-green-50
        text-green-700
        text-sm
        font-medium
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-4 h-4"
      >
        <path
          fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.814a.75.75 0 0 0-1.22-.872l-3.236 4.53-1.545-1.545a.75.75 0 1 0-1.06 1.06l2.167 2.167a.75.75 0 0 0 1.14-.094l3.754-5.246Z"
          clip-rule="evenodd"
        />
      </svg>

      Verified
    </span>
  `
    : `
    <span
      class="
        inline-flex
        items-center
        gap-2
        px-3
        py-1
        rounded-full
        bg-red-50
        text-red-600
        text-sm
        font-medium
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      Not Verified
    </span>
  `;

 phoneVerification.innerHTML =
  user.isPhoneVerified
    ? `
    <span
      class="
        inline-flex
        items-center
        gap-2
        px-3
        py-1
        rounded-full
        bg-green-50
        text-green-700
        text-sm
        font-medium
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-4 h-4"
      >
        <path
          fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.814a.75.75 0 0 0-1.22-.872l-3.236 4.53-1.545-1.545a.75.75 0 1 0-1.06 1.06l2.167 2.167a.75.75 0 0 0 1.14-.094l3.754-5.246Z"
          clip-rule="evenodd"
        />
      </svg>

      Verified
    </span>
  `
    : `
    <span
      class="
        inline-flex
        items-center
        gap-2
        px-3
        py-1
        rounded-full
        bg-gray-100
        text-gray-600
        text-sm
        font-medium
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M18.364 5.636 5.636 18.364"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5.636 5.636 18.364 18.364"
        />
      </svg>

      Not Verified
    </span>
  `;


}

/* ---------------- ADDRESSES ---------------- */

async function loadAddresses() {

  try {

    const res =
      await api.get(
        "/v1/addresses"
      );

    const addresses =
      res.addresses || [];

    currentAddresses =
      addresses;

    addressCount.textContent =
      addresses.length;

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

function renderAddresses(
  addresses
) {

  addressesContainer.innerHTML =
    addresses
      .map(
        (
          address
        ) => `
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

function showProfileError() {

  userName.textContent =
    "Unable to load profile";

  userEmail.textContent =
    "";

  addressesContainer.innerHTML =
    `
    <div class="text-center py-10">

      <p class="text-red-500">
        Something went wrong.
      </p>

    </div>
  `;
}

async function uploadAvatar(
  e
) {
  try {

    const file =
      e.target.files[0];

    if (!file) return;

    const formData =
      new FormData();

    formData.append(
      "avatar",
      file
    );

    const res =
      await api.patch(
        "/v1/auth/profile/avatar",
        formData
      );

    avatar.src =
      res.user.avatar;

    avatar.classList.remove(
      "hidden"
    );

    avatarFallback.classList.add(
      "hidden"
    );

    showToast(
      "Profile photo updated"
    );

  } catch (err) {

    console.error(err);

    showToast(
      "Failed to update photo"
    );
  }
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
          setDefaultAddress(
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




function closeProfileModalFn() {

  profileModal.classList.add(
    "hidden"
  );

  profileModal.classList.remove(
    "flex"
  );
}

closeProfileModal?.addEventListener(
  "click",
  closeProfileModalFn
);




function validateProfileForm() {

  const name =
    profileName.value.trim();

  const phoneNo =
    profilePhone.value.trim();

  if (name.length < 3) {

    showToast(
      "Name must be at least 3 characters"
    );

    return false;
  }

  if (name.length > 50) {

    showToast(
      "Name is too long"
    );

    return false;
  }

  if (
    !/^[a-zA-Z\s]+$/.test(
      name
    )
  ) {

    showToast(
      "Name can contain only letters"
    );

    return false;
  }

  if (
    phoneNo &&
    !/^[0-9]{10}$/.test(
      phoneNo
    )
  ) {

    showToast(
      "Enter a valid 10 digit phone number"
    );

    return false;
  }

  return true;
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


async function setDefaultAddress(
  id
) {

  try {

    await api.patch(
      `/v1/addresses/${id}/default`
    );

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


// scroll lock

function lockScroll() {

 document.body.classList.add(
  "overflow-hidden"
);
}

function unlockScroll() {

  document.body.classList.remove(
  "overflow-hidden"
);
}





editProfileBtn?.addEventListener(
  "click",
  () => {

    profileName.value =
      detailName.textContent;

    profilePhone.value =
      detailPhone.textContent ===
      "Not Added"
        ? ""
        : detailPhone.textContent;

    profileModal.classList.remove(
      "hidden"
    );

    profileModal.classList.add(
      "flex"
    );

    lockScroll();

  }
);





profileForm?.addEventListener(
  "submit",
  async e => {

    e.preventDefault();

    if (
      !validateProfileForm()
    ) {
      return;
    }

    try {

      const res =
        await api.patch(
          "/v1/auth/profile",
          {
            name:
              profileName.value.trim(),

            phone:
              profilePhone.value.trim(),
          }
        );

      detailName.textContent =
        res.user.name;

      detailPhone.textContent =
        res.user.phone ||
        "Not Added";

      userName.textContent =
        res.user.name;

      closeProfileModalFn();

      showToast(
        "Profile updated"
      );

    } catch (err) {

      showToast(
        err.message ||
        "Failed to update profile"
      );

    }

  }
);




/* ---------------- DELETE MODAL EVENTS ---------------- */

cancelDeleteBtn?.addEventListener(
  "click",
  closeDeleteModal
);

deleteModal?.addEventListener(
  "click",
  e => {

    if (
      e.target === deleteModal
    ) {
      closeDeleteModal();
    }

  }
);

confirmDeleteBtn?.addEventListener(
  "click",
  async () => {

    if (
      !selectedAddressId
    ) return;

    try {

      await api.delete(
        `/v1/addresses/${selectedAddressId}`
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


















addAddressBtn?.addEventListener(
  "click",
  () => {

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
);




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

        await api.put(
          `/v1/addresses/${addressId.value}`,
          payload
        );

        showToast(
          "Address updated"
        );

      } else {

        await api.post(
          "/v1/addresses",
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






const closeAddressModalBtn =
  document.getElementById(
    "closeAddressModal"
  );

closeAddressModalBtn?.addEventListener(
  "click",
  closeAddressModal
);

addressModal?.addEventListener(
  "click",
  e => {

    if (
      e.target === addressModal
    ) {

      closeAddressModal();

      unlockScroll();

    }

  }
);

