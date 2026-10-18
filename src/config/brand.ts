export const brand = {
  name: "Speechless",
  legalStatus: "Working brand name — trademark clearance pending",
  tagline: "Different ways to communicate. Same respect.",
  shortTagline: "More than words.",
  description:
    "Adult graphic apparel concepts created to encourage patience, understanding, and respect around nonverbal autism.",
  email: "hello@speechless.example",
  commerceEnabled: false,
  indexingEnabled: false,
  currency: "USD",
  social: {
    instagram: "",
    tiktok: "",
  },
} as const;

export type BrandConfig = typeof brand;
