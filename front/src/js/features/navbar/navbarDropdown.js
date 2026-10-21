export function initUserDropdown() {

  const userWrapper =
    document.querySelector(
      '[data-user="trigger"]'
    )?.parentElement;

  const userDropdown =
    document.getElementById(
      "userDropdown"
    );

  let userTimeout;

  if (
    !userWrapper ||
    !userDropdown
  ) return;

  function openDropdown() {

    clearTimeout(userTimeout);

    userDropdown.style.opacity = "1";

    userDropdown.style.pointerEvents =
      "auto";

    userDropdown.style.transform =
      "translateY(0)";

  }

  function closeDropdown() {

    userTimeout = setTimeout(() => {

      userDropdown.style.opacity = "0";

      userDropdown.style.pointerEvents =
        "none";

      userDropdown.style.transform =
        "translateY(6px)";

    }, 150);

  }

  userWrapper.addEventListener(
    "mouseenter",
    openDropdown
  );

  userWrapper.addEventListener(
    "mouseleave",
    closeDropdown
  );

}
