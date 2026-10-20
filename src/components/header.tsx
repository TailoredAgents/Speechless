"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/wordmark";
import { brand } from "@/config/brand";

const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "Find Your Tee", href: "/comfort-finder" },
  { label: "Why Speechless", href: "/our-approach" },
  { label: "FAQ", href: "/faq" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const dialog = menuRef.current;
    const trigger = menuTriggerRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusable?.[0]?.focus();
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.removeEventListener("keydown", handleKeyDown); trigger?.focus(); };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner shell shell--wide">
          <button ref={menuTriggerRef} className="mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-navigation">
            <Menu size={22} />
          </button>
          <Link href="/" className="site-logo" aria-label={`${brand.name} home`}>
            <Wordmark />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={pathname === item.href ? "is-active" : ""}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link href="/shop" className="header-shop-button">Shop the tees</Link>
          </div>
        </div>
      </header>
      <div ref={menuRef} id="mobile-navigation" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-modal="true" aria-label="Site navigation">
        <div className="mobile-menu__top">
          <Wordmark />
          <button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{ transitionDelay: `${index * 35}ms` }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <p>Bold tees. Good energy.<br />More than words.</p>
          <Link href="/our-approach" className="text-link">Why Speechless</Link>
        </div>
      </div>
    </>
  );
}
