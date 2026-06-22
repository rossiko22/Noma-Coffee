import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useCart, lineProduct } from "@/lib/cart-context";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — Northbound" },
      { name: "description", content: "Review your order." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, clear } = useCart();
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", postcode: "", country: "Denmark" });
  const [err, setErr] = useState<Record<string, string>>({});

  const shipping = subtotal > 0 ? (subtotal > 50 ? 0 : 6) : 0;
  const total = subtotal + shipping;

  if (items.length === 0 && step !== "done") {
    return (
      <section className="container-x py-32 text-center">
        <p className="eyebrow mb-4">Cart</p>
        <h1 className="mb-6">Empty for now.</h1>
        <p className="max-w-md mx-auto text-muted-foreground mb-10">A quiet morning is also a kind of luxury.</p>
        <Link to="/shop" className="btn-primary">Browse coffee</Link>
      </section>
    );
  }

  if (step === "done") {
    return (
      <section className="container-x py-32 text-center max-w-xl mx-auto">
        <p className="eyebrow mb-4">Order placed</p>
        <h1 className="mb-6">Thank you.</h1>
        <p className="text-muted-foreground mb-10">
          We've sent a confirmation to your inbox. Your coffee will be roasted on the next batch day and shipped within 48 hours.
        </p>
        <Link to="/" className="btn-primary">Back to home</Link>
      </section>
    );
  }

  function onCheckout(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name) next.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Valid email required";
    if (!form.address) next.address = "Required";
    if (!form.city) next.city = "Required";
    if (!form.postcode) next.postcode = "Required";
    setErr(next);
    if (Object.keys(next).length === 0) {
      toast.success("Order placed");
      clear();
      setStep("done");
    }
  }

  return (
    <section className="container-x py-20 md:py-28">
      <p className="eyebrow mb-4">{step === "cart" ? "Your cart" : "Checkout"}</p>
      <h1 className="mb-12">{step === "cart" ? "Review your order." : "Almost there."}</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {step === "cart" ? (
            <ul className="divide-y divide-border border-y border-border">
              {items.map((it) => {
                const p = lineProduct(it.slug);
                if (!p) return null;
                return (
                  <li key={it.slug + (it.grind ?? "") + (it.size ?? "")} className="py-6 flex gap-6">
                    <img src={p.image} alt="" className="h-32 w-28 object-cover bg-muted" />
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-xl">{p.name}</h3>
                          {(it.size || it.grind) && (
                            <p className="text-sm text-muted-foreground mt-1">{[it.size, it.grind].filter(Boolean).join(" · ")}</p>
                          )}
                        </div>
                        <p className="font-display text-xl tabular-nums">€{(p.price * it.quantity).toFixed(0)}</p>
                      </div>
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="inline-flex items-center border border-border">
                          <button className="px-3 py-1.5" onClick={() => setQty(it.slug, it.quantity - 1)} aria-label="Decrease">−</button>
                          <span className="px-3 tabular-nums">{it.quantity}</span>
                          <button className="px-3 py-1.5" onClick={() => setQty(it.slug, it.quantity + 1)} aria-label="Increase">+</button>
                        </div>
                        <button onClick={() => remove(it.slug)} className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-destructive">Remove</button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <form onSubmit={onCheckout} noValidate className="space-y-5 max-w-lg">
              <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} err={err.name} />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} err={err.email} />
              <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} err={err.address} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} err={err.city} />
                <Field label="Postcode" value={form.postcode} onChange={(v) => setForm({ ...form, postcode: v })} err={err.postcode} />
              </div>
              <Field label="Country" value={form.country} onChange={(v) => setForm({ ...form, country: v })} />
              <button type="submit" className="btn-primary w-full justify-center mt-4">Pay €{total.toFixed(0)}</button>
              <button type="button" onClick={() => setStep("cart")} className="block text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                ← Back to cart
              </button>
            </form>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="border border-border p-6 sticky top-24 space-y-4">
            <p className="eyebrow">Summary</p>
            <div className="flex justify-between text-sm"><span>Subtotal</span><span className="tabular-nums">€{subtotal.toFixed(0)}</span></div>
            <div className="flex justify-between text-sm"><span>Shipping</span><span className="tabular-nums">{shipping === 0 ? "Free" : `€${shipping}`}</span></div>
            <div className="rule" />
            <div className="flex justify-between font-display text-2xl"><span>Total</span><span className="tabular-nums">€{total.toFixed(0)}</span></div>
            {step === "cart" && (
              <button onClick={() => setStep("checkout")} className="btn-primary w-full justify-center mt-2">
                Continue to checkout
              </button>
            )}
            <p className="text-xs text-muted-foreground pt-2">Free shipping over €50 in the EU.</p>
          </div>
        </aside>
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
