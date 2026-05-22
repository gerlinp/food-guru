# Brand spec — The Hungry Guru

Extracted from `styles.css`, `index.html`, and site screenshots.

## Palette (OKLch)

```css
:root {
  --bg:      oklch(98% 0.004 80);   /* #faf5ec  cream canvas */
  --surface: oklch(100% 0 0);        /* #ffffff  cards, inputs */
  --fg:      oklch(20% 0.018 250);   /* #0e1a2f  navy/ink — body + heading */
  --muted:   oklch(38% 0.012 250);   /* #485468  secondary text */
  --border:  oklch(88% 0.02 85);     /* #e3d8bd  lines, dividers */
  --accent:  oklch(52% 0.10 28);     /* #f0631c  orange — CTAs, highlights */
  --accent-hover: oklch(46% 0.10 28); /* #e5571a */
  --accent-tint:  oklch(94% 0.04 28); /* #fbe3d2 */
  --navy-2:  oklch(14% 0.02 250);    /* #16243d  dark surface */
  --navy-3:  oklch(18% 0.025 250);   /* #1f3055 */
}
```

## Typography

- **Display:** `'Newsreader', Georgia, serif` — italic available for emphasis
- **Body:** `'Geist', -apple-system, system-ui, sans-serif`
- **Mono:** `'Geist Mono', ui-monospace, monospace`
- Headlines: 400–500 weight, tight letter-spacing (-0.02 to -0.015em)

## Posture

- Editorial-meets-warm: serif display headlines anchor each section; system sans body keeps the reading comfortable
- Cream background (`--bg`) is the default canvas — never white pages
- Rounded corners 12–24px on cards, buttons 999px
- No box-shadows — `border: 1px solid var(--border)` does the separation
- Single accent color (orange) used sparingly on CTAs, highlights, and stats; never flood the page with it
- Navy backgrounds (`--fg` or `--navy-2`) for dark sections / emphasis zones; cream text on dark
- Orange accent should appear at most twice per viewport section
- Chips, segmented controls, and badge-style filters for interactive selection
- Generous whitespace between sections, tight inside cards
