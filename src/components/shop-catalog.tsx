"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types/catalog";

type Filters = { collection: string; fit: string };
const emptyFilters: Filters = { collection: "", fit: "" };

export function ShopCatalog({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState(emptyFilters);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    const dialog = drawerRef.current;
    const trigger = triggerRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled])');
    focusable?.[0]?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDrawerOpen(false);
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", handleKeyDown); trigger?.focus(); };
  }, [drawerOpen]);

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const haystack = `${product.name} ${product.collectionLabel} ${product.type} ${product.audience}`.toLowerCase();
      return (
        (!query || haystack.includes(query.toLowerCase())) &&
        (!filters.collection || product.collection === filters.collection) &&
        (!filters.fit || product.fit === filters.fit)
      );
    });
    if (sort === "name") return result.toSorted((a, b) => a.name.localeCompare(b.name));
    if (sort === "collection") return result.toSorted((a, b) => a.collection.localeCompare(b.collection));
    return result.toSorted((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [filters, products, query, sort]);

  const activeCount = Object.values(filters).filter(Boolean).length;
  const controls = (
    <>
      <FilterGroup label="Collection" value={filters.collection} onChange={(value) => setFilters({ ...filters, collection: value })} options={[["All collections", ""], ["For Me", "for-me"], ["Family & Caregivers", "family-caregivers"], ["Community & Allies", "community-allies"]]} />
      <FilterGroup label="Fit" value={filters.fit} onChange={(value) => setFilters({ ...filters, fit: value })} options={[["All fits", ""], ["Relaxed", "Relaxed"], ["Classic", "Classic"], ["Oversized", "Oversized"]]} />
    </>
  );

  return (
    <section id="catalog" className="shop-catalog shell shell--wide">
      <div className="shop-toolbar">
        <div className="search-field">
          <Search size={17} />
          <label htmlFor="catalog-search">Search designs</label>
          <input id="catalog-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" />
        </div>
        <button ref={triggerRef} className="filter-trigger" onClick={() => setDrawerOpen(true)} aria-expanded={drawerOpen} aria-controls="catalog-filter-drawer">
          <SlidersHorizontal size={17} /> Filters {activeCount > 0 && <span>{activeCount}</span>}
        </button>
        <label className="sort-field">Sort
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="name">Name</option>
            <option value="collection">Collection</option>
          </select>
        </label>
      </div>
      <div className="shop-layout">
        <aside className="filter-sidebar" aria-label="Product filters">
          <div className="filter-sidebar__title"><span>Filter</span><button onClick={() => setFilters(emptyFilters)}>Clear all</button></div>
          {controls}
          <div className="filter-note"><strong>Founding collection</strong><p>Four adult T-shirts, three perspectives, and more than one way to communicate.</p></div>
        </aside>
        <div className="shop-results">
          <div className="shop-results__count"><span>{filtered.length} {filtered.length === 1 ? "core design" : "core designs"}</span><span>Founding collection</span></div>
          {filtered.length > 0 ? (
            <div className="product-grid product-grid--shop">{filtered.map((product) => <ProductCard product={product} key={product.id} />)}</div>
          ) : (
            <div className="catalog-empty"><h2>No designs match those choices.</h2><p>Try clearing a filter or searching for something broader.</p><button className="button button--dark" onClick={() => { setFilters(emptyFilters); setQuery(""); }}>Reset the catalog</button></div>
          )}
        </div>
      </div>
      <div className={`filter-drawer-backdrop ${drawerOpen ? "is-open" : ""}`} onClick={() => setDrawerOpen(false)} />
      <aside ref={drawerRef} id="catalog-filter-drawer" className={`filter-drawer ${drawerOpen ? "is-open" : ""}`} aria-hidden={!drawerOpen} role="dialog" aria-modal="true" aria-label="Filter designs">
        <div className="filter-drawer__top"><h2>Filter designs</h2><button className="icon-button" onClick={() => setDrawerOpen(false)} aria-label="Close filters"><X /></button></div>
        <div className="filter-drawer__body">{controls}</div>
        <div className="filter-drawer__actions"><button className="button button--outline" onClick={() => setFilters(emptyFilters)}>Clear</button><button className="button button--dark" onClick={() => setDrawerOpen(false)}>Show {filtered.length}</button></div>
      </aside>
    </section>
  );
}

function FilterGroup({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[][] }) {
  return (
    <fieldset className="filter-group">
      <legend>{label}</legend>
      {options.map(([name, optionValue]) => (
        <label key={name}><input type="radio" name={label} value={optionValue} checked={value === optionValue} onChange={() => onChange(optionValue)} /><span>{name}</span></label>
      ))}
    </fieldset>
  );
}
