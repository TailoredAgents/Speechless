"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/wordmark";
import { useStore } from "@/components/store-provider";
import { brand } from "@/config/brand";

const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "Founding Drop", href: "/shop#catalog" },
  { label: "For Me", href: "/collections/for-me" },
  { label: "For Families", href: "/collections/family-caregivers" },
  { label: "Our Story", href: "/our-story" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useStore();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="announcement">
        <span>Private founder preview</span>
        <span className="announcement__desktop">Founding collection preview · Adult tees · Checkout demo</span>
      </div>
      <header className="site-header">
        <div className="site-header__inner shell shell--wide">
          <button className="mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-navigation">
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
            <Link href="/shop" className="header-shop-button">Shop collection</Link>
            <button className="icon-button bag-button" onClick={openCart} aria-label={`Open shopping bag with ${itemCount} items`}>
              <ShoppingBag size={19} />
              {itemCount > 0 && <span>{itemCount}</span>}
            </button>
          </div>
        </div>
      </header>
      <div id="mobile-navigation" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-modal="true" aria-label="Site navigation">
        <div className="mobile-menu__top">
          <Wordmark />
          <button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{ transitionDelay: `${index * 35}ms` }}>
              <span>0{index + 1}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <p>Different ways to communicate.<br />One community.</p>
          <Link href="/our-approach" className="text-link">What we stand for</Link>
        </div>
      </div>
    </>
  );
}
