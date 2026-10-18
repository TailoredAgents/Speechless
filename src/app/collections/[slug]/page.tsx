import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { collections } from "@/data/products";
import { getCatalogCollection, getCatalogProducts } from "@/lib/catalog";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCatalogCollection(slug);
  if (!collection) return {};
  return { title: collection.name, description: collection.description };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [collection, products] = await Promise.all([getCatalogCollection(slug), getCatalogProducts()]);
  if (!collection) notFound();
  const collectionProducts = products.filter((product) => product.collection === collection.slug);
  const featured = collectionProducts[0];

  return (
    <>
      <section className={`sl-collection-hero sl-collection-hero--${collection.slug}`}>
        <div className="sl-collection-hero__copy">
          <p className="sl-kicker">{collection.eyebrow}</p>
          <h1>{collection.name}</h1>
          <p>{collection.description}</p>
          <a href="#collection-products" className="sl-button sl-button--ink">View {collectionProducts.length} {collectionProducts.length === 1 ? "design" : "designs"} <ArrowRight size={17} /></a>
        </div>
        <div className="sl-collection-hero__art product-art-slot--flat-front">{featured && <ProductArt slug={featured.slug} />}</div>
      </section>
      <section id="collection-products" className="sl-section shell shell--wide collection-products">
        <div className="sl-heading"><div><p className="sl-kicker">The edit</p><h2>Choose deliberately.</h2></div><p>Exact concept artwork is shown to make the founding vision tangible. Garments, pricing, and production details remain open for founder approval.</p></div>
        <div className="product-grid product-grid--shop">{collectionProducts.map((product) => <ProductCard product={product} key={product.id} />)}</div>
      </section>
      <section className="sl-collection-next">
        <p className="sl-kicker">All together now</p>
        <h2>More than one way to connect.</h2>
        <Link href="/shop" className="sl-button sl-button--cream">See the full collection <ArrowRight size={17} /></Link>
      </section>
    </>
  );
}
