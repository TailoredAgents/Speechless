"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Trash2 } from "lucide-react";
import { LaunchForm } from "@/components/launch-form";
import { useStore } from "@/components/store-provider";

export function CartPage() {
  const { items, removeItem } = useStore();

  if (items.length === 0) {
    return <div className="cart-page-empty"><Heart size={48} strokeWidth={1.1} /><p className="sl-kicker">Saved designs</p><h1>Find your message.</h1><p>Save a design and preferred size while you explore the founding collection.</p><Link href="/shop" className="button button--dark">Explore the collection <ArrowRight size={17} /></Link></div>;
  }

  return (
    <section className="cart-page shell">
      <div className="cart-page__heading"><p className="sl-kicker">Your first-drop edit</p><h1>Saved designs.</h1><p>{items.length} {items.length === 1 ? "design" : "designs"} you want to hear about first.</p></div>
      <div className="cart-page__layout">
        <div className="cart-page__items">
          {items.map((item, index) => <article className="cart-page-line" key={`${item.productId}-${item.color}-${item.size}`}><Link href={`/products/${item.slug}`} className="cart-page-line__visual"><Image src={item.image} alt="" width={210} height={245} /></Link><div><p>Founding collection</p><h2><Link href={`/products/${item.slug}`}>{item.name}</Link></h2><span>{item.color} · Size {item.size}</span><Link href={`/products/${item.slug}`} className="text-link">View design</Link></div><button className="cart-page-line__remove" onClick={() => removeItem(index)} aria-label={`Remove ${item.name}`}><Trash2 size={17} /></button></article>)}
        </div>
        <aside className="cart-summary cart-summary--launch"><p className="sl-kicker">Get first access</p><h2>Know when your favorites arrive.</h2><p>Join the first-drop list for launch timing, final garment details, and ordering access.</p><LaunchForm source="saved-page" idPrefix="saved-page" /><Link href="/shop" className="button button--ghost">Keep exploring</Link><small>Your saved designs remain on this device. They are not an order or reservation.</small></aside>
      </div>
    </section>
  );
}
