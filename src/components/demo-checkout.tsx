"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, LockKeyhole, ShoppingBag } from "lucide-react";
import { FormEvent, useState } from "react";
import { useStore } from "@/components/store-provider";
import { formatPrice } from "@/lib/utils";

export function DemoCheckout() {
  const { items } = useStore();
  const [complete, setComplete] = useState(false);
  const pricingComplete = items.every((item) => item.priceCents !== null);
  const subtotal = items.reduce((sum, item) => sum + (item.priceCents ?? 0) * item.quantity, 0);

  function submitPreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setComplete(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (complete) {
    return (
      <section className="checkout-complete">
        <span className="checkout-complete__icon"><Check size={34} /></span>
        <p className="sl-kicker">Founder preview complete</p>
        <h1>That’s the whole<br />shopping experience.</h1>
        <p>No order was placed, no payment was collected, and none of the information entered was sent or saved. When Speechless is ready to launch, a real commerce provider can take over from here.</p>
        <div className="sl-actions">
          <Link href="/shop" className="sl-button sl-button--ink">Keep exploring</Link>
          <Link href="/our-story" className="sl-button sl-button--text">Read Tommy’s story</Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="checkout-empty">
        <ShoppingBag size={44} strokeWidth={1.2} />
        <p className="sl-kicker">Demo checkout</p>
        <h1>Your bag is empty.</h1>
        <p>Choose a founder mockup first, then come back to experience the complete storefront flow.</p>
        <Link href="/shop" className="sl-button sl-button--ink">Shop the collection</Link>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-page__form">
        <Link href="/cart" className="checkout-back"><ArrowLeft size={16} /> Back to bag</Link>
        <div className="checkout-heading">
          <p className="sl-kicker">Secure checkout preview</p>
          <h1>Almost yours.</h1>
          <p>This form is a private, non-functional prototype. Nothing you type is transmitted or stored.</p>
        </div>
        <form onSubmit={submitPreview}>
          <fieldset>
            <legend><span>01</span> Contact</legend>
            <label className="checkout-field checkout-field--full">Email address<input required type="email" autoComplete="email" placeholder="amber@example.com" /></label>
          </fieldset>
          <fieldset>
            <legend><span>02</span> Delivery</legend>
            <div className="checkout-fields">
              <label className="checkout-field">First name<input required autoComplete="given-name" /></label>
              <label className="checkout-field">Last name<input required autoComplete="family-name" /></label>
              <label className="checkout-field checkout-field--full">Street address<input required autoComplete="street-address" /></label>
              <label className="checkout-field">City<input required autoComplete="address-level2" /></label>
              <label className="checkout-field">State<select required defaultValue=""><option value="" disabled>Select state</option><option>Florida</option><option>New York</option><option>California</option><option>Texas</option><option>Other</option></select></label>
              <label className="checkout-field">ZIP code<input required inputMode="numeric" autoComplete="postal-code" /></label>
              <label className="checkout-field">Country<select defaultValue="United States"><option>United States</option></select></label>
            </div>
          </fieldset>
          <fieldset>
            <legend><span>03</span> Payment</legend>
            <div className="checkout-payment-preview">
              <LockKeyhole size={21} />
              <div><strong>Secure payment connects at launch</strong><p>Card, Shop Pay, Apple Pay, and Google Pay can be enabled after the business account and policies are approved.</p></div>
              <span>DEMO</span>
            </div>
          </fieldset>
          <button className="sl-button sl-button--ink checkout-submit" type="submit">Complete preview order <LockKeyhole size={16} /></button>
          <p className="checkout-legal">By continuing, you are only completing a visual demonstration. No purchase, charge, reservation, or customer account will be created.</p>
        </form>
      </div>

      <aside className="checkout-order">
        <p className="sl-kicker">Your order</p>
        <div className="checkout-order__items">
          {items.map((item) => (
            <article key={`${item.productId}-${item.color}-${item.size}`}>
              <div className="checkout-order__visual"><Image src={item.image} alt="" fill sizes="90px" /><span>{item.quantity}</span></div>
              <div><strong>{item.name}</strong><p>{item.color} / {item.size}</p></div>
              <b>{formatPrice(item.priceCents === null ? null : item.priceCents * item.quantity)}</b>
            </article>
          ))}
        </div>
        <div className="checkout-order__totals">
          <p><span>Subtotal</span><strong>{formatPrice(pricingComplete ? subtotal : null)}</strong></p>
          <p><span>Shipping</span><span>Calculated at launch</span></p>
          <p><span>Estimated total</span><strong>{formatPrice(pricingComplete ? subtotal : null)}</strong></p>
        </div>
        <div className="checkout-order__note"><LockKeyhole size={16} /><p><strong>Founder-preview mode</strong>Pricing is pending. Checkout is intentionally disconnected.</p></div>
      </aside>
    </section>
  );
}
