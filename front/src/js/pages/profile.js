import Auth from "../core/auth.js";

import { showToast } from "../components/toast.js";

import {
  initAddressManager,
} from "../features/addressManager.js";

initAddressManager({
  containerId: "addressesContainer",
  mode: "manage",
});


import {
  getProfile,
  updateProfile,

} from "../services/profileService.js";

import {
  uploadAvatar as uploadAvatarService,
} from "../services/profileService.js";


















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

  const avatarInput =
  document.getElementById(
    "avatarInput"
  );

const avatarFallback =
  document.getElementById(
    "avatarFallback"
  );


  const changeAvatarBtn =
  document.getElementById(
    "changeAvatarBtn"
  );

avatarInput?.addEventListener(
  "change",
  handleAvatarUpload
);

changeAvatarBtn?.addEventListener(
  "click",
  () => avatarInput.click()
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
  const authUser =
    await Auth.requireAuth();

  if (!authUser) return;

  await initAddressManager({
    containerId:
      "addressesContainer",
    mode: "manage",
  });

  const profile =
    await getProfile();

  renderUser(
    profile.user,
    profile.stats
  );
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













function showProfileError() {

  userName.textContent =
    "Unable to load profile";

  userEmail.textContent =
    "";

 showToast(
  "Failed to load profile"
);
}

async function handleAvatarUpload(e) {
  try {
    const file =
      e.target.files[0];

    if (!file) return;

    const res =
      await uploadAvatarService(file);

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






function closeProfileModalFn() {

  profileModal.classList.add(
    "hidden"
  );

  profileModal.classList.remove(
    "flex"
  );

  unlockScroll();
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
  await updateProfile({
    name:
      profileName.value.trim(),

    phone:
      profilePhone.value.trim(),
  });

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






