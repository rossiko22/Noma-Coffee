import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Story — Northbound Coffee Roasters" },
      { name: "description", content: "How we source, roast and think about coffee — and the people who make it possible." },
      { property: "og:title", content: "Our story — Northbound Coffee Roasters" },
      { property: "og:description", content: "Sourcing, roasting and the people behind the cup." },
      { property: "og:url", content: "/story" },
    ],
    links: [{ rel: "canonical", href: "/story" }],
  }),
  component: StoryPage,
});

const people = [
  { name: "Mette Lindqvist", role: "Founder, Head Roaster", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80" },
  { name: "Joakim Sand", role: "Green Buyer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80" },
  { name: "Frida Holm", role: "Head of Café", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80" },
  { name: "Anders Krogh", role: "Wholesale", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80" },
];

function StoryPage() {
  return (
    <>
      <section className="pt-20 md:pt-32 pb-12">
        <div className="container-x max-w-4xl">
          <p className="eyebrow mb-4 fade-up fade-up-1">Story</p>
          <h1 className="fade-up fade-up-2">We started Northbound because we wanted a cup that tasted like its origin.</h1>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-x">
          <img
            src="https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=2400&q=85"
            alt="Coffee cherries ripening on the branch at altitude."
            className="w-full aspect-[16/9] object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Sourcing</p>
          </div>
          <div className="md:col-span-8 max-w-2xl space-y-6 text-[1.05rem] text-foreground/80 leading-relaxed">
            <h2 className="mb-4">Direct, slow, repeated.</h2>
            <p>
              We buy from a small group of producers — fifteen or so, across six countries. Every coffee we sell is one we've
              tasted at origin, paid for above market rate, and signed a long-term agreement on. We go back every year.
            </p>
            <p>
              There's nothing especially clever about this. It just takes time, and it requires us to stay small.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-x grid md:grid-cols-2 gap-6">
          <img src="https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=1400&q=80" alt="Roasted coffee beans cooling in the roaster tray." className="aspect-[4/5] object-cover" loading="lazy" />
          <img src="https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=1400&q=80" alt="Coffee farm at altitude." className="aspect-[4/5] object-cover" loading="lazy" />
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4"><p className="eyebrow">Roasting</p></div>
          <div className="md:col-span-8 max-w-2xl space-y-6 text-[1.05rem] text-foreground/80 leading-relaxed">
            <h2 className="mb-4">Lightly, in small batches.</h2>
            <p>
              We roast on a 15-kilo Loring two days a week. Each profile is built to bring out the coffee we tasted at origin
              — never to impose a house style on top of it.
            </p>
            <p>
              Our roasts tend to land on the lighter side of medium. Not as a statement, but because that's where these coffees taste like themselves.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary/50">
        <div className="container-x">
          <p className="eyebrow mb-3">Our people</p>
          <h2 className="mb-14">The four of us, mostly.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {people.map((p) => (
              <div key={p.name}>
                <div className="aspect-[4/5] bg-muted overflow-hidden mb-4">
                  <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <h4 className="font-display text-lg">{p.name}</h4>
                <p className="text-sm text-muted-foreground">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
