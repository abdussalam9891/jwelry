"use client";

import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(() => {});

const TOAST_DURATION = 3000;

let nextId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message) => {
    if (!message) return;

    const id = ++nextId;

    setToasts((current) => [...current, { id, message }]);

    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, TOAST_DURATION);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      <div
        aria-live="polite"
        className="fixed right-4 top-20 md:top-[140px] z-[var(--z-toast)] flex flex-col items-end gap-2 pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="bg-black text-white px-4 py-2 rounded-lg shadow-lg text-sm"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
