# Architecture — Northbound Coffee Roasters

> Target architecture for the production rebuild. This is a **plan for approval**, not yet implemented.
> Per-decision rationale lives in the ADRs under [`docs/adr/`](docs/adr/). Read those for the "why";
> this document is the "what" and "how it fits together".

## Context & constraints

A small Copenhagen specialty-coffee roastery + café. The site is the primary marketing and sales
surface. Priorities, in order:

1. **Local SEO + Core Web Vitals** — organic search is the main acquisition channel.
2. **Non-technical editing** — the client must change menu, specials, hours, gallery, and copy without a developer.
3. **Low operational maintenance and a clean handoff** — the client owns and maintains this.
4. **Security & secrets handling.**

Decisions made for this build:

| Question | Decision |
|---|---|
| Cloud | **Azure** (Azure Static Web Apps) |
| Online ordering + payments | **Yes** — real checkout (Stripe) |
| Reservations | **No** |
| Language | **Bilingual EN + DA** |

### Starting point (audit summary)

The repo is **not** a Vite SPA — it is already a **TanStack Start (SSR)** app (React 19, Tailwind v4,
full shadcn/ui, Nitro server, bun), exported from Lovable.dev with Cloudflare as the default Nitro target.
It has all 14 routes, per-route `head()` meta + canonicals, a solid design system in `styles.css`, and a
thoughtful SSR error pipeline. The gaps: content is **hardcoded in `.ts` files**, commerce/forms are
**front-end demos** (toast only), images **hotlink Unsplash**, there is **no structured data / sitemap**,
**no tests/analytics/monitoring**, i18n is **cosmetic**, and there is **Lovable + Cloudflare lock-in**.

The foundation is good. We keep TanStack Start, Tailwind, and the shadcn/ui layer, and rebuild the
**content, commerce, SEO, hosting, and quality** layers around it.

---

## Target architecture at a glance

```
                          ┌─────────────────────────────────────────────┐
   Content editors        │  Sanity Studio (hosted)  — EN/DA content      │
   (non-technical) ─────▶ │  menu · specials · hours · products · gallery │
                          │  · journal · page copy                        │
                          └───────────────┬───────────────┬──────────────┘
                                          │ publish        │ image CDN
                                          │ webhook        │ (AVIF/WebP, responsive)
                                          ▼                ▼
   GitHub  ──push/PR──▶  GitHub Actions  ─build─▶  Azure Static Web Apps
                         (bun, vite build,         ├─ Static assets + prerendered HTML  (global CDN)
                          nitro `azure` preset)    └─ Managed Functions  (TanStack server fns / Nitro)
                                                          │
                            ┌─────────────────────────────┼───────────────────────────┐
                            ▼                             ▼                              ▼
                     Stripe Checkout +            Email (Resend;                Sentry (errors)
                     Billing + Webhooks           ACS fallback)                 Plausible (analytics)
                     (system of record for        for form + order
                      orders & subscriptions)     notifications
```

- **Static-first.** All editorial/menu/product/journal pages are **prerendered at build time** from Sanity.
  Pages ship as static HTML on Azure's CDN → best possible CWV and SEO, no CMS dependency at request time.
- **Dynamic only where it must be.** Checkout, Stripe webhooks, and form submissions run in **Azure
  managed Functions** (the Nitro server output) via TanStack `createServerFn`.
- **Content rebuilds on publish.** A Sanity webhook triggers the GitHub Actions deploy; a publish is live
  in ~1–2 minutes. No runtime content fetch in the hot path.

---

## Component decisions (summary; full rationale in ADRs)

| Concern | Decision | ADR |
|---|---|---|
| Rendering | Keep TanStack Start; **SSG/prerender** content routes, SSR/functions for dynamic | [0001](docs/adr/0001-rendering-strategy.md) |
| Headless CMS | **Sanity** (hosted Studio, free tier, strong i18n + image CDN, portable) | [0002](docs/adr/0002-headless-cms.md) |
| Content fetch | **Build-time + publish webhook** (escape hatch: runtime SWR for "today's specials") | [0003](docs/adr/0003-content-fetch-model.md) |
| Dynamic backend | **Azure Functions via SWA** + TanStack `createServerFn` | [0004](docs/adr/0004-dynamic-backend.md) |
| Payments/commerce | **Stripe Checkout + Billing**; Stripe is system of record | [0005](docs/adr/0005-payments-commerce.md) |
| Database | **No application DB** by default; Stripe + Sanity + email. Optional Cosmos DB serverless | [0006](docs/adr/0006-database.md) |
| Hosting / CI/CD / secrets | **Azure SWA + GitHub Actions + Key Vault**; per-PR previews | [0007](docs/adr/0007-hosting-cicd-secrets.md) |
| i18n | **EN/DA** localized routes (`/` + `/da`) + Sanity localized content, hreflang | [0008](docs/adr/0008-i18n.md) |
| Non-functionals | TS strict, Vitest+Playwright+axe, Plausible, Sentry, perf budget | [0009](docs/adr/0009-non-functionals.md) |

---

## Content model (Sanity schemas)

Designed so the **brief's data files map 1:1** to editable documents:

- `siteSettings` (singleton) — name, tagline, contact, social, **opening hours** (structured), SEO defaults, OG image.
- `cafeMenu` — categories → items `{ name, price, description, dietary }` (localized).
- `special` / "what's in season" — short, frequently-edited callouts with optional date window.
- `product` — mirrors current `Product` type + `stripePriceId`, `stripeSubscriptionPriceId`, stock flag; gallery via Sanity images.
- `journalPost` — title, excerpt, date, category, cover, **portable-text body** (localized).
- `teamMember`, `page` (for free copy blocks: Story, Wholesale, Careers), `galleryImage`.

All text fields use Sanity's document/field internationalization for EN/DA.

## Routing & rendering map

| Route(s) | Rendering | Source |
|---|---|---|
| `/`, `/cafe`, `/story`, `/careers`, `/wholesale`, `/journal`, `/journal/$slug` | **Prerendered (SSG)** | Sanity @ build |
| `/shop`, `/shop/$slug` | **Prerendered (SSG)** | Sanity @ build (Stripe price IDs baked in) |
| `/subscribe` | Prerendered shell + client builder | Sanity options |
| `/cart`, checkout start | Client + **server fn** | Stripe Checkout session |
| `/api/*` server fns | **Function (SSR)** | checkout, Stripe webhook, contact/wholesale/newsletter |
| `/da/*` | Same as above, DA locale | Sanity (DA) |

## SEO architecture (priority #1)

- **Structured data (JSON-LD):** `CafeOrCoffeeShop`/`LocalBusiness` (address, geo, `openingHoursSpecification`,
  phone, price range, menu URL) on home + café; `Product` + `Offer` on product pages; `Article` on journal
  posts; `BreadcrumbList` on nested pages.
- **`sitemap.xml`** (per-locale, generated at build) + real **`robots.txt`**; **hreflang** alternates for EN/DA.
- **Per-route canonicals** already exist — extend to absolute URLs + locale-correct OG/Twitter images.
- **Self-host fonts** (Fraunces, Hanken Grotesk) to remove the render-blocking Google Fonts request and the
  GDPR exposure of Google-hosted fonts in the EU.
- **Images via Sanity CDN**: responsive `srcset`, AVIF/WebP, explicit dimensions (zero CLS), priority-load LCP image.
- Off-site (roadmap note, not code): Google Business Profile + consistent NAP — the highest-leverage local-SEO lever.

## Performance budget (enforced in CI via Lighthouse CI)

| Metric | Budget |
|---|---|
| LCP | ≤ 2.0 s (mobile, p75) |
| CLS | ≤ 0.05 |
| INP | ≤ 200 ms |
| Initial JS (gzip) | ≤ 150 KB |
| Total page weight (above fold) | ≤ 500 KB |
| Lighthouse Performance / SEO / Best-Practices / A11y | ≥ 95 |

## Security posture

- Secrets only in **Azure SWA app settings backed by Key Vault** (prod) and **GitHub Actions secrets** (build);
  never in the client bundle. Public values via `VITE_` only (Stripe **publishable** key, Sanity projectId/dataset,
  Plausible domain). Reuse the existing `config.server.ts` / `createServerFn` boundary.
- **Stripe**: redirect to Stripe-hosted Checkout (PCI **SAQ A**, no card data touches us); **verify webhook
  signatures**; verify Sanity webhook signatures.
- Security headers via SWA config (`staticwebapp.config.json`): CSP, HSTS, X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy. Dependabot + the existing bun supply-chain release-age guard.
- GDPR: cookieless analytics (no consent banner needed), self-hosted fonts, EU data regions for Stripe/Sanity/email.

## What we remove / replace

- Lovable error hooks → **Sentry**; assess removing `@lovable.dev/vite-tanstack-config` lock-in (or pin & document).
- Nitro Cloudflare default → **`azure`** preset (the Azure Static Web Apps target; *not* `azure_functions`, which is the standalone Function App target).
- Unsplash hotlinks → **Sanity-hosted images**.
- Hardcoded `products.ts` / `journal.ts` / inline copy → **Sanity content**.
- Cosmetic EN/DA toggle → **real i18n**.

---

See the **phased roadmap** at the end of this plan (in the chat response) for sequencing and review checkpoints.
