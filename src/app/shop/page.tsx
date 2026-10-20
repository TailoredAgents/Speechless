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
        <Image src="/images/speechless-product-hero-more-than-words-v3.webp" alt="The More Than Words T-shirt displayed on a colorful studio set" fill sizes="100vw" priority />
        <div className="sl-shop-hero__veil" />
        <div className="shell shell--wide sl-shop-hero__content">
          <p className="sl-kicker">The founding collection</p>
          <h1>Wear what<br />matters.</h1>
          <p>Four deliberately different adult T-shirts: direct, supportive, bold, and subtle. Choose the message that feels right for you.</p>
        </div>
      </section>
      <ShopCatalog products={products} />
    </>
  );
}
