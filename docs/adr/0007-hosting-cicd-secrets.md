# ADR 0007 — Hosting topology, CI/CD, and secrets: Azure SWA + GitHub Actions + Key Vault

**Status:** Proposed · **Date:** 2026-06-23

## Context
Cloud is **Azure**; we want the simplest managed path for a static-first site with a handful of server functions,
plus safe secret handling and a clean handoff. The repo currently defaults to Cloudflare via Nitro.

## Decision
**Hosting — Azure Static Web Apps (SWA):**
- Static prerendered HTML + assets on SWA's global CDN; server functions as **SWA managed Functions** (Nitro
  **`azure`** preset — *not* `azure_functions`, which targets a standalone Function App). Free managed TLS,
  custom domain, and CDN. Validated by the **Phase 0.5 deployment spike** before feature work.
- `staticwebapp.config.json` for routes, fallback, and **security headers** (CSP, HSTS, etc.).

**CI/CD — GitHub Actions (the SWA-generated workflow):**
- `push`/merge to `main` → build (`bun install`, `vite build`) → deploy to **production**.
- **Pull requests → automatic SWA preview environments** for review.
- **Sanity publish webhook** triggers a production rebuild (content deploys).
- Pipeline gates: typecheck, lint, unit + e2e tests, **Lighthouse CI** budget check ([0009](0009-non-functionals.md)).

**Secrets:**
- Production runtime secrets (Stripe secret + webhook signing, Resend key, Sanity write/preview token) in
  **Azure Key Vault**, referenced from **SWA application settings**.
- Build-time secrets in **GitHub Actions secrets**.
- Public values via **`VITE_`** only (Stripe publishable key, Sanity projectId/dataset, Plausible domain).
- Enforce the existing `config.server.ts` / `createServerFn` server-only boundary; verify all inbound webhooks.

**Guardrail — Key Vault references are not assumed to work.** Key Vault references from SWA app settings require
the **Standard** SWA plan plus a **managed identity** with Key Vault access, and have had rough edges in practice.
The **Phase 0.5 spike must confirm a Key Vault reference actually resolves at runtime in deployed SWA app
settings.** If it does not resolve cleanly, the documented fallback is **plain SWA application settings** (secrets
stored directly on the SWA, still never in the bundle/repo); the tradeoff is no central rotation/audit via Key
Vault. Record the spike outcome here.

Rejected: Azure App Service / Container Apps (more topology and ops than SWA needs); keeping the Cloudflare
target (off-target cloud).

## Consequences
- One managed platform, one pipeline, PR previews out of the box, minimal ops to hand off.
- Secrets are centralized, rotatable, and never in the bundle or repo.
- Ties deploys to GitHub + Azure; documented in the handoff runbook (domain, DNS, Key Vault, SWA settings).
