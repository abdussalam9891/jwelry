export function createUserDropdown() {
  return `
<div
  id="userDropdown"
  class="
    absolute
    right-0
    mt-3
    w-80
    bg-white
    rounded-3xl
    border
    border-black/5
    shadow-[0_18px_50px_rgba(0,0,0,0.08)]
    opacity-0
    pointer-events-none
    translate-y-2
    transition-all
    duration-200
    z-[1100]
    overflow-hidden
  "
>

  <!-- LOGGED IN -->
  <div id="loggedInContent" class="hidden">

    <!-- USER HEADER -->
    <div class="px-5 pt-5 pb-4 border-b border-black/5">

      <div class="flex items-center gap-4">

        <!-- AVATAR -->
        <div
          class="
            w-14
            h-14
            rounded-full
            overflow-hidden
            bg-[#F6EEF0]
            flex
            items-center
            justify-center
            text-[#6B1A2A]
            font-semibold
            text-lg
            shrink-0
          "
        >
          <img
            id="dropdownAvatar"
            src=""
            alt=""
            class="w-full h-full object-cover hidden"
          />

         <span id="avatarFallback">U</span>
        </div>

        <!-- INFO -->
        <div class="min-w-0 flex-1">
       <p
  id="dropdownName"
  class="font-semibold text-[15px] text-black truncate"
>
  --
</p>

        <p
  id="dropdownEmail"
  class="text-sm text-black/45 truncate mt-0.5"
>
  --
</p>

         <a
  href="/front/pages/profile.html"
  class="
    mt-2
    inline-block
    text-xs
    font-medium
    text-[#6B1A2A]
    hover:underline
  "
>
  View Profile
</a>
        </div>
      </div>
    </div>

    <!-- MENU -->
    <div class="p-2">

      <!-- Orders -->
      <a
        href="/front/pages/orders.html"
        class="
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          hover:bg-[#F8F8F8]
          transition
        "
      >
       <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.8"
  stroke="currentColor"
  class="w-5 h-5 text-black/60 shrink-0"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M21 8.25V6.108c0-1.135-.845-2.098-1.98-2.193a48.424 48.424 0 0 0-14.04 0C3.845 4.01 3 4.973 3 6.108V8.25m18 0v10.638c0 1.135-.845 2.098-1.98 2.193a48.37 48.37 0 0 1-14.04 0A2.186 2.186 0 0 1 3 18.888V8.25m18 0a48.67 48.67 0 0 0-18 0"
  />
</svg>
        <span class="text-sm font-medium">Orders</span>
      </a>

      <!-- Wishlist -->
      <a
        href="/front/pages/wishlist.html"
        class="
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          hover:bg-[#F8F8F8]
          transition
        "
      >
       <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.8"
  stroke="currentColor"
  class="w-5 h-5 text-black/60 shrink-0"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M21.435 6.582a5.94 5.94 0 0 0-8.388 0L12 7.63l-1.046-1.048a5.94 5.94 0 1 0-8.4 8.396l1.048 1.047L12 21.35l8.398-5.325 1.047-1.047a5.94 5.94 0 0 0-.01-8.396Z"
  />
</svg>
        <span class="text-sm font-medium">Wishlist</span>
      </a>



       <!-- cart -->
      <a
        href="/front/pages/cart.html"
        class="
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-2xl
          hover:bg-[#F8F8F8]
          transition
        "
      >
   <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.8"
  stroke="currentColor"
  class="w-5 h-5 text-black/60 shrink-0"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M2.25 3h1.5l1.5 9h11.25l1.5-6.75H6.375M9 19.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm10.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
  />
</svg>

<span class="text-sm font-medium">
  Cart
</span>
      </a>




    </div>

    <!-- FOOTER -->
    <div class="border-t border-black/5 px-4 py-3">
      <button
        id="logoutBtn"
        class="
          w-full
          text-sm
          font-medium
          py-2.5
          rounded-xl
          text-[#6B1A2A]
          hover:bg-[#F9F3F4]
          transition
        "
      >
        Logout
      </button>
    </div>
  </div>

  <!-- LOGGED OUT -->
  <div id="loggedOutContent" class="p-5">
    <p class="text-sm font-medium text-black">
      Welcome
    </p>

    <p class="text-xs text-black/50 mt-1">
      Login to access orders, wishlist & profile
    </p>

    <a
      href="#"
      class="
        loginBtn
        mt-4
        w-full
        h-11
        rounded-xl
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
