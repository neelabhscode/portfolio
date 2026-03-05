# Portfolio — Technical & Design Specification

**Document purpose:** Full technical and design specification of the portfolio website. No code has been modified; this is analysis and documentation only. A new developer or designer should be able to understand and rebuild the system from this document.

---

## SECTION 1 — PROJECT STRUCTURE

### Framework and stack

- **Framework:** Next.js 16.1.6 (App Router).
- **React:** 19.2.3.
- **Language:** TypeScript 5.
- **Styling:** Single global CSS file (`app/globals.css`). No Tailwind utility usage in the portfolio UI (Tailwind is a dependency but the site uses plain CSS and inline styles).
- **Other dependencies:** `lucide-react`, `motion`, `radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`, `next/image` for images.

### Folder structure

- **`codex-build/`** — Next.js app root.
  - **`app/`**
    - **`layout.tsx`** — Root layout: HTML shell, font preconnect/preload, metadata, `globals.css` import.
    - **`page.tsx`** — Single-page app: all sections, header, footer, and inline components (BoardingPass, PassportCard, GateSeparator, Home).
    - **`globals.css`** — All global and component styles, design tokens, animations, media queries.
  - **`components/`**
    - **`LedBoard.tsx`** — Client component: canvas-based scrolling LED message board.
    - **`SplitflapBoard.tsx`** — Client component: split-flap departure board with cycling messages.
  - **`public/`** — Static assets (e.g. `passport-assets/passport1.jpg` referenced from page).
  - **`next-env.d.ts`** — TypeScript env for Next.js.

### Main entry and rendering

- **Entry:** Next.js serves `app/layout.tsx` as root; it wraps `app/page.tsx` as `{children}`.
- **Rendering:** `page.tsx` is a client component (`"use client"`). The entire experience is one scrollable page; there are no other routes. Layout provides `<html lang="en">`, font `<link>`s, and `<body>{children}</body>`.
- **Layout structure:**  
  `RootLayout` → `Home` (page) → Fragment containing: **Header** (sticky nav) → **Main** (sections + gate separators) → **Footer** (runway + metadata).

---

## SECTION 2 — GLOBAL DESIGN SYSTEM

### Typography

- **Fonts (loaded in layout):**
  - **IBM Plex Mono** — Weights 300, 400, 500; italic 300. Used for labels, chips, metadata, nav, stamps, terminal UI.
  - **IBM Plex Sans** — Weights 300, 400, 600, 700, 800. Used in boarding pass and supporting copy.
  - **Cardo** — Weights 400, italic 400. Used for hero tagline and contact headline.
  - **Inter** — Used for nav, body copy, project cards, and some headings.

- **Body default:** `font-family: 'IBM Plex Mono', monospace`, `color: #1a1a1a`, `background-color: #ffffff`, `-webkit-font-smoothing: antialiased`.

- **Font sizes (in use):**
  - 8.5px–10px: labels, chips, barcode, stub labels, gate/terminal labels.
  - 11px–12px: section titles, stamps, metadata, departures header.
  - 13px–15px: body copy, links, flight desc, meta values.
  - 16px–20px: headings, airport subtext, contact thanks.
  - 28px–32px: hero line (Cardo), contact headline (Cardo).
  - 46px–64px: airport codes (boarding pass).

- **Font weights:** 300 (light copy), 400 (body), 500–600 (headings, nav), 700–800 (airport codes).

- **Letter-spacing:** Dense use of `0.1em`–`0.4em` for uppercase/labels; `-0.02em` for large display (airport codes).

- **Text hierarchy:** Section titles (small, uppercase, gray) → sub-labels (smaller, muted) → body/headlines (Inter/Cardo, larger, dark). Mono used for “system” or “terminal” tone; serif/sans for narrative.

### Color system

- **Primary accent:** `#4C6EF5` — Nav border, links, stamps, runway fill, gate closing bar, flight path dots, hero emphasis, chip borders.
- **Backgrounds:**
  - **Page/main:** `#ffffff`.
  - **Nav:** `rgba(25, 25, 25, 0.9)` with backdrop blur.
  - **Boarding pass section:** `#edeae4` (warm off-white); top/bottom fade via `#boardingpass::before/::after` gradients to `#ffffff`.
  - **Footer:** `#0B0B0B`.
  - **Section alt/soft:** `#f7f7f7`, `#f4f6fb` (defined but overridden by section-specific backgrounds).
  - **Departures header:** `#1a1a1a`.
  - **Split-flap/LED:** `#111`, `#0a0a0a`, `#050505`.

- **Text colors:**
  - Primary: `#1a1a1a`, `#111`, `#222222`.
  - Muted: `#555`, `#666`, `#777`, `#8a8a8a`, `#999`, `#b0b0b0`, `#cccccc`.
  - Footer: `#EAEAEA`, `#888`, `#444`.
  - Nav: white / `rgba(255,255,255,0.7)`.

- **Semantic:** Green `#3dba73` for status (boarding, available, status dot). Yellow `#FACC15` and red `#F97373` for alternating runway lights.

### Spacing system

- **Sections (global):** `padding-top: 140px`, `padding-bottom: 140px`; at `max-width: 640px`: 96px each.
- **Overrides per section:** Hero `140px 1rem 60px`; others use `80px 1rem`, `4rem 1rem`, or `100px 1rem` (boarding pass). Footer `64px 0 48px`.
- **Content width:** Max widths 800px (contact), 1000px (flight path, footer), 1100px (projects, boarding pass, gate separator), 1200px (nav).
- **Gaps:** Grid/flex gaps 2px–32px (e.g. project grid 32px, runway 10px, gate separator 20px).

### Border radius

- **Small:** 2px–4px (tracks, chips, perforation).
- **Medium:** 8px–12px (departures header, split-flap, buttons).
- **Large:** 20px–26px (boarding pass card, LED chrome, status pill).

### Shadow system

- **Light:** `0 2px 6px rgba(0,0,0,0.06)`, `0 8px 24px rgba(0,0,0,0.10)` (passport card).
- **Cards:** `0 16px 48px rgba(0,0,0,0.14)`, `0 3px 10px rgba(0,0,0,0.07)` (boarding pass); project card hover `0 8px 20px rgba(0,0,0,0.06)`.
- **LED/split-flap:** `0 18px 40px`, `0 24px 50px` on hover; inner `inset 0 1px 0 rgba(255,255,255,0.04)`.
- **Stub hover:** `-6px 0 14px rgba(0,0,0,0.12)`.
- **Punch holes:** Inset shadows for depth.

### Background textures / grids

- **Hero:** 40×40px grid `linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px)` in both axes; mask `radial-gradient(circle at 50% 30%, transparent 10%, black 80%)` for a soft vignette.
- **Boarding pass ticket-main:** Dot grid `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)` 20×20px; paper texture via inline SVG fractal noise; light-sweep gradient overlay.
- **Footer runway:** No texture; solid dark with alternating colored lights.

---

## SECTION 3 — PAGE STRUCTURE

The page is a single scrollable document. Order:

### 1. Header (sticky)

- **Role:** Global navigation and brand.
- **Layout:** Sticky, full width, `minHeight: 60px`, flex row, space-between, max-width 1200px, padding 0 32px. Dark bar, top border `2px solid #4C6EF5`, bottom border subtle white.
- **Content:** Left: “NEELABH” button (scroll to hero) with blinking cursor (`.brand-cursor`). Right: three nav buttons (G-01 WORK → destinations, G-02 ABOUT → about/boarding pass, G-03 COLLABORATE → contact). Each button uses `.nav-link` with prefix (e.g. G-01) and main label (WORK); hover reveals underline via `::after` scaleX.
- **Style:** Inter 14px brand; nav 13px; prefix 9px uppercase; white/hover and transition.

### 2. Hero section (`#hero`)

- **Role:** Identity and value proposition.
- **Layout:** `minHeight: calc(100vh - 60px)`, flex column, center, padding 140px 1rem 60px. Background: grid + radial mask (see design system). Bottom: `.hero-grid-fade` (220px gradient to white).
- **Content (order):**  
  - Identity stamp: “Identity Verified • Product Designer • 2026” (`.identity-stamp`, hero-fade-up).  
  - PassportCard (photo with 3D tilt and glint).  
  - Hero line: “Neelabh is a *product designer* crafting human-centered experiences.” (Cardo 32px; “product designer” in #4C6EF5).  
  - CTA: “↓ Proceed to Departures” (`.hero-cta`, scroll to #departures).
- **Reveal:** Wrapper has `.reveal.reveal-hero`; children use `.hero-fade-up` with staggered `heroFadeUp` and `identityStamp` keyframes. Passport has `passport-scan-line` animation.

### 3. Gate separator — “01 — DEPARTURES”

- **Role:** Thematic divider between hero and departures.
- **Layout:** `padding: 40px 0` wrapper; inside `.gate-separator`: two flex lines (`.gate-separator-line`) and center label “GATE 01 — DEPARTURES”. Max-width 1100px, centered.

### 4. Departures section (`#departures`)

- **Role:** “Departure board” — availability and split-flap.
- **Layout:** Full viewport min height, flex column center, padding 80px 1rem, white background. Contains `.departures-divider` (full-width line), `.departures-board-wrap` (header + split-flap + CTA), then divider again.
- **Content:**  
  - Header: “DEPARTURES”, “UX AIRWAYS · TERMINAL 01”, live clock (state `depClockTime`, 24h format, `aria-live="off"`).  
  - SplitflapBoard: cycles messages (e.g. “NEELABH IS AVAILABLE FOR WORK”).  
  - CTA: “STATUS: BOARDING”, link “Book a flight with Neelabh →”.
- **Style:** Header dark (#1a1a1a), rounded top; split-flap uses CSS variables for tile size and flip duration.

### 5. Gate separator — “02 — DESTINATIONS”

### 6. Destinations / Work section (`#destinations`)

- **Role:** Project portfolio grid.
- **Layout:** `.scroll-section.section-alt.reveal.reveal-standard`, min height 100vh, padding 80px 1rem. Title “Destinations” + sub-label “Select your flight below”. `.project-grid`: 1 col default, 2 cols at ≥768px, max-width 1100px, gap 32px.
- **Content:** Four project cards (data in page): MIROOH, KULLVI WHIMS, TILFI, ROUTE UNDISCLOSED (placeholder). Each card: route (e.g. UX-01), title, status chip, type, year, description, “View flight details” + arrow. Placeholder card is disabled and muted.
- **Style:** Cards white, border #e0e0e0, border-radius 10px, padding 24px; hover lift and shadow; status chips green border or “coming soon” gray.

### 7. Gate separator — “03 — FLIGHT PATH”

### 8. Flight Path / Process section (`#flightpath`)

- **Role:** Design process as a “path”.
- **Layout:** `.scroll-section.reveal.reveal-standard`, min height 100vh, center, padding 80px 1rem. Title “Design Path”, sub-label “How I fly from brief to launch”.
- **Content:** `.flight-path-grid` (8 columns, 5 rows). SVG arc in grid: dashed curve with four blue dots. Four steps: DISCOVER, DEFINE, DESIGN, REFINE — each with number prefix (01.–04.), title, and short description. Steps laid out along the arc via grid-column/row.
- **Responsive:** At ≤767px grid becomes flex column; arc on top; titles/descriptions stack, with borders between.

### 9. Gate separator — “04 — BOARDING”

### 10. Boarding Pass / About section (`#boardingpass`)

- **Role:** Personal “boarding pass” — about + identity.
- **Layout:** Outer section `#boardingpass` has `.about-section`, `.section-soft`, `.reveal.reveal-narrative`. Background #edeae4; top/bottom gradients via `#boardingpass::before/::after` (120px height, white ↔ #edeae4). Inner content is `<BoardingPass />` (another section with `id="about"` and same warm background).
- **Content:** Section title “UX AIR BOARDING PASS”, sub-label “Here’s what you need to know about the passenger.” Then a tiltable wrapper containing `.boarding-pass-outer.boarding-pass-reveal` (slide-up reveal via IntersectionObserver). Card: two punches (top/bottom), ticket-main (blue gradient, route, meta, perforation edge) and ticket-stub (passenger, role, based in, status, barcode). Stub lifts on hover (outer or card). 3D tilt and glint on mouse move.

### 11. Gate separator — “05 — FINAL CALL”

### 12. Contact / Final Boarding Call section (`#contact`)

- **Role:** Last call to action and contact.
- **Layout:** `.scroll-section.reveal`, min height 100vh, center, padding 4rem 1rem, white. Inner wrapper `.reveal.reveal-narrative`, max-width 800px, padding 140px 0, text-align center.
- **Content:**  
  - Gate closing bar: label “GATE 05 · CLOSING”, track with 85% fill and `gatePulse` animation.  
  - Terminal label: “TERMINAL 01 · GATE 05 · FINAL BOARDING CALL”.  
  - LedBoard inside `.led-board-glow-wrapper` (radial glow ::before).  
  - Headline (Cardo 28px): “Last call. Gate closes when you close this tab.”  
  - Primary CTA: “COLLABORATE” mailto, black button, hover lift and shadow.  
  - Secondary links: Email, LinkedIn, Resume (flex, gap 22px).  
  - Status line: green `.status-dot` + “STATUS: AVAILABLE FOR PRODUCT DESIGN ROLES” in bordered pill.

### 13. Footer

- **Role:** “Runway” and closure.
- **Layout:** `<footer>` padding 64px 0 48px, #0B0B0B, center. Inner max-width 1000px, padding 0 24px.
- **Content:**  
  - “FLIGHT COMPLETE” in `.footer-stamp` (blue border, rotated -1.5deg).  
  - “Thanks for visiting the terminal.” (#888).  
  - Runway lights: 40 `.runway-light` spans, alternating yellow/red background, 8×8px, gap 10px, `runwayPulse` animation.  
  - “© 2026 Neelabh Srivastava”, “Terminal: Internet · Gate: UX”.  
  - `.footer-tail`: “REG: NEELABH-2026 · AIRCRAFT: PRODUCT DESIGN · CREW: 01”.

---

## SECTION 4 — COMPONENT BREAKDOWN

### PassportCard (inline in page.tsx)

- **Structure:** Wrapper with perspective 1200px; inner div ref for tilt; card div (border-radius 1rem, overflow hidden, multi-layer shadow); Next.js Image (passport1.jpg); glint overlay ref; `.passport-scan-line`.
- **Layout:** Width `min(498px, 92vw)`, centered by parent. Image block, full width, auto height.
- **Interactions:** `onMouseMove` / `onMouseLeave` drive 3D tilt (rotateX/Y ±18°, scale 1.03) and radial glint position/opacity. Tilt transition 0.5s cubic-bezier(0.23,1,0.32,1). Glint opacity 0.35s ease.
- **Animation:** `.passport-scan-line` — 3px gradient line, scanLine 1.1s ease-out 0.35s forwards (translateY -10% → 110%, opacity 0→1→0).

### BoardingPass (inline in page.tsx)

- **Structure:** Section with section-wrap; title and sub-label; perspective wrapper; tilt ref div; `.boarding-pass-outer.boarding-pass-reveal`; `.boarding-pass` grid (3fr 1.2fr); punches; `.ticket-main` (dot-grid, paper-texture, light-sweep, glint ref, content); `.perf-edge`; `.ticket-stub` (fields, barcode).
- **Layout:** Grid for main + stub; stub border-left dashed; punches absolutely positioned; outer scale 0.8. Responsive: at 900px grid becomes 1fr, stub border-top dashed, meta 2 cols, airport code 46px.
- **Interactions:** Same tilt/glint pattern as passport (±12°, scale 1.02). Stub: on `.boarding-pass-outer:hover` or `.boarding-pass:hover`, stub translates/rotates (translateX 6px, rotateY -6deg, translateZ 6px) and gets shadow; ticket-main::after shows a thin right-edge shadow.
- **Reveal:** `.boarding-pass-reveal` starts opacity 0, translateY 48px; when visible (IntersectionObserver) gets `.visible` → opacity 1, translateY 0, 0.9s ease.

### GateSeparator (inline in page.tsx)

- **Structure:** `.gate-separator` flex, two `.gate-separator-line` (flex:1, 1px #e0e0e0), center `.gate-separator-label` “GATE {gate}”.
- **Layout:** Max-width 1100px, margin auto, gap 20px, padding 0 40px. Label 10px, 0.3em spacing, #b0b0b0, uppercase.

### LedBoard (components/LedBoard.tsx)

- **Structure:** Wrapper ref (for width), canvas ref; optional outer chrome div with border-radius and shadow. Canvas has `role="img"`, `aria-label="LED Board"`.
- **Layout:** Wrapper 100% width, max-width 842px, scale(0.72). Chrome: padding 10px 14px, radial gradient + #111 background.
- **Behavior:** useEffect: measure wrapper width, set canvas size; pre-render strip of message “FINAL BOARDING CALL • ” (7×9 LED font, BG #050505, ON colors #fff/#e8e8e8/#d0d0d0, OFF rgba(255,255,255,0.08)); requestAnimationFrame loop scrolls strip left at 80px/s, seamless loop. Respects `prefers-reduced-motion` (static draw).
- **Hover (inline):** Chrome hover: deeper shadow and translateY(-2px), 0.4s ease.

### SplitflapBoard (components/SplitflapBoard.tsx)

- **Structure:** `.splitflap-wrapper` > `.splitflap-board` (ref); tiles are created in DOM by effect (div.splitflap-tile with .splitflap-tile-flap and front/back faces).
- **Layout:** Board inline-flex, gap 2px, padding 18px 20px 20px, background and shadow from CSS variables. Tile size from variables (desktop 30×52px; tablet 24×40px; mobile 14×24px).
- **Behavior:** Messages cycle every 9s. Each character flips with 1–3 random intermediate chars; stagger 45ms + random 25ms per tile; flip duration 280ms, cubic-bezier(0.32,0.72,0,1). `aria-label` updated with current message; `role="marquee"`, `aria-live="polite"`. Reduced motion: transition 0.05s.

### Navigation (header)

- **Structure:** Header > flex container > brand button + nav (three buttons). Each nav button: `.nav-link`, `.nav-link-prefix`, `.nav-link-main`. Brand includes `.brand-cursor`.
- **Layout:** Sticky, z-index 50, full width, inner max-width 1200px. Nav gap 32px.
- **Hover:** Nav link color to white; `::after` scaleX(1) for underline (transform-origin right → left). Brand cursor blinks (brand-blink 0.8s step-end infinite); disabled when `prefers-reduced-motion`.

### Project cards (destinations)

- **Structure:** `<a className="project-card">` (or project-card styling) with title row (route + title + status chip), metadata (ROUTE, type, year), divider, description, “View flight details” + arrow SVG. Placeholder variant: title + chip + description only, no link.
- **Layout:** Grid item; internal flex column. Chip inline-flex, flex-shrink 0.
- **Hover:** Card translateY(-6px), box-shadow; `.case-arrow` translateX(4px), 0.3s ease.

### Gate closing bar (contact)

- **Structure:** `.gate-closing-bar` flex, center, gap 16px; `.gate-closing-label`; `.gate-closing-track`; `.gate-closing-fill` (85% width, gatePulse animation).
- **Style:** Label 10px, #999; track 120×3px, #eee; fill #4C6EF5, border-radius 2px.

### LED board glow wrapper (contact)

- **Structure:** `.led-board-glow-wrapper` position relative; `::before` inset -20px, radial gradient rgba(76,110,245,0.08) → transparent 70%, border-radius 20px, pointer-events none.
- **Layout:** Flex center, margin-bottom 36px. LedBoard inside.

### Contact status line

- **Structure:** `.contact-status-line` inline-flex, gap 8px; `.status-dot` (green, status-pulse); span “STATUS: AVAILABLE…”.
- **Style:** 12px, 0.2em spacing, #1a1a1a, border 1px #e0e0e0, padding 10px 20px, border-radius 20px.

### Footer stamp and tail

- **Stamp:** `.footer-stamp` — 11px, 0.4em spacing, #4C6EF5 text and border, padding 6px 16px, border-radius 3px, opacity 0.7, rotate(-1.5deg).
- **Tail:** `.footer-tail` — 10px, 0.15em spacing, #444, margin-top 16px.

### Runway lights

- **Structure:** `.runway-lights-row` flex, center, gap 10px; 40× `.runway-light` spans with inline background (alternating #FACC15 / #F97373).
- **Style:** 8×8px, border-radius 50%, opacity 0.6, runwayPulse 3s ease-in-out infinite (opacity 0.25 ↔ 0.7).

### Terminal gate indicator (present in CSS, not in DOM)

- **CSS only:** `.terminal-indicator` fixed top 96px right 20px; list with `.active` state. JS for scroll-based active section is commented out in page.tsx, so the block is not rendered.

---

## SECTION 5 — ANIMATIONS

| Name | Trigger | Type | Duration | Easing | Implementation |
|------|--------|------|----------|--------|----------------|
| heroFadeUp | Page load (class on hero children) | opacity 0→1, translateY 16px→0 | 0.6s–0.95s (varies) | ease-out | CSS keyframes, animation-fill-mode forwards |
| identityStamp | After heroFadeUp (identity stamp) | scale 1.05→1, opacity 1→0.6→1 | 0.35s | ease-out | CSS keyframes |
| scanLine | After mount (passport) | translateY -10%→110%, opacity 0→1→0 | 1.1s | ease-out, delay 0.35s | CSS .passport-scan-line |
| Reveal (generic) | IntersectionObserver (threshold 0.18) | opacity, translateY(80px), blur(4px) → normal | 0.9s (1s narrative, 0.8s standard, 0.6s hero) | ease | CSS .reveal.visible transition |
| boarding-pass-reveal | Same observer | opacity 0→1, translateY 48px→0 | 0.9s | ease | CSS .boarding-pass-reveal.visible |
| brand-blink | Always (nav) | opacity 0↔1 | 0.8s loop | step-end | CSS .brand-cursor; off for prefers-reduced-motion |
| shimmer-sweep | Class .shimmer-text (if used) | background-position 200%→-200% | 1.4s loop | linear | CSS keyframes |
| Split-flap flip | JS cycle | rotateX 0→-180deg (flap) | 0.28s | cubic-bezier(0.32,0.72,0,1) | CSS .splitflap-tile-flap.splitflap-flipped |
| LED scroll | requestAnimationFrame | Horizontal offset of pre-rendered strip | Continuous ~80px/s | — | LedBoard.tsx |
| status-pulse | Always (status dot) | scale + box-shadow ring | 1.4s loop | ease-out | CSS .status-dot |
| runwayPulse | Always (footer lights) | opacity 0.25↔0.7 | 3s loop | ease-in-out | CSS .runway-light |
| gatePulse | Always (contact bar fill) | opacity 1↔0.5 | 3s loop | ease-in-out | CSS .gate-closing-fill |
| 3D tilt (passport/boarding) | mousemove / mouseleave | rotateX/Y, scale; glint position | 0.5s (tilt), 0.35s (glint) | cubic-bezier(0.23,1,0.32,1) / ease | JS inline transform |
| Stub hover | .boarding-pass-outer or .boarding-pass hover | translateX, rotateY, translateZ, box-shadow | 0.35s | ease | CSS transition |
| Nav underline | .nav-link hover | ::after scaleX(0)→1 | 0.3s | ease | CSS |
| Project card hover | .project-card hover | translateY(-6px), box-shadow; .case-arrow translateX(4px) | 0.2s / 0.3s | ease | CSS |
| COLLABORATE / LED chrome hover | Inline onMouseEnter/Leave | translateY(-2px), box-shadow | 0.2s / 0.4s | ease | Inline styles |

---

## SECTION 6 — USER INTERACTIONS

- **Header:**  
  - Brand button: click → `scrollTo("hero")` (smooth scroll).  
  - Nav buttons: click → `scrollTo("destinations")`, `scrollTo("about")`, `scrollTo("contact")`.  
  - Keyboard: CTA “Proceed to Departures” has onKeyDown Enter/Space → scrollTo("departures").

- **PassportCard / BoardingPass:**  
  - Mouse move: normalized position in rect drives tilt (rotateX/Y) and glint gradient position; requestAnimationFrame-throttled.  
  - Mouse leave: reset tilt and glint opacity.

- **Boarding pass stub:**  
  - Hover on card or outer wrapper: stub lifts (transform + shadow); ticket-main right edge shadow appears. No click.

- **Project cards:**  
  - Click: first three cards link to "#"; placeholder has no href and pointer-events none. Hover: lift and arrow shift.

- **Contact:**  
  - “COLLABORATE” mailto: default click.  
  - Email / LinkedIn / Resume: anchor clicks.  
  - Hover on CTA and links: color/transform/shadow (inline handlers).

- **LED board chrome:**  
  - Hover: shadow and translateY (inline).

- **Scroll:**  
  - Smooth scroll (html), scroll-snap on sections (scroll-snap-type y mandatory; scroll-snap-align start on .scroll-section).  
  - IntersectionObserver adds `.visible` to `.reveal` and `.boarding-pass-reveal` (once, then unobserve).

- **Terminal indicator:**  
  - Scroll-based active section logic exists in CSS and commented JS but the indicator block is not rendered.

---

## SECTION 7 — SCROLL EXPERIENCE

- **Smooth scroll:** `html { scroll-behavior: smooth; scroll-padding-top: 64px; }`. All “scroll to section” actions use `element.scrollIntoView({ behavior: 'smooth' })`.
- **Snap:** `scroll-snap-type: y mandatory` on html; `.scroll-section { scroll-snap-align: start }`. Sections and footer align to start when scrolling.
- **Reveal:** Elements with `.reveal` or `.boarding-pass-reveal` start hidden (opacity 0, translateY, optional blur). When they intersect viewport (threshold 0.18), they get `.visible` and transition to visible state. Variants: reveal-hero (0.6s), reveal-standard (0.8s), reveal-narrative (1s); boarding-pass 0.9s.
- **Narrative effect:** Sections are revealed as the user scrolls (blur-in, slide-up), supporting a step-by-step “journey” from passport → departures → destinations → path → boarding pass → final call → runway.

---

## SECTION 8 — RESPONSIVE DESIGN

- **Global section padding:** At max-width 640px, section padding 140px → 96px top/bottom.
- **Hero:** At 768px `.hero-line` gets white-space normal; at 640px hero line 22px, line-height 1.5, padding-inline 24px.
- **Split-flap:** 900px: tile 24×40px, smaller font, more padding. 600px: tile 14×24px, font 14px, reduced padding/gap. Reduced motion: flip 0.05s.
- **Project grid:** Default 1 column; at min-width 768px 2 columns.
- **Flight path:** At max-width 767px: grid → flex column; arc full width on top; titles/descriptions stack, left-aligned, with bottom borders.
- **Boarding pass:** At max-width 900px: grid 1fr (stub below main); stub border-top dashed instead of left; ticket-main padding reduced; airport code 46px; meta 2 columns; barcode bar 64px.
- **Gate separator / contact / footer:** No breakpoint-specific layout changes; rely on max-width and padding.
- **Reduced motion:** brand-cursor and split-flap duration reduced or disabled; LedBoard shows static frame when `prefers-reduced-motion: reduce`.

---

## SECTION 9 — MICRO-INTERACTIONS

- **3D tilt (passport + boarding pass):** Mouse position → rotateX/Y and scale; adds depth and “handling” feel.
- **Glint (passport + boarding pass):** Radial highlight follows cursor; mix-blend-mode screen, short opacity transition.
- **Stub lift:** Hover on card or outer → stub moves and tilts with shadow; perforation edge shadow on main.
- **Nav link underline:** Hover → line grows from right to left (scaleX).
- **Brand cursor blink:** Constant blink (except reduced motion).
- **Project card:** Hover lift + arrow slide right.
- **COLLABORATE button:** Hover lift and shadow.
- **LED chrome:** Hover lift and stronger shadow.
- **Contact links:** Hover color to #111.
- **Status dot:** Continuous pulse (scale + expanding ring).
- **Runway / gate-closing bar:** Continuous opacity pulse for “live” feel.

---

## SECTION 10 — EASTER EGGS / SPECIAL FEATURES

- **Terminal gate indicator:** Implemented in CSS and partially in commented JS (IntersectionObserver for section ids, active class on list items). Not rendered in the current page (commented out), so no visible sidebar indicator.
- **Shimmer text:** `.shimmer-text` and `shimmer-sweep` keyframes exist in CSS; no usage found in page or components.
- **Reduced motion:** All motion (blink, flip, runway, gate pulse, LED scroll) is either shortened or disabled when `prefers-reduced-motion: reduce`; LED board shows one static frame.
- **Live clock:** Departures header shows current time (24h), updated every second via setInterval.
- **LED message:** Single message “FINAL BOARDING CALL • ”; content is fixed in LedBoard.tsx.
- **Split-flap messages:** Fixed array of five strings; cycles every 9s with random intermediate characters per tile.

No keyboard shortcuts or hidden clicks are documented beyond the CTA Enter/Space.

---

## SECTION 11 — DESIGN NARRATIVE

The site is structured as a single “trip” through a terminal:

1. **Passport (Hero)** — Identity verified; who the person is.  
2. **Departures** — Boarding status and availability (split-flap + clock).  
3. **Destinations** — “Flights” = projects; select a flight.  
4. **Flight Path** — How the designer “flies” from brief to launch (process).  
5. **Boarding Pass** — Passenger details and role (about).  
6. **Final Boarding Call** — Last call to collaborate; gate closing bar and LED.  
7. **Runway (Footer)** — Flight complete; runway lights and tail number.

Gate separators (“GATE 01 — DEPARTURES”, etc.) act as section dividers and reinforce the airport metaphor. Typography (mono for “system”/terminal, Cardo for key lines) and color (#4C6EF5, greens for status) tie sections together. Scroll reveal and smooth snap make the scroll feel like a linear narrative. The boarding pass and LED/split-flap are the most literal “airport” objects; the rest use the same language (gates, routes, status, terminal) to keep the metaphor consistent.

---

## SECTION 12 — FINAL SUMMARY

The portfolio is a **single-page Next.js (App Router) client application** that presents a product designer’s identity and work as an **airport/travel journey**. All content lives in one scrollable page with a sticky header, six main content sections plus gate separators, and a dark footer with runway lights.

**Experience:** The user lands on a hero with a passport-style card and tagline, then scrolls through departures (split-flap board), destinations (project grid), flight path (process arc), boarding pass (about card with 3D and stub hover), and final call (contact with LED board and CTA). Footer closes with “FLIGHT COMPLETE” and a tail number. Smooth scroll and scroll-snap keep the flow controlled; reveal animations (blur/slide) and hover micro-interactions (tilt, stub lift, underlines) add polish without overwhelming.

**Motion and layout:** Motion supports the narrative by revealing content on scroll (IntersectionObserver), by giving key objects (passport, boarding pass) a tactile 3D response, and by keeping “system” elements (LED, split-flap, runway, gate bar) in gentle motion. Layout is section-based with consistent max-widths and spacing; the boarding pass and flight path switch to stacked layouts on smaller screens.

**System cohesion:** One global CSS file and a small set of components (LedBoard, SplitflapBoard) plus inline sections (BoardingPass, PassportCard, GateSeparator) share the same design tokens (IBM Plex, Cardo, Inter; #4C6EF5; spacing and radius scales). The same reveal mechanism and hover patterns (underline, lift, tilt) repeat across nav, cards, and CTA. The result is a single, document-like experience that a developer can rebuild from this specification and the existing codebase.
