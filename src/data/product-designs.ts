export type ArtworkSide = "front" | "back";
export type ProductImageView = "flat-front" | "flat-back" | "model-front" | "model-back" | "detail-front" | "composite-flat-front" | "composite-flat-back" | "composite-model-front" | "composite-model-back" | "composite-detail-front" | "none";

export type ProductDesign = {
  slug: string;
  role: string;
  intendedAudience: string;
  frontText: string;
  backText: string;
  frontArtwork: string;
  backArtwork?: string;
  printPlacement: string;
  approvalStatus: string;
};

export const coreProductSlugs = [
  "more-than-words-tee",
  "im-nonverbal-still-communicating-tee",
  "different-communication-same-respect-tee",
  "speech-isnt-the-only-way-tee",
] as const;

export const productDesigns: Record<string, ProductDesign> = {
  "more-than-words-tee": {
    slug: "more-than-words-tee",
    role: "Flagship oversized front graphic",
    intendedAudience: "Nonverbal people and anyone who connects with the broader message",
    frontText: "MORE THAN WORDS",
    backText: "",
    frontArtwork: "/artwork/more-than-words-front.svg",
    printPlacement: "Oversized center front, approximately 13 × 15 inches on the proposed adult blank",
    approvalStatus: "Concept — founder and lived-experience review required",
  },
  "im-nonverbal-still-communicating-tee": {
    slug: "im-nonverbal-still-communicating-tee",
    role: "Direct communication-awareness front graphic",
    intendedAudience: "Nonverbal people who voluntarily choose a direct self-identification message",
    frontText: "I'M NONVERBAL. I STILL COMMUNICATE.",
    backText: "",
    frontArtwork: "/artwork/im-nonverbal-front.svg",
    printPlacement: "Large center front, approximately 12 × 14 inches on the proposed adult blank",
    approvalStatus: "Concept — founder and lived-experience review required",
  },
  "different-communication-same-respect-tee": {
    slug: "different-communication-same-respect-tee",
    role: "Minimal chest mark with statement back graphic",
    intendedAudience: "Family members, caregivers, friends, and supporters",
    frontText: "SAME RESPECT.",
    backText: "DIFFERENT COMMUNICATION. SAME RESPECT.",
    frontArtwork: "/artwork/same-respect-front.svg",
    backArtwork: "/artwork/same-respect-back.svg",
    printPlacement: "Small left chest front; large upper-back statement",
    approvalStatus: "Concept — founder and lived-experience review required",
  },
  "speech-isnt-the-only-way-tee": {
    slug: "speech-isnt-the-only-way-tee",
    role: "Subtle fashion-first front graphic",
    intendedAudience: "Community members and supporters who want a quieter statement",
    frontText: "SPEECH ISN'T THE ONLY WAY.",
    backText: "",
    frontArtwork: "/artwork/speech-isnt-the-only-way-front.svg",
    printPlacement: "Medium center front, approximately 10 × 11 inches on the proposed adult blank",
    approvalStatus: "Concept — founder and lived-experience review required",
  },
};

export function getProductDesign(slug: string) {
  return productDesigns[slug];
}
