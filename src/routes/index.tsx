import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Northbound Coffee Roasters — Coffee, in season." },
      { name: "description", content: "Single-origin coffee, roasted slowly in small batches in Copenhagen." },
      { property: "og:title", content: "Northbound Coffee Roasters" },
      { property: "og:description", content: "Single-origin coffee, roasted slowly in small batches in Copenhagen." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const features = [
  {
    title: "New: Ethiopia Guji",
    sub: "Jasmine, peach, bergamot",
    href: "/shop/ethiopia-guji" as const,
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1200&q=80",
    tag: "Seasonal",
  },
  {
    title: "The subscription",
    sub: "Fresh coffee, on your terms.",
    href: "/subscribe" as const,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200&q=80",
    tag: "Coffee club",
  },
  {
    title: "Brew guides",
    sub: "Recipes we use every morning.",
    href: "/journal" as const,
    image: "https://images.unsplash.com/photo-1542367597-8849eb950fd8?auto=format&fit=crop&w=1200&q=80",
    tag: "Journal",
  },
  {
    title: "Visit the café",
    sub: "Refshalevej, Copenhagen.",
    href: "/cafe" as const,
    image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1200&q=80",
    tag: "Café",
  },
  {
    title: "Wholesale",
    sub: "For cafés, offices and good neighbours.",
    href: "/wholesale" as const,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=80",
    tag: "Trade",
  },
] as const;

function HomePage() {
  const featured = products.filter((p) => p.category === "Single-Origin" || p.category === "Blends").slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2400&q=85"
          alt="A slow pour-over filling a glass carafe on a wooden counter in soft morning light."
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/20 to-ink/55" />
        <div className="absolute inset-x-0 bottom-0 container-x pb-16 md:pb-24">
          <p className="eyebrow text-cream/80 fade-up fade-up-1">Spring 2026 — Issue No. 14</p>
          <h1 className="text-cream mt-4 max-w-4xl fade-up fade-up-2">Coffee, in season.</h1>
          <p className="mt-6 text-cream/85 max-w-xl text-lg fade-up fade-up-3">
            Roasted slowly, in small batches, in Copenhagen.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 fade-up fade-up-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-7 py-4 bg-cream text-ink text-[0.78rem] uppercase tracking-[0.18em] hover:bg-clay hover:text-cream transition-colors"
            >
              Shop coffee
            </Link>
            <Link
              to="/story"
              className="inline-flex items-center gap-2 px-7 py-4 border border-cream/70 text-cream text-[0.78rem] uppercase tracking-[0.18em] hover:bg-cream hover:text-ink transition-colors"
            >
              Our story
            </Link>
          </div>
        </div>
      </section>

      {/* Brand narrative */}
      <section className="section-y">
        <div className="container-x grid md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-4">
            <p className="eyebrow">What we're about</p>
          </div>
          <div className="md:col-span-8 max-w-2xl">
            <h2 className="mb-8">A small roastery built around the idea that good coffee should taste like its origin.</h2>
            <div className="space-y-6 text-[1.05rem] text-foreground/80 leading-relaxed">
              <p>
                We buy a small number of coffees each year, directly from the people who grow them. We roast them lightly,
                in batches small enough to taste every one. We sell them while they're fresh, and we stop selling them when they're not.
              </p>
              <p>
                The café opens at seven. The roastery is at the back. If you're in Copenhagen, come and try a cup before you buy a bag —
                that's how it should work.
              </p>
              <div className="pt-2">
                <Link to="/story" className="link-underline text-sm uppercase tracking-[0.18em]">Read the story →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-x"><div className="rule" /></div>

      {/* What's brewing */}
      <section className="section-y">
        <div className="container-x">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="eyebrow mb-3">What's brewing</p>
              <h2 className="max-w-xl">A few things, this season.</h2>
            </div>
            <Link to="/journal" className="hidden md:inline link-underline text-sm uppercase tracking-[0.18em]">All updates →</Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Link
                key={f.title}
                to={f.href}
                className={`group block ${i === 0 ? "lg:row-span-2 lg:col-span-1" : ""}`}
              >
                <div className={`overflow-hidden bg-muted ${i === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <img
                    src={f.image}
                    alt={f.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pt-5">
                  <p className="eyebrow mb-2">{f.tag}</p>
                  <h3 className="font-display text-2xl mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container-x"><div className="rule" /></div>

      {/* Featured coffees */}
      <section className="section-y">
        <div className="container-x">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="eyebrow mb-3">Featured coffees</p>
              <h2>On the menu now.</h2>
            </div>
            <Link to="/shop" className="link-underline text-sm uppercase tracking-[0.18em]">Shop all →</Link>
          </div>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* Café / visit */}
      <section className="section-y bg-secondary/60">
        <div className="container-x grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-4">The café</p>
            <h2 className="mb-6">Refshalevej 174, Copenhagen.</h2>
            <p className="text-foreground/80 mb-8 leading-relaxed">
              A small room with good light, a long wooden counter, and whatever's just come off the roaster.
              No laptops on weekends — we're old-fashioned that way.
            </p>
            <dl className="grid grid-cols-2 gap-y-3 text-sm mb-10 max-w-sm">
              <dt className="text-muted-foreground">Mon — Fri</dt><dd className="tabular-nums">07:00 — 17:00</dd>
              <dt className="text-muted-foreground">Sat — Sun</dt><dd className="tabular-nums">08:00 — 16:00</dd>
            </dl>
            <Link to="/cafe" className="btn-ghost">Café details</Link>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img
              src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1400&q=80"
              alt="Warm, minimalist café interior with a long wooden counter and morning light."
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
