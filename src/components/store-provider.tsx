"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types/catalog";

type StoreContextValue = {
  items: CartItem[];
  itemCount: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
  openCart: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const storageKey = "speechless-launch-bag";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as Array<CartItem & { priceCents?: number | null }>;
        // Local storage is an external browser system; hydration intentionally completes after mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(parsed.map((item) => ({ ...item, priceCents: item.priceCents ?? null })));
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, loaded]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (entry) => entry.productId === item.productId && entry.color === item.color && entry.size === item.size,
      );
      if (existingIndex === -1) return [...current, { ...item, quantity: 1 }];
      return current.map((entry, index) =>
        index === existingIndex ? { ...entry, quantity: entry.quantity + 1 } : entry,
      );
    });
    setDrawerOpen(true);
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event: "add_to_cart", path: `/products/${item.slug}`, productId: item.productId }),
      keepalive: true,
    });
  }, []);

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      addItem,
      updateQuantity: (index: number, quantity: number) =>
        setItems((current) =>
          quantity < 1
            ? current.filter((_, itemIndex) => itemIndex !== index)
            : current.map((entry, itemIndex) => (itemIndex === index ? { ...entry, quantity } : entry)),
        ),
      removeItem: (index: number) => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index)),
      openCart: () => setDrawerOpen(true),
    }),
    [addItem, items],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div
        className={`cart-backdrop ${drawerOpen ? "is-open" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside className={`cart-drawer ${drawerOpen ? "is-open" : ""}`} aria-hidden={!drawerOpen} role="dialog" aria-modal="true" aria-label="Shopping bag">
        <div className="cart-drawer__header">
          <div>
          <p className="eyebrow">Your selections</p>
            <h2>Your bag</h2>
          </div>
          <button className="icon-button" onClick={() => setDrawerOpen(false)} aria-label="Close shopping bag">
            <X size={20} />
          </button>
        </div>
        <p className="cart-drawer__notice">
          Founder-preview checkout is simulated. No payment or order will be created.
        </p>
        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <div className="empty-bag">
              <ShoppingBag strokeWidth={1.2} size={42} />
              <h3>Your first tee is waiting.</h3>
              <p>Add a launch mockup and experience the complete founder-preview store flow.</p>
              <Link href="/shop" className="text-link" onClick={() => setDrawerOpen(false)}>
                Explore the concepts
              </Link>
            </div>
          ) : (
            items.map((item, index) => (
              <article className="cart-line" key={`${item.productId}-${item.color}-${item.size}`}>
                <div className="cart-line__visual"><Image src={item.image} alt="" width={112} height={128} className="cart-line__image" /></div>
                <div className="cart-line__body">
                  <Link href={`/products/${item.slug}`} onClick={() => setDrawerOpen(false)}>
                    <h3>{item.name}</h3>
                  </Link>
                  <p>{item.color} · {item.size} · {formatPrice(item.priceCents)}</p>
                  <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                    <button onClick={() => value.updateQuantity(index, item.quantity - 1)} aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => value.updateQuantity(index, item.quantity + 1)} aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button className="remove-link" onClick={() => value.removeItem(index)}>Remove</button>
                </div>
              </article>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <Link href="/cart" className="button button--dark" onClick={() => setDrawerOpen(false)}>
              Review bag
            </Link>
            <Link href="/checkout" className="button button--outline" onClick={() => setDrawerOpen(false)}>
              Preview checkout
            </Link>
          </div>
        )}
      </aside>
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
