# ADR 0001 — Rendering strategy: static-first on TanStack Start

**Status:** Proposed · **Date:** 2026-06-23

## Context
SEO + Core Web Vitals are priority #1 for a local café whose main channel is organic search. The repo is
already TanStack Start (SSR via Nitro), not the Vite SPA the brief assumed — so a from-scratch framework
migration is unnecessary and would discard a good foundation (routes, design system, error pipeline). Content
is editorial and changes occasionally (menu, hours, journal), not per-request. We want pages that are fast,
crawlable, and resilient to CMS downtime.

## Decision
Keep **TanStack Start** and adopt a **static-first** strategy:
- **Prerender (SSG)** all editorial/menu/product/journal routes at build time with content baked in.
- Use **server rendering / managed Functions** only for genuinely dynamic paths: checkout, Stripe webhooks,
  and form submissions.
- Target Nitro's **`azure`** preset (Azure Static Web Apps) so static HTML serves from Azure's CDN and
  server functions run as SWA managed Azure Functions. (Note: `azure`, not `azure_functions` — the latter is
  the separate standalone Function App target.)

Rejected: (a) staying a client-rendered SPA — poor SEO/LCP; (b) full per-request SSR for everything — slower
TTFB, runtime CMS dependency, higher cost/ops; (c) migrating to Next.js/Astro — throws away working code for
no SEO gain over prerendered TanStack Start.

## Consequences
- Best-case CWV: static HTML, no render-blocking third parties (fonts self-hosted, images from CDN).
- Content changes require a rebuild (~1–2 min) — acceptable; see [0003](0003-content-fetch-model.md) for the
  publish-webhook trigger and the runtime escape hatch for intraday "specials".
- Two rendering modes to keep straight; the routing/rendering map in `ARCHITECTURE.md` documents which is which.
- Keeps the existing per-route `head()`/canonical investment intact.
