# Architecture Guide

This project follows a **Domain-Driven Feature Architecture** designed for high modularity, maintainability, and scalability.

```
src/
├── app/                              # Next.js App Router (pages, layout, globals.css)
│   ├── globals.css                   # Global Tailwind v4 design tokens and CSS variables
│   ├── layout.tsx                    # Root layout with font, theme, smooth scroll & tooltip providers
│   └── page.tsx                      # Primary landing page assembling feature sections
├── components/
│   ├── common/                       # Shared cross-cutting components (e.g. ThemeToggle)
│   ├── providers/                    # React context providers (Theme, SmoothScroll)
│   ├── sections/                     # Backward-compatible re-exports for sections
│   └── ui/                           # shadcn UI atomic primitives (Button, Card, Dialog, Badge...)
├── features/
│   ├── itinerary/                    # "The Itinerary" travel pinboard domain
│   │   ├── components/               # PeggedCard, TravelCard, AirplaneTicket, Mementos, Icons
│   │   ├── data/                     # Stops dataset, tilt angles, swipe constants
│   │   ├── textures/                 # SVG data URIs (wood grain, cork mottle, wall plaster)
│   │   ├── types.ts                  # Domain types (Stop)
│   │   ├── itinerary-section.tsx     # High-level section orchestrator
│   │   └── index.ts                  # Public feature barrel export
│   ├── membership/                   # "Meridian Access" membership pass domain
│   │   ├── components/               # CardCarousel, MembershipCard, Emblem
│   │   ├── data/                     # Destination passes dataset
│   │   ├── types.ts                  # Domain types (DestinationCard, EmblemKey)
│   │   ├── membership-section.tsx    # Hero + interactive pass deck section
│   │   ├── carousel-section.tsx      # Standalone card carousel section
│   │   └── index.ts                  # Public feature barrel export
│   └── showcase/                     # Blank canvas & typography hierarchy showcase
│       ├── blank-canvas-section.tsx  # Verification and starter slot dropzones
│       └── index.ts                  # Public feature barrel export
└── lib/                              # Shared utility helpers (cn, twMerge)
```

## Architectural Guidelines

### 1. Feature Encapsulation
Each domain in `src/features/<feature-name>` encapsulates its own:
- **`components/`**: UI components specific to that feature
- **`data/`**: Static datasets, configuration, and thresholds
- **`types.ts`**: TypeScript interfaces and types
- **`index.ts`**: Explicit public API barrel export

External consumers should import from `@/features/<feature-name>` rather than reaching into private nested files.

### 2. Design System & UI Primitives
- Shared UI primitives live in `src/components/ui/` (managed with shadcn conventions).
- Never use raw native HTML elements (`<button>`, `<input>`, `<select>`) when a component is present in `src/components/ui/`.
- Never hardcode color hex codes or inline styling in components—always reference design tokens defined in `src/app/globals.css`.

### 3. Separation of Concerns
- Avoid monolithic files. Large animations, SVG clip paths, textures, and child components should be broken into focused sub-modules under `components/` and `data/`.
- Section files serve as coordinators / orchestrators, keeping them concise and easy to read.
