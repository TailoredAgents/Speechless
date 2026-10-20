import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LaunchForm } from "@/components/launch-form";
import { ProductCard } from "@/components/product-card";
import { getCatalogProducts } from "@/lib/catalog";

const paths = [
  { label: "Bold", title: "Say it loud.", copy: "A direct front graphic that puts the message right where people can see it.", href: "/products/im-nonverbal-still-communicating-tee", image: "/images/speechless-nonverbal-flat-v2.webp" },
  { label: "Front + back", title: "Flip it around.", copy: "A small chest hit up front with the full statement saved for the back.", href: "/products/different-communication-same-respect-tee", image: "/images/speechless-supporter-back-v3.webp" },
  { label: "Low-key", title: "Keep it subtle.", copy: "A quieter graphic for anyone who wants the meaning without the megaphone.", href: "/products/speech-isnt-the-only-way-tee", image: "/images/speechless-fashion-portrait-v3.webp" },
];

export default async function Home() {
  const products = await getCatalogProducts();
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <>
      <section className="sl-hero sl-hero--lifestyle sl-hero--canonical">
        <Image src="/images/speechless-hero-more-than-words-v3.webp" alt="Young adult wearing the More Than Words T-shirt" fill sizes="100vw" priority />
        <div className="sl-hero__wash" />
        <div className="shell shell--wide sl-hero__inner">
          <div className="sl-hero__copy">
            <p className="sl-kicker">Graphic tees with something to say</p>
            <h1>More than<br /><em>words.</em></h1>
            <p>Bold, easygoing T-shirts made for people who communicate in all kinds of ways. Find the one that feels like you.</p>
            <div className="sl-actions">
              <Link href="/shop" className="sl-button sl-button--ink">Meet the shirts <ArrowRight size={18} /></Link>
              <Link href="/comfort-finder" className="sl-button sl-button--text">Find your tee</Link>
            </div>
            <div className="sl-hero__proof"><span>Adult unisex fits</span><span>Original graphics</span><span>Four different moods</span></div>
          </div>
          <div className="sl-hero__stamp" aria-hidden="true"><span>SPEECHLESS</span><strong>04</strong><small>SHIRTS<br />TO START</small></div>
        </div>
      </section>

      <section className="sl-belief-bar" aria-label="Brand highlights">
        <span>Big graphics</span><i />
        <span>Easy shapes</span><i />
        <span>Front + back prints</span><i />
        <span>Wear it your way</span>
      </section>

      <section className="sl-section sl-products shell shell--wide" id="launch-edit">
        <div className="sl-heading">
          <div><p className="sl-kicker">Pick your favorite</p><h2>Meet the<br />shirts.</h2></div>
          <div><p>Four graphics with four different energies—from big and direct to simple and low-key.</p><Link href="/shop">See every design <ArrowRight size={16} /></Link></div>
        </div>
        <div className="product-grid product-grid--featured">
          {featured.map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
      </section>

      <section className="sl-editorial shell shell--wide">
        <div className="sl-editorial__image">
          <Image src="/images/speechless-fashion-portrait-v3.webp" alt="Young adult wearing the Speech Isn't the Only Way T-shirt" fill sizes="(max-width: 820px) 100vw, 46vw" />
        </div>
        <div className="sl-editorial__copy">
          <p className="sl-kicker">One tee, your way</p>
          <h2>Looks good.<br />Says something.</h2>
          <p>Some days call for a big graphic. Other days call for something quieter. Speechless makes room for both, with designs that work as clothes first and carry meaning with them.</p>
          <p>Dress it up, wear it loose, layer it, or make it the whole outfit.</p>
          <Link href="/shop" className="sl-button sl-button--ink">Find your favorite <ArrowRight size={17} /></Link>
          <small>Models shown do not represent or imply anyone’s diagnosis.</small>
        </div>
      </section>

      <section className="sl-section sl-paths shell shell--wide">
        <div className="sl-heading"><div><p className="sl-kicker">Shop by style</p><h2>What&apos;s your<br />T-shirt mood?</h2></div><p>Go bold, try a front-and-back graphic, or keep the message a little more understated.</p></div>
        <div className="sl-path-grid sl-path-grid--product">
          {paths.map((path) => (
            <Link href={path.href} className="sl-path-product" key={path.title}>
              <div className="sl-path-product__visual"><Image src={path.image} alt="" fill sizes="(max-width: 760px) 100vw, 31vw" /><span>{path.label}</span></div>
              <div className="sl-path-product__copy"><h3>{path.title}</h3><p>{path.copy}</p><strong>See the shirt <ArrowRight size={16} /></strong></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="sl-signature">
        <div className="sl-signature__copy">
          <p className="sl-kicker">The heart of it</p>
          <h2>Nonverbal.<br /><em>Still communicating.</em></h2>
          <p>Speech is one way to communicate. It has never been the only way.</p>
          <Link href="/shop" className="sl-button sl-button--cream">Explore the artwork <ArrowRight size={17} /></Link>
        </div>
        <div className="sl-signature__image"><Image src="/images/speechless-print-detail-v3.webp" alt="Detail view of the More Than Words print on heavyweight warm-cream cotton" fill sizes="(max-width: 820px) 100vw, 50vw" /></div>
      </section>

      <section className="sl-launch-invite">
        <div className="shell sl-launch-invite__inner">
          <p className="sl-kicker">New tees are coming</p>
          <h2>Get the<br />first look.</h2>
          <p>See final colors, garment details, and the release date before everyone else.</p>
          <LaunchForm source="homepage" idPrefix="homepage" />
          <small>Occasional product updates. No noise, no pressure.</small>
        </div>
      </section>
    </>
  );
}
