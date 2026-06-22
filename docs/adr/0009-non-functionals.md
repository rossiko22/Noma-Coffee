# ADR 0009 — Non-functionals: quality, testing, observability, performance

**Status:** Proposed · **Date:** 2026-06-23

## Context
This ships to a paying client who will own and maintain it. We need durable quality gates, real observability,
accessibility, privacy-respecting analytics, and an enforced performance budget — without heavy ops.

## Decision
- **TypeScript:** keep `strict: true`; tighten ESLint (turn `@typescript-eslint/no-unused-vars` and the unused
  TS options back **on** as warnings/errors) and run typecheck + lint in CI.
- **Testing:** **Vitest** for unit/logic (cart, price math, validators, Stripe mapping); **Playwright** for e2e
  on critical paths (add-to-cart → Checkout redirect, form submit, language switch); **axe-core** a11y assertions
  in Playwright. All gate the pipeline.
- **Required security test (gates CI):** verify the **Stripe webhook handler against a real signed payload over
  the raw request body** — must accept a valid signature and reject a tampered/invalid one. See
  [0004](0004-dynamic-backend.md) and [0005](0005-payments-commerce.md).
- **Accessibility:** WCAG 2.2 AA target — semantic landmarks, focus management for drawer/dialog/sheet, visible
  focus, color-contrast check on the clay/cream palette; `prefers-reduced-motion` already respected, keep it.
- **Analytics:** **Plausible** (cookieless, GDPR-friendly, no consent banner, tiny script) — good for CWV and EU
  compliance. Track key events (add-to-cart, checkout start, form submit).
- **Error monitoring:** **Sentry** for client + Azure Functions (replaces the Lovable dev hook); release tagging
  via CI; PII scrubbing on.
- **Performance budget (enforced by Lighthouse CI in the pipeline):** LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms,
  initial JS ≤ 150 KB gzip, Lighthouse ≥ 95 across Perf/SEO/Best-Practices/A11y. **Self-host fonts**, Sanity
  responsive AVIF/WebP images with explicit dimensions, priority-load the LCP image.
- **i18n** covered in [0008](0008-i18n.md).

Rejected: Google Analytics (cookie consent burden, CWV/GDPR cost); no tests (unacceptable for a maintained
client asset); Lovable-only error reporting (dev-time, not production observability).

## Consequences
- Higher up-front setup, but the client inherits guardrails that keep the site fast, accessible, and observable.
- CI is the contract: regressions in types, tests, a11y, or performance block merges.
- A small monthly cost for Plausible/Sentry (free/low tiers suffice at this scale) — listed in the handoff.
