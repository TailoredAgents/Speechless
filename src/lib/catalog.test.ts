import { describe, expect, it } from "vitest";
import { collections, products } from "@/data/products";
import { recommendProducts } from "@/lib/recommend";

describe("fixture catalog integrity", () => {
  it("uses unique ids and slugs", () => {
    expect(new Set(products.map((product) => product.id)).size).toBe(products.length);
    expect(new Set(products.map((product) => product.slug)).size).toBe(products.length);
  });

  it("keeps every initial item in non-sellable concept status", () => {
    for (const product of products) {
      expect(product.status).toBe("concept");
      expect(product.priceCents).toBeNull();
      expect(product.verifiedComfortFeatures).toEqual([]);
      expect(product.conceptNote.length).toBeGreaterThan(20);
    }
  });

  it("publishes only the four focused founding-collection designs in merchandising order", () => {
    const published = products.filter((product) => product.published);
    expect(published).toHaveLength(4);
    expect(published.every((product) => product.featured)).toBe(true);
    expect(published.map((product) => product.slug)).toEqual([
      "more-than-words-tee",
      "im-nonverbal-still-communicating-tee",
      "different-communication-same-respect-tee",
      "speech-isnt-the-only-way-tee",
    ]);
  });

  it("has valid local imagery and collection references", () => {
    const collectionSlugs = new Set(collections.map((collection) => collection.slug));
    for (const product of products) {
      expect(collectionSlugs.has(product.collection)).toBe(true);
      expect(product.images.length).toBeGreaterThan(0);
      expect(product.images.every((image) => image.startsWith("/images/") && /\.(png|webp)$/.test(image))).toBe(true);
    }
  });
});

describe("catalog recommendations", () => {
  it("matches actual collection and product type fields deterministically", () => {
    const results = recommendProducts(products, "for-me", ["T-shirt"]);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((product) => product.collection === "for-me" && product.type === "T-shirt")).toBe(true);
  });

  it("returns a graceful empty set when no exact catalog combination exists", () => {
    expect(recommendProducts(products, "community-allies", ["Joggers"])).toEqual([]);
  });
});
