import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/lib/journal";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Northbound Coffee" },
      { name: "description", content: "Brew guides, origin stories and notes from the roastery." },
      { property: "og:title", content: "Journal — Northbound" },
      { property: "og:description", content: "Brew guides, origin stories and notes from the roastery." },
      { property: "og:url", content: "/journal" },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: JournalPage,
});

function JournalPage() {
  const [feature, ...rest] = posts;
  return (
    <>
      <section className="pt-20 md:pt-28 pb-12">
        <div className="container-x">
          <p className="eyebrow mb-4 fade-up fade-up-1">Journal</p>
          <h1 className="max-w-3xl fade-up fade-up-2">Notes from the roastery.</h1>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x">
          <Link to="/journal/$slug" params={{ slug: feature.slug }} className="group block">
            <div className="aspect-[21/9] bg-muted overflow-hidden mb-8">
              <img src={feature.cover} alt={feature.title} className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]" loading="lazy" />
            </div>
            <div className="max-w-3xl">
              <p className="eyebrow mb-3">{feature.category} · {feature.date}</p>
              <h2 className="mb-4">{feature.title}</h2>
              <p className="text-foreground/80">{feature.excerpt}</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="section-y border-t border-border">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {rest.map((p) => (
            <Link key={p.slug} to="/journal/$slug" params={{ slug: p.slug }} className="group block">
              <div className="aspect-[4/3] bg-muted overflow-hidden mb-5">
                <img src={p.cover} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
              </div>
              <p className="eyebrow mb-2">{p.category} · {p.date}</p>
              <h3 className="font-display text-2xl mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
