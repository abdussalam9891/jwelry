"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import * as wishlistService from "@/lib/services/wishlistService";

const WishlistContext = createContext(null);

// Holds the ids of wishlisted products (the source of truth for every heart
// icon) and applies changes optimistically, rolling back if the API fails.
export function WishlistProvider({ children }) {
  const { user, openLogin } = useAuth();

  const [ids, setIds] = useState(() => new Set());
  const idsRef = useRef(ids);
  idsRef.current = ids;

  const replaceIds = useCallback((products) => {
    setIds(
      new Set(
        products
          .filter((product) => product?._id)
          .map((product) => String(product._id)),
      ),
    );
  }, []);

  const loadWishlist = useCallback(async () => {
    const products = await wishlistService.getWishlist();
    replaceIds(products);
    return products;
  }, [replaceIds]);

  useEffect(() => {
    if (!user) {
      setIds(new Set());
      return;
    }

    loadWishlist().catch((err) =>
      console.error("Failed to load wishlist", err),
    );
  }, [user, loadWishlist]);

  const setMembership = useCallback((id, member) => {
    setIds((current) => {
      const next = new Set(current);
      member ? next.add(id) : next.delete(id);
      return next;
    });
  }, []);

  const toggle = useCallback(
    async (productId) => {
      if (!user) {
        openLogin();
        return;
      }

      const id = String(productId);
      const wasSaved = idsRef.current.has(id);

      setMembership(id, !wasSaved);

      try {
        if (wasSaved) {
          await wishlistService.removeFromWishlist(id);
        } else {
          await wishlistService.addToWishlist(id);
        }
      } catch (err) {
        console.error("Wishlist update failed, rolling back:", err);
        setMembership(id, wasSaved);
      }
    },
    [user, openLogin, setMembership],
  );

  const add = useCallback(
    async (productId) => {
      if (!user) {
        openLogin();
        return;
      }

      const id = String(productId);

      if (idsRef.current.has(id)) return;

      setMembership(id, true);

      try {
        await wishlistService.addToWishlist(id);
      } catch (err) {
        setMembership(id, false);
        throw err;
      }
    },
    [user, openLogin, setMembership],
  );

  const remove = useCallback(
    async (productId) => {
      const id = String(productId);

      setMembership(id, false);

      try {
        await wishlistService.removeFromWishlist(id);
      } catch (err) {
        setMembership(id, true);
        throw err;
      }
    },
    [setMembership],
  );

  const has = useCallback((productId) => ids.has(String(productId)), [ids]);

  const value = useMemo(
    () => ({
      count: ids.size,
      has,
      toggle,
      add,
      remove,
      loadWishlist,
      replaceIds,
    }),
    [ids, has, toggle, add, remove, loadWishlist, replaceIds],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
