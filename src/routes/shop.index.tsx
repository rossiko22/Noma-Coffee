import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

const categories = ["All", "Single-Origin", "Blends", "Decaf", "Brew Gear", "Merch"] as const;
type Cat = (typeof categories)[number];

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop — Northbound Coffee Roasters" },
      { name: "description", content: "Single-origin coffee, blends, decaf and brew gear from our Copenhagen roastery." },
      { property: "og:title", content: "Shop — Northbound Coffee Roasters" },
      { property: "og:description", content: "Single-origin coffee, blends, decaf and brew gear." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

const sortOptions = ["Featured", "Price · Low to high", "Price · High to low", "Name"] as const;
type Sort = (typeof sortOptions)[number];

function ShopPage() {
  const [cat, setCat] = useState<Cat>("All");
  const [sort, setSort] = useState<Sort>("Featured");

  const filtered = useMemo(() => {
    const base = cat === "All" ? products : products.filter((p) => p.category === cat);
    const copy = [...base];
    switch (sort) {
      case "Price · Low to high": return copy.sort((a, b) => a.price - b.price);
      case "Price · High to low": return copy.sort((a, b) => b.price - a.price);
      case "Name": return copy.sort((a, b) => a.name.localeCompare(b.name));
      default: return copy;
    }
  }, [cat, sort]);

  const counts = useMemo(() => {
    const all: Record<string, number> = { All: products.length };
    for (const c of categories) {
      if (c !== "All") all[c] = products.filter((p) => p.category === c).length;
    }
    return all;
  }, []);

  return (
    <>
      {/* Editorial header */}
      <section className="pt-20 md:pt-32 pb-12 md:pb-20">
        <div className="container-x grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5 fade-up fade-up-1">Spring 2026 · The Menu</p>
            <h1 className="fade-up fade-up-2">
              A short list, <em className="not-italic text-clay">in season.</em>
            </h1>
          </div>
          <div className="md:col-span-5 flex md:items-end fade-up fade-up-3">
            <p className="max-w-md text-foreground/75 leading-relaxed">
              Twelve things on the shelf, no more. Coffees roasted this week, gear we'd use ourselves,
              and a few quiet objects for the kitchen counter.
            </p>
          </div>
        </div>
      </section>

      <div className="container-x"><div className="rule" /></div>

      {/* Sticky filter bar — Noma-style */}
      <section className="sticky top-[72px] z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container-x py-4 md:py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <nav
            className="-mx-4 px-4 md:mx-0 md:px-0 flex gap-x-6 md:gap-x-7 overflow-x-auto md:flex-wrap md:gap-y-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Categories"
          >
            {categories.map((c) => {
              const active = cat === c;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className="relative shrink-0 px-1 py-1 text-[0.72rem] md:text-[0.78rem] uppercase tracking-[0.16em] md:tracking-[0.18em] transition-colors"
                  aria-pressed={active}
                >
                  <span className={active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}>
                    {c}
                  </span>
                  <span className="ml-1.5 text-[0.6rem] opacity-50 tabular-nums">{counts[c] ?? 0}</span>
                  <span
                    className={`absolute -bottom-[14px] md:-bottom-[18px] left-0 right-0 h-px bg-foreground transition-transform origin-left duration-500 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <label className="flex items-center justify-between md:justify-start gap-3 text-[0.68rem] md:text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-transparent border-b border-border focus:border-foreground py-1 outline-none text-foreground text-xs"
            >
              {sortOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="mb-10 flex items-baseline justify-between text-sm text-muted-foreground">
            <p>
              <span className="tabular-nums">{filtered.length}</span> {filtered.length === 1 ? "item" : "items"}
              {cat !== "All" && <> · {cat}</>}
            </p>
            {cat !== "All" && (
              <button onClick={() => setCat("All")} className="link-underline text-xs uppercase tracking-[0.18em]">
                Clear filter
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-display text-3xl mb-4">Nothing in this category right now.</p>
              <Link to="/shop" className="link-underline text-sm uppercase tracking-[0.18em]">View all →</Link>
            </div>
          ) : (
            <div
              key={cat + sort}
              className="grid gap-x-6 md:gap-x-10 gap-y-16 md:gap-y-24 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((p, i) => (
                <div key={p.slug} className="fade-up" style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quiet footer band */}
      <section className="border-t border-border py-16 bg-secondary/40">
        <div className="container-x grid md:grid-cols-3 gap-10">
          <Pillar title="Roasted this week" body="Every order is roasted on the next batch day — Tuesday or Friday — and shipped within 48 hours." />
          <Pillar title="Free EU shipping" body="On orders over €50. Carbon-neutral, tracked, and quietly packaged." />
          <Pillar title="Drink it, like it, or send it back" body="If a coffee isn't for you, write us. We'll make it right." />
        </div>
      </section>
    </>
  );
}

function Pillar({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-display text-xl mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{body}</p>
    </div>
  );
}
