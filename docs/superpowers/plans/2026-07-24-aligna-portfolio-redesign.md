# Aligna → Rohan Shetty Ink Editorial Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `clinics/aligna-orthodontics` from a single-clinic website into the personal Ink Editorial portfolio of Dr. Rohan Shetty, a visiting specialist orthodontist who consults across 15+ partner clinics (owns none).

**Architecture:** The site is a static Vite + React 19 + React Router 7 SPA styled with Tailwind v4 `@theme` tokens. The existing CSS deliberately keeps token *names* (`emerald`, `gold`, `cream`) while their *values* are swappable — we exploit this: retoken `@theme` to Ink Editorial (ink on bone, oxblood accent) once, and every component inherits. On top of that centralized reskin we make structural changes (nav index, editorial hero, numbered sections, a new locations/"Practice" module, inverted footer) and rewrite all copy to the visiting-consultant voice in `src/lib/data.js`.

**Tech Stack:** Vite 8, React 19, react-router-dom 7, Tailwind CSS v4 (`@tailwindcss/vite`), Framer Motion 12, Lenis, lucide-react. Fonts: Fraunces (display), Inter (body), IBM Plex Mono (mono) — **unchanged**, already loaded in `index.html`.

## Global Constraints

- **No owned clinic anywhere.** No single street address, no single opening-hours block, no single embedded map on any page. Central phone/WhatsApp/email only. (Spec §1, §6.)
- **Palette (exact hex), applied via `@theme` in `src/index.css`:**
  - ink `#14110F` · bone bg `#F4EFE7` · card bone `#FBF7EF` · warm hairline `#E2D9C9`
  - accent oxblood `#8B2E2E` · clay (lighter, on-dark) `#A6453C` · oxblood-deep (text on bone, AA) `#6E2020`
  - dark-section text: light warm `#B9AE9F`, muted `#6E655B`
- **One accent only** — oxblood. No gold, no emerald green anywhere when done. Grep must return zero non-token gold/emerald literals (Task 10).
- **Type unchanged:** display Fraunces, body Inter, mono IBM Plex Mono.
- **Portraits/people render black-and-white** (grayscale filter); before/after teeth stay color. (Spec §2, §7.)
- **Motion honors `prefers-reduced-motion`;** reuse existing Lenis + Framer setup.
- **Placeholder location data** — 6 partner clinics, editable in `data.js`. Real data swapped later.
- **This is a static site with no automated test suite.** Each task's verification cycle is: `npm run build` exits 0, plus the explicit visual/grep checks named in that task. That replaces unit-test TDD for this project.
- **Reuse existing image assets** in `src/assets/`; no new image generation.
- Run all commands from `clinics/aligna-orthodontics/`. Commit after each task.

---

## File map

| File | Responsibility | Task |
|------|----------------|------|
| `src/index.css` | Design tokens, base, helpers, buttons, decorative | 1 |
| `index.html` | Meta theme-color + description | 1 |
| `src/lib/data.js` | All content: brand, nav, locations, stats, copy | 2 |
| `src/components/Nav.jsx` | Wordmark + inline links + Index overlay | 3 |
| `src/components/Footer.jsx` | Inverted footer, locations summary, no address block | 4 |
| `src/components/Practice.jsx` | **NEW** — locations list module | 5 |
| `src/pages/Home.jsx` | Section order (portfolio narrative) | 5, 7 |
| `src/components/Hero.jsx` | Editorial ink-on-bone hero, B&W portrait | 6 |
| `src/components/{About,Marquee,Stats,WhyUs,Lectures,WhatIsInvisalign,Journey,BeforeAfter,Testimonials,FAQ,CTASection}.jsx` | Section reskin + numbered kickers + voice | 7 |
| `src/components/PageHero.jsx` | Inner-page hero, editorial | 8 |
| `src/pages/{AboutPage,LecturesPage,InvisalignPage,ProcessPage,ResultsPage,BlogPage}.jsx` | Inner pages reskin + voice | 8 |
| `src/pages/ContactPage.jsx` | → Practice/Book: locations + WhatsApp form, no address/hours/map | 9 |
| `src/components/{Floating,Preloader,SmileArc,SignatureBand}.jsx`, `src/components/ui/*` | Retoken residuals; grayscale util; final sweep | 10 |

---

## Task 1: Design tokens & type reskin (the foundation)

**Files:**
- Modify: `src/index.css` (the `@theme` block + helper classes)
- Modify: `index.html:7` (theme-color), `index.html:10` (description)

**Interfaces:**
- Produces: Tailwind utility classes keep the SAME names (`bg-emerald`, `text-cream`, `text-gold-400`, `bg-gold`, `text-gold-deep`, `border-line`, `bg-ivory`, etc.) but now render Ink Editorial colors. All later tasks rely on these renamed-value tokens. New utility `.portrait-bw` produces grayscale portraits. `.text-gold-grad` now renders solid oxblood (no gradient). `.mesh-emerald` now renders flat warm-ink with a faint oxblood radial.

- [ ] **Step 1: Replace the `@theme` palette values** in `src/index.css` (lines ~7–36). Keep every token *name*; change only values:

```css
@theme {
  --color-ink: #14110F;            /* warm near-black */
  --color-emerald: #14110F;        /* dark sections/footer = ink */
  --color-emerald-700: #1E1A16;
  --color-emerald-600: #2A2420;    /* hover on dark / dark buttons */
  --color-emerald-400: #6E655B;    /* muted warm-gray */
  --color-emerald-200: #B9AE9F;    /* light warm text on dark */

  /* accent = oxblood (token names kept as `gold*`) */
  --color-gold: #8B2E2E;           /* oxblood — on dark & decorative */
  --color-gold-400: #A6453C;       /* clay — lighter, on dark */
  --color-gold-deep: #6E2020;      /* text-safe accent on bone (AA) */

  /* surfaces — warm bone */
  --color-cream: #F4EFE7;          /* page bg */
  --color-ivory: #FBF7EF;          /* card bg */
  --color-sage: #ECE5D8;
  --color-sage-200: #E0D8C8;
  --color-line: #E2D9C9;           /* warm hairline */

  --font-display: 'Fraunces', ui-serif, Georgia, serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;

  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
}
```

- [ ] **Step 2: Retoken the decorative/helper classes** that hardcode gold/emerald or use gradients. In `src/index.css`:
  - `.text-gold-grad` — replace the gradient body with a solid accent so the "italic accent word" reads oxblood:
```css
.text-gold-grad {
  color: var(--color-gold-deep);
  -webkit-text-fill-color: currentColor;
}
```
  - `.mesh-emerald` — replace with flat warm-ink + faint oxblood radial (used by footer/PageHero/mobile drawer):
```css
.mesh-emerald {
  background-color: var(--color-emerald);
  background-image:
    radial-gradient(60% 60% at 82% 8%, #211b16 0%, transparent 60%),
    radial-gradient(50% 60% at 6% 100%,
      color-mix(in srgb, var(--color-gold) 14%, transparent) 0%, transparent 55%);
}
```
  - `.btn-gold` — make the primary button solid oxblood (replace the two gold declarations, lines ~204–215):
```css
.btn-gold {
  background: var(--color-gold);
  color: var(--color-cream);
  box-shadow: 0 12px 30px -12px color-mix(in srgb, var(--color-gold) 60%, transparent);
}
.btn-gold:hover { background: var(--color-gold-deep); }
```
  - `.hairline` gradient center: change `var(--color-gold) 70%` → `var(--color-gold) 55%` (keeps a subtle oxblood rule).

- [ ] **Step 3: Add the grayscale portrait utility** near the display-type helpers (after `.italic-fraunces`, ~line 109):

```css
/* portraits render editorial black-and-white; before/after teeth stay color */
.portrait-bw {
  filter: grayscale(1) contrast(1.03);
}
```

- [ ] **Step 4: Update `index.html` meta.** Line 7: `content="#141414"` → `content="#14110F"`. Line 10 description: replace with
```
Dr. Rohan Shetty — Specialist Orthodontist & international lecturer, consulting across 15+ partner clinics on the Karnataka coast. 8,000+ smiles over 18+ years. Book a consultation.
```

- [ ] **Step 5: Build to verify no CSS breakage.**

Run: `npm run build`
Expected: exits 0, no errors.

- [ ] **Step 6: Visual smoke check.**

Run: `npm run dev`, open the site, confirm the page background is warm bone and dark sections/hero read near-black with oxblood accents (no green, no metallic gold). Stop dev server.

- [ ] **Step 7: Commit.**

```bash
git add src/index.css index.html
git commit -m "feat(aligna): retoken to Ink Editorial palette (ink/bone/oxblood)"
```

---

## Task 2: Content reframe — `src/lib/data.js`

**Files:**
- Modify (rewrite content): `src/lib/data.js`

**Interfaces:**
- Produces: `brand` (no `address`/`hours`/`hoursSun`); new `locations` array of `{ name, area, city, days, mapQuery }`; `stats` including a "15+ clinics / week" entry; visiting-consultant copy in `whyUs`, `journey`, `faqs`, `testimonials`, `treatmentTypes`; a new FAQ entry "Do you have your own clinic?". `nav` unchanged in routes. Consumed by Nav, Footer, Hero, Practice, ContactPage, and all section components.

- [ ] **Step 1: Replace the `brand` object** (remove owned-clinic fields; keep central contact):

```js
export const brand = {
  doctor: 'Dr. Rohan Shetty',
  initials: 'RS',
  role: 'Specialist Orthodontist',
  credential: 'Specialist Orthodontist · MDS Orthodontics',
  title: 'Specialist Orthodontist · International Lecturer',
  tagline: 'Beautiful smiles, precisely planned.',
  region: 'Karnataka coast',
  city: 'Mangalore',
  clinicsCount: '15+',
  phone: '+91 98450 21000',
  phoneHref: '+919845021000',
  whatsapp: '919845021000',
  email: 'care@drrohanshetty.in',
}
```
(Deleted: `clinic`, `area`, `address`, `hours`, `hoursSun`.)

- [ ] **Step 2: Add the `locations` array** (6 placeholders; user edits later):

```js
// Partner clinics he visits on rotation. Placeholder data — swap for real clinics.
export const locations = [
  { name: 'Smilecare Dental Studio', area: 'Kadri', city: 'Mangalore', days: 'Mon & Thu', mapQuery: 'Kadri, Mangalore' },
  { name: 'Coastal Dental Centre', area: 'Kankanady', city: 'Mangalore', days: 'Tuesday', mapQuery: 'Kankanady, Mangalore' },
  { name: 'Serene Multispeciality Dental', area: 'Deralakatte', city: 'Mangalore', days: 'Wednesday', mapQuery: 'Deralakatte, Mangalore' },
  { name: 'Manipal Smile Clinic', area: 'Tiger Circle', city: 'Manipal', days: 'Friday', mapQuery: 'Tiger Circle, Manipal' },
  { name: 'Udupi Dental Care', area: 'Court Road', city: 'Udupi', days: 'Sat · morning', mapQuery: 'Court Road, Udupi' },
  { name: 'Orbit Dental', area: 'Surathkal', city: 'Mangalore', days: 'Sat · evening', mapQuery: 'Surathkal, Mangalore' },
]
```

- [ ] **Step 3: Update `stats`** — add the clinics-per-week credential (this is the visiting-model proof). Replace the `stats` array with:

```js
export const stats = [
  { value: 18, suffix: '+', label: 'Years in orthodontics' },
  { value: 8000, suffix: '+', label: 'Smiles personally treated' },
  { value: 15, suffix: '+', label: 'Partner clinics each week' },
  { value: 24, suffix: '+', label: 'Invited lectures worldwide' },
]
```

- [ ] **Step 4: Rewrite the visiting-consultant copy.** In `whyUs`, change the `care` entry body to reflect no hand-offs across clinics:
```js
{
  k: 'care',
  title: 'One specialist, wherever you see him',
  body: 'Dr. Rohan plans and finishes every case himself. Whichever partner clinic you visit, you are under the care of one orthodontist — never passed around, never handed off.',
},
```
In `journey`, change the `Progress monitoring` step to:
```js
{ t: 'Progress monitoring', d: 'Short reviews with Dr. Rohan at the partner clinic nearest you — some remote — keep treatment precisely on schedule.' },
```

- [ ] **Step 5: Add + adjust FAQs.** Insert this entry at the top of the `faqs` array:
```js
{
  q: 'Do you have your own clinic?',
  a: 'Dr. Rohan is a visiting specialist orthodontist. Rather than running a single practice, he consults and treats at 15+ partner clinics across the Karnataka coast — so expert orthodontic care is closer to where you live. Book once, and we place you at the nearest clinic on his rotation.',
},
```
Edit the existing "Will treatment fit my routine?" answer to end with: `Choose the partner clinic most convenient for you.`

- [ ] **Step 6: Fix the "Visit us"-style testimonial wording** — none reference a single clinic, so leave `testimonials` content but change Karthik's quote tail to: `Reviews were quick, mostly remote, at a clinic near my office. Worth every rupee.`

- [ ] **Step 7: Build to verify no import/syntax errors.**

Run: `npm run build`
Expected: exits 0. (Footer/ContactPage still import `brand.address` at this point — they are fixed in Tasks 4 and 9. If the build is clean because those are only runtime reads, proceed; if Vite errors on a missing named export, it will not here since `brand.address` is a property access, not an import.)

- [ ] **Step 8: Commit.**

```bash
git add src/lib/data.js
git commit -m "feat(aligna): reframe content to visiting-consultant model + locations data"
```

---

## Task 3: Nav — wordmark + Index overlay

**Files:**
- Modify: `src/components/Nav.jsx`

**Interfaces:**
- Consumes: `brand`, `nav` from `data.js`.
- Produces: a nav whose logo is a text wordmark `ROHAN SHETTY` (no gold smile SVG), desktop inline links + a `Book` link to `/contact`, and a full-screen numbered **Index** overlay (numbered `01 …`) replacing the old gold drawer. Uses only retokened classes.

- [ ] **Step 1: Replace the `Logo` component** with a typographic wordmark (drop the SVG smile mark):

```jsx
function Logo({ dark }) {
  return (
    <Link to="/" className="flex items-baseline gap-2" aria-label="Rohan Shetty — home">
      <span className={`font-display text-[1.15rem] leading-none tracking-tight sm:text-[1.3rem] ${dark ? 'text-ink' : 'text-cream'}`}>
        Rohan Shetty
      </span>
      <span className={`eyebrow hidden sm:inline ${dark ? 'text-gold-deep' : 'text-gold-400'}`}>Orthodontist</span>
    </Link>
  )
}
```

- [ ] **Step 2: Change the desktop CTA + mobile trigger.** The `Book consultation` link (line ~99) keeps `to="/contact"` but relabel to `Book`. Change the mobile trigger button (lines ~102–111) `aria-label="Open menu"` label to `Open index` and swap the `<Menu />` icon usage to show the word `Index` beside it is optional; keep the `Menu` icon. Keep the scrolled/underline link styling as-is (it now renders oxblood).

- [ ] **Step 3: Convert the mobile drawer to a numbered Index overlay.** In the `AnimatePresence` block, prefix each link with a mono index number. Replace the `nav.map(...)` link block (lines ~138–157) with:

```jsx
{nav.map((n, i) => (
  <motion.div
    key={n.to}
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.15 + i * 0.06 }}
  >
    <NavLink
      to={n.to}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `font-display flex items-baseline gap-4 border-b border-cream/10 py-4 text-3xl ${isActive ? 'text-gold-400' : 'text-cream'}`
      }
    >
      <span className="font-mono text-sm text-gold-400/80">{String(i + 1).padStart(2, '0')}</span>
      {n.label}
    </NavLink>
  </motion.div>
))}
```
Relabel the overlay's bottom `Book consultation` link to `Book a consultation`.

- [ ] **Step 4: Build + visual check.**

Run: `npm run build` (expect exit 0). Then `npm run dev`, confirm: wordmark shows, no gold smile icon, mobile menu shows `01 … 07` numbers, all accents oxblood. Stop dev.

- [ ] **Step 5: Commit.**

```bash
git add src/components/Nav.jsx
git commit -m "feat(aligna): editorial wordmark nav + numbered index overlay"
```

---

## Task 4: Footer — inverted, locations summary, no address block

**Files:**
- Modify: `src/components/Footer.jsx`

**Interfaces:**
- Consumes: `brand`, `nav`, `locations` from `data.js`.
- Produces: an inverted ink footer with a locations summary column (cities served + "15+ partner clinics") replacing the single MapPin address + Clock hours. Central phone/WhatsApp/email retained.

- [ ] **Step 1: Add `locations` to the import** (line 4): `import { brand, nav, locations } from '../lib/data'`. Remove the now-unused `MapPin` and `Clock` from the lucide import if they are no longer referenced after Step 3.

- [ ] **Step 2: Fix the brand blurb** (lines ~32–35) — remove the owned-clinic sentence:
```jsx
<p className="text-emerald-200/80 mt-5 max-w-xs text-sm leading-relaxed">
  Specialist orthodontic care by {brand.doctor} — a visiting orthodontist and international
  lecturer treating 8,000+ smiles across 15+ partner clinics on the {brand.region}.
</p>
```

- [ ] **Step 3: Replace the "Visit & contact" column** (lines ~78–113) with a contact column that has NO street address and NO hours — plus a short "Where he practises" list:
```jsx
<div>
  <h4 className="eyebrow text-gold-400">Where he practises</h4>
  <ul className="mt-5 space-y-2.5 text-sm text-emerald-200/85">
    {['Mangalore', 'Manipal', 'Udupi'].map((c) => (
      <li key={c}>{c}</li>
    ))}
    <li className="text-emerald-200/60">{brand.clinicsCount} partner clinics · book by appointment</li>
  </ul>
  <h4 className="eyebrow text-gold-400 mt-8">Contact</h4>
  <ul className="mt-5 space-y-4 text-sm text-emerald-200/85">
    <li className="flex gap-3">
      <Phone size={17} className="shrink-0 text-gold-400" />
      <a href={`tel:${brand.phoneHref}`} className="tabular hover:text-cream">{brand.phone}</a>
    </li>
    <li className="flex gap-3">
      <MessageCircle size={17} className="shrink-0 text-gold-400" />
      <a href={`https://wa.me/${brand.whatsapp}`} className="hover:text-cream">WhatsApp us</a>
    </li>
    <li className="flex gap-3">
      <Mail size={17} className="shrink-0 text-gold-400" />
      <a href={`mailto:${brand.email}`} className="hover:text-cream">{brand.email}</a>
    </li>
  </ul>
</div>
```
Update the lucide import to drop `MapPin, Clock`: `import { Phone, MessageCircle, Mail } from 'lucide-react'`.

- [ ] **Step 4: Build + verify.**

Run: `npm run build` (exit 0). Grep to confirm the footer no longer references removed fields:

Run: `grep -n "brand.address\|brand.hours" src/components/Footer.jsx`
Expected: no matches.

- [ ] **Step 5: Commit.**

```bash
git add src/components/Footer.jsx
git commit -m "feat(aligna): inverted footer with locations summary, drop single address/hours"
```

---

## Task 5: Practice locations module + Home reorder scaffold

**Files:**
- Create: `src/components/Practice.jsx`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `locations`, `brand` from `data.js`; `Eyebrow` from `./ui/Eyebrow`; `Reveal` from `./ui/Reveal`.
- Produces: default-exported `Practice` component (a `<section id="practice">`) rendering the locations list. Consumed by `Home.jsx` and reused by `ContactPage` (Task 9).

- [ ] **Step 1: Create `src/components/Practice.jsx`:**

```jsx
import { MapPin, ArrowUpRight } from 'lucide-react'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import { locations, brand } from '../lib/data'

export default function Practice() {
  return (
    <section id="practice" className="bg-cream section">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <Eyebrow>04 — Where I practise</Eyebrow>
            <h2 className="d-section text-ink mt-5 max-w-2xl">
              No single clinic. <span className="italic-fraunces text-gold-deep">{brand.clinicsCount} of them.</span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-ink/55 text-sm leading-relaxed md:block">
            Dr. Rohan visits partner clinics across the {brand.region} on a weekly rotation.
            Book once — we place you at the one nearest you.
          </p>
        </div>

        <ul className="mt-4">
          {locations.map((l, i) => {
            const text = `Hi, I'd like to book an orthodontic consultation with Dr. Rohan at ${l.name}, ${l.area}.`
            return (
              <Reveal key={l.name} delay={i * 0.04}>
                <li className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-6 md:gap-8">
                  <span className="font-mono text-sm text-gold-deep/70">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-display text-ink text-xl leading-tight md:text-2xl">{l.name}</p>
                    <p className="text-ink/55 mt-1 flex flex-wrap items-center gap-x-2 text-sm">
                      <MapPin size={14} className="text-gold-deep" /> {l.area}, {l.city}
                      <span className="text-ink/30">·</span>
                      <span className="text-gold-deep">{l.days}</span>
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-gold-deep"
                  >
                    Book here <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
```
Note: verify `Reveal` accepts a `delay` prop; if not, drop the `delay={...}` prop (Task 7 Step 1 confirms Reveal's API).

- [ ] **Step 2: Reorder `Home.jsx`** to the portfolio narrative and insert `Practice`. Replace the file body with:

```jsx
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import BeforeAfter from '../components/BeforeAfter'
import Lectures from '../components/Lectures'
import WhatIsInvisalign from '../components/WhatIsInvisalign'
import Journey from '../components/Journey'
import Practice from '../components/Practice'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <BeforeAfter />
      <Lectures />
      <WhatIsInvisalign />
      <Journey />
      <Practice />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  )
}
```
(`Stats` and `WhyUs` are folded into About/Hero visually; if you prefer to keep them, re-add — but the default portfolio flow drops the standalone `Stats` band since the hero already carries stats.)

- [ ] **Step 3: Build + verify the new section renders.**

Run: `npm run build` (exit 0). Then `npm run dev`, scroll to `#practice`, confirm all 6 clinics list with day + "Book here" opening WhatsApp. Stop dev.

- [ ] **Step 4: Commit.**

```bash
git add src/components/Practice.jsx src/pages/Home.jsx
git commit -m "feat(aligna): Where-I-practise locations module + portfolio Home order"
```

---

## Task 6: Hero — editorial ink-on-bone, B&W portrait

**Files:**
- Modify: `src/components/Hero.jsx`

**Interfaces:**
- Consumes: `img`, `brand` from `data.js`.
- Produces: an editorial hero (bone background, oversized stacked name, B&W portrait via `.portrait-bw`, oxblood accents, stat row including "15+ clinics"). Section keeps `id="top"`.

- [ ] **Step 1: Change the hero shell from emerald cover to editorial bone.** Replace `className="bg-emerald relative min-h-screen overflow-hidden"` on the `<section>` with `className="bg-cream relative min-h-screen overflow-hidden"`. Remove the two dark scrim gradient divs (lines ~42–43) and the emerald bloom (line ~47). Keep the grain at low opacity.

- [ ] **Step 2: Restyle the portrait as a framed B&W column, not a full-bleed cover.** Wrap the image so on `lg` it sits in a right-hand column with a hairline frame, and apply `portrait-bw`:
  - Add `portrait-bw` to the `<img>` className: `className="h-full w-full object-cover portrait-bw"`.
  - Move the motion image container from `absolute inset-0` to a positioned right column on desktop (e.g. `lg:absolute lg:inset-y-0 lg:right-0 lg:w-[42%]`), full-width behind content on mobile with a bone scrim. Keep the parallax `y`/`scale`.

- [ ] **Step 3: Recolor the text block for ink-on-bone.** Change: `Eyebrow tone="light"` → `Eyebrow` (dark tone); `text-cream` on `<h1>` → `text-ink`; the mono credential `text-gold-400` → `text-gold-deep`; the paragraph `text-emerald-200` → `text-ink/70` and inner `text-cream` → `text-ink`. Update the eyebrow copy to `Specialist Orthodontist · International Lecturer` and the paragraph to:
```jsx
Specialist orthodontist and international lecturer — <span className="text-ink">8,000+ smiles</span> personally treated over 18+ years, consulting across {brand.clinicsCount} partner clinics on the {brand.region}.
```

- [ ] **Step 4: Update the stat row + CTAs.** Change `heroStats` (lines ~22–27) to:
```jsx
const heroStats = [
  { v: '18+', l: 'Years' },
  { v: '8,000+', l: 'Smiles' },
  { v: '15+', l: 'Clinics / wk' },
  { v: '9', l: 'Countries' },
]
```
In the stat row markup change `text-cream` → `text-ink` and `text-emerald-200/70` → `text-ink/50`. Primary CTA: keep `btn btn-gold` (now oxblood) `Book a consultation`; secondary: change `btn-ghost-light` → `btn-outline` and label `See the work`. Update the review line colors (`text-cream/85` → `text-ink/70`, `text-emerald-200` → `text-ink/55`). Change the diamond chip (lines ~143–145) to bone/oxblood: `border-gold/50 bg-emerald/80` → `border-gold-deep/30 bg-ivory` and its text `text-gold-400` → `text-gold-deep`.

- [ ] **Step 5: Build + visual check.**

Run: `npm run build` (exit 0). `npm run dev`: hero is bone, name huge in ink, portrait B&W on the right, stat row shows "15+ Clinics / wk", accents oxblood, text legible. Check mobile width. Stop dev.

- [ ] **Step 6: Commit.**

```bash
git add src/components/Hero.jsx
git commit -m "feat(aligna): editorial ink-on-bone hero with B&W portrait"
```

---

## Task 7: Home section components — reskin, numbered kickers, voice

**Files:**
- Modify: `src/components/About.jsx`, `Marquee.jsx`, `WhyUs.jsx`, `Lectures.jsx`, `WhatIsInvisalign.jsx`, `Journey.jsx`, `BeforeAfter.jsx`, `Testimonials.jsx`, `FAQ.jsx`, `CTASection.jsx`
- Reference: `src/components/ui/Eyebrow.jsx`, `src/components/ui/Reveal.jsx` (confirm props)

**Interfaces:**
- Consumes: retokened classes from Task 1; `data.js` content from Task 2.
- Produces: sections that read as editorial portfolio blocks. No new exports; same component names.

Apply these **uniform reskin rules** to each file (the color reskin is already inherited from Task 1 — this task is structure, numbering, and portrait treatment):

- [ ] **Step 1: Confirm `Eyebrow` and `Reveal` APIs.** Open both `ui/Eyebrow.jsx` and `ui/Reveal.jsx`. Note `Eyebrow`'s `tone` prop values and whether `Reveal` accepts `delay`. If `Reveal` has no `delay` prop, remove any `delay={...}` usages added in Task 5 and this task. Fix Task 5's Practice component if needed. (No commit yet.)

- [ ] **Step 2: Numbered kickers.** In each of `About`, `Lectures`, `WhatIsInvisalign`, `Journey`, `BeforeAfter`, `Testimonials` prefix the section eyebrow text with its portfolio index so the narrative reads `01 — About`, `02 — Selected work` (BeforeAfter), `03 — Lectures & recognition` (Lectures). Use this exact mapping:
  - About → `01 — About`
  - BeforeAfter → `02 — Selected work`
  - Lectures → `03 — Lectures & recognition`
  - WhatIsInvisalign → `What he treats`
  - Journey → `The process`
  - Testimonials → `In their words`

- [ ] **Step 3: Grayscale portraits.** In any component rendering a person photo (`img.doctor`, `img.heroPortrait`, testimonial avatars `p1/p2/p3` in `Testimonials.jsx`, and the doctor image in `About.jsx`), add `portrait-bw` to the `<img>` className. Do NOT add it to `BeforeAfter.jsx` teeth images (`img.before`/`img.after`) — those stay color.

- [ ] **Step 4: Remove residual gold-gradient / emerald-cover flourishes** that now look off: any `text-gold-grad` on large headings may stay (renders oxblood), but replace any `mesh-emerald` full-section backgrounds used purely decoratively on Home sections with `bg-cream` or `bg-emerald` (ink) intentionally — pick per section so the page alternates bone and ink blocks editorially rather than green. Keep at most 1–2 dark (ink) sections on Home for rhythm (recommend `CTASection` dark; the rest bone).

- [ ] **Step 5: Voice pass.** Scan each component's inline strings for any "our clinic", "visit us", "Deralakatte", single-address or hours language and rewrite to the visiting-consultant register (e.g. "at the partner clinic nearest you"). Most copy lives in `data.js` (already fixed) — this catches hardcoded strings inside components.

- [ ] **Step 6: Build + full Home visual walk.**

Run: `npm run build` (exit 0). `npm run dev`: scroll the whole Home page. Confirm: numbered kickers present, portraits B&W, teeth color, alternating bone/ink rhythm, zero green, accents oxblood, no "our clinic" language. Stop dev.

- [ ] **Step 7: Commit.**

```bash
git add src/components/About.jsx src/components/Marquee.jsx src/components/WhyUs.jsx src/components/Lectures.jsx src/components/WhatIsInvisalign.jsx src/components/Journey.jsx src/components/BeforeAfter.jsx src/components/Testimonials.jsx src/components/FAQ.jsx src/components/CTASection.jsx src/components/Practice.jsx
git commit -m "feat(aligna): editorial reskin of Home sections — numbered kickers, B&W portraits"
```

---

## Task 8: PageHero + inner pages reskin & voice

**Files:**
- Modify: `src/components/PageHero.jsx`
- Modify: `src/pages/AboutPage.jsx`, `LecturesPage.jsx`, `InvisalignPage.jsx`, `ProcessPage.jsx`, `ResultsPage.jsx`, `BlogPage.jsx`

**Interfaces:**
- Consumes: retokened classes, `data.js`.
- Produces: inner pages consistent with the Ink Editorial system.

- [ ] **Step 1: Retone `PageHero`.** It uses `mesh-emerald` (now flat ink) — that's acceptable as the dark page-header band. Confirm the breadcrumb `text-emerald-200/70`, eyebrow tone="light", `text-cream` heading, and `text-gold-grad` accent all read correctly on ink (they now render bone text + oxblood accent). No structural change required unless the accent contrast is weak — if so, swap the `titleEm` span class from `text-gold-grad` to `text-gold-400`.

- [ ] **Step 2: Per-page voice + grayscale pass.** For each inner page, (a) add `portrait-bw` to any doctor/person image, (b) scan for owned-clinic language and rewrite to visiting-consultant voice, (c) confirm no `brand.address`/`brand.hours` usage remains (those fields are gone — a stray reference will render `undefined`). Grep each page:

Run: `grep -rn "brand.address\|brand.hours\|Deralakatte\|our clinic\|Visit us" src/pages/`
Expected after edits: matches only remain (if any) inside `ContactPage.jsx`, which Task 9 rewrites.

- [ ] **Step 3: Results page as portfolio gallery.** In `ResultsPage.jsx`, ensure before/after pairs read as numbered case entries (title + numbered index + color images). Keep teeth images color (no `portrait-bw`).

- [ ] **Step 4: Build + walk every route.**

Run: `npm run build` (exit 0). `npm run dev`, visit `/about`, `/lectures`, `/treatments`, `/process`, `/results`, `/blog`. Confirm each renders in the Ink Editorial system with no green and no `undefined` text. Stop dev.

- [ ] **Step 5: Commit.**

```bash
git add src/components/PageHero.jsx src/pages/AboutPage.jsx src/pages/LecturesPage.jsx src/pages/InvisalignPage.jsx src/pages/ProcessPage.jsx src/pages/ResultsPage.jsx src/pages/BlogPage.jsx
git commit -m "feat(aligna): reskin inner pages to Ink Editorial + visiting-consultant voice"
```

---

## Task 9: Contact → Practice/Book page (no address/hours/map)

**Files:**
- Modify: `src/pages/ContactPage.jsx`

**Interfaces:**
- Consumes: `brand`, `locations`; the `Practice` component from Task 5; `PageHero`, `Reveal`, `Eyebrow`.
- Produces: a Contact page with the locations list + a WhatsApp callback form and NO single street address, NO single hours block, NO single embedded map.

- [ ] **Step 1: Rewrite the `details` array** (lines ~8–13) — drop the `MapPin`/address entry and the hours; keep call/WhatsApp/email plus a "Where he practises" pointer:
```js
const details = [
  { Icon: Phone, label: 'Call', value: brand.phone, href: `tel:${brand.phoneHref}` },
  { Icon: MessageCircle, label: 'WhatsApp', value: 'Message the booking desk', href: `https://wa.me/${brand.whatsapp}` },
  { Icon: Mail, label: 'Email', value: brand.email, href: `mailto:${brand.email}` },
]
```
Update the lucide import to drop `MapPin, Clock`.

- [ ] **Step 2: Replace the PageHero sub copy** (line ~99) — remove "at our Deralakatte clinic":
```jsx
sub="Book a free consultation and 3D scan — Dr. Rohan will see you at the partner clinic nearest you. Or just ask us anything."
```

- [ ] **Step 3: Remove the single map iframe and the hours card** (lines ~127–145) entirely. In their place, render the `Practice` locations module so patients pick a clinic. Import at top: `import Practice from '../components/Practice'`. After the details/form `<section>`, add `<Practice />`.

- [ ] **Step 4: Fix the WhatsApp form greeting** (line ~21) — replace `Hi Aligna` with `Hi, I'd like to book a consultation with Dr. Rohan` and drop any clinic-name reference.

- [ ] **Step 5: Build + verify no owned-clinic artifacts.**

Run: `npm run build` (exit 0).
Run: `grep -n "iframe\|brand.address\|brand.hours\|Deralakatte" src/pages/ContactPage.jsx`
Expected: no matches.
`npm run dev`, visit `/contact`: no map, no hours, locations list present, form opens WhatsApp. Stop dev.

- [ ] **Step 6: Commit.**

```bash
git add src/pages/ContactPage.jsx
git commit -m "feat(aligna): Contact becomes Practice/Book — locations list, no address/hours/map"
```

---

## Task 10: Residual sweep + final verification

**Files:**
- Modify (as needed): `src/components/Floating.jsx`, `Preloader.jsx`, `SmileArc.jsx`, `SignatureBand.jsx`, `Stats.jsx`, `src/components/ui/*`

**Interfaces:**
- Consumes: everything prior.
- Produces: a build with zero stray emerald-green / metallic-gold literals and a clean route walk.

- [ ] **Step 1: Grep for hardcoded color literals** that bypass tokens (the old gold `#C9A24B`, `#c9a24b`, green hexes, `emerald-`/`green-` Tailwind utilities used as literal greens):

Run: `grep -rin "#c9a24b\|#0b3d2e\|emerald-500\|green-\|from-emerald\|to-emerald" src/`
Review each hit. The `emerald` token is now ink (intentional) — leave `bg-emerald`/`text-emerald-200` etc. Fix only literal gold hexes (e.g. the smile-SVG `stroke="#C9A24B"` in `Preloader.jsx`/`SmileArc.jsx`/`SignatureBand.jsx`) → change to oxblood `#8B2E2E` or `#6E2020`.

- [ ] **Step 2: Retone `Floating.jsx`.** The WhatsApp FAB uses `bg-emerald` (now ink) + `ring-gold/50` (now oxblood) — acceptable. Confirm the ping ring `bg-emerald/40` reads as a soft ink pulse, not green. No change unless it looks wrong.

- [ ] **Step 3: Reduced-motion + responsive check.** With `prefers-reduced-motion: reduce` enabled (DevTools rendering emulation), confirm ambient loops (`animate-floaty`, `animate-spin-slow`) stop and the page is usable. Check the site at 375px and 1440px widths — no horizontal overflow, hero portrait and locations list reflow correctly.

- [ ] **Step 4: Full production build + preview walk.**

Run: `npm run build` (exit 0).
Run: `npm run preview`, walk `/`, `/about`, `/lectures`, `/treatments`, `/process`, `/results`, `/blog`, `/contact`. Confirm the Global Constraints all hold: no owned clinic, no single address/hours/map, one oxblood accent, no green, B&W portraits, color teeth. Stop preview.

- [ ] **Step 5: Lint (non-blocking).**

Run: `npm run lint`
Review oxlint output; fix any errors introduced (unused imports from removed icons are the likely hits).

- [ ] **Step 6: Final commit.**

```bash
git add -A
git commit -m "chore(aligna): residual color sweep + final Ink Editorial verification"
```

---

## Self-review notes (author)

- **Spec coverage:** §1 positioning → Tasks 2,4,6,9. §2 design system → Task 1. §3 chrome → Tasks 3,4. §4 Home flow → Tasks 5,6,7. §5 whole-site → Tasks 8,9. §6 data → Task 2. §7 assets/grayscale → Tasks 1,6,7,8. §8 verification → each task + Task 10. All sections covered.
- **Placeholder scan:** location data is intentionally placeholder (spec-approved); all code steps carry real code or exact edit targets. No TBD/TODO.
- **Type consistency:** `locations[]` shape `{name,area,city,days,mapQuery}` defined in Task 2, consumed identically in Tasks 4,5,9. `brand.clinicsCount`/`brand.region` defined Task 2, used Tasks 4,5,6. `Practice` default export defined Task 5, imported Tasks 5,9. `.portrait-bw` defined Task 1, used Tasks 6,7,8.
- **Known dependency:** Task 7 Step 1 verifies `Reveal`'s `delay` prop before Task 5's usage ships; if absent, both are corrected together (Task 5 not yet committed relative to 7? — Task 5 commits first, so if `Reveal` lacks `delay`, drop the prop in Task 5 Step 1 during that task by checking `ui/Reveal.jsx` first). Adjusted: **in Task 5 Step 1, open `ui/Reveal.jsx` before writing Practice and match its real API.**
```
