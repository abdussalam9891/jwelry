export function createUserDropdown() {

  return `

<div
  id="userDropdown"
  class="
    absolute
    right-0
    mt-3
    w-72
    bg-white
    border
    border-black/5
    rounded-3xl
    shadow-2xl
    opacity-0
    pointer-events-none
    transition-all
    duration-200
    z-[1100]
    overflow-hidden
  "
>

  <!-- LOGGED IN CONTENT -->
  <div id="loggedInContent" class="hidden">

    <!-- USER -->
    <div
      class="
        p-5
        border-b
        border-black/5
      "
    >

      <div class="flex items-center gap-3">

        <!-- AVATAR -->
        <div
          class="
            w-12
            h-12
            rounded-full
            overflow-hidden
            bg-[#F6EEF0]
            shrink-0
          "
        >

          <img
            id="dropdownAvatar"
            src=""
            alt="User"
            class="
              w-full
              h-full
              object-cover
            "
          />

        </div>

        <!-- INFO -->
        <div class="min-w-0">

          <p
            id="dropdownName"
            class="
              font-semibold
              truncate
            "
          >
            --
          </p>

          <p
            id="dropdownEmail"
            class="
              text-sm
              text-black/45
              truncate
              mt-0.5
            "
          >
            --
          </p>

        </div>

      </div>

    </div>



    <!-- LINKS -->
    <div class="p-2">

      <!-- ORDERS -->
      <a
        href="/front/pages/orders.html"
        class="
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          hover:bg-[#FAFAFA]
          transition
        "
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.8"
          stroke="currentColor"
          class="w-5 h-5 text-black/60"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M20.25 7.5v10.125c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 0 1 3.75 17.625V7.5m16.5 0-2.28-2.28a1.125 1.125 0 0 0-.795-.33H6.825c-.298 0-.584.118-.795.33L3.75 7.5"
          />
        </svg>

        <span class="text-sm">
          My Orders
        </span>

      </a>



      <!-- WISHLIST -->
      <a
        href="/front/pages/wishlist.html"
        class="
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          hover:bg-[#FAFAFA]
          transition
        "
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.8"
          stroke="currentColor"
          class="w-5 h-5 text-black/60"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5-1.74 0-3.247.99-4 2.437-.753-1.446-2.26-2.437-4-2.437-2.485 0-4.5 2.015-4.5 4.5 0 7.22 8.5 12 8.5 12s8.5-4.78 8.5-12z"
          />
        </svg>

        <span class="text-sm">
          Wishlist
        </span>

      </a>

    </div>



    <!-- FOOTER -->
    <div
      class="
        p-3
        border-t
        border-black/5
      "
    >

      <button
        id="logoutBtn"
        class="
          w-full
          h-11
          rounded-2xl
          bg-[#6B1A2A]
          text-white
          text-sm
          font-medium
          hover:opacity-90
          transition
        "
      >
        Logout
      </button>

    </div>

  </div>



  <!-- LOGGED OUT -->
  <div
    id="loggedOutContent"
    class="p-4"
  >

    <a
      href="/front/pages/auth.html"
      class="
        w-full
        h-11
        rounded-2xl
        bg-[#6B1A2A]
        text-white
        text-sm
        font-medium
        flex
        items-center
        justify-center
        hover:opacity-90
        transition
      "
    >
      Login / Signup
    </a>

  </div>

</div>

  `;

}
