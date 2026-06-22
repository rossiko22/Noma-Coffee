# ADR 0002 — Headless CMS: Sanity

**Status:** Proposed · **Date:** 2026-06-23

## Context
The client is non-technical and must edit menu, specials, hours, gallery, copy, products, and journal posts
without a developer (priority #2), in **EN and DA**, with a clean handoff and low ops (priorities #3). Images
must come from a real pipeline (current Unsplash hotlinks are a licensing + CWV liability).

## Decision
Use **Sanity** as the headless CMS.
- **Editor UX:** Sanity **Studio** (real-time, structured, friendly for non-technical editors), **hosted by
  Sanity** (`*.sanity.studio`) for a clean separation and zero hosting ops. Schemas model the brief's data
  1:1 (see content model in `ARCHITECTURE.md`).
- **i18n:** Sanity document/field internationalization for EN/DA.
- **Images:** Sanity's image CDN (on-the-fly AVIF/WebP, responsive, cropping) — solves images + CWV in one move.
- **Portability/handoff:** schemas live in our repo; content is exportable (`sanity dataset export`); the
  client owns the Sanity org.

Alternatives considered: **Storyblok** (excellent visual editing, but weaker portability and image story than
Sanity); **Contentful** (pricier, heavier); **Strapi/Decap** (self-host or git-based — more ops or worse
non-technical UX). Sanity best balances editor UX, i18n, image pipeline, cost (generous free tier), and handoff.

## Consequences
- One-time developer effort to author schemas and the Studio; thereafter the client self-serves.
- A second project to hand off (the Studio repo/config) — documented in the handoff runbook.
- Free tier is sufficient at this scale; costs scale predictably if usage grows.
- The `U()` Unsplash helper and hardcoded data files are retired.
