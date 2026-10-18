import type { Metadata } from "next";
import Image from "next/image";
import { ShopCatalog } from "@/components/shop-catalog";
import { getCatalogProducts } from "@/lib/catalog";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Shop the founding collection",
  description: `Explore the founding graphic T-shirt collection from ${brand.name}.`,
};

export default async function ShopPage() {
  const products = await getCatalogProducts();
  return (
    <>
      <section className="sl-shop-hero">
        <Image src="/images/speechless-product-hero-more-than-words-v3.png" alt="The conceptual More Than Words T-shirt displayed on a colorful studio set" fill sizes="100vw" priority />
        <div className="sl-shop-hero__veil" />
        <div className="shell shell--wide sl-shop-hero__content">
          <p className="sl-kicker">The founding collection</p>
          <h1>Wear what<br />matters.</h1>
          <p>Four deliberately different adult T-shirt concepts: direct, supportive, bold, and subtle. Every graphic is shown from one canonical artwork source.</p>
        </div>
      </section>
      <ShopCatalog products={products} />
    </>
  );
}
