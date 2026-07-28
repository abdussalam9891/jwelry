let timeoutId = null;

/**
 * Show a floating toast notification.
 *
 * @param {string} message
 * @param {"success" | "error"} type
 */
export function showShareToast(
  message,
  type = "success"
) {
  let toast = document.getElementById("shareToast");

  if (!toast) {
    toast = document.createElement("div");

    toast.id = "shareToast";

    toast.className = `
      fixed
      left-1/2
      bottom-6
      z-[99999]
      -translate-x-1/2
      rounded-full
      px-5
      py-3
      text-sm
      font-medium
      shadow-xl
      transition-all
      duration-300
      opacity-0
      translate-y-3
      pointer-events-none
    `;

    document.body.appendChild(toast);
  }

  toast.textContent = message;

  toast.classList.remove(
    "bg-green-600",
    "bg-red-600",
    "opacity-0",
    "translate-y-3"
  );

  if (type === "success") {
    toast.classList.add("bg-green-600");
  } else {
    toast.classList.add("bg-red-600");
  }

  toast.classList.add(
    "text-white",
    "opacity-100",
    "translate-y-0"
  );

  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    toast.classList.remove(
      "opacity-100",
      "translate-y-0"
    );

    toast.classList.add(
      "opacity-0",
      "translate-y-3"
    );
  }, 2200);
}
