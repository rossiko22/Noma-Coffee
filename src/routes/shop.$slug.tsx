import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/product-card";
import { toast } from "sonner";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — Northbound` : "Coffee — Northbound";
    const desc = p?.description ?? "Specialty coffee from Northbound.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: p?.image },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/shop/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/shop/${params.slug}` }],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="mb-4">Coffee not found.</h1>
      <Link to="/shop" className="btn-ghost mt-4">Back to shop</Link>
    </div>
  ),
});

const grinds = ["Whole bean", "Espresso", "Filter", "Aeropress", "French press"];
const sizes = ["250g", "500g", "1kg"] as const;
const sizeMul: Record<(typeof sizes)[number], number> = { "250g": 1, "500g": 1.8, "1kg": 3.2 };

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, setOpen } = useCart();
  const [grind, setGrind] = useState(grinds[0]);
  const [size, setSize] = useState<(typeof sizes)[number]>("250g");
  const [qty, setQty] = useState(1);
  const gallery: string[] = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image, product.imageAlt];
  const [active, setActive] = useState(0);

  const isGear = product.category === "Brew Gear" || product.category === "Merch";
  const totalPrice = isGear ? product.price * qty : Math.round(product.price * sizeMul[size] * qty);
  const similar = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="container-x pt-8">
        <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/shop" className="link-underline">Shop</Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-foreground">{product.category}</span>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-foreground/70">{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <section className="pt-8 md:pt-14 pb-16 md:pb-28">
        <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] bg-secondary/50 overflow-hidden">
              {gallery.map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  alt={`${product.name} — view ${i + 1}`}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                    active === i ? "opacity-100" : "opacity-0"
                  }`}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ))}
              {product.badge && (
                <span className="absolute top-5 left-5 text-[0.62rem] uppercase tracking-[0.22em] bg-background/90 backdrop-blur px-3 py-1.5">
                  {product.badge}
                </span>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2 md:gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setActive(i)}
                    className={`aspect-square overflow-hidden transition-all ${
                      active === i ? "ring-1 ring-foreground" : "opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Show image ${i + 1}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:col-span-5 lg:pl-2 lg:sticky lg:top-28 lg:self-start">
            {product.origin && <p className="eyebrow mb-4 fade-up fade-up-1">{product.origin}</p>}
            <h1 className="!text-[clamp(2.25rem,4vw,3.75rem)] mb-5 fade-up fade-up-2">{product.name}</h1>
            <p className="text-foreground/80 leading-relaxed mb-8 fade-up fade-up-3">{product.description}</p>

            {product.notes.length > 0 && (
              <div className="mb-10">
                <p className="eyebrow mb-3">Tasting notes</p>
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((n: string) => (
                    <span key={n} className="text-[0.7rem] uppercase tracking-[0.16em] border border-border px-3 py-1.5">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="rule mb-8" />

            {!isGear && (
              <>
                <div className="mb-7">
                  <div className="flex items-baseline justify-between mb-3">
                    <p className="eyebrow">Size</p>
                    <p className="text-xs text-muted-foreground tabular-nums">€{Math.round(product.price * sizeMul[size])}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`py-3 text-sm border transition-colors ${
                          size === s
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground/60"
                        }`}
                        aria-pressed={size === s}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <p className="eyebrow mb-3">Grind</p>
                  <div className="flex flex-wrap gap-2">
                    {grinds.map((g) => (
                      <button
                        key={g}
                        onClick={() => setGrind(g)}
                        className={`px-3.5 py-2 text-xs uppercase tracking-[0.14em] border transition-colors ${
                          grind === g
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground/60"
                        }`}
                        aria-pressed={grind === g}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="flex items-stretch gap-3 mb-4">
              <div className="inline-flex items-center border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 h-full" aria-label="Decrease">−</button>
                <span className="px-4 tabular-nums">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 h-full" aria-label="Increase">+</button>
              </div>
              <button
                onClick={() => {
                  add(product.slug, {
                    grind: isGear ? undefined : grind,
                    size: isGear ? undefined : size,
                    quantity: qty,
                  });
                  toast.success(`${product.name} added to cart`);
                  setOpen(true);
                }}
                className="btn-primary flex-1 justify-between"
              >
                <span>Add to cart</span>
                <span className="tabular-nums">€{totalPrice}</span>
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-10">Roasted on the next batch day · Free shipping over €50.</p>

            {product.details && (
              <dl className="border-t border-border pt-6 grid grid-cols-2 gap-y-4 text-sm">
                {product.details.process && (<><dt className="text-muted-foreground">Process</dt><dd>{product.details.process}</dd></>)}
                {product.details.altitude && (<><dt className="text-muted-foreground">Altitude</dt><dd>{product.details.altitude}</dd></>)}
                {product.details.roast && (<><dt className="text-muted-foreground">Roast</dt><dd>{product.details.roast}</dd></>)}
                {product.details.variety && (<><dt className="text-muted-foreground">Variety</dt><dd>{product.details.variety}</dd></>)}
              </dl>
            )}
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="section-y border-t border-border">
          <div className="container-x">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="eyebrow mb-3">You might also like</p>
                <h2>From the same shelf.</h2>
              </div>
              <Link to="/shop" className="hidden md:inline link-underline text-sm uppercase tracking-[0.18em]">All coffees →</Link>
            </div>
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
              {similar.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
