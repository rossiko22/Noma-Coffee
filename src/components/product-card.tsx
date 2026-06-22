import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [hover, setHover] = useState(false);

  return (
    <article
      className="group relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to="/shop/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary/50">
          {/* base */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
              hover ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* hover */}
          <img
            src={product.imageAlt}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1100ms] ease-out ${
              hover ? "opacity-100 scale-[1.03]" : "opacity-0 scale-100"
            }`}
          />

          {/* badge */}
          {product.badge && (
            <span className="absolute top-4 left-4 text-[0.62rem] uppercase tracking-[0.22em] bg-background/90 backdrop-blur px-2.5 py-1.5 text-foreground">
              {product.badge}
            </span>
          )}

          {/* quick add */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              add(product.slug, { quantity: 1 });
              toast.success(`${product.name} added to cart`);
            }}
            className={`absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4 py-2.5 md:py-3 text-[0.7rem] md:text-[0.72rem] uppercase tracking-[0.2em] bg-ink text-cream hover:bg-clay transition-all duration-500 opacity-100 translate-y-0 ${
              hover ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:translate-y-2"
            }`}
            aria-label={`Quick add ${product.name} to cart`}
          >
            Quick add — €{product.price}
          </button>
        </div>

        <div className="pt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="eyebrow mb-1.5 truncate">{product.origin ?? product.category}</p>
            <h3 className="font-display text-[1.4rem] leading-tight">{product.name}</h3>
            {product.notes.length > 0 && (
              <p className="mt-2 text-sm text-muted-foreground italic">
                {product.notes.slice(0, 3).join(" · ")}
              </p>
            )}
          </div>
          <p className="font-display text-lg tabular-nums shrink-0 pt-1">€{product.price}</p>
        </div>
      </Link>
    </article>
  );
}
