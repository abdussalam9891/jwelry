import { createMobileDrawer } from "./mobileDrawer.js";
import { createMainNavbar } from "./mainNavbar.js";
import { createCategoryNav } from "./categoryNav.js";

export function createNavbar(
  user = null
) {
  return `
    ${createMobileDrawer(user)}
    ${createMainNavbar()}
    ${createCategoryNav()}
  `;
}
