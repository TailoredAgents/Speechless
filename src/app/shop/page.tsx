import type { Metadata } from "next";
import Image from "next/image";
import { ShopCatalog } from "@/components/shop-catalog";
import { getCatalogProducts } from "@/lib/catalog";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Shop graphic tees",
  description: `Explore graphic T-shirts from ${brand.name}.`,
};

export default async function ShopPage() {
  const products = await getCatalogProducts();
  return (
    <>
      <section className="sl-shop-hero">
        <Image src="/images/speechless-product-hero-more-than-words-v3.webp" alt="The More Than Words T-shirt displayed on a colorful studio set" fill sizes="100vw" priority />
        <div className="sl-shop-hero__veil" />
        <div className="shell shell--wide sl-shop-hero__content">
          <p className="sl-kicker">Four tees. Four different moods.</p>
          <h1>Pick your<br />favorite.</h1>
          <p>Big graphics, quieter statements, and one front-and-back surprise. Start with the shirt you would reach for first.</p>
        </div>
      </section>
      <ShopCatalog products={products} />
    </>
  );
}
