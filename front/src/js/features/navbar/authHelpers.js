import { openAuthModal } from "../../components/authModal.js";
import { closeMobileDrawer } from "../../features/navbar/navbarMobile.js";

export async function openLoginFlow() {
  // Close mobile drawer only on mobile
  if (window.innerWidth < 768) {
    closeMobileDrawer();
  }

  await openAuthModal();
}
