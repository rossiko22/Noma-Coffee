# ADR 0003 — Content fetch model: build-time + publish webhook

**Status:** Proposed · **Date:** 2026-06-23

## Context
Given static-first rendering ([0001](0001-rendering-strategy.md)) and Sanity ([0002](0002-headless-cms.md)),
we must decide *when* content is fetched: at build time (baked into static HTML) or at request time. Drivers:
CWV, SEO, resilience, cost, and "low ops". Content changes are occasional, but the client expects edits to go
live without calling a developer.

## Decision
**Fetch content at build time** and **rebuild on publish**:
- The build queries Sanity (GROQ) and prerenders pages with content embedded.
- A **Sanity webhook** (signed) calls a deploy trigger that runs the GitHub Actions build → Azure SWA. A publish
  is live in ~1–2 minutes with **no runtime CMS call** in the request path.
- **Escape hatch:** the single "today's specials / what's in season" block may use a **runtime server fn with
  stale-while-revalidate caching** if the client needs sub-minute intraday updates. Default is build-time.

Rejected: pure runtime fetching on every request (adds latency, a hard runtime dependency on Sanity, and cost;
worse CWV and resilience for content that rarely changes).

## Consequences
- Pages are immune to CMS outages at request time and serve from CDN edge.
- The client gets self-service publishing via the webhook → no developer in the loop for content.
- A bad publish is recoverable by rolling back the deployment.
- Build minutes scale with publish frequency — negligible at café scale; documented in the handoff.
