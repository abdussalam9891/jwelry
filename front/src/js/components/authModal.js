// ─── State ───────────────────────────────────────────────────

let modal = null;
let isInitialized = false;

// ─── Init (lazy — sirf tab load hoga jab pehli baar chahiye) ─

async function initModal() {
  if (isInitialized) return;

  try {
    const res = await fetch("/front/src/htmlComponents/authModal.html");
    if (!res.ok) throw new Error(`Auth modal failed to load: ${res.status}`);

    const html = await res.text();
    document.body.insertAdjacentHTML("beforeend", html);

    modal = document.getElementById("authModal");
    const closeBtn = document.getElementById("closeModal");

    if (!modal) throw new Error("authModal element not found in HTML");

    // Close button
    closeBtn?.addEventListener("click", closeAuthModal);

    // Click outside to close
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeAuthModal();
    });

    // Google login
    document.getElementById("google-btn")?.addEventListener("click", () => {
      window.location.href = `${CONFIG.API_BASE}/api/auth/google`;
    });

    isInitialized = true;
  } catch (err) {
    console.error("[AuthModal]", err);
  }
}

// ─── Public API ──────────────────────────────────────────────

export async function openAuthModal() {
  await initModal(); // pehli baar fetch karega, baad mein skip
  modal?.classList.remove("hidden");
  modal?.classList.add("flex");
}

function closeAuthModal() {
  modal?.classList.add("hidden");
  modal?.classList.remove("flex");
}
