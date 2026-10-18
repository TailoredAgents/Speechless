import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductView } from "@/components/product-view";
import { products } from "@/data/products";
import { getCatalogProduct, getCatalogProducts } from "@/lib/catalog";


export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCatalogProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.description, openGraph: { images: [product.images[0]] } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, products] = await Promise.all([getCatalogProduct(slug), getCatalogProducts()]);
  if (!product) notFound();
  const related = products.filter((entry) => entry.collection === product.collection && entry.id !== product.id).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    category: product.collectionLabel,
    additionalProperty: [{ "@type": "PropertyValue", name: "Product status", value: "Founder-preview mockup — checkout disabled" }],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ProductView product={product} />
      <section className="section related-products">
        <div className="shell shell--wide">
            <div className="section-heading section-heading--row"><div><p className="eyebrow">Keep exploring</p><h2>Another way to say it.</h2></div></div>
          <div className="product-grid">{related.map((entry) => <ProductCard product={entry} key={entry.id} />)}</div>
        </div>
      </section>
    </>
  );
}
