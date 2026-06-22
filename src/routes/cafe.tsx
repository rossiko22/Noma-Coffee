import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cafe")({
  head: () => ({
    meta: [
      { title: "Café — Northbound Coffee Roasters, Copenhagen" },
      { name: "description", content: "Visit our small café and roastery on Refshalevej in Copenhagen. Open every day." },
      { property: "og:title", content: "Visit the café — Northbound" },
      { property: "og:description", content: "A small café and roastery in Copenhagen." },
      { property: "og:url", content: "/cafe" },
    ],
    links: [{ rel: "canonical", href: "/cafe" }],
  }),
  component: CafePage,
});

const menu = {
  Coffee: [
    ["Espresso", "3.5"],
    ["Macchiato", "4.0"],
    ["Flat white", "4.5"],
    ["Cortado", "4.0"],
    ["V60 of the day", "5.0"],
    ["Filter, batch brew", "3.5"],
  ],
  "Not coffee": [
    ["Matcha latte", "5.0"],
    ["Hot chocolate", "4.5"],
    ["Sparkling lemon", "3.5"],
  ],
  Pastries: [
    ["Cardamom bun", "4.0"],
    ["Rye sourdough toast", "5.5"],
    ["Almond financier", "3.5"],
    ["Seasonal galette", "6.0"],
  ],
} as const;

function CafePage() {
  return (
    <>
      <section className="relative h-[70vh] min-h-[460px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=2400&q=85"
          alt="The café interior, with warm wood, soft light and a long counter."
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/0 to-ink/55" />
        <div className="absolute inset-x-0 bottom-0 container-x pb-12 md:pb-16">
          <p className="eyebrow text-cream/80 mb-4 fade-up fade-up-1">The café</p>
          <h1 className="text-cream max-w-3xl fade-up fade-up-2">Refshalevej 174.</h1>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-3">Visit</p>
            <h2 className="mb-6">A small room with good light.</h2>
            <p className="text-foreground/80 leading-relaxed mb-10">
              We've been on Refshaleøen since 2019, in a converted shipping warehouse next to the water. The café shares its
              wall with the roastery — so the coffee in your cup was, most likely, roasted three meters from where you're standing.
            </p>
            <dl className="grid grid-cols-2 gap-y-3 text-sm max-w-sm">
              <dt className="text-muted-foreground">Address</dt><dd>Refshalevej 174<br/>1432 Copenhagen K</dd>
              <dt className="text-muted-foreground">Mon — Fri</dt><dd className="tabular-nums">07:00 — 17:00</dd>
              <dt className="text-muted-foreground">Sat — Sun</dt><dd className="tabular-nums">08:00 — 16:00</dd>
              <dt className="text-muted-foreground">Phone</dt><dd>+45 32 12 34 56</dd>
            </dl>
          </div>

          <div className="md:col-span-7 aspect-[4/3] bg-muted overflow-hidden">
            <iframe
              title="Map of Refshaleøen, Copenhagen"
              src="https://www.openstreetmap.org/export/embed.html?bbox=12.6%2C55.69%2C12.62%2C55.70&layer=mapnik"
              className="h-full w-full border-0 grayscale-[60%]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary/50">
        <div className="container-x">
          <p className="eyebrow mb-3">Menu</p>
          <h2 className="mb-14">What we make.</h2>
          <div className="grid md:grid-cols-3 gap-x-12 gap-y-14">
            {Object.entries(menu).map(([cat, items]) => (
              <div key={cat}>
                <h3 className="font-display text-xl mb-6">{cat}</h3>
                <ul className="space-y-3">
                  {items.map(([name, price]) => (
                    <li key={name} className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2">
                      <span>{name}</span>
                      <span className="text-sm text-muted-foreground tabular-nums">€{price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid md:grid-cols-2 gap-6">
          <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80" alt="Latte art on a stoneware cup." className="aspect-[4/5] object-cover" loading="lazy" />
          <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80" alt="A barista pulling an espresso shot." className="aspect-[4/5] object-cover" loading="lazy" />
        </div>
      </section>
    </>
  );
}
