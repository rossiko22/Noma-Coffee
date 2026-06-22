import { Link } from "@tanstack/react-router";
import { useCart, lineProduct } from "@/lib/cart-context";

export function CartDrawer() {
  const { isOpen, setOpen, items, setQty, remove, subtotal } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-ink/40 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <p className="eyebrow">Your cart</p>
            <button onClick={() => setOpen(false)} className="text-[0.78rem] uppercase tracking-[0.18em] hover:text-accent" aria-label="Close cart">
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-display text-2xl mb-3">Empty for now.</p>
                <p className="text-sm text-muted-foreground mb-8">A quiet morning is also a kind of luxury.</p>
                <Link to="/shop" onClick={() => setOpen(false)} className="btn-ghost">Browse coffee</Link>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((it) => {
                  const p = lineProduct(it.slug);
                  if (!p) return null;
                  return (
                    <li key={it.slug + (it.grind ?? "") + (it.size ?? "")} className="flex gap-4">
                      <img src={p.image} alt="" className="h-24 w-20 object-cover bg-muted" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="font-display text-base">{p.name}</h4>
                            {(it.grind || it.size) && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {[it.size, it.grind].filter(Boolean).join(" · ")}
                              </p>
                            )}
                          </div>
                          <p className="font-display tabular-nums">€{(p.price * it.quantity).toFixed(0)}</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-border">
                            <button className="px-3 py-1 text-sm" onClick={() => setQty(it.slug, it.quantity - 1)} aria-label="Decrease">−</button>
                            <span className="px-3 text-sm tabular-nums">{it.quantity}</span>
                            <button className="px-3 py-1 text-sm" onClick={() => setQty(it.slug, it.quantity + 1)} aria-label="Increase">+</button>
                          </div>
                          <button onClick={() => remove(it.slug)} className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-destructive">
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-border px-6 py-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <p className="eyebrow">Subtotal</p>
                <p className="font-display text-2xl tabular-nums">€{subtotal.toFixed(0)}</p>
              </div>
              <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
              <Link to="/cart" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">
                View cart & checkout
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
