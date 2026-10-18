export type CollectionSlug = "for-me" | "family-caregivers" | "community-allies";
export type ProductStatus = "concept" | "approved" | "sellable";
export type Audience = "Adult" | "Youth" | "Toddler" | "Unisex";
export type ProductType = "T-shirt" | "Hoodie" | "Joggers" | "Sweatshirt" | "Long sleeve";

export type Product = {
  id: string;
  slug: string;
  name: string;
  collection: CollectionSlug;
  collectionLabel: string;
  type: ProductType;
  audience: Audience;
  status: ProductStatus;
  published: boolean;
  featured?: boolean;
  description: string;
  story: string;
  material: string | null;
  care: string | null;
  priceCents: number | null;
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  imageViews?: Array<"flat-front" | "flat-back" | "model-front" | "model-back" | "detail-front" | "composite-flat-front" | "composite-flat-back" | "composite-model-front" | "composite-model-back" | "composite-detail-front" | "none">;
  fit: "Relaxed" | "Classic" | "Oversized";
  comfortFeatures: string[];
  verifiedComfortFeatures: string[];
  conceptNote: string;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  color: string;
  size: string;
  priceCents: number | null;
  quantity: number;
};
