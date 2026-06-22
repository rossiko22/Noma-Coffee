import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Northbound Coffee" },
      { name: "description", content: "Get in touch with the roastery in Copenhagen." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState<Record<string, string>>({});

  function submit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!f.name) next.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) next.email = "Valid email required";
    if (!f.message || f.message.length < 10) next.message = "A few more words, please";
    setErr(next);
    if (Object.keys(next).length === 0) {
      toast.success("Message sent — we'll be in touch.");
      setF({ name: "", email: "", message: "" });
    }
  }

  return (
    <section className="section-y">
      <div className="container-x grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="mb-8">Say hello.</h1>
          <p className="text-foreground/80 leading-relaxed mb-10 max-w-md">
            Café enquiries, press, wholesale, lost umbrellas — write to us. We answer most messages within a day or two.
          </p>
          <dl className="space-y-3 text-sm">
            <Row k="Email" v="hello@northbound.coffee" />
            <Row k="Phone" v="+45 32 12 34 56" />
            <Row k="Visit" v="Refshalevej 174, 1432 Copenhagen K" />
          </dl>
        </div>

        <form onSubmit={submit} noValidate className="md:col-span-7 space-y-6 max-w-lg">
          <Field label="Your name" value={f.name} onChange={(v) => setF({ ...f, name: v })} err={err.name} />
          <Field label="Email" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} err={err.email} />
          <label className="block">
            <span className="eyebrow mb-2 block">Message</span>
            <textarea
              value={f.message}
              onChange={(e) => setF({ ...f, message: e.target.value })}
              rows={6}
              className={`w-full bg-transparent border-b ${err.message ? "border-destructive" : "border-foreground/30 focus:border-foreground"} py-2.5 outline-none resize-none transition-colors`}
            />
            {err.message && <span className="text-xs text-destructive mt-1 block">{err.message}</span>}
          </label>
          <button type="submit" className="btn-primary">Send message</button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, err, type = "text" }: { label: string; value: string; onChange: (v: string) => void; err?: string; type?: string }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-transparent border-b ${err ? "border-destructive" : "border-foreground/30 focus:border-foreground"} py-2.5 outline-none transition-colors`}
      />
      {err && <span className="text-xs text-destructive mt-1 block">{err}</span>}
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="col-span-2">{v}</dd>
    </div>
  );
}
