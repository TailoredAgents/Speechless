import type { MetadataRoute } from "next";
import { collections, products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const paths = [
    "",
    "/shop",
    "/our-approach",
    "/comfort-finder",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    ...collections.map((item) => `/collections/${item.slug}`),
    ...products.filter((item) => item.published).map((item) => `/products/${item.slug}`),
  ];

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path.includes("products") ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
