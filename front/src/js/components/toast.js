 




export function showToast(message) {
  const toast = document.createElement("div");

  toast.className =
    "fixed bg-black text-white px-4 py-2 rounded-lg shadow-lg text-sm";

  toast.style.top = window.innerWidth < 768 ? "80px" : "140px";
  toast.style.right = "16px";
  toast.style.zIndex = "999999";

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}
