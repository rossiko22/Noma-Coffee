# ADR 0004 — Dynamic backend: Azure Functions via SWA + TanStack server fns

**Status:** Proposed · **Date:** 2026-06-23

## Context
Real checkout ([0005](0005-payments-commerce.md)) and working forms (contact, wholesale, newsletter) need
server-side code: create Stripe Checkout sessions, receive Stripe webhooks, and send emails — all with secrets
that must never reach the browser. We are on Azure ([0007](0007-hosting-cicd-secrets.md)) and want the simplest
managed path with no servers to patch.

## Decision
Run server logic as **Azure managed Functions provisioned by Azure Static Web Apps**, authored as TanStack
Start **`createServerFn`** handlers (the existing `src/lib/api/*.functions.ts` + `config.server.ts` pattern).
Nitro's **`azure`** preset (the Azure Static Web Apps target — *not* `azure_functions`, which is the standalone
Function App target) compiles the server output into the SWA Functions backend automatically — no separate
Function App to manage. This SWA-hosting assumption is validated up front by the **Phase 0.5 deployment spike**
before any feature work.

Endpoints: `createCheckoutSession`, `stripeWebhook`, `submitContact`, `submitWholesale`, `subscribeNewsletter`.
Email via **Resend** (simpler DX) — chosen primary; **Azure Communication Services Email** (Azure-native) kept
as a documented fallback.

**Guardrail — Stripe webhook raw body:** the `stripeWebhook` handler **must read the raw, unparsed request
body** for signature verification. The framework/server fn must not pre-parse JSON for this route (a parsed +
re-serialized body breaks the HMAC). A test that verifies a **real signed payload** end-to-end is required (see
[0005](0005-payments-commerce.md) and [0009](0009-non-functionals.md)).

Rejected: a standalone Azure Function App or Container Apps (more ops, more topology); Cloudflare Workers
(off-target cloud); doing form/payment logic client-side (insecure, impossible for secrets).

## Consequences
- One deployment unit (SWA) for static + API; one CI pipeline; managed scaling and TLS.
- Reuses the repo's server-fn/secret conventions — low conceptual overhead.
- Functions are stateless; persistence is delegated to Stripe (and optionally Cosmos — see
  [0006](0006-database.md)).
- Cold starts are acceptable for low-traffic café endpoints; can pre-warm if needed.
