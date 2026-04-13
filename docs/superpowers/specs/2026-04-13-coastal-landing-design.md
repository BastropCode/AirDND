# Coastal Landing Page — Design Spec

**Date:** 2026-04-13
**Owner:** Kaili Cox (via Dan)
**Status:** Ready for implementation

## Goal

Replace the existing Airbnb-clone listing at `index.html` with a minimal, luxury-coastal marketing landing page. The page doubles as a soft funnel for Kaili's real-estate work at www.kailicox.realtor.

## Non-goals

- No photo gallery, calendar, booking widget, host-card grid, or reviews block.
- No lead-capture form, email list, or backend integration.
- No build step, framework, or runtime dependency.
- No external `.js` file (existing `index.js` is deleted). A single ~5-line inline script is allowed for the toast behavior.

## Decisions

| # | Decision |
|---|---|
| 1 | Replace `index.html` entirely; delete `index.js`; rewrite `index.css` from scratch. |
| 2 | Hero uses a CSS-only multi-stop gradient (peach → sand → taupe → sea-sky). No image required. |
| 3 | Realtor-funnel block (Section 4) uses soft-touch copy and a single outbound link, as written in the mockup. |
| 4 | Final "Reserve Your Dates" button uses `href="#"` placeholder with a TODO comment for Kaili to fill in. |
| 5 | Click on the placeholder Reserve button shows a friendly toast ("Booking link coming soon — check back!") and auto-dismisses after 3 seconds. |
| 6 | `host-kaili.png` is included inside Section 4 as a small "Hosted by Kaili" card to reinforce trust before the realtor link. |
| 7 | Footer is 2-column (contact info + social links) with placeholder values. |
| 8 | Styling uses semantic HTML + CSS custom properties as design tokens (see Section 3). |

## File structure

```
AirDND/
├── index.html          (rewritten)
├── index.css           (rewritten; token-based)
├── index.js            (DELETED)
├── images/
│   ├── host-kaili.png  (used in Section 4)
│   └── condo/...       (unused on this page; retained for future)
└── docs/superpowers/specs/
    └── 2026-04-13-coastal-landing-design.md
```

## Page structure

Five `<section>` elements inside `<main>`, plus a `<footer>`. No separate `<header>` — the hero takes that role.

```html
<main>
  <section class="hero">         <!-- gradient bg + overlay text -->
  <section class="opening">      <!-- centered hook paragraph -->
  <section class="experience">   <!-- 2-col: text + image -->
  <section class="vibe">         <!-- faded gradient bg + centered quote -->
  <section class="funnel">       <!-- soft beige card + Kaili card + realtor link -->
  <section class="final-cta">    <!-- centered headline + Reserve button -->
</main>
<footer>                         <!-- 2-col: contact + social -->
```

Heading order: one `<h1>` in `.hero`, one `<h2>` per subsequent section. Bullets in `.experience` use real `<ul><li>`. Links to external domains carry `rel="noopener"`.

## Content (copy)

Use the copy from the user's mockup verbatim:

- **Hero overlay:** "Wake up to the sound of the ocean / Watch the sunrise right from the sand"
- **Opening:** "Wake up to the sound of the ocean and watch the sunrise right from the sand. This peaceful coastal retreat is designed for slow mornings, long beach days, and unforgettable stays."
- **Experience heading:** "The Experience"
- **Experience body:** "This home is perfect for families, couples, or a quiet getaway. Thoughtfully designed with comfort and style in mind, you'll have everything you need to relax and enjoy the coast."
- **Experience bullets:** Steps from the beach · Beautiful sunrise views · Cozy, elevated interiors · Perfect for weekend escapes or extended stays
- **Vibe overlay:** "Mornings here are calm and quiet—just you, the water, and the sky lighting up. Evenings wind down with ocean breezes and sunsets that never get old."
- **Funnel heading:** "✨ Thinking about owning a beach home?"
- **Funnel body:** "We love helping guests fall in love with coastal living. If you ever find yourself thinking, 'I could live here…'—you're not alone. For guests interested in owning a beach home or investing in coastal property, we've put together a curated guide + available homes:"
- **Funnel link:** "www.kailicox.realtor" (href: `https://www.kailicox.realtor`)
- **Funnel footnote:** "No pressure—just a helpful resource if you're curious."
- **Final CTA headline:** "Book your stay and experience the coast the way it's meant to be"
- **Final CTA button:** "Reserve Your Dates" (href: `#` with TODO)

## Section 4 — Hosted by Kaili card

Inside the `.funnel` section, above the funnel heading, render a small card:

```
[host-kaili.png, circular, 64px]   Hosted by Kaili
                                    Bastrop TX Realtor
```

Small, subdued typography — not the visual focus of the section.

## Footer

Two columns, mobile-stacked:

| Contact | Follow |
|---|---|
| Kaili Cox | Instagram — `TODO` |
| Bastrop, TX | Facebook — `TODO` |
| www.kailicox.realtor | TikTok — `TODO` |

Plus a small copyright line below: "© 2026 Kaili Cox".

## Design tokens (CSS custom properties)

```css
:root {
  /* Color */
  --color-bg: #F7F5F2;
  --color-surface: #EFEAE2;
  --color-accent: #C9B79C;
  --color-text: #2C2C2C;
  --color-text-muted: #6B6B6B;

  /* Type */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Montserrat', -apple-system, sans-serif;

  /* Spacing */
  --space-section-y: clamp(48px, 8vw, 96px);
  --space-gutter: clamp(24px, 5vw, 64px);

  /* Shape */
  --radius-card: 16px;
  --shadow-soft: 0 8px 24px rgba(44,44,44,0.06);

  /* Hero gradient (replaces missing palm-sunrise photo) */
  --hero-gradient: linear-gradient(
    180deg,
    #F6D3A8 0%,
    #E9B890 30%,
    #C9B79C 70%,
    #8FA8B0 100%
  );
}
```

Fonts loaded from Google Fonts: Playfair Display (400, 500) + Montserrat (300, 400, 500).

## Responsive strategy

- Mobile-first; everything stacks below 768px.
- One `@media (min-width: 768px)` block promotes `.experience` to 2-column grid and shifts `.hero` overlay text from centered to bottom-left.
- Font sizes use `clamp()` — no separate mobile/desktop type scales.
- All images `max-width: 100%; height: auto;` with `loading="lazy"` except the in-fold `.experience` image, which is eager.

## Behavior (one inline script)

A single small inline `<script>` at the bottom of `<body>` handles the Reserve Your Dates toast:

```js
// User-implemented (see implementation plan). ~5 lines.
// On click of the placeholder Reserve button, prevent navigation,
// show a fixed-position toast with "Booking link coming soon — check back!",
// and remove it after 3 seconds.
```

No other JS. No dependencies.

## Accessibility

- Single `<h1>`, ordered headings.
- Real `<button>` where semantics demand it; `<a>` for navigation.
- Text on gradient/photo overlays passes WCAG AA — we'll use a subtle dark-to-transparent overlay behind hero text if needed.
- All images have meaningful `alt` text.
- Focus-visible styles on all interactive elements.

## Testing / acceptance

- Open `index.html` directly in Chrome, Safari, and mobile Safari (DevTools emulation OK). All five sections render.
- Resize from 320px → 1440px. No horizontal scroll. 2-column becomes 1-column below 768px.
- Click "Reserve Your Dates" → toast appears, auto-dismisses after 3s, URL does not change.
- Click "www.kailicox.realtor" → opens Kaili's site in a new tab.
- No 404s in the network tab (only `host-kaili.png` and Google Fonts should load).

## Out of scope

Booking logic, availability calendars, guest reviews, email capture, analytics, CMS integration, multiple pages/routes. Any of these can be follow-ups with their own specs.
