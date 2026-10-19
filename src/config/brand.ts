export const brand = {
  name: "Speechless",
  legalStatus: "Working brand name — trademark clearance pending",
  tagline: "Different ways to communicate. Same respect.",
  shortTagline: "More than words.",
  description:
    "Adult graphic apparel created to encourage patience, understanding, and respect around nonverbal autism.",
  email: "",
  commerceEnabled: false,
  indexingEnabled: false,
  currency: "USD",
  social: {
    instagram: "",
    tiktok: "",
  },
} as const;

export type BrandConfig = typeof brand;
