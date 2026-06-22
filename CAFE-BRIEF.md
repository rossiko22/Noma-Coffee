# Café Brief — Northbound Coffee Roasters

> **Purpose of this file.** This is the answer to the "Pick your café" prep step, and the complete blueprint for rebuilding the website 100% exactly. Hand this whole file to a website-building Claude and it will know *which café this is*, what it sells, how it's laid out, and exactly how it looks and is built.

---

## 1. Which café is this? (the short answer)

**Northbound Coffee Roasters** — a small, invented-but-specific specialty coffee **roastery + café** on Refshaleøen, Copenhagen.

This is an *imagined* café (not a real client), but it is deliberately specific rather than a generic template. It has a fixed identity: a tiny Scandinavian roastery that buys a handful of coffees a year directly from farmers, roasts them lightly on a 15-kilo Loring two days a week, and sells them fresh from a café whose wall is shared with the roaster. The whole brand voice is "restrained, honest, seasonal."

If you ever swap this for a *real* local café, keep this same structure and just replace the content (menu, hours, address, story, photos) — the site is built so the content lives in a few data files.

---

## 2. The café facts (menu, hours, location, contact)

### Identity
- **Name:** Northbound Coffee Roasters (logo wordmark: `Northbound` + a clay-colored period `.`)
- **Tagline / hero line:** *"Coffee, in season."*
- **One-sentence pitch:** "A small specialty coffee roastery and café in Copenhagen. Single-origin coffee, brew gear, and a slow subscription."
- **Brand promise:** Buy few coffees, roast them lightly in small batches, sell them only while fresh/in-season.

### Location
- **Address:** Refshalevej 174, 1432 Copenhagen K
- **Neighborhood story:** On Refshaleøen since 2019, in a converted shipping warehouse next to the water; café shares a wall with the roastery.
- **Map:** OpenStreetMap embed (grayscaled), bbox around `12.6,55.69,12.62,55.70`.

### Opening hours
| Days | Hours |
|------|-------|
| Mon – Fri | 07:00 – 17:00 |
| Sat – Sun | 08:00 – 16:00 |

### Contact
- **Phone:** +45 32 12 34 56
- **Email:** hello@northbound.coffee
- **Social:** Instagram (placeholder link)

### Café menu (with prices, in €)
**Coffee:** Espresso 3.5 · Macchiato 4.0 · Flat white 4.5 · Cortado 4.0 · V60 of the day 5.0 · Filter, batch brew 3.5
**Not coffee:** Matcha latte 5.0 · Hot chocolate 4.5 · Sparkling lemon 3.5
**Pastries:** Cardamom bun 4.0 · Rye sourdough toast 5.5 · Almond financier 3.5 · Seasonal galette 6.0

### The people (Story page)
- Mette Lindqvist — Founder, Head Roaster
- Joakim Sand — Green Buyer
- Frida Holm — Head of Café
- Anders Krogh — Wholesale

### Honest note: what's "bad" about how they show up online today
This is the constraint that makes the brief useful — the *problem the new site solves*:
- The café currently has **no real web presence** beyond an Instagram feed — no menu, no opening hours, no address online, so customers DM to ask "are you open?" and "what's the V60 today?"
- No way to **buy beans or subscribe** online; all sales are walk-in only, which wastes the roastery's actual product (fresh, shippable coffee).
- Seasonal coffees rotate constantly but there's **nowhere to communicate "what's in season right now."**
- **The fix this site delivers:** a clean editorial site that puts hours/menu/location front-and-center, sells coffee + subscriptions + wholesale, and has a Journal to tell the seasonal/origin story.

---

## 3. What kind of site this is

A **content + commerce marketing site** (the cart/checkout is a front-end demo — "add to cart" and form submits show a toast, no real payment backend). It is a multi-page site, server-rendered, image-led, editorial.

### Pages / routes
| Route | Page | What's on it |
|-------|------|--------------|
| `/` | Home | Full-bleed hero, brand narrative, "What's brewing" feature grid, featured coffees, café visit band |
| `/shop` | Shop layout | Wrapper (renders child routes) |
| `/shop/` | Shop index | Editorial header, sticky filter bar (category + sort), product grid, trust pillars |
| `/shop/$slug` | Product detail | Per-product page (gallery, notes, details, add to cart) |
| `/cafe` | Café | Hero, visit info + map, full menu, photo pair |
| `/story` | Story | Sourcing / roasting narrative, team grid |
| `/journal` | Journal | Featured post + post grid |
| `/journal/$slug` | Journal post | Article body |
| `/subscribe` | Subscribe | 3-step builder (frequency / size / roast) + sticky price summary |
| `/wholesale` | Wholesale | Pitch + enquiry form |
| `/contact` | Contact | Contact details + validated form |
| `/careers` | Careers | Jobs/values |
| `/cart` | Cart | Cart page |
| `*` (404) | Not found | "Off the map." |

### Global chrome
- **Sticky header** (`72px` tall, translucent + backdrop blur): wordmark left; nav center (Shop, Subscribe, Café, Story, Journal); right side has "Visit us", an EN/DA language toggle (cosmetic), and a "Cart (n)" button that opens a drawer. Mobile: a Menu/Close toggle reveals a vertical nav.
- **Cart drawer** (slide-over) + **Toaster** (bottom-right, via `sonner`) mounted globally.
- **Footer:** newsletter signup (left, large), then Shop / Visit / More link columns, then a bottom bar with copyright + Instagram/Privacy/Terms.

---

## 4. Design system (this is the part to copy exactly)

**Aesthetic:** Restrained, editorial **Scandinavian minimalism**. Warm near-monochrome on cream, one accent (clay/amber). Lots of whitespace, big serif display headings, tiny uppercase wide-tracked "eyebrow" labels, slow image hover zooms, hairline rules.

### Fonts (Google Fonts)
- **Display / headings:** `Fraunces` (a soft serif), weights 300/380/500, optical sizing `9..144`. Used for all `h1–h5`, weight ~380, tight letter-spacing `-0.015em`, line-height `1.05`.
- **Body / UI:** `Hanken Grotesk`, weights 300/400/500/600. Body 16px, line-height 1.6, font-features `ss01, ss02`.

### Color tokens (OKLCH — light theme `:root`)
| Token | Value | ~Hex | Use |
|-------|-------|------|-----|
| `--cream` | `oklch(0.953 0.018 78)` | ~#F6F1EA | background |
| `--ink` | `oklch(0.236 0.022 45)` | ~#2A211B | foreground/text |
| `--clay` | `oklch(0.572 0.131 52)` | ~#B5651D | the single accent |
| `--stone` | `oklch(0.84 0.015 70)` | — | hairline borders |

Semantic mapping: `background=cream`, `foreground=ink`, `primary=ink` (with cream text), `accent=clay`, `secondary/muted` are slightly darker creams, `border/input=stone`, `ring=clay`. A full dark theme exists under `.dark` (warm dark browns) but the site ships light.

### Spacing / layout primitives (custom CSS utility classes)
- `.container-x` — centered max-width `88rem`; padding `1.25rem` → `2.5rem` (≥768px) → `4rem` (≥1280px).
- `.section-y` — vertical section padding `clamp(4rem, 9vw, 9rem)`.
- `.eyebrow` — the signature micro-label: Hanken Grotesk, `0.72rem`, `letter-spacing 0.22em`, uppercase, muted color, weight 500.
- `.rule` — 1px stone hairline divider.
- `.link-underline` — animated underline that *retracts* to 40% on hover.
- `.btn-primary` — ink background, cream text, uppercase tracked; hovers to clay.
- `.btn-ghost` — transparent with ink border; inverts to ink fill on hover.
- `.fade-up` + `.fade-up-1..4` — entrance animation (opacity + 14px translateY, `0.9s` ease, staggered delays). Respects `prefers-reduced-motion`.

### Type scale (fluid)
- `h1` `clamp(2.5rem, 6vw, 5.25rem)` · `h2` `clamp(2rem, 4vw, 3.25rem)` · `h3` `clamp(1.4rem, 2vw, 1.875rem)` · `h4` `1.25rem`. Paragraphs capped at `68ch`. Text selection = clay bg / cream text.

### Recurring section pattern
Most content sections use a 12-column grid: a left column (`md:col-span-4`) holding just an `.eyebrow` label, and a right column (`md:col-span-7/8`) holding the `h2` + prose. Images use fixed aspect ratios (`4/5`, `4/3`, `16/9`, `21/9`, `3/4`) with `object-cover` and slow `group-hover:scale-[1.03]` zooms (1100–1400ms).

### Signature interactions
- **Product card:** two stacked images — base swaps to `imageAlt` on hover (700–1100ms fade + slight zoom); optional corner badge ("New season", "Bestseller"); a "Quick add — €price" bar that slides up on hover (always visible on mobile).
- **Shop filter bar:** sticky under the header (`top-[72px]`), horizontally scrollable category pills each with a count and an animated underline on the active one; a Sort `<select>`.
- **Hero:** full-bleed image with a dark gradient overlay (`from-ink/10 … to-ink/55`), eyebrow + h1 + subcopy + two CTAs, all `fade-up` staggered.

### Imagery
All photos are **Unsplash** URLs via a helper `U(id, w)` → `https://images.unsplash.com/{id}?auto=format&fit=crop&w={w}&q=85`. Warm, natural-light coffee/café/farm photography. (Replace with real café photos for a real client.)

---

## 5. Content data (so the rebuild has real substance)

### Products (12 items, `src/lib/products.ts`)
Type: `{ slug, name, origin?, category, price, notes[], description, details?{process,altitude,roast,variety}, image, imageAlt, gallery?, badge? }`. Categories: **Single-Origin, Blends, Decaf, Brew Gear, Merch**.

- **Single-Origin:** Ethiopia Guji (€22, *New season* — Jasmine/Peach/Bergamot), Colombia Huila (€21), Kenya Nyeri (€24), Guatemala Huehuetenango (€22)
- **Blends:** House Blend (€19, *Bestseller*), Northbound Espresso (€20)
- **Decaf:** Decaf Brazil (€19)
- **Brew Gear:** Hario V60 Dripper (€28), 1Zpresso Hand Grinder (€165), Chemex 6-Cup (€52)
- **Merch:** Canvas Tote (€24), Stoneware Cup (€32)

Each coffee has tasting notes, an origin, a process/altitude/roast/variety detail block, and a short, literary description.

### Journal posts (4, `src/lib/journal.ts`)
`{ slug, title, excerpt, date, category, cover, body[] }`:
1. "A simple V60 recipe we actually use at home" (Brew guide, Mar 14 2026)
2. "Harvest notes from Guji" (Origin, Feb 2 2026)
3. "What 'seasonal' actually means in coffee" (Philosophy, Jan 12 2026)
4. "Espresso at home, without losing your mind" (Brew guide, Dec 4 2025)

### Subscribe options
- **Frequency:** Weekly / Biweekly (most popular) / Monthly
- **Bag size:** 250g €19 / 500g €34 / 1kg €62
- **Roast:** Light & fruity / Balanced / Espresso-leaning
- Live price summary in a sticky aside; "Start subscription" → success toast.

### Trust pillars (shop footer band)
"Roasted this week" · "Free EU shipping (over €50)" · "Drink it, like it, or send it back."

### Voice / copy notes (match this tone)
Quiet, confident, slightly literary, never salesy. Examples: *"We sell them while they're fresh, and we stop selling them when they're not."* · *"No laptops on weekends — we're old-fashioned that way."* · 404 = "Off the map." · error = "Something went sideways."

---

## 6. Tech stack & how to build it

| Concern | Choice |
|---------|--------|
| Framework | **TanStack Start** (SSR) + **TanStack Router** (file-based routes in `src/routes`) |
| UI lib | **React 19** |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`), CSS-first config in `src/styles.css` via `@theme inline` + custom `@layer components` |
| Components | **shadcn/ui** (Radix primitives) in `src/components/ui/*` — accordion, dialog, drawer, sheet, sonner toaster, etc. |
| Icons | `lucide-react` |
| Data fetching | `@tanstack/react-query` (provider mounted at root) |
| Forms | `react-hook-form` + `zod` (+ native validation in simpler forms) |
| Toasts | `sonner` |
| Drawers/sheets | `vaul` / Radix |
| Carousel | `embla-carousel-react` |
| Build / dev | **Vite 7**, package manager **bun** (`bun.lock`, `bunfig.toml`) |
| Utilities | `clsx` + `tailwind-merge` (the `cn()` helper), `class-variance-authority` |

**Project layout:**
```
src/
  routes/            # file-based pages (see route table above)
    __root.tsx       # html shell, head/meta, fonts, providers, header/footer, 404 + error UI
  components/
    site-header.tsx, site-footer.tsx, product-card.tsx, cart-drawer.tsx, newsletter-form.tsx
    ui/              # shadcn/ui primitives
  lib/
    products.ts, journal.ts   # content data
    cart-context.tsx          # cart state (React context)
    utils.ts                  # cn() etc.
  styles.css         # the entire design system
```

**SEO/head:** every route exports a `head()` with `<title>`, meta description, OpenGraph tags, and a canonical link. Root sets charset, viewport, site_name, `og:type=website`, twitter card, and loads the Google Fonts stylesheet with preconnect.

---

## 7. Rebuild checklist (to hit "100% exactly")

1. Scaffold TanStack Start + React 19 + Vite + Tailwind v4 + shadcn/ui (bun).
2. Drop in `styles.css` verbatim — it *is* the design system (tokens, fonts, `.container-x`, `.eyebrow`, buttons, `.fade-up`).
3. Add the Fraunces + Hanken Grotesk Google Fonts link in the root head.
4. Recreate `products.ts` and `journal.ts` content data files.
5. Build global chrome: sticky header (wordmark + nav + lang toggle + cart), footer (newsletter + columns), cart drawer + context, Toaster.
6. Build pages in this priority: Home → Shop (+ filter/sort) → Product card → Café → Story → Subscribe → Journal → Wholesale/Contact/Careers → 404/error.
7. Wire interactions: image-swap product cards, sticky animated filter bar, fade-up staggers, hover zooms, toast on add-to-cart / form submit.
8. Set per-route `head()` meta + canonical for each page.
9. Use Unsplash (or real café) imagery at the documented aspect ratios.
10. Keep the voice quiet, seasonal, and honest throughout.

---

### TL;DR for the "Pick your café" step
**The café is Northbound Coffee Roasters** — a specific, invented Copenhagen roastery+café. We have its menu, hours (Mon–Fri 7–17, Sat–Sun 8–16), address (Refshalevej 174, Copenhagen K), team, products, and brand voice. The honest problem we're solving: today it lives only on Instagram with no menu/hours/shop online. This file is everything needed to rebuild the site exactly.
