"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Heart, X } from "lucide-react";
import { LaunchForm } from "@/components/launch-form";
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
const storageKey = "speechless-saved-designs";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);

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
    if (!drawerOpen) return () => { document.body.style.overflow = ""; };
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])');
    focusable?.[0]?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDrawerOpen(false);
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [drawerOpen]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (entry) => entry.productId === item.productId && entry.color === item.color && entry.size === item.size,
      );
      if (existingIndex === -1) return [...current, { ...item, quantity: 1 }];
      return current;
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
      <aside ref={drawerRef} className={`cart-drawer ${drawerOpen ? "is-open" : ""}`} aria-hidden={!drawerOpen} role="dialog" aria-modal="true" aria-label="Saved designs">
        <div className="cart-drawer__header">
          <div>
          <p className="eyebrow">Your first-drop edit</p>
            <h2>Saved designs</h2>
          </div>
          <button className="icon-button" onClick={() => setDrawerOpen(false)} aria-label="Close saved designs">
            <X size={20} />
          </button>
        </div>
        <p className="cart-drawer__notice">
          Keep the designs and sizes you want to hear about when the first drop opens.
        </p>
        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <div className="empty-bag">
              <Heart strokeWidth={1.2} size={42} />
              <h3>Find the message that fits.</h3>
              <p>Save a design and preferred size while you explore the founding collection.</p>
              <Link href="/shop" className="text-link" onClick={() => setDrawerOpen(false)}>
                Explore the collection
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
                  <p>{item.color} · Size {item.size}</p>
                  <button className="remove-link" onClick={() => value.removeItem(index)}>Remove</button>
                </div>
              </article>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-drawer__footer cart-drawer__footer--saved">
            <LaunchForm compact source="saved-drawer" idPrefix="saved-drawer" />
            <Link href="/cart" className="button button--dark" onClick={() => setDrawerOpen(false)}>
              Review saved designs
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
