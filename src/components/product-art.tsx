import Image from "next/image";
import { getProductDesign, type ArtworkSide } from "@/data/product-designs";

type ArtDefinition = {
  kicker?: string;
  lines: string[];
  footer?: string;
  style: string;
};

const art: Record<string, ArtDefinition> = {
  "more-than-words-tee": {
    kicker: "COMMUNICATION IS",
    lines: ["MORE", "THAN", "WORDS"],
    footer: "SPEECHLESS / CONCEPT 01",
    style: "stacked",
  },
  "my-voice-my-way-tee": {
    kicker: "MY VOICE",
    lines: ["MY", "WAY"],
    footer: "ALWAYS COMMUNICATING",
    style: "signal",
  },
  "nonverbal-still-communicating-tee": {
    kicker: "I AM",
    lines: ["NONVERBAL", "STILL", "COMMUNICATING"],
    footer: "PLEASE GIVE ME TIME",
    style: "beat",
  },
  "someone-i-love-has-autism-tee": {
    kicker: "SOMEONE I LOVE",
    lines: ["HAS", "AUTISM"],
    footer: "LISTEN DIFFERENTLY",
    style: "listen",
  },
  "speechless-never-voiceless-tee": {
    kicker: "SPEECHLESS",
    lines: ["NEVER", "VOICELESS"],
    footer: "MORE THAN WORDS",
    style: "voiceless",
  },
  "i-have-autism-tee": {
    kicker: "I HAVE",
    lines: ["AUTISM"],
    footer: "AND A LOT TO SAY",
    style: "every",
  },
  "communication-club-tee": {
    kicker: "EST. WITH LOVE",
    lines: ["COMMUNICATION", "CLUB"],
    footer: "ALL FORMS WELCOME",
    style: "club",
  },
  "autism-looks-different-tee": {
    kicker: "AUTISM",
    lines: ["LOOKS", "DIFFERENT"],
    footer: "ON EVERYBODY",
    style: "quiet",
  },
};

export function ProductArt({ slug, compact = false, side = "front", view = "flat" }: { slug: string; compact?: boolean; side?: ArtworkSide; view?: "flat" | "model" | "detail" }) {
  const productDesign = getProductDesign(slug);
  const artworkFile = side === "back" && productDesign?.backArtwork ? productDesign.backArtwork : productDesign?.frontArtwork;
  if (productDesign && artworkFile) {
    return (
      <span className={`tee-art tee-art--asset tee-art--${slug.replace(/-tee$/, "")} tee-art--${side} tee-art--view-${view} ${compact ? "tee-art--compact" : ""}`} aria-hidden="true">
        <Image src={artworkFile} alt="" fill sizes="(max-width: 700px) 52vw, 28vw" unoptimized />
      </span>
    );
  }
  const definition = art[slug] ?? art["more-than-words-tee"];
  return (
    <span className={`tee-art tee-art--${definition.style} ${compact ? "tee-art--compact" : ""}`} aria-hidden="true">
      {definition.kicker && <span className="tee-art__kicker">{definition.kicker}</span>}
      <span className="tee-art__headline">
        {definition.lines.map((line) => <span key={line}>{line}</span>)}
      </span>
      {definition.footer && <span className="tee-art__footer">{definition.footer}</span>}
    </span>
  );
}
