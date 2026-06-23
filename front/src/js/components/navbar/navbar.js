import { createAnnouncementBar } from "./announcementBar.js";
import { createCategoryNav } from "./categoryNav.js";
import { createMainNavbar } from "./mainNavbar.js";
import { createMobileDrawer } from "./mobileDrawer.js";

export function createNavbar(user = null) {
  return `

    ${createMobileDrawer(user)}
     ${createAnnouncementBar()}
    ${createMainNavbar()}
    ${createCategoryNav()}
  `;
}
