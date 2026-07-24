import { getAnnouncementBar } from "../../services/announcementService.js";

export function createAnnouncementBarShell() {
  return `<div id="announcementBar" class="hidden"></div>`;
}

export async function initAnnouncementBar() {
  const container = document.getElementById("announcementBar");

  if (!container) return;

  try {
    const announcement = await getAnnouncementBar();

    // No active announcement
    if (!announcement) return;

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

    container.innerHTML = content;
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
