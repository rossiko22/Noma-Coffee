import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Please enter a valid email.");
      return;
    }
    setErr(null);
    setEmail("");
    toast.success("Subscribed. We'll write occasionally.");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <div className="flex border-b border-foreground/40 focus-within:border-foreground transition-colors">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          aria-label="Email address"
          className="flex-1 bg-transparent py-3 outline-none placeholder:text-muted-foreground"
        />
        <button type="submit" className="text-[0.78rem] uppercase tracking-[0.18em] px-2 hover:text-accent">
          Subscribe →
        </button>
      </div>
      {err && <p className="mt-2 text-xs text-destructive">{err}</p>}
    </form>
  );
}
