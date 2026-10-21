export function updateDropdownUser(user) {
  const nameEl =
    document.getElementById("dropdownName");

  const emailEl =
    document.getElementById("dropdownEmail");

  const avatarEl =
    document.getElementById("dropdownAvatar");

  const fallbackEl =
    document.getElementById("avatarFallback");

  if (!user) return;

  // name
  nameEl.textContent =
    user.name || "User";

  // email
  emailEl.textContent =
    user.email || "";

  // avatar
  if (user.avatar) {
    avatarEl.src = user.avatar;
    avatarEl.classList.remove("hidden");
    fallbackEl.classList.add("hidden");
  } else {
    fallbackEl.textContent =
      user.name?.charAt(0)?.toUpperCase() || "U";
  }
}
