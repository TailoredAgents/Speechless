"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { ProductArt } from "@/components/product-art";
import { useStore } from "@/components/store-provider";
import type { Product } from "@/types/catalog";
import { formatPrice } from "@/lib/utils";

function artworkView(view: NonNullable<Product["imageViews"]>[number] | undefined) {
  const normalized = view?.replace("composite-", "");
  return {
    side: normalized?.includes("back") ? "back" as const : "front" as const,
    context: normalized?.startsWith("model") ? "model" as const : normalized?.startsWith("detail") ? "detail" as const : "flat" as const,
    imageClass: normalized || "flat-front",
    visible: view !== "none" && !view?.startsWith("composite-"),
  };
}

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [quickOpen, setQuickOpen] = useState(false);
  const [addedSize, setAddedSize] = useState("");
  const { addItem } = useStore();
  const primaryIsDark = product.colors[0]?.hex.toLowerCase() === "#232323";
  const primaryArtwork = artworkView(product.imageViews?.[0]);
  const alternateArtwork = artworkView(product.imageViews?.[1]);

  function quickAdd(size: string) {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      color: product.colors[0]?.name || "Launch color",
      size,
      priceCents: product.priceCents,
    });
    setAddedSize(size);
  }

  return (
    <article className={`product-card product-card--${product.slug} product-card--primary-${primaryIsDark ? "dark" : "light"}`}>
      <Link href={`/products/${product.slug}`} className="product-card__image-wrap" aria-label={`View ${product.name}`}>
        <Image
          src={product.images[0]}
          alt={`${product.name} garment view`}
          fill
          sizes="(max-width: 680px) 85vw, (max-width: 1080px) 46vw, 25vw"
          className={`product-card__image product-card__image--primary product-card__image--${primaryArtwork.imageClass}`}
          priority={priority}
        />
        {product.images[1] && <Image src={product.images[1]} alt="" fill sizes="(max-width: 680px) 85vw, (max-width: 1080px) 46vw, 32vw" className={`product-card__image product-card__image--alt product-card__image--${alternateArtwork.imageClass}`} />}
        {primaryArtwork.visible && <span className={`product-card__art product-card__art--primary product-art-slot--${product.imageViews?.[0] || "flat-front"}`}><ProductArt slug={product.slug} compact side={primaryArtwork.side} view={primaryArtwork.context} /></span>}
        {product.images[1] && alternateArtwork.visible && <span className={`product-card__art product-card__art--alt product-art-slot--${product.imageViews?.[1] || "flat-front"}`}><ProductArt slug={product.slug} compact side={alternateArtwork.side} view={alternateArtwork.context} /></span>}
        <span className="status-pill">Founding collection</span>
        <span className="product-card__arrow"><ArrowUpRight size={19} /></span>
      </Link>
      <div className="product-card__meta">
        <div>
          <p>{product.collectionLabel}</p>
          <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
        </div>
        <span>{formatPrice(product.priceCents)}</span>
      </div>
      <div className="product-card__details">
        <span>XS–4XL</span>
        <span>{product.fit} fit</span>
        <div className="swatches" aria-label={`${product.colors.length} launch colors`}>
          {product.colors.slice(0, 3).map((color) => (
            <i key={color.name} style={{ backgroundColor: color.hex }} title={color.name} />
          ))}
        </div>
      </div>
      <div className="product-card__actions">
        <Link href={`/products/${product.slug}`} className="product-card__cta">View details <ArrowRight size={14} /></Link>
        <button type="button" className="product-card__quick-trigger" onClick={() => setQuickOpen((open) => !open)} aria-expanded={quickOpen}>{quickOpen ? "Close" : "Save for launch"}</button>
      </div>
      {quickOpen && <div className="product-card__quick" aria-label={`Choose a size for ${product.name}`}><span>Choose a size to save</span><div>{product.sizes.map((size) => <button type="button" key={size} onClick={() => quickAdd(size)} aria-label={`Save size ${size} for launch`}>{addedSize === size ? <Check size={13} /> : size}</button>)}</div></div>}
    </article>
  );
}
