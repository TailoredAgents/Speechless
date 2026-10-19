import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LaunchForm } from "@/components/launch-form";
import { ProductCard } from "@/components/product-card";
import { getCatalogProducts } from "@/lib/catalog";

const paths = [
  { number: "01", title: "For me", copy: "Messages chosen by people who communicate beyond spoken words.", href: "/collections/for-me", image: "/images/speechless-nonverbal-flat-v2.png" },
  { number: "02", title: "For someone I love", copy: "Supportive designs that do not speak over the person at the heart of them.", href: "/collections/family-caregivers", image: "/images/speechless-supporter-back-v3.png" },
  { number: "03", title: "For the community", copy: "Fashion-first reminders that communication takes many forms.", href: "/collections/community-allies", image: "/images/speechless-fashion-portrait-v3.png" },
];

const productPromises = [
  ["Four intentional designs", "Each piece has its own audience, wording, scale, and graphic role."],
  ["Adult unisex fits", "Relaxed, classic, and oversized silhouettes shape the founding collection."],
  ["XS–4XL planned", "The final size chart will be published before ordering opens."],
  ["Made with care", "Garment feel, print quality, and lived-experience feedback guide every decision."],
] as const;

export default async function Home() {
  const products = await getCatalogProducts();
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <>
      <section className="sl-hero sl-hero--lifestyle sl-hero--canonical">
        <Image src="/images/speechless-hero-more-than-words-v3.png" alt="Young adult wearing the More Than Words T-shirt" fill sizes="100vw" priority />
        <div className="sl-hero__wash" />
        <div className="shell shell--wide sl-hero__inner">
          <div className="sl-hero__copy">
            <p className="sl-kicker">Graphic apparel for every way we communicate</p>
            <h1>More than<br /><em>words.</em></h1>
            <p>Four focused T-shirts built around communication, respect, and the choice to make a message visible.</p>
            <div className="sl-actions">
              <Link href="/shop" className="sl-button sl-button--ink">Explore the four designs <ArrowRight size={18} /></Link>
              <Link href="/our-approach" className="sl-button sl-button--text">Why Speechless</Link>
            </div>
            <div className="sl-hero__proof"><span>Adult-first</span><span>Four distinct designs</span><span>Community-centered</span></div>
          </div>
          <div className="sl-hero__stamp" aria-hidden="true"><span>SPEECHLESS</span><strong>04</strong><small>FOUNDING<br />DESIGNS</small></div>
        </div>
      </section>

      <section className="sl-belief-bar" aria-label="Brand highlights">
        <span>The clothes are the product</span><i />
        <span>The message is the purpose</span><i />
        <span>Understanding starts with attention</span>
      </section>

      <section className="sl-section sl-products shell shell--wide" id="launch-edit">
        <div className="sl-heading">
          <div><p className="sl-kicker">The core collection</p><h2>Four ideas.<br />Built differently.</h2></div>
          <div><p>One oversized front graphic. One direct self-identification design. One front-and-back supporter tee. One quieter fashion statement.</p><Link href="/shop">See the complete edit <ArrowRight size={16} /></Link></div>
        </div>
        <div className="product-grid product-grid--featured">
          {featured.map((product, index) => <ProductCard product={product} key={product.id} priority={index < 3} />)}
        </div>
      </section>

      <section className="sl-product-promises" aria-label="Collection development principles">
        <div className="shell shell--wide sl-product-promises__grid">
          {productPromises.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="sl-editorial shell shell--wide">
        <div className="sl-editorial__image">
          <Image src="/images/speechless-fashion-portrait-v3.png" alt="Young adult wearing the Speech Isn't the Only Way T-shirt" fill sizes="(max-width: 820px) 100vw, 46vw" />
        </div>
        <div className="sl-editorial__copy">
          <p className="sl-kicker">Worn with intention</p>
          <h2>A little understanding<br />changes everything.</h2>
          <p>A clear message can offer useful context or ask for patience before an interaction begins. A quieter message can simply remind the people around us that speech is not the only way to connect.</p>
          <p>The first collection makes room for both—without assuming every wearer wants to disclose the same thing.</p>
          <Link href="/our-approach" className="sl-button sl-button--ink">How the messages are chosen <ArrowRight size={17} /></Link>
          <small>Models shown do not represent or imply anyone’s diagnosis.</small>
        </div>
      </section>

      <section className="sl-section sl-paths shell shell--wide">
        <div className="sl-heading"><div><p className="sl-kicker">Shop by perspective</p><h2>Choose the message<br />that fits.</h2></div><p>Start with the perspective closest to you. Every message is designed to be chosen with care.</p></div>
        <div className="sl-path-grid sl-path-grid--product">
          {paths.map((path) => (
            <Link href={path.href} className="sl-path-product" key={path.title}>
              <div className="sl-path-product__visual"><Image src={path.image} alt="" fill sizes="(max-width: 760px) 100vw, 31vw" /><span>{path.number}</span></div>
              <div className="sl-path-product__copy"><h3>{path.title}</h3><p>{path.copy}</p><strong>View relevant design <ArrowRight size={16} /></strong></div>
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
        <div className="sl-signature__image"><Image src="/images/speechless-print-detail-v3.png" alt="Detail view of the More Than Words print on heavyweight warm-cream cotton" fill sizes="(max-width: 820px) 100vw, 50vw" /></div>
      </section>

      <section className="sl-launch-invite">
        <div className="shell sl-launch-invite__inner">
          <p className="sl-kicker">The first drop starts here</p>
          <h2>Be first to see<br />the founding collection.</h2>
          <p>Get thoughtful updates as the garments, launch date, and first release come together.</p>
          <LaunchForm source="homepage" idPrefix="homepage" />
          <small>Occasional launch updates. No noise, no pressure.</small>
        </div>
      </section>
    </>
  );
}
