# ADR 0005 — Payments & commerce: Stripe Checkout + Billing

**Status:** Proposed · **Date:** 2026-06-23

## Context
Decision: **real online ordering + payments** for beans (one-off) and the subscription (recurring). The client
is a small roastery with no payments/PCI expertise and minimal ops appetite. We must minimize PCI scope and
avoid storing card data or building an order-admin UI.

## Decision
Use **Stripe**:
- **Stripe Checkout** (hosted, redirect) for one-off bean/gear orders → **PCI SAQ A**; no card data touches our
  code. EU payment methods (cards, MobilePay, Apple/Google Pay) supported.
- **Stripe Billing** for the `/subscribe` recurring plans; subscription management via the **Stripe Customer Portal**.
- **Stripe is the system of record** for orders, customers, and subscriptions; the client uses the **Stripe
  Dashboard** as their order admin (no custom admin to build/maintain).
- Catalog stays in **Sanity** for display; each product/plan stores its **Stripe Price ID**, mapped at build.
- A signed **Stripe webhook** (Azure Function) confirms payment, triggers the confirmation email, and (optionally)
  records fulfilment data.

Rejected: a full e-commerce platform (Shopify/Medusa) — overkill and higher cost/ops for a dozen SKUs; building
our own cart→payment→order pipeline — needless PCI and maintenance burden.

## Guardrails
- **Webhook signature verification on the raw body.** The Stripe webhook handler must verify the signature
  against the **raw, unparsed request body** — the framework must not pre-parse/re-serialize JSON for this route,
  or the HMAC check fails. A test using a **real signed payload** (Stripe CLI fixture or `stripe.webhooks.
  generateTestHeaderString`) is required and gates CI. Cross-referenced in [0004](0004-dynamic-backend.md) and
  [0009](0009-non-functionals.md).
- **Idempotency:** treat webhook delivery as at-least-once; handlers must be idempotent on Stripe event id.

## Consequences
- Lowest PCI scope and security surface; secrets limited to Stripe secret + webhook signing keys.
- Client manages orders/refunds/subscriptions in a tool they don't have to host.
- Inventory is light (CMS "sold out" flag or Stripe); fine for a small roaster.
- Requires keeping Sanity product ↔ Stripe Price mapping in sync (documented; validated in CI).
- Existing front-end cart becomes a real basket that hands off to a Checkout session.
