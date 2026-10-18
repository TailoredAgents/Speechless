import type { Product } from "@/types/catalog";

export function recommendProducts(products: Product[], collection: string, types: string[], limit = 6) {
  return products
    .filter((product) => collection === "both" || !collection || product.collection === collection)
    .filter((product) => types.length === 0 || types.includes(product.type))
    .slice(0, limit);
}
