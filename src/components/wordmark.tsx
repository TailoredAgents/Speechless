import { brand } from "@/config/brand";

export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`wordmark ${inverted ? "wordmark--inverted" : ""}`} aria-label={brand.name}>
      {brand.name.toUpperCase()}<span aria-hidden="true">/</span><i aria-hidden="true" />
    </span>
  );
}
