const SHARE_OPTIONS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    color: "bg-green-50 border-green-200 hover:bg-green-100",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.52 3.48A11.79 11.79 0 0012.04 0C5.42 0 .04 5.38.04 12c0 2.12.56 4.18 1.62 6L0 24l6.18-1.62A11.96 11.96 0 0012.04 24c6.62 0 12-5.38 12-12 0-3.2-1.25-6.2-3.52-8.52z"/>
      </svg>
    `,
  },
  {
    id: "telegram",
    label: "Telegram",
    color: "bg-sky-50 border-sky-200 hover:bg-sky-100",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.9 15.6l-.4 5.7c.6 0 .9-.3 1.3-.7l3.1-3 6.5 4.8c1.2.7 2 .3 2.3-1.1L24 2.5C24 .7 23.3 0 21.9.5L1.1 8.5C-.3 9 .1 9.8 1.8 10.3l5.3 1.7L19.3 4.5c.6-.4 1.2-.2.8.2"/>
      </svg>
    `,
  },
  {
    id: "facebook",
    label: "Facebook",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0022 12z"/>
      </svg>
    `,
  },
  {
    id: "twitter",
    label: "X",
    color: "bg-gray-100 border-gray-300 hover:bg-gray-200",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-black" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.9 2H22l-6.8 7.7L23 22h-6.2l-4.8-6.2L6.6 22H2.8l7.3-8.2L1 2h6.3l4.3 5.6z"/>
      </svg>
    `,
  },
  {
    id: "email",
    label: "Email",
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="5" width="18" height="14" rx="2"/>
        <path d="M3 7l9 6 9-6"/>
      </svg>
    `,
  },
];

export function renderShareModal(shareData) {
  return `
<div
  id="shareModal"
  class="fixed inset-0 z-[99999] hidden"
  role="dialog"
  aria-modal="true"
  aria-labelledby="shareModalTitle"
>

  <!-- Backdrop -->
  <div
    id="shareBackdrop"
    class="absolute inset-0 bg-black/50 backdrop-blur-sm"
  ></div>

  <!-- Modal -->
  <div
    class="relative mx-auto mt-10 w-[92%] max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden animate-[fadeIn_.25s_ease]"
  >

    ${renderHeader()}

    <div class="p-6 space-y-6">

      ${renderPlatforms()}

      ${renderCopyLink(shareData)}

    </div>

  </div>

</div>
`;
}

function renderHeader() {
  return `
<div class="border-b px-6 py-5">

  <div class="flex items-center justify-between">

    <div>

      <h2
        id="shareModalTitle"
        class="text-xl font-semibold"
      >
        Share Product
      </h2>

      <p class="mt-1 text-sm text-gray-500">
        Share this jewellery with friends.
      </p>

    </div>

    <button
      id="closeShareModal"
      class="text-3xl text-gray-400 hover:text-black transition"
      aria-label="Close"
    >
      &times;
    </button>

  </div>

</div>
`;
}

function renderPlatforms() {
  return `
<div>

  <h3 class="mb-4 text-sm font-medium text-gray-700">
    Share via
  </h3>

  <div class="grid grid-cols-3 gap-3">

    ${SHARE_OPTIONS.map(renderPlatformCard).join("")}

  </div>

</div>
`;
}

function renderPlatformCard(platform) {
  return `
<button
  type="button"
  data-platform="${platform.id}"
  class="
    rounded-2xl
    border
    ${platform.color}
    p-4
    transition-all
    duration-300
    hover:shadow-lg
    hover:-translate-y-1
  "
>

  <div class="flex justify-center mb-2">
    ${platform.icon}
  </div>

  <div class="text-sm font-medium text-gray-800">
    ${platform.label}
  </div>

</button>
`;
}

function renderCopyLink(shareData) {
  return `
<div>

  <h3 class="mb-3 text-sm font-medium text-gray-700">
    Product Link
  </h3>

  <div class="flex overflow-hidden rounded-xl border">

    <input
      id="shareLinkInput"
      type="text"
      readonly
      value="${shareData.url}"
      class="flex-1 bg-gray-50 px-4 py-3 text-sm outline-none"
    />

    <button
      id="copyShareLink"
      class="
        border-l
        px-5
        text-sm
        font-medium
        text-[#6B1A2A]
        hover:bg-[#6B1A2A]
        hover:text-white
        transition
      "
    >
      Copy
    </button>

  </div>

</div>
`;
}
