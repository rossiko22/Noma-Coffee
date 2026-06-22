import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartItem = { slug: string; quantity: number; grind?: string; size?: string };

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (slug: string, opts?: { grind?: string; size?: string; quantity?: number }) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "northbound-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const value = useMemo<CartCtx>(() => {
    const add: CartCtx["add"] = (slug, opts) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.slug === slug && i.grind === opts?.grind && i.size === opts?.size);
        if (existing) {
          return prev.map((i) => (i === existing ? { ...i, quantity: i.quantity + (opts?.quantity ?? 1) } : i));
        }
        return [...prev, { slug, quantity: opts?.quantity ?? 1, grind: opts?.grind, size: opts?.size }];
      });
      setOpen(true);
    };
    const remove: CartCtx["remove"] = (slug) =>
      setItems((prev) => prev.filter((i) => i.slug !== slug));
    const setQty: CartCtx["setQty"] = (slug, qty) =>
      setItems((prev) =>
        qty <= 0 ? prev.filter((i) => i.slug !== slug) : prev.map((i) => (i.slug === slug ? { ...i, quantity: qty } : i)),
      );
    const clear = () => setItems([]);
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => {
      const p = products.find((p) => p.slug === i.slug);
      return sum + (p?.price ?? 0) * i.quantity;
    }, 0);
    return { items, count, subtotal, add, remove, setQty, clear, isOpen, setOpen };
  }, [items, isOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart outside CartProvider");
  return ctx;
}

export function lineProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
