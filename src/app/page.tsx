import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LaunchForm } from "@/components/launch-form";
import { ProductCard } from "@/components/product-card";
import { getCatalogProducts } from "@/lib/catalog";

const paths = [
  { number: "01", title: "For me", copy: "Messages chosen by people who communicate beyond spoken words.", href: "/collections/for-me", image: "/images/speechless-nonverbal-flat-v2.png" },
  { number: "02", title: "For someone I love", copy: "Supportive designs that do not speak over the person at the heart of them.", href: "/collections/family-caregivers", image: "/images/speechless-supporter-back-v2.png" },
  { number: "03", title: "For the community", copy: "Fashion-first reminders that communication takes many forms.", href: "/collections/community-allies", image: "/images/speechless-fashion-portrait-v2.png" },
];

const productPromises = [
  ["Four deliberate designs", "Each piece has its own audience, wording, scale, and graphic role."],
  ["Adult unisex direction", "Relaxed, classic, and oversized fits are proposed for the first drop."],
  ["Proposed XS–4XL", "The final range depends on the approved blank and supplier measurements."],
  ["Artwork before hype", "Every product remains a concept until the founder and lived-experience reviewers approve it."],
] as const;

export default async function Home() {
  const products = await getCatalogProducts();
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <>
      <section className="sl-hero sl-hero--lifestyle sl-hero--canonical">
        <Image src="/images/speechless-hero-more-than-words-v2.png" alt="Adult fashion model wearing the conceptual More Than Words T-shirt" fill sizes="100vw" priority />
        <div className="sl-hero__wash" />
        <div className="shell shell--wide sl-hero__inner">
          <div className="sl-hero__copy">
            <p className="sl-kicker">Adult graphic apparel inspired by Tommy</p>
            <h1>More than<br /><em>words.</em></h1>
            <p>Four focused T-shirt concepts built around communication, respect, and the choice to make a message visible.</p>
            <div className="sl-actions">
              <Link href="/shop" className="sl-button sl-button--ink">Explore the four designs <ArrowRight size={18} /></Link>
              <Link href="/our-story" className="sl-button sl-button--text">Why this started</Link>
            </div>
            <div className="sl-hero__proof"><span>Adult-first</span><span>Exact artwork system</span><span>Founder preview</span></div>
          </div>
          <div className="sl-hero__stamp" aria-hidden="true"><span>SPEECHLESS</span><strong>04</strong><small>CORE<br />CONCEPTS</small></div>
        </div>
      </section>

      <section className="sl-belief-bar" aria-label="Brand highlights">
        <span>The clothes are the product</span><i />
        <span>The message is the purpose</span><i />
        <span>Tommy’s story is where it began</span>
      </section>

      <section className="sl-section sl-products shell shell--wide" id="launch-edit">
        <div className="sl-heading">
          <div><p className="sl-kicker">The core collection</p><h2>Four ideas.<br />Built differently.</h2></div>
          <div><p>One oversized front graphic. One direct self-identification design. One front-and-back supporter tee. One quieter fashion statement.</p><Link href="/shop">See the complete edit <ArrowRight size={16} /></Link></div>
        </div>
        <div className="product-grid product-grid--featured">
          {featured.map((product, index) => <ProductCard product={product} key={product.id} priority={index < 3} />)}
        </div>
        <p className="sl-preview-note">Founder preview: the four featured graphics now use one canonical artwork source across cards, galleries, and conceptual model photography. Garments and production details still require approval.</p>
      </section>

      <section className="sl-product-promises" aria-label="Collection development principles">
        <div className="shell shell--wide sl-product-promises__grid">
          {productPromises.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="sl-editorial shell shell--wide">
        <div className="sl-editorial__image">
          <Image src="/images/speechless-fashion-portrait-v2.png" alt="Adult fashion model wearing the conceptual Speech Isn't the Only Way T-shirt" fill sizes="(max-width: 820px) 100vw, 46vw" />
        </div>
        <div className="sl-editorial__copy">
          <p className="sl-kicker">Worn with intention</p>
          <h2>A little understanding<br />changes everything.</h2>
          <p>A clear message can offer useful context or ask for patience before an interaction begins. A quieter message can simply remind the people around us that speech is not the only way to connect.</p>
          <p>The first collection makes room for both—without assuming every wearer wants to disclose the same thing.</p>
          <Link href="/our-approach" className="sl-button sl-button--ink">How the messages are chosen <ArrowRight size={17} /></Link>
          <small>Concept photography uses adult fashion models and does not represent or imply anyone’s diagnosis.</small>
        </div>
      </section>

      <section className="sl-tommy sl-tommy--editorial">
        <div className="sl-tommy__photo-reserve" role="img" aria-label="Reserved space for an approved photograph of Tommy or his family">
          <span>Family photograph</span>
          <strong>Reserved for<br />Tommy’s story.</strong>
          <small>Image added only with family approval</small>
        </div>
        <div className="sl-tommy__copy">
          <p className="sl-kicker">The beginning</p>
          <h2>This started<br />with Tommy.</h2>
          <p>Tommy loves people. He loves being out in his community. And while he doesn’t communicate through spoken words, he has his own ways of connecting with the world.</p>
          <p>Speechless began with his family’s hope that a little more understanding could make everyday moments better.</p>
          <Link href="/our-story" className="sl-button sl-button--ink">Read the confirmed story <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="sl-section sl-paths shell shell--wide">
        <div className="sl-heading"><div><p className="sl-kicker">Shop by perspective</p><h2>Choose the message<br />that fits.</h2></div><p>These paths organize four relevant products. They are not separate invented collections or assumptions about who should wear what.</p></div>
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
        <div className="sl-signature__image"><Image src="/images/speechless-print-detail-v3.png" alt="Detail view of the conceptual More Than Words print on heavyweight warm-cream cotton" fill sizes="(max-width: 820px) 100vw, 50vw" /></div>
      </section>

      <section className="sl-launch-invite">
        <div className="shell sl-launch-invite__inner">
          <p className="sl-kicker">Follow the founding drop</p>
          <h2>See what becomes<br />the real first collection.</h2>
          <p>Get thoughtful updates as the artwork, garments, and launch details move from concept to production.</p>
          <LaunchForm />
          <small>Founder-preview form. In local preview mode, addresses are not stored.</small>
        </div>
      </section>
    </>
  );
}
