import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale — Northbound Coffee" },
      { name: "description", content: "Coffee for cafés, offices and good neighbours." },
      { property: "og:url", content: "/wholesale" },
    ],
    links: [{ rel: "canonical", href: "/wholesale" }],
  }),
  component: Page,
});

function Page() {
  const [f, setF] = useState({ name: "", company: "", email: "", message: "" });
  function submit(e: FormEvent) {
    e.preventDefault();
    toast.success("Thanks — we'll be in touch shortly.");
    setF({ name: "", company: "", email: "", message: "" });
  }
  return (
    <>
      <section className="pt-20 md:pt-32 pb-12">
        <div className="container-x max-w-3xl">
          <p className="eyebrow mb-4">Wholesale</p>
          <h1 className="mb-8">Coffee for cafés, offices and good neighbours.</h1>
          <p className="text-foreground/80 leading-relaxed">
            We work with a small number of partners across Denmark and the Nordics. If our coffee feels right for your room,
            tell us a little about your project and we'll write back personally.
          </p>
        </div>
      </section>

      <section className="section-y bg-secondary/50">
        <div className="container-x grid md:grid-cols-2 gap-12">
          <form onSubmit={submit} className="space-y-5 max-w-md">
            <Field label="Your name" value={f.name} onChange={(v) => setF({ ...f, name: v })} />
            <Field label="Company" value={f.company} onChange={(v) => setF({ ...f, company: v })} />
            <Field label="Email" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} />
            <label className="block">
              <span className="eyebrow mb-2 block">Tell us about your project</span>
              <textarea
                value={f.message}
                onChange={(e) => setF({ ...f, message: e.target.value })}
                rows={5}
                className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground py-2.5 outline-none resize-none"
              />
            </label>
            <button className="btn-primary" type="submit">Send enquiry</button>
          </form>
          <div className="space-y-5 text-sm">
            <p className="eyebrow">What we offer</p>
            <ul className="space-y-3 text-foreground/80">
              <li>— Freshly roasted coffee, twice weekly delivery.</li>
              <li>— On-site training for your team.</li>
              <li>— Espresso recipe development and ongoing dialling-in.</li>
              <li>— Equipment recommendations and service contacts.</li>
              <li>— Transparent pricing, simple monthly invoicing.</li>
            </ul>
            <p className="pt-6 text-muted-foreground">
              Prefer to talk? <Link to="/contact" className="link-underline">Get in touch</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground py-2.5 outline-none"
      />
    </label>
  );
}
