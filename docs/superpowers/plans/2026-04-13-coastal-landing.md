# Coastal Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Airbnb-clone at `index.html` with a minimal, luxury-coastal marketing landing page that soft-funnels guests to Kaili's realtor site.

**Architecture:** Single static HTML page + one CSS file with design tokens + one ~5-line inline toast script. No build step, no framework, no external JS file. Mobile-first with a single 768px breakpoint.

**Tech Stack:** HTML5, CSS3 (custom properties, `clamp()`, CSS grid), Google Fonts (Playfair Display + Montserrat). No JavaScript beyond the inline toast.

**Note on testing:** This project has no test framework. Verification is manual: open `index.html` in a browser, confirm the described behavior, take a visual pass. Each task ends with an explicit browser-verification step before committing.

---

## File Structure

| File | Responsibility |
|---|---|
| `index.html` | Page markup; all five content sections, hero, footer; inline toast script at the bottom of `<body>`. |
| `index.css` | Design tokens (`:root`), global reset, per-section styles, one responsive `@media` block. |
| `index.js` | **DELETED** — no external JS. |
| `images/host-kaili.png` | Existing. Used in Section 4 Kaili card. |
| `images/condo/livingroom/balc.avif` | Existing. Used in Section 2 (Experience) as the 2-column image. |

---

### Task 1: Reset the workspace

**Files:**
- Delete: `index.js`
- Overwrite: `index.html`, `index.css` (starting from empty)

- [ ] **Step 1: Delete `index.js`**

```bash
git rm index.js
```

- [ ] **Step 2: Truncate `index.html` and `index.css` to empty**

```bash
: > index.html
: > index.css
```

- [ ] **Step 3: Verify the working tree**

Run: `ls -la index.* && git status`
Expected: `index.html` and `index.css` exist (0 bytes). `index.js` shown as deleted in `git status`.

- [ ] **Step 4: Commit the reset**

```bash
git add -u
git commit -m "chore: reset index files for coastal landing rewrite

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: HTML skeleton with all five sections

**Files:**
- Modify: `index.html` (full write)

- [ ] **Step 1: Write the HTML skeleton**

Replace the entirety of `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A peaceful coastal retreat — wake up to the ocean and watch the sunrise from the sand.">
  <title>Coastal Retreat · Hosted by Kaili</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <main>

    <!-- HERO -->
    <section class="hero">
      <div class="hero__overlay">
        <h1 class="hero__title">Wake up to the sound of the ocean</h1>
        <p class="hero__subtitle">Watch the sunrise right from the sand</p>
      </div>
    </section>

    <!-- OPENING -->
    <section class="opening">
      <p class="opening__lede">
        Wake up to the sound of the ocean and watch the sunrise right from the sand.
        This peaceful coastal retreat is designed for slow mornings, long beach days,
        and unforgettable stays.
      </p>
    </section>

    <!-- EXPERIENCE -->
    <section class="experience">
      <div class="experience__text">
        <h2 class="section-title">The Experience</h2>
        <p>
          This home is perfect for families, couples, or a quiet getaway.
          Thoughtfully designed with comfort and style in mind, you'll have everything
          you need to relax and enjoy the coast.
        </p>
        <ul class="experience__bullets">
          <li>Steps from the beach</li>
          <li>Beautiful sunrise views</li>
          <li>Cozy, elevated interiors</li>
          <li>Perfect for weekend escapes or extended stays</li>
        </ul>
      </div>
      <div class="experience__image">
        <img src="images/condo/livingroom/balc.avif" alt="View from the balcony toward the water" loading="eager">
      </div>
    </section>

    <!-- VIBE -->
    <section class="vibe">
      <blockquote class="vibe__quote">
        Mornings here are calm and quiet—just you, the water, and the sky lighting up.
        <br><br>
        Evenings wind down with ocean breezes and sunsets that never get old.
      </blockquote>
    </section>

    <!-- FUNNEL -->
    <section class="funnel">
      <div class="funnel__card">
        <div class="host-card">
          <img src="images/host-kaili.png" alt="Kaili Cox" class="host-card__avatar">
          <div class="host-card__text">
            <strong>Hosted by Kaili</strong>
            <span>Bastrop TX Realtor</span>
          </div>
        </div>
        <h2 class="funnel__title">✨ Thinking about owning a beach home?</h2>
        <p class="funnel__body">
          We love helping guests fall in love with coastal living. If you ever find yourself
          thinking, "I could live here…"—you're not alone.
        </p>
        <p class="funnel__body">
          For guests interested in owning a beach home or investing in coastal property,
          we've put together a curated guide + available homes:
        </p>
        <a class="funnel__link" href="https://www.kailicox.realtor" target="_blank" rel="noopener">
          www.kailicox.realtor
        </a>
        <p class="funnel__footnote">No pressure—just a helpful resource if you're curious.</p>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="final-cta">
      <h2 class="final-cta__title">
        Book your stay and experience the coast the way it's meant to be
      </h2>
      <!-- TODO: Kaili — replace href="#" with the Airbnb listing URL -->
      <a class="final-cta__button" href="#" id="reserve-button">Reserve Your Dates</a>
    </section>

  </main>

  <footer class="site-footer">
    <div class="site-footer__col">
      <h3 class="site-footer__heading">Contact</h3>
      <p>Kaili Cox</p>
      <p>Bastrop, TX</p>
      <p><a href="https://www.kailicox.realtor" target="_blank" rel="noopener">www.kailicox.realtor</a></p>
    </div>
    <div class="site-footer__col">
      <h3 class="site-footer__heading">Follow</h3>
      <p><a href="#" data-todo="instagram">Instagram</a></p>
      <p><a href="#" data-todo="facebook">Facebook</a></p>
      <p><a href="#" data-todo="tiktok">TikTok</a></p>
    </div>
    <p class="site-footer__copyright">© 2026 Kaili Cox</p>
  </footer>

  <!-- Toast script — written by the user in Task 9. Placeholder stub for now. -->
  <script>
    // TODO (Task 9): implement toast behavior for #reserve-button
  </script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open `index.html` directly (double-click, or `open index.html` on macOS). Expected:
- Page renders with all text visible (no styles yet — black text on white).
- Both images load (balcony photo and Kaili avatar).
- No broken image icons. No 404s in DevTools network tab (other than the social placeholder `#` links, which don't fire).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: scaffold coastal landing page HTML

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: CSS tokens + global reset + base body styles

**Files:**
- Modify: `index.css` (full write)

- [ ] **Step 1: Write the token layer and reset**

Replace the entirety of `index.css` with:

```css
/* ─────────── Design tokens ─────────── */
:root {
  --color-bg: #F7F5F2;
  --color-surface: #EFEAE2;
  --color-accent: #C9B79C;
  --color-text: #2C2C2C;
  --color-text-muted: #6B6B6B;

  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  --space-section-y: clamp(48px, 8vw, 96px);
  --space-gutter: clamp(24px, 5vw, 64px);

  --radius-card: 16px;
  --shadow-soft: 0 8px 24px rgba(44, 44, 44, 0.06);

  --hero-gradient: linear-gradient(
    180deg,
    #F6D3A8 0%,
    #E9B890 30%,
    #C9B79C 70%,
    #8FA8B0 100%
  );
}

/* ─────────── Reset ─────────── */
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
img { display: block; max-width: 100%; height: auto; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; }
ul { margin: 0; padding: 0; list-style: none; }

/* ─────────── Base ─────────── */
body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-weight: 300;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.2;
  margin: 0;
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 4px;
}
```

- [ ] **Step 2: Verify in browser**

Reload `index.html`. Expected:
- Sand-colored background (`#F7F5F2`).
- Text is charcoal, not black.
- Headings render in Playfair Display (serif); body in Montserrat (sans-serif).
- Text is no longer clipped to the very edges of the viewport (browser default margin is gone but no padding yet — content still fills edge-to-edge; that's OK for this step).

- [ ] **Step 3: Commit**

```bash
git add index.css
git commit -m "feat: add CSS tokens, reset, and base typography

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Hero section

**Files:**
- Modify: `index.css` (append)

- [ ] **Step 1: Append hero styles**

Append to `index.css`:

```css
/* ─────────── Hero ─────────── */
.hero {
  position: relative;
  min-height: 70vh;
  background: var(--hero-gradient);
  display: flex;
  align-items: flex-end;
  padding: var(--space-section-y) var(--space-gutter);
}

.hero::after {
  /* Subtle dark-to-transparent gradient for text contrast */
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.25) 100%);
  pointer-events: none;
}

.hero__overlay {
  position: relative;
  z-index: 1;
  color: #FFFFFF;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  max-width: 640px;
}

.hero__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 0.5rem;
}

.hero__subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 300;
  margin: 0;
  opacity: 0.95;
}
```

- [ ] **Step 2: Verify in browser**

Reload. Expected:
- Hero fills ≥70% of the viewport height.
- Gradient flows from peach (top) through sand/taupe to sea-sky (bottom).
- White overlay text is bottom-aligned, left-padded, with a subtle shadow making it readable against the gradient.

- [ ] **Step 3: Commit**

```bash
git add index.css
git commit -m "feat: style hero section with gradient and overlay text

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Opening + Experience sections

**Files:**
- Modify: `index.css` (append)

- [ ] **Step 1: Append opening + experience styles**

Append to `index.css`:

```css
/* ─────────── Opening ─────────── */
.opening {
  padding: var(--space-section-y) var(--space-gutter);
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.opening__lede {
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  line-height: 1.7;
  color: var(--color-text);
  margin: 0;
}

/* ─────────── Section title (shared) ─────────── */
.section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-bottom: 1.25rem;
}

/* ─────────── Experience ─────────── */
.experience {
  padding: var(--space-section-y) var(--space-gutter);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-gutter);
  max-width: 1100px;
  margin: 0 auto;
  align-items: center;
}

.experience__text p {
  font-size: 1rem;
  color: var(--color-text);
  margin: 0 0 1.5rem 0;
}

.experience__bullets li {
  position: relative;
  padding-left: 1.25rem;
  margin: 0.5rem 0;
  color: var(--color-text);
}

.experience__bullets li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: 500;
}

.experience__image img {
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-soft);
}
```

- [ ] **Step 2: Verify in browser**

Reload. Expected:
- "Opening" paragraph is centered with generous whitespace above/below.
- "The Experience" heading renders in Playfair Display.
- Bullets show taupe dots on the left.
- The balcony image is rounded with a soft shadow. Below 768px the image stacks under the text (we're in single-column mode — the 2-column layout comes in Task 8).

- [ ] **Step 3: Commit**

```bash
git add index.css
git commit -m "feat: style opening and experience sections

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Vibe + Funnel sections (incl. Kaili card)

**Files:**
- Modify: `index.css` (append)

- [ ] **Step 1: Append vibe + funnel styles**

Append to `index.css`:

```css
/* ─────────── Vibe ─────────── */
.vibe {
  position: relative;
  padding: var(--space-section-y) var(--space-gutter);
  background:
    linear-gradient(180deg, rgba(247,245,242,0.85), rgba(247,245,242,0.85)),
    var(--hero-gradient);
  text-align: center;
}

.vibe__quote {
  font-family: var(--font-heading);
  font-style: italic;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  line-height: 1.5;
  color: var(--color-text);
  max-width: 720px;
  margin: 0 auto;
}

/* ─────────── Funnel ─────────── */
.funnel {
  padding: var(--space-section-y) var(--space-gutter);
  display: flex;
  justify-content: center;
}

.funnel__card {
  background: var(--color-surface);
  border-radius: var(--radius-card);
  padding: clamp(28px, 5vw, 56px);
  max-width: 680px;
  width: 100%;
  box-shadow: var(--shadow-soft);
  text-align: left;
}

.host-card {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.5rem;
}

.host-card__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(44,44,44,0.1);
}

.host-card__text {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.host-card__text strong {
  color: var(--color-text);
  font-weight: 500;
}

.funnel__title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 1rem;
}

.funnel__body {
  margin: 0 0 1rem 0;
  color: var(--color-text);
}

.funnel__link {
  display: inline-block;
  margin: 0.5rem 0 1rem 0;
  color: var(--color-text);
  font-weight: 500;
  border-bottom: 1px solid var(--color-accent);
  padding-bottom: 2px;
  transition: border-color 0.2s;
}

.funnel__link:hover {
  border-color: var(--color-text);
}

.funnel__footnote {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin: 0;
}
```

- [ ] **Step 2: Verify in browser**

Reload. Expected:
- Vibe section has a faded version of the hero gradient behind centered italic serif text.
- Funnel card is centered, soft beige background, rounded corners, shadow.
- Kaili avatar renders as a 64px circle at the top of the card, next to "Hosted by Kaili / Bastrop TX Realtor".
- The realtor link has a subtle taupe underline that darkens on hover.

- [ ] **Step 3: Commit**

```bash
git add index.css
git commit -m "feat: style vibe and funnel sections with Kaili card

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Final CTA + Footer

**Files:**
- Modify: `index.css` (append)

- [ ] **Step 1: Append final CTA + footer styles**

Append to `index.css`:

```css
/* ─────────── Final CTA ─────────── */
.final-cta {
  padding: var(--space-section-y) var(--space-gutter);
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
}

.final-cta__title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  margin-bottom: 2rem;
}

.final-cta__button {
  display: inline-block;
  padding: 14px 36px;
  background: var(--color-text);
  color: var(--color-bg);
  border-radius: 999px;
  font-family: var(--font-body);
  font-weight: 500;
  letter-spacing: 0.02em;
  box-shadow: var(--shadow-soft);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.final-cta__button:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 28px rgba(44, 44, 44, 0.12);
}

/* ─────────── Footer ─────────── */
.site-footer {
  padding: var(--space-section-y) var(--space-gutter) 32px;
  background: var(--color-surface);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-gutter);
  color: var(--color-text-muted);
}

.site-footer__heading {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  color: var(--color-text);
  margin: 0 0 0.75rem 0;
}

.site-footer p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.site-footer a {
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.site-footer a:hover {
  border-color: var(--color-accent);
}

.site-footer__copyright {
  grid-column: 1 / -1;
  margin-top: 32px;
  font-size: 0.8rem;
  text-align: center;
  color: var(--color-text-muted);
}
```

- [ ] **Step 2: Verify in browser**

Reload. Expected:
- Final CTA headline is centered with the "Reserve Your Dates" button below it.
- Button is dark charcoal pill with sand-colored text; lifts slightly on hover.
- Footer has the soft beige background. At mobile width the two columns stack. Copyright line sits at the bottom, centered.

- [ ] **Step 3: Commit**

```bash
git add index.css
git commit -m "feat: style final CTA and footer

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Responsive breakpoint (768px)

**Files:**
- Modify: `index.css` (append)

- [ ] **Step 1: Append the single media query**

Append to `index.css`:

```css
/* ─────────── Desktop (≥768px) ─────────── */
@media (min-width: 768px) {
  .hero {
    min-height: 80vh;
    align-items: flex-end;
    padding-bottom: 10vh;
  }

  .experience {
    grid-template-columns: 1fr 1fr;
  }

  .site-footer {
    grid-template-columns: 1fr 1fr;
    padding-left: clamp(48px, 10vw, 120px);
    padding-right: clamp(48px, 10vw, 120px);
  }
}
```

- [ ] **Step 2: Verify in browser at two widths**

Reload at window widths 375px (mobile) and 1200px (desktop). Expected:
- **375px:** Experience stacks vertically (text above image). Footer columns stack. Hero text still bottom-left.
- **1200px:** Experience is side-by-side, text left, image right. Footer has two side-by-side columns with roomier horizontal padding. Hero text sits bottom-left with ~10vh of breathing room below.

Use Chrome DevTools responsive mode or resize the window.

- [ ] **Step 3: Commit**

```bash
git add index.css
git commit -m "feat: add 768px responsive breakpoint

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: Toast script for the placeholder Reserve button (USER CONTRIBUTION)

**Files:**
- Modify: `index.html` (replace the placeholder script + add minimal CSS for the toast)
- Modify: `index.css` (append toast styles I've prepared for you)

This is the one hands-on coding task for the user. You've already decided the behavior: when a visitor clicks the placeholder Reserve button, prevent navigation, show a friendly toast for 3 seconds, then remove it.

- [ ] **Step 1: Append toast CSS (prepared for you)**

Append to `index.css`:

```css
/* ─────────── Toast ─────────── */
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: var(--color-text);
  color: var(--color-bg);
  padding: 12px 20px;
  border-radius: 999px;
  box-shadow: 0 12px 32px rgba(44, 44, 44, 0.2);
  font-size: 0.9rem;
  opacity: 0;
  transition: opacity 0.25s ease, transform 0.25s ease;
  z-index: 1000;
  pointer-events: none;
}

.toast.is-visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
```

- [ ] **Step 2: Write the toast script (YOUR TURN)**

Find this block at the bottom of `index.html`:

```html
<!-- Toast script — written by the user in Task 9. Placeholder stub for now. -->
<script>
  // TODO (Task 9): implement toast behavior for #reserve-button
</script>
```

Replace the `// TODO` line with ~5 lines of JavaScript that:

1. Selects `#reserve-button`.
2. On click, calls `event.preventDefault()` so the URL doesn't change.
3. Creates a `<div class="toast">` with the text `Booking link coming soon — check back!` and appends it to `document.body`.
4. Adds the `is-visible` class on the next frame (use `requestAnimationFrame`) so the CSS transition actually plays.
5. Removes the toast after 3 seconds.

**Guidance — this is the meaningful part:**
- You can use `setTimeout` for the 3-second removal, but consider: should a second click while a toast is visible create a second toast (stacking) or reset the existing one? Both are defensible. Pick one.
- The `requestAnimationFrame` detail matters: if you add the class in the same frame as appending the element, the browser skips the transition and the toast pops in harshly. Deferring one frame lets the fade-in play.

Here's the surrounding scaffolding with your slot marked:

```html
<script>
  // YOUR CODE GOES HERE (~5 lines).
  // Hints:
  //   const btn = document.getElementById('reserve-button');
  //   btn.addEventListener('click', (e) => { ... });
</script>
```

- [ ] **Step 3: Verify in browser**

Reload. Click "Reserve Your Dates". Expected:
- URL does NOT change to `#`.
- A charcoal pill appears at the bottom-center with the text "Booking link coming soon — check back!".
- Toast fades in smoothly (not a pop).
- After 3 seconds the toast fades out and is removed from the DOM (check in DevTools Elements panel — the `.toast` div should be gone).

- [ ] **Step 4: Commit**

```bash
git add index.html index.css
git commit -m "feat: add friendly toast for placeholder Reserve button

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: Visual QA pass

**Files:** None modified — this is a pure verification task.

- [ ] **Step 1: Run through the acceptance checklist from the spec**

Open `index.html` and verify each item:

1. ☐ All five sections render (hero, opening, experience, vibe, funnel, final CTA) + footer.
2. ☐ Resize window from 320px to 1440px: no horizontal scrollbar at any width.
3. ☐ Below 768px, `.experience` stacks; above 768px, it's 2-column.
4. ☐ Clicking `Reserve Your Dates` shows the toast and does not change the URL.
5. ☐ Clicking `www.kailicox.realtor` opens Kaili's site in a new tab.
6. ☐ Open DevTools → Network tab → reload. Only these requests should return 200: `index.html`, `index.css`, `images/host-kaili.png`, `images/condo/livingroom/balc.avif`, and Google Fonts files. No 404s.
7. ☐ DevTools → Console: no errors.
8. ☐ Tab through the page with the keyboard. Every focusable element (links, button) shows a visible focus ring (taupe outline).
9. ☐ Hero heading reads as an `<h1>`; each section has an `<h2>`. (Inspect in DevTools.)

- [ ] **Step 2: If anything fails, fix it and commit the fix**

Use an atomic commit per fix:

```bash
git add <files>
git commit -m "fix: <short description>

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: If everything passes, tag the build**

```bash
git log --oneline | head -12
```

You should see a clean sequence of commits from Task 1 through Task 9 (plus any fix commits). No `index.js` in the working tree. Done.

---

## Done Criteria

- `index.js` deleted.
- `index.html` and `index.css` rewritten per the spec.
- All acceptance items in Task 10 pass in Chrome and Safari.
- Each task above committed atomically.
