'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { addCartItem, cartKey, normalizeCart, type CartItem, type PurchasePlan } from '@/lib/cart';
import { products } from '@/lib/products';

type StoreContextValue = {
  items: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addItem: (slug: string, plan?: PurchasePlan, quantity?: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
};
const StoreContext = createContext<StoreContextValue | null>(null);
const STORAGE_KEY = 'three-bag-v1';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        setItems(
          normalizeCart(
            JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
            products.map((p) => p.slug),
          ),
        );
      } catch {
        setItems([]);
      }
      setLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        /* The bag remains available in memory when storage is unavailable. */
      }
    }
  }, [items, loaded]);
  const addItem = useCallback((slug: string, plan: PurchasePlan = 'once', quantity = 1) => {
    if (!products.some((p) => p.slug === slug)) return;
    setItems((current) => addCartItem(current, { slug, plan, quantity }));
    setCartOpen(true);
  }, []);
  const updateQuantity = (key: string, quantity: number) =>
    setItems((current) =>
      current.map((item) =>
        cartKey(item) === key ? { ...item, quantity: Math.min(20, Math.max(1, quantity)) } : item,
      ),
    );
  const removeItem = (key: string) =>
    setItems((current) => current.filter((item) => cartKey(item) !== key));
  return (
    <StoreContext.Provider
      value={{ items, cartOpen, setCartOpen, addItem, updateQuantity, removeItem }}
    >
      {children}
    </StoreContext.Provider>
  );
}
export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error('StoreProvider is required');
  return store;
}
