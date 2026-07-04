export function attachDescriptionEvents() {
  const desc = document.getElementById("descContent");
  const btn = document.getElementById("toggleDescBtn");
  const fade = document.getElementById("descFade");

  if (!desc || !btn) return;

  let expanded = false;

  btn.onclick = () => {
    expanded = !expanded;

    if (expanded) {
      desc.classList.remove("max-h-[90px]");
      desc.classList.add("max-h-[500px]");

      fade?.classList.add("hidden");

      btn.textContent = "Show Less";
    } else {
      desc.classList.remove("max-h-[500px]");
      desc.classList.add("max-h-[90px]");

      fade?.classList.remove("hidden");

      btn.textContent = "Show More";
    }
  };

  // Hide button if description is short
  requestAnimationFrame(() => {
    if (desc.scrollHeight <= 90) {
      btn.style.display = "none";
      fade?.classList.add("hidden");
    }
  });
}
