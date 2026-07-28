import { getSizeGuide } from "./sizeGuideData.js";

/**
 * Render Size Guide Modal
 * @param {Object} product
 */
export function renderSizeGuideModal(product) {
  const guide = getSizeGuide(product.category);

  return `
    <div
      id="sizeGuideModal"
      class="fixed inset-0 z-[9999] hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sizeGuideTitle"
    >

      <!-- Overlay -->
      <div
        id="sizeGuideBackdrop"
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
      ></div>

      <!-- Dialog -->
      <div
        class="relative bg-white w-[95%] md:w-[900px] max-h-[90vh] mx-auto mt-5 md:mt-10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-[fadeIn_.25s_ease]"
      >

        ${renderHeader(guide)}

        <div
          id="sizeGuideContent"
          class="flex-1 overflow-y-auto px-6 py-6 space-y-8"
        >

          ${renderTips(guide)}



          ${renderTableSection(guide)}

          ${renderHelpSection()}

        </div>

      </div>

    </div>
  `;
}

/* ---------------------------------------- */
/* Header */
/* ---------------------------------------- */

function renderHeader(guide) {
  return `
    <div class="border-b bg-white px-6 py-5">

      <div class="flex items-start justify-between gap-6">

        <div>

          <h2
            id="sizeGuideTitle"
            class="text-2xl font-semibold tracking-tight"
          >
            ${guide.title}
          </h2>

          <p class="text-gray-500 mt-1 text-sm">
            ${guide.subtitle}
          </p>

        </div>

        <button
          id="closeSizeGuide"
          aria-label="Close"
          class="text-3xl leading-none text-gray-400 hover:text-black transition"
        >
          &times;
        </button>

      </div>

    </div>
  `;
}

/* ---------------------------------------- */
/* Tips */
/* ---------------------------------------- */

function renderTips(guide) {
  return `
    <section>

      <div
        class="rounded-xl border border-[#E8DCC9] bg-[#F9F6F2] p-5"
      >

        <h3 class="font-semibold text-lg mb-4">

          Before You Measure

        </h3>

        <ul class="space-y-3">

          ${guide.tips
            .map(
              (tip) => `
                <li class="flex gap-3">

                  <div
                    class="mt-[5px] h-2 w-2 rounded-full bg-[#6B1A2A] flex-shrink-0"
                  ></div>

                  <p class="text-sm leading-6 text-gray-700">

                    ${tip}

                  </p>

                </li>
              `
            )
            .join("")}

        </ul>

      </div>

    </section>
  `;
}








/* ---------------------------------------- */
/* Placeholder */
/* ---------------------------------------- */

function renderTableSection(guide) {
  return `
    <section>

      <div class="flex items-center justify-between mb-5">

        <div>

          <h3 class="text-xl font-semibold text-gray-900">
            ${guide.title}
          </h3>

          <p class="text-sm text-gray-500 mt-1">
            Refer to the chart below to choose the correct size.
          </p>

        </div>

      </div>

      <div
        class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
      >

        <div class="overflow-x-auto">

          <table class="min-w-full border-collapse">

            ${renderTableHead(guide.columns)}

            ${renderTableBody(guide.sizes)}

          </table>

        </div>

      </div>

      <p class="mt-4 text-xs text-gray-500 leading-5">
        <strong>Note:</strong> Measurements are approximate and may vary
        slightly depending on the jewelry design. If your measurement falls
        between two sizes, we recommend choosing the larger size for a more
        comfortable fit.
      </p>

    </section>
  `;
}


function renderTableHead(columns) {
  return `
    <thead>

      <tr class="bg-[#F9F6F2]">

        ${columns
          .map(
            (column) => `
              <th
                class="border-b border-gray-200 px-5 py-4 text-left text-sm font-semibold text-gray-800 whitespace-nowrap"
              >
                ${column}
              </th>
            `
          )
          .join("")}

      </tr>

    </thead>
  `;
}



function renderTableBody(rows) {
  return `
    <tbody>

      ${rows
        .map(
          (row, rowIndex) => `
            <tr
              class="
                ${
                  rowIndex % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50"
                }
                hover:bg-[#FFF8F2]
                transition-colors
              "
            >

              ${row
                .map(
                  (cell) => `
                    <td
                      class="border-b border-gray-100 px-5 py-4 text-sm text-gray-700 whitespace-nowrap"
                    >
                      ${cell}
                    </td>
                  `
                )
                .join("")}

            </tr>
          `
        )
        .join("")}

    </tbody>
  `;
}

/* ---------------------------------------- */
/* Footer */
/* ---------------------------------------- */

function renderHelpSection() {
  return `
    <section class="space-y-6">

      <!-- Expert Help -->

      <div class="rounded-2xl border border-[#E8DCC9] bg-[#F9F6F2] p-6">

        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <h3 class="text-xl font-semibold tracking-tight text-gray-900">
              Need Help Choosing Your Size?
            </h3>

            <p class="mt-2 text-sm leading-6 text-gray-600 max-w-md">
              Chat directly with our jewellery expert for personalized sizing
              assistance before placing your order.
            </p>

          </div>

          <a
            href="https://wa.me/919006143335?text=Hi%20Gemora!%20I%20need%20help%20choosing%20the%20right%20jewellery%20size."
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-[#6B1A2A] bg-white px-5 py-2.5 text-sm font-medium text-[#6B1A2A] transition-all duration-300 hover:bg-[#6B1A2A] hover:text-white hover:shadow-md"
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              class="h-5 w-5 fill-current"
            >
              <path d="M19.11 17.44c-.29-.15-1.71-.84-1.97-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.08-.29-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.75-1.63-2.05-.17-.29-.02-.45.13-.59.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.37-.02-.52-.08-.15-.64-1.55-.88-2.12-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.49.08-.74.37-.26.29-.98.96-.98 2.35s1.01 2.74 1.15 2.93c.15.19 1.99 3.04 4.82 4.26.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.12-.26-.19-.55-.34z"/>
              <path d="M16.02 3C8.83 3 3 8.79 3 15.93c0 2.53.74 4.99 2.14 7.09L3 29l6.19-2.02a13.08 13.08 0 006.83 1.89C23.17 28.87 29 23.08 29 15.94 29 8.79 23.17 3 16.02 3zm0 23.5c-2.09 0-4.14-.56-5.93-1.63l-.42-.25-3.68 1.2 1.2-3.58-.27-.44a10.42 10.42 0 01-1.6-5.58c0-5.8 4.76-10.52 10.61-10.52 5.86 0 10.62 4.72 10.62 10.52 0 5.8-4.76 10.52-10.53 10.52z"/>
            </svg>

            <span>Chat on WhatsApp</span>

          </a>

        </div>

      </div>

      <!-- Important Notes -->

      <div class="rounded-xl border border-gray-200 bg-white p-5">

        <h4 class="mb-3 font-semibold text-gray-900">
          Important Notes
        </h4>

        <ul class="space-y-3 text-sm leading-6 text-gray-600">

          <li>• Size charts are intended as a general guide.</li>

          <li>• Different jewellery styles may fit slightly differently.</li>

          <li>• Wider rings generally fit more snugly than slimmer bands.</li>

          <li>• Handmade jewellery may have minor measurement variations.</li>

        </ul>

      </div>

    </section>
  `;
}





/* ---------------------------------------- */
/* Placeholder */
/* ---------------------------------------- */

let initialized = false;

let lastFocusedElement = null;

export function initSizeGuideModal() {
  if (initialized) return;

  initialized = true;

  document.addEventListener("click", handleDocumentClick);

  document.addEventListener("keydown", handleKeyDown);
}


function handleDocumentClick(e) {
  const modal = document.getElementById("sizeGuideModal");

  if (!modal) return;

  if (e.target.closest("#sizeGuideBtn")) {
    openModal(modal);
    return;
  }

  if (
    e.target.closest("#closeSizeGuide") ||
    e.target.id === "sizeGuideBackdrop"
  ) {
    closeModal(modal);
  }
}


function handleKeyDown(e) {
  const modal = document.getElementById("sizeGuideModal");

  if (!modal) return;

  if (modal.classList.contains("hidden")) return;

  if (e.key === "Escape") {
    closeModal(modal);
  }

  if (e.key === "Tab") {
    trapFocus(e, modal);
  }
}



function openModal(modal) {
  lastFocusedElement = document.activeElement;

  modal.classList.remove("hidden");

  document.body.classList.add("overflow-hidden");

  requestAnimationFrame(() => {
    modal
      .querySelector(".relative")
      ?.classList.add("scale-100", "opacity-100");
  });

  const closeBtn = document.getElementById("closeSizeGuide");

  closeBtn?.focus();
}



function closeModal(modal) {
  modal.classList.add("hidden");

  document.body.classList.remove("overflow-hidden");

  lastFocusedElement?.focus();
}




function trapFocus(event, modal) {
  const focusable = modal.querySelectorAll(
    `
      button,
      a,
      input,
      select,
      textarea,
      [tabindex]:not([tabindex="-1"])
    `
  );

  if (!focusable.length) return;

  const first = focusable[0];

  const last = focusable[focusable.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === first) {
      event.preventDefault();

      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      event.preventDefault();

      first.focus();
    }
  }
}
