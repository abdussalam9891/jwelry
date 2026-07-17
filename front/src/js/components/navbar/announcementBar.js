import { getAnnouncementBar } from "../../services/announcementService.js";

export function createAnnouncementBarShell() {
  return `<div id="announcementBar" class="hidden"></div>`;
}

export async function initAnnouncementBar () {
 console.log("Announcement init");

  const container = document.getElementById("announcementBar");
  console.log("Container:", container);

  if (!container) return;

  try {
    const announcement = await getAnnouncementBar();

     console.log("Announcement:", announcement);

    // Backend returns null when there is no active announcement
    if (!announcement) {
      return;
    }

    // Respect session dismiss
    if (
      sessionStorage.getItem("announcementDismissed") ===
      announcement.message
    ) {
      return;
    }

    const content = announcement.link
      ? `
        <a
          href="${announcement.link}"
          class="hover:underline"
        >
          ${announcement.message}
        </a>
      `
      : `
        <span>${announcement.message}</span>
      `;

    container.className = `
      fixed
      top-0
      left-0
      right-0
      z-[1001]
      h-10
      flex
      items-center
      justify-center
      bg-[#6B1A2A]
      text-white
      transition-transform
      duration-300
    `;

    container.innerHTML = `
      ${content}

      <button
        id="dismissAnnouncement"
        class="absolute right-4 text-white/70 transition hover:text-white"
        aria-label="Dismiss announcement"
      >
        ✕
      </button>
    `;

    document
      .getElementById("dismissAnnouncement")
      ?.addEventListener("click", () => {
        sessionStorage.setItem(
          "announcementDismissed",
          announcement.message
        );

        container.remove();
      });
  } catch (error) {
    console.error("[AnnouncementBar]", error);
  }
}




















// export function createAnnouncementBar() {
//   return `
//    <div
//   id="announcementBar"
//   class="
//     fixed
//     top-0
//     left-0
//     right-0
//     z-[1001]
//     transition-transform
//     duration-300
//     bg-[#6B1A2A]
//     text-white
//     h-10
//     flex
//     items-center
//     justify-center
//   "
// >
//       <span id="announcementText">
//         Free Shipping Across India
//       </span>
//     </div>
//   `;
// }
