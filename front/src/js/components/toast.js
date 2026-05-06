let toastTimeout;

export function showToast(message) {

  const toast = document.getElementById("toast");

  if (!toast) return;

  clearTimeout(toastTimeout);

  toast.textContent = message;

  toast.classList.remove("hidden");

  toastTimeout = setTimeout(() => {
    toast.classList.add("hidden");
  }, 2000);
}
