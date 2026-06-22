# ADR 0006 — Database: none by default (Stripe + Sanity + email)

**Status:** Proposed · **Date:** 2026-06-23

## Context
Real checkout usually implies a database. But priorities #3 (low ops, clean handoff) and #4 (security) push us
to avoid running and securing a database unless it earns its keep. What state do we actually have? Orders,
customers, subscriptions (→ Stripe), content (→ Sanity), and transient form leads (→ email/ESP).

## Decision
**Ship with no application database.**
- **Stripe** is the system of record for orders/customers/subscriptions ([0005](0005-payments-commerce.md)).
- **Sanity** is the system of record for content ([0002](0002-headless-cms.md)).
- **Form submissions** (contact, wholesale) are delivered by **email**; **newsletter** signups go to an **ESP**
  (e.g. Mailchimp/Buttondown) via API. No persistence layer of ours to secure or back up.
- **Optional, only if a concrete need appears** (e.g. structured wholesale-lead pipeline or stock counts):
  add **Azure Cosmos DB (serverless)** — pay-per-request, no capacity to manage. Deferred until justified.

Rejected (for now): always-on Azure SQL / Postgres — operational and cost overhead with no current data that
isn't better owned by Stripe/Sanity/ESP.

## Consequences
- Smaller attack surface, no backups/migrations/patching to hand off.
- Each concern's data lives in the tool the client already logs into.
- If requirements grow, Cosmos serverless is a low-friction, Azure-native addition (revisit this ADR).
