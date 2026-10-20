"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, Info, Ruler, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { LaunchForm } from "@/components/launch-form";
import { ProductArt } from "@/components/product-art";
import type { Product } from "@/types/catalog";
import { formatPrice } from "@/lib/utils";
import { getProductDesign } from "@/data/product-designs";

export function ProductView({ product }: { product: Product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name || "Launch color");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const design = getProductDesign(product.slug);
  const selectedView = product.imageViews?.[imageIndex] || "flat-front";
  const selectedViewNormalized = selectedView.replace("composite-", "");
  const selectedSide = selectedViewNormalized.includes("back") ? "back" as const : "front" as const;
  const selectedContext = selectedViewNormalized.startsWith("model") ? "model" as const : selectedViewNormalized.startsWith("detail") ? "detail" as const : "flat" as const;
  const selectedArtworkVisible = selectedView !== "none" && !selectedView.startsWith("composite-");

  useEffect(() => {
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event: "product_view", path: `/products/${product.slug}`, productId: product.id }),
    });
  }, [product.id, product.slug]);

  return (
    <section className={`product-page product-page--${product.slug} shell shell--wide`}>
      <div className="product-gallery">
        <div className="product-gallery__main">
          <Image src={product.images[imageIndex]} alt={`${product.name} view ${imageIndex + 1}`} fill sizes="(max-width: 900px) 100vw, 55vw" className={`product-gallery__image--${selectedViewNormalized}`} priority />
          {selectedArtworkVisible && <span className={`product-gallery__art product-art-slot--${selectedViewNormalized}`}><ProductArt slug={product.slug} side={selectedSide} view={selectedContext} /></span>}
          <span className="product-gallery__count">0{imageIndex + 1} / 0{product.images.length}</span>
        </div>
        <div className="product-gallery__thumbs" aria-label="Choose product image">
          {product.images.map((image, index) => {
            const view = product.imageViews?.[index] || "flat-front";
            const normalizedView = view.replace("composite-", "");
            const artworkVisible = view !== "none" && !view.startsWith("composite-");
            return (
              <button key={image} className={index === imageIndex ? "is-active" : ""} onClick={() => setImageIndex(index)} aria-label={`Show image ${index + 1}`}>
                <Image src={image} alt="" fill sizes="100px" className={`product-gallery__image--${normalizedView}`} />
                {artworkVisible && <span className={`product-gallery__thumb-art product-art-slot--${normalizedView}`}><ProductArt slug={product.slug} compact side={normalizedView.includes("back") ? "back" : "front"} view={normalizedView.startsWith("model") ? "model" : normalizedView.startsWith("detail") ? "detail" : "flat"} /></span>}
              </button>
            );
          })}
        </div>
      </div>
      <div className="product-info">
        <div className="product-info__crumbs"><Link href="/shop">Shop</Link><span>/</span><Link href={`/collections/${product.collection}`}>{product.collectionLabel}</Link></div>
        <p className="eyebrow">{product.collectionLabel}</p>
        <h1>{product.name}</h1>
        <div className="product-info__status"><span>{formatPrice(product.priceCents)}</span><i>Adult unisex tee</i></div>
        <p className="product-info__description">{product.description}</p>
        {design && <div className="product-message"><p className="sl-kicker">The design</p><dl><div><dt>Front</dt><dd>{design.frontText}</dd></div>{design.backText && <div><dt>Back</dt><dd>{design.backText}</dd></div>}<div><dt>Designed for</dt><dd>{design.intendedAudience}</dd></div><div><dt>Placement</dt><dd>{design.printPlacement}</dd></div></dl></div>}

        <fieldset className="product-option">
          <legend>Color <span>{color}</span></legend>
          <div className="color-options">
            {product.colors.map((option) => (
              <button type="button" key={option.name} onClick={() => setColor(option.name)} className={color === option.name ? "is-active" : ""} aria-label={`Choose ${option.name}`} title={option.name}>
                <i style={{ backgroundColor: option.hex }} />{color === option.name && <Check size={12} />}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="product-option product-option--sizes">
          <legend>Planned size range <button type="button" onClick={() => setSizeGuideOpen((open) => !open)}><Ruler size={14} /> Size notes</button></legend>
          {sizeGuideOpen && <div className="size-guide-preview"><strong>Planned adult unisex sizing</strong><p>XS–4XL. Final garment measurements will be published before ordering opens.</p></div>}
          <div className="size-options size-options--preview">
            {product.sizes.map((option) => <span key={option}>{option}</span>)}
          </div>
        </fieldset>
        <div className="product-first-look">
          <p className="sl-kicker">Want this one?</p>
          <h2>Get the first look.</h2>
          <p>We’ll email you when the final garment, colors, price, and release date are ready.</p>
          <LaunchForm compact source="product-page" productId={product.id} productName={product.name} idPrefix={`product-${product.slug}`} />
        </div>
        <div className="product-assurances" aria-label="Product details"><span><Ruler /> XS–4XL planned</span><span><Sparkles /> Heavyweight cotton direction</span><span><ShieldCheck /> Original Speechless graphic</span></div>

        <div className="concept-callout"><Info size={17} /><p><strong>Details are still in development</strong>Final garment measurements, material details, and care guidance will be published before ordering opens.</p></div>
        <div className="product-accordions">
          <details open><summary>The message <ChevronDown size={16} /></summary><p>{product.story}</p></details>
          <details><summary>Garment direction <ChevronDown size={16} /></summary><p>{product.material}. A {product.fit.toLowerCase()} adult unisex fit is planned in XS–4XL. Final measurements will be published before ordering opens.</p></details>
          <details><summary>Care direction <ChevronDown size={16} /></summary><p>{product.care}. Final care instructions will follow the selected garment and print method.</p></details>
          <details><summary>Shipping & returns <ChevronDown size={16} /></summary><p>Shipping rates, fulfillment timing, and return details will be published before ordering opens.</p></details>
        </div>
        <Link href="/comfort-finder" className="product-finder-link"><span><strong>Not sure which tee is yours?</strong>Take the quick shirt finder</span></Link>
      </div>
    </section>
  );
}
