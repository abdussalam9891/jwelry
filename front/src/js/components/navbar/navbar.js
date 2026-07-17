// import { createAnnouncementBar, loadAnnouncementBar  } from "./announcementBar.js";
// import { createCategoryNav } from "./categoryNav.js";
// import { createMainNavbar } from "./mainNavbar.js";
// import { createMobileDrawer } from "./mobileDrawer.js";

// export function createNavbar(user = null) {
//   return `

//     ${createMobileDrawer(user)}
//      ${createAnnouncementBar()}
//     ${createMainNavbar()}
//     ${createCategoryNav()}
//   `;
// }
// loadAnnouncementBar();






import {
  createAnnouncementBarShell,
  initAnnouncementBar ,
} from "./announcementBar.js";
import { createCategoryNav } from "./categoryNav.js";
import { createMainNavbar } from "./mainNavbar.js";
import { createMobileDrawer } from "./mobileDrawer.js";

export function createNavbar(user = null) {
  return `
    ${createMobileDrawer(user)}
    ${createAnnouncementBarShell()}
    ${createMainNavbar()}
    ${createCategoryNav()}
  `;
}

// Call this AFTER the navbar has been rendered into the DOM.
export { initAnnouncementBar  };
