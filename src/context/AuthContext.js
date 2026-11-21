"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import AuthModal from "@/components/auth/AuthModal";
import {
  getCurrentUser,
  logout as logoutRequest,
} from "@/lib/services/authService";

const AuthContext = createContext(null);

export const REDIRECT_AFTER_LOGIN_KEY = "redirectAfterLogin";

export function AuthProvider({ children }) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);

  const refreshUser = useCallback(async () => {
    const current = await getCurrentUser();
    setUser(current);
    setLoading(false);
    return current;
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const openLogin = useCallback(() => setLoginOpen(true), []);
  const closeLogin = useCallback(() => setLoginOpen(false), []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.error("Logout failed:", err);
    }

    setUser(null);
    router.replace("/");
  }, [router]);

  // Navigates to a members-only page, or remembers it and asks the visitor
  // to sign in first.
  const goProtected = useCallback(
    async (path) => {
      const current = user || (await refreshUser());

      if (current) {
        router.push(path);
        return;
      }

      sessionStorage.setItem(REDIRECT_AFTER_LOGIN_KEY, path);
      setLoginOpen(true);
    },
    [user, refreshUser, router],
  );

  const value = useMemo(
    () => ({
      user,
      loading,
      refreshUser,
      logout,
      openLogin,
      goProtected,
    }),
    [user, loading, refreshUser, logout, openLogin, goProtected],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal open={loginOpen} onClose={closeLogin} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
