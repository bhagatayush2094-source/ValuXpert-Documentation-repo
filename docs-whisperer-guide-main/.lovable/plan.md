## ValuxPert Documentation Site

A clean, Stripe-inspired single-page documentation site for ValuxPert with a left sidebar, top search bar, right-hand table of contents, and dark mode toggle.

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ValuxPert Docs    [ 🔍 Filter sections... ]      🌙  v1.0  │  ← sticky header
├──────────────┬──────────────────────────────────┬───────────┤
│  Sidebar     │  Content (scroll)                │  On this  │
│              │                                  │  page     │
│ 1 Intro      │  # Introduction                  │ • What is │
│ 2 Getting    │  ...                             │ • Who for │
│   Started    │                                  │ • What    │
│ 3 Company    │  # Getting Started               │           │
│ 4 Staff      │  ...                             │           │
│ 5 Admin      │                                  │           │
│ 6 Roles      │                                  │           │
│ 7 Trouble.   │                                  │           │
│ 8 FAQ        │                                  │           │
│ 9 Glossary   │                                  │           │
│ 10 Support   │                                  │           │
└──────────────┴──────────────────────────────────┴───────────┘
```

### Visual direction (Stripe-like clean)
- Palette: white `#ffffff` bg, soft `#f6f9fc` panels, deep navy `#0a2540` text, indigo `#635bff` accent. Dark mode: near-black bg, light text, same indigo.
- Typography: Inter for body, slightly tighter tracking on headings, generous line-height (1.7) for readability.
- Subtle borders (`#e6ebf1`), no heavy shadows. Rounded `0.5rem`. Code/inline emphasis chips in muted indigo.
- Smooth scroll, scroll-margin so anchors land below sticky header.

### Functionality
- **Single long-scroll page** with anchor IDs for each of the 10 sections (`#introduction`, `#getting-started`, …).
- **Left sidebar**: numbered section list, active section highlighted as you scroll (IntersectionObserver). Collapsible on mobile via a hamburger.
- **Top search**: filters the sidebar list in real time by section title and subheading keywords; non-matches dim out. No backend.
- **Right TOC ("On this page")**: shows subheadings of the currently active section, hidden on smaller screens.
- **Dark mode toggle** in header, persisted to `localStorage`, respects `prefers-color-scheme` on first visit.
- Tables (Dashboard overview, Roles & Permissions, Glossary) rendered as styled `<table>` with zebra rows.
- Callouts (Forgot password, Note on cancellation, etc.) rendered as left-bordered info blocks.

### Content
All 10 sections ported verbatim from the uploaded PDF: Introduction, Getting Started, Company Setup, Staff Management, Admin & Settings, Roles & Permissions, Troubleshooting, FAQ, Glossary, Contact & Support.

### Technical notes
- TanStack Start, single route `src/routes/index.tsx` rendering the docs shell.
- New components: `DocsSidebar`, `DocsHeader` (search + theme toggle), `DocsTOC`, `Callout`, plus a `docs-content.tsx` data module listing sections + subheadings (drives sidebar, TOC, and rendered content from one source of truth).
- Tailwind v4 tokens added to `src/styles.css` (`--color-bg`, `--color-panel`, `--color-ink`, `--color-accent`, etc.) with `@theme inline` mapping; dark mode via `@custom-variant dark (&:where(.dark, .dark *))` and a `.dark` class on `<html>`.
- Inter loaded via `@fontsource/inter`.
- `head()` metadata on the index route: title "ValuxPert Documentation", description, OG tags.
- No backend, no Lovable Cloud needed.

### Out of scope
Multi-page routes, full-text fuzzy search, copy-link anchors, prev/next nav, auth, billing UI — can be added later.
