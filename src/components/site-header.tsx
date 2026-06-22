import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/subscribe", label: "Subscribe" },
  { to: "/cafe", label: "Café" },
  { to: "/story", label: "Story" },
  { to: "/journal", label: "Journal" },
] as const;

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);
  const [lang, setLang] = useState<"EN" | "DA">("EN");

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container-x flex items-center justify-between h-[72px]">
        <Link to="/" className="font-display text-[1.15rem] tracking-tight" onClick={() => setMobile(false)}>
          Northbound
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9" aria-label="Primary">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[0.78rem] uppercase tracking-[0.18em] text-foreground/85 hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            to="/cafe"
            className="hidden lg:inline text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
          >
            Visit us
          </Link>
          <button
            onClick={() => setLang(lang === "EN" ? "DA" : "EN")}
            className="hidden sm:inline text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
            aria-label="Switch language"
          >
            {lang} <span className="opacity-40">/</span> {lang === "EN" ? "DA" : "EN"}
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label={`Open cart, ${count} items`}
            className="relative text-[0.78rem] uppercase tracking-[0.18em] hover:text-accent transition-colors"
          >
            Cart
            <span className="ml-1 tabular-nums">({count})</span>
          </button>
          <button
            className="md:hidden text-[0.78rem] uppercase tracking-[0.18em]"
            onClick={() => setMobile((v) => !v)}
            aria-expanded={mobile}
            aria-label="Toggle menu"
          >
            {mobile ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {mobile && (
        <div className="md:hidden border-t border-border">
          <nav className="container-x py-6 flex flex-col gap-5" aria-label="Mobile">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobile(false)}
                className="text-[1.1rem] font-display"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/cafe" onClick={() => setMobile(false)} className="text-[0.78rem] uppercase tracking-[0.18em] text-muted-foreground">
              Visit us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
