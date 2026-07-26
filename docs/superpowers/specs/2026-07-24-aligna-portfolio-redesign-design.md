# Design — Rohan Shetty: Ink Editorial Portfolio

**Date:** 2026-07-24
**Project:** `clinics/aligna-orthodontics`
**Status:** Approved — ready for implementation planning

---

## 1. Purpose & positioning

Reframe the site from a single-location clinic website into the **personal
professional portfolio** of **Dr. Rohan Shetty**, a specialist orthodontist and
international lecturer.

The critical change: **he owns no clinic.** He is a visiting/consulting
orthodontist who practises across **15+ partner clinics** on the Karnataka coast
on a weekly rotation. The site must never imply a single owned address, single
opening hours, or "our clinic." The organising idea is **"the doctor is the
practice."**

The design language is **Ink Editorial** — a type-led personal-brand aesthetic:
near-black ink on warm bone, one oxblood accent, oversized display serif,
numbered index navigation, editorial whitespace, and black-and-white
portraiture. This is a **full visual redesign** replacing the current
emerald/gold clinic system, applied across the **whole site**.

This remains a **demo pitch site**. Clinic names, areas, and visiting days are
**realistic placeholders** authored now and swapped for real data later via
`data.js`.

### Success criteria

- No page implies an owned clinic, single address, single hours block, or single map.
- The visiting model is presented as a concrete, named "Where I practice" locations list.
- Visual system reads as a professional portfolio, not a clinic brochure; emerald/gold is fully gone.
- `npm run build` passes; every route renders; layout is responsive and respects reduced-motion.

---

## 2. Design system

Replaces the existing emerald/gold tokens in `src/index.css` (and any Tailwind
theme config).

### Color

| Token | Value | Use |
|-------|-------|-----|
| `ink` | `#14110F` | primary text, dark sections, footer bg |
| `bone` | `#F4EFE7` | page background |
| `oxblood` | `#8B2E2E` | single accent — links, index numbers, key words, CTA |
| `clay` | `#A6453C` | accent hover/lighter |
| `oxblood-deep` | `#6E2020` | accent pressed/darker |
| `line` | warm hairline (`ink` @ ~10%) | rules, borders |
| muted text | `ink` @ 55–70% | secondary copy |

One accent only. Oxblood used sparingly for emphasis, never as a fill-everything color.

### Type

- **Display:** Fraunces (already loaded) — oversized, high-contrast, optical
  sizing, with italic for accent words.
- **Body:** a clean neutral grotesk for running text and UI.
- **Mono:** monospace for index numbers (`01 —`), eyebrows, and micro-labels.

### Layout & feel

- Generous page margins, large vertical rhythm, deliberate whitespace.
- Hairline rules separating sections; numbered section headers (`01 — About`).
- Editorial columns over card grids; cards only where genuinely useful (locations, cases).
- Subtle grain retained at low opacity.

### Portraiture

- People/portraits rendered **black-and-white** via CSS `grayscale` filter.
- Before/after teeth images stay **in color** so the reveal reads.

### Motion

- Keep Lenis smooth scroll and Framer Motion, but restrained: line-rise on
  headings, fades on reveal. All motion must honor `prefers-reduced-motion`.

---

## 3. Global chrome

### Navigation (`Nav.jsx`, `Layout.jsx`)

- Slim top bar, transparent over hero → bone background on scroll.
- Left: wordmark `ROHAN SHETTY`.
- Desktop: a few inline links + a distinct `Book` action.
- Mobile: `Index` trigger opens a full-screen numbered overlay menu
  (`01 About`, `02 Work`, `03 Lectures`, `04 Practice`, `05 Contact`).

### Footer (`Footer.jsx`)

- Inverted panel: `ink` background, `bone` text.
- Oversized name, contact (phone/WhatsApp/email — no fixed street address),
  a short locations summary, credentials, and a colophon line.

---

## 4. Home page structure

New order (`src/pages/Home.jsx`), portfolio narrative:

1. **Hero** — oversized stacked name "Rohan Shetty"; eyebrow "Specialist
   Orthodontist · International Lecturer"; one-liner positioning him as a
   visiting specialist across 15+ clinics; B&W portrait; stat row
   (18+ years · 8,000+ smiles · 9 countries · 24+ lectures); `Book a consultation` + `Index`.
2. **Ticker / signature band** — thin editorial marquee of specialties
   (Digital orthodontics — Invisalign — Lingual — Class II — TADs).
3. **01 About** — editorial two-column: B&W portrait + visiting-specialist / KOL
   bio; credentials list; "the doctor is the practice" line.
4. **02 Work** — before/after presented as **numbered portfolio cases**
   (crowding, spacing, bite correction), color reveal on the "after."
5. **03 Lectures & Recognition** — international speaking timeline (lectures
   list) + press/recognition row. Primary KOL credibility block.
6. **Treatments** — "What he treats" editorial list
   (comprehensive / express / teen / children's).
7. **Process** — 3D-scan → retainer condensed into a numbered editorial sequence.
8. **04 Practice — "Where I practice"** — NEW. The visiting model as a named
   locations list: each entry shows clinic name, area/city, visiting day(s), and
   a `Book here` action. 6 placeholder clinics. This replaces the old single
   address/hours/map.
9. **Voices** — testimonials as editorial pull-quotes.
10. **FAQ** — condensed; adds "Do you own a clinic?" answered with the visiting model.
11. **Book** — closing editorial CTA routing to WhatsApp.

Sections map to existing components where possible (Hero, Marquee, About,
BeforeAfter, Lectures, WhatIsInvisalign→Treatments, Journey→Process,
Testimonials, FAQ, CTASection) plus one new `Practice` / locations component.

---

## 5. Whole-site conversion

All inner pages adopt the Ink Editorial system:

- **About** — long-form editorial bio, credentials, honors, philosophy.
- **Lectures** — full speaking record + speaker stats.
- **Treatments** — treatment types, editorial.
- **Process** — full journey sequence.
- **Results** — before/after portfolio gallery.
- **Blog** — editorial article index.
- **Contact → "Practice / Book"** — locations list (name · area · day(s) · map
  link per location) + WhatsApp callback form. **Remove** the single street
  address, single opening-hours block, and single embedded map.

---

## 6. Content changes (`src/lib/data.js`)

- **Brand:** `Dr. Rohan Shetty` is the brand. Drop `Aligna Advanced
  Orthodontics` as an owned place. Remove `address`, `hours`, `hoursSun`, and the
  single-clinic map query. Keep phone / WhatsApp / email as central contact.
- **Add `locations[]`** — 6 placeholder partner clinics, each:
  `{ name, area, city, days, mapQuery }`. Realistic Mangalore/Udupi-coast names,
  editable. Central booking still routes through one WhatsApp number.
- **Add stat:** `15+ clinics / week` (add to or replace one of the stat tiles).
- **Rewrite voice** across `whyUs`, `journey`, `faqs`, `testimonials`, and
  Contact copy to the visiting-consultant register: "at a partner clinic near
  you," "wherever you see him," never "our Deralakatte clinic." Add an FAQ entry
  explaining he consults across multiple partner clinics rather than owning one.

---

## 7. Assets

- Reuse existing images (`doctor.jpg`, `hero-portrait.jpg`, before/after, p1–p3).
- Apply grayscale filter to portraits at the CSS layer; before/after remain color.
- No new image generation required. Optional later: a purpose-shot B&W hero
  portrait via cf-image-gen if the existing crop underdelivers.

---

## 8. Testing & verification

No automated test suite exists (static Vite + React site). Verification is:

1. `npm run build` completes without errors.
2. Every route renders (`/`, `/about`, `/lectures`, `/treatments`, `/process`,
   `/results`, `/blog`, `/contact`).
3. No page shows a single fixed address, single hours block, or single map.
4. "Where I practice" locations list renders all placeholder clinics with
   name/area/day/book action.
5. Responsive check at mobile and desktop widths.
6. `prefers-reduced-motion` disables non-essential motion.
7. Spot-check that emerald/gold no longer appears anywhere.

---

## 9. Out of scope

- Real clinic data (placeholders now; user swaps later).
- Backend / booking system (WhatsApp deep-link only).
- New photography (existing assets reused).
- SEO/perf optimization beyond a clean build.
