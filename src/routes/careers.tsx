import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Northbound Coffee" },
      { name: "description", content: "Open roles at our Copenhagen roastery and café." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: Page,
});

const roles = [
  { title: "Senior Barista", type: "Full-time · Copenhagen", desc: "Lead the bar three mornings a week and help shape our espresso programme." },
  { title: "Production Roaster", type: "Full-time · Copenhagen", desc: "Roast alongside our head roaster on the Loring 15kg, two days a week." },
  { title: "Weekend Café Host", type: "Part-time · Copenhagen", desc: "Sat–Sun mornings. Front of house, bakes, and quiet conversations." },
];

function Page() {
  return (
    <>
      <section className="pt-20 md:pt-32 pb-12">
        <div className="container-x max-w-3xl">
          <p className="eyebrow mb-4">Careers</p>
          <h1 className="mb-8">Come work with us.</h1>
          <p className="text-foreground/80 leading-relaxed">
            A small team in Copenhagen. We pay well, we train carefully, and we close on the major holidays. If something below
            sounds like you, write us a paragraph or two — no formal cover letter required.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <ul className="divide-y divide-border border-y border-border">
            {roles.map((r) => (
              <li key={r.title} className="py-8 grid md:grid-cols-12 gap-6 items-baseline">
                <div className="md:col-span-3"><p className="eyebrow">{r.type}</p></div>
                <div className="md:col-span-7">
                  <h3 className="font-display text-2xl mb-2">{r.title}</h3>
                  <p className="text-foreground/80">{r.desc}</p>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <Link to="/contact" className="link-underline text-sm uppercase tracking-[0.18em]">Apply →</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
