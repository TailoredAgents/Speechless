"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LockKeyhole, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/components/store-provider";
import { formatPrice } from "@/lib/utils";

export function CartPage() {
  const { items, itemCount, updateQuantity, removeItem } = useStore();
  const pricingComplete = items.every((item) => item.priceCents !== null);
  const subtotal = items.reduce((sum, item) => sum + (item.priceCents ?? 0) * item.quantity, 0);
  if (items.length === 0) {
    return <div className="cart-page-empty"><ShoppingBag size={48} strokeWidth={1.1} /><p className="sl-kicker">Your bag</p><h1>Make the first move.</h1><p>Add a launch mockup to see the full founder-preview shopping experience.</p><Link href="/shop" className="button button--dark">Shop the collection <ArrowRight size={17} /></Link></div>;
  }
  return (
    <section className="cart-page shell">
      <div className="cart-page__heading"><p className="sl-kicker">Your selections</p><h1>Your bag.</h1><p>{itemCount} {itemCount === 1 ? "piece" : "pieces"} ready for the demo checkout.</p></div>
      <div className="cart-page__layout">
        <div className="cart-page__items">
          {items.map((item, index) => <article className="cart-page-line" key={`${item.productId}-${item.color}-${item.size}`}><Link href={`/products/${item.slug}`} className="cart-page-line__visual"><Image src={item.image} alt="" width={210} height={245} /></Link><div><p>Founder mockup</p><h2><Link href={`/products/${item.slug}`}>{item.name}</Link></h2><span>{item.color} · {item.size}</span><strong>{formatPrice(item.priceCents)}</strong><div className="quantity-control"><button onClick={() => updateQuantity(index, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={14} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(index, item.quantity + 1)} aria-label="Increase quantity"><Plus size={14} /></button></div></div><button className="cart-page-line__remove" onClick={() => removeItem(index)} aria-label={`Remove ${item.name}`}><Trash2 size={17} /></button></article>)}
        </div>
        <aside className="cart-summary"><p className="sl-kicker">Order summary</p><div className="cart-summary__row"><span>Subtotal</span><strong>{formatPrice(pricingComplete ? subtotal : null)}</strong></div><div className="cart-summary__row"><span>Shipping</span><span>Policy pending</span></div><p>Pricing, shipping, and fulfillment are not configured. No order or payment will be created.</p><Link href="/checkout" className="button button--dark">Preview checkout <ArrowRight size={16} /></Link><Link href="/shop" className="button button--ghost">Continue shopping</Link><small><LockKeyhole size={13} /> A commerce provider can be connected after the business and policies are approved.</small></aside>
      </div>
    </section>
  );
}
