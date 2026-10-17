"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import * as cartService from "@/lib/services/cartService";

const CartContext = createContext(null);

export const MAX_CART_QTY = 3;

const EMPTY_CART = { items: [], pricing: null };

export function CartProvider({ children }) {
  const { user } = useAuth();

  const [cart, setCart] = useState(EMPTY_CART);
  const [loaded, setLoaded] = useState(false);

  const loadCart = useCallback(async () => {
    const data = await cartService.getCart();

    const next = {
      items: data?.items || [],
      pricing: data?.pricing || null,
    };

    setCart(next);
    setLoaded(true);

    return next;
  }, []);

  useEffect(() => {
    if (!user) {
      setCart(EMPTY_CART);
      setLoaded(false);
      return;
    }

    loadCart().catch((err) => console.error("Failed to load cart", err));
  }, [user, loadCart]);

  const addToCart = useCallback(
    async (productId, variantId = null) => {
      const response = await cartService.addToCart(productId, variantId);
      await loadCart();
      return response;
    },
    [loadCart],
  );

  // Throws with a user-facing message when the per-item limit is hit.
  const changeQuantity = useCallback(
    async (itemId, delta) => {
      const item = cart.items.find((i) => i._id === itemId);

      if (!item) return;

      const quantity = item.quantity + delta;

      if (quantity > MAX_CART_QTY) {
        throw new Error(
          `You can only purchase up to ${MAX_CART_QTY} units of this item`,
        );
      }

      if (quantity <= 0) {
        await cartService.removeCartItem(itemId);
      } else {
        await cartService.updateCartItem(itemId, quantity);
      }

      await loadCart();
    },
    [cart.items, loadCart],
  );

  const removeItem = useCallback(
    async (itemId) => {
      await cartService.removeCartItem(itemId);
      await loadCart();
    },
    [loadCart],
  );

  const count = useMemo(
    () => cart.items.reduce((total, item) => total + (item.quantity || 0), 0),
    [cart.items],
  );

  const value = useMemo(
    () => ({
      items: cart.items,
      pricing: cart.pricing,
      count,
      loaded,
      loadCart,
      addToCart,
      changeQuantity,
      removeItem,
    }),
    [cart, count, loaded, loadCart, addToCart, changeQuantity, removeItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
