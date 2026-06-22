import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/subscribe")({
  head: () => ({
    meta: [
      { title: "Subscribe — Northbound Coffee" },
      { name: "description", content: "A simple, premium coffee subscription. Choose your frequency, bag size and roast." },
      { property: "og:title", content: "Coffee Subscription — Northbound" },
      { property: "og:description", content: "Fresh coffee on your terms, from our Copenhagen roastery." },
      { property: "og:url", content: "/subscribe" },
    ],
    links: [{ rel: "canonical", href: "/subscribe" }],
  }),
  component: SubscribePage,
});

const frequencies = [
  { id: "weekly", label: "Weekly", note: "Heavy drinkers, households of two." },
  { id: "biweekly", label: "Biweekly", note: "Our most popular cadence." },
  { id: "monthly", label: "Monthly", note: "Occasional sippers, gifts." },
] as const;

const sizes = [
  { id: "250", label: "250 g", price: 19 },
  { id: "500", label: "500 g", price: 34 },
  { id: "1000", label: "1 kg", price: 62 },
] as const;

const roasts = [
  { id: "light", label: "Light & fruity", note: "Single-origin, washed and natural." },
  { id: "balanced", label: "Balanced", note: "Mid-roast, versatile, sweet." },
  { id: "espresso", label: "Espresso-leaning", note: "Darker, fuller body, for the machine." },
] as const;

function SubscribePage() {
  const [freq, setFreq] = useState<(typeof frequencies)[number]["id"]>("biweekly");
  const [size, setSize] = useState<(typeof sizes)[number]["id"]>("500");
  const [roast, setRoast] = useState<(typeof roasts)[number]["id"]>("balanced");

  const price = useMemo(() => sizes.find((s) => s.id === size)!.price, [size]);
  const cadenceLabel = frequencies.find((f) => f.id === freq)!.label.toLowerCase();

  return (
    <>
      <section className="pt-20 pb-12 md:pt-32">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-4 fade-up fade-up-1">The subscription</p>
            <h1 className="fade-up fade-up-2">Fresh coffee, on your terms.</h1>
            <p className="mt-8 max-w-xl text-foreground/80 leading-relaxed fade-up fade-up-3">
              We roast on Tuesdays and Fridays. Your bag goes out the same day. No contracts, pause or cancel anytime.
            </p>
          </div>
          <div className="lg:col-span-6 aspect-[4/5] bg-muted overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1400&q=80"
              alt="A bag of single-origin coffee on a wooden counter."
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary/50">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <Group title="01 — Frequency">
              <div className="grid sm:grid-cols-3 gap-3">
                {frequencies.map((f) => (
                  <Choice key={f.id} active={freq === f.id} onClick={() => setFreq(f.id)} label={f.label} note={f.note} />
                ))}
              </div>
            </Group>

            <Group title="02 — Bag size">
              <div className="grid sm:grid-cols-3 gap-3">
                {sizes.map((s) => (
                  <Choice
                    key={s.id}
                    active={size === s.id}
                    onClick={() => setSize(s.id)}
                    label={s.label}
                    note={`€${s.price} per delivery`}
                  />
                ))}
              </div>
            </Group>

            <Group title="03 — Roast preference">
              <div className="grid sm:grid-cols-3 gap-3">
                {roasts.map((r) => (
                  <Choice key={r.id} active={roast === r.id} onClick={() => setRoast(r.id)} label={r.label} note={r.note} />
                ))}
              </div>
            </Group>
          </div>

          <aside className="lg:col-span-4">
            <div className="border border-border bg-background p-8 sticky top-24">
              <p className="eyebrow mb-3">Your subscription</p>
              <h3 className="font-display text-3xl mb-6">
                €{price}<span className="text-base text-muted-foreground"> / delivery</span>
              </h3>
              <dl className="space-y-3 text-sm border-t border-border pt-5">
                <Row k="Frequency" v={cadenceLabel} />
                <Row k="Bag size" v={sizes.find((s) => s.id === size)!.label} />
                <Row k="Roast" v={roasts.find((r) => r.id === roast)!.label} />
                <Row k="Shipping" v="Free, in the EU" />
              </dl>
              <button
                onClick={() => toast.success("Subscription started — welcome.")}
                className="btn-primary w-full justify-center mt-7"
              >
                Start subscription
              </button>
              <p className="text-xs text-muted-foreground mt-4">No contract. Pause or cancel anytime.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl mb-5">{title}</h2>
      {children}
    </div>
  );
}

function Choice({ active, onClick, label, note }: { active: boolean; onClick: () => void; label: string; note: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-5 border transition-colors ${
        active ? "border-foreground bg-background" : "border-border hover:border-foreground/60 bg-background/60"
      }`}
      aria-pressed={active}
    >
      <p className="font-display text-lg mb-1">{label}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{note}</p>
    </button>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="capitalize">{v}</dd>
    </div>
  );
}
