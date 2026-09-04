<!-- prettier-ignore -->
<div align="center">

<img src="src/app/icon.svg" alt="Project Logo" width="64" height="64" />

# Next.js Creative Landing Starter

A production-ready Next.js 16 and React 19 starter template designed for building high-converting, aesthetically refined landing pages with domain-driven feature architecture.

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.3+-fbf0df?style=flat-square&logo=bun&logoColor=black)](https://bun.sh/)

[Features](#features) • [Tech Stack](#tech-stack) • [Project Architecture](#project-architecture) • [Getting Started](#getting-started) • [Design System](#design-system--styling-rules) • [Scripts](#available-scripts)

</div>

---

## Features

- **Domain-Driven Feature Architecture**: High modularity with self-contained feature domains (`src/features/*`) housing isolated components, datasets, TypeScript types, and explicit barrel exports.
- **Interactive 3D Membership Deck ("Meridian Access")**: Perspective carousel showcasing multi-destination passes with vector guilloche patterns, geometric SVG emblems, and fluid state transitions.
- **Tactile Travel Pinboard ("The Itinerary")**: Photo-realistic pegged cards, flight boarding tickets with dynamic barcodes, draggable mementos, vintage stamps, and SVG background textures.
- **Zero-CLS Local Typography**: Complete [Satoshi](https://www.fontshare.com/fonts/satoshi) webfont family (weights 300 through 900) served locally via `next/font/local` for instant LCP with zero CDN dependencies.
- **Kinetic Motion & Interaction Suite**: Smooth scroll engine powered by [Lenis](https://lenis.darkroom.engineering/), synchronized with [GSAP](https://greensock.com/gsap/) (`@gsap/react`), alongside [Motion](https://motion.dev/) for gestures.
- **Strict Tokenized Design System**: Zero hardcoded hex colors or inline styles. Native Tailwind CSS v4 variables with full light/dark theme parity and hydration safety via `next-themes`.
- **Accessible UI Kit**: Ready-to-use primitives adapted from [shadcn UI](https://ui.shadcn.com/) (`Button`, `CTAButton`, `Card`, `Badge`, `Dialog`, `Sheet`, `DropdownMenu`, `Input`, `Separator`, `Tooltip`).
- **SEO & Structured Data**: Built-in JSON-LD schemas (`Organization`, `WebSite`), dynamic viewport theme color, metadata fallbacks, and OpenGraph/Twitter card configurations.
- **Refined Aesthetics**: Designed with restraint and intention—no generic AI sparkle glyphs or placeholder gimmicks.

---

## Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Server Components & Static Site Generation |
| **Library** | [React 19](https://react.dev/) | Modern concurrent React primitives |
| **Runtime / Package Manager** | [Bun](https://bun.sh/) | Ultra-fast JS runtime and package manager |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type checking with custom path aliases |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Next-generation engine with `@tailwindcss/postcss` & `tw-animate-css` |
| **Motion** | [GSAP](https://greensock.com/gsap/) + [Motion](https://motion.dev/) | High-performance animation timelines and physical spring gestures |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) | Normalized smooth scrolling synced to GSAP's ticker |
| **Icons** | [Hugeicons](https://hugeicons.com/) + [Lucide](https://lucide.dev/) | Clean vector icon libraries |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) | Unstyled, accessible component foundations |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) | System-aware dark and light mode provider |

---

## Project Architecture

The codebase follows a modular feature-sliced architecture that separates domain logic from shared atomic components:

```
next-starter/
├── public/
│   ├── fonts/
│   │   └── satoshi/                 # Local Satoshi font files (.woff2, .ttf)
│   └── images/
│       └── itinerary/               # Optimized WebP photography assets
├── src/
│   ├── app/
│   │   ├── globals.css              # Design tokens, Tailwind v4 theme, font-face rules
│   │   ├── layout.tsx               # Root layout, fonts, providers, JSON-LD metadata
│   │   ├── page.tsx                 # Main landing page composition
│   │   ├── robots.ts                # Dynamic robots.txt configuration
│   │   ├── sitemap.ts               # Dynamic XML sitemap generator
│   │   └── icon.svg                 # Application favicon and mark
│   ├── components/
│   │   ├── common/                  # Shared utility widgets (e.g. ThemeToggle)
│   │   ├── providers/               # App-wide context providers (Theme, SmoothScroll)
│   │   ├── sections/                # Re-exports for landing page sections
│   │   └── ui/                      # shadcn UI atomic primitives (Button, Card, Dialog...)
│   ├── features/
│   │   ├── itinerary/               # "The Itinerary" travel pinboard domain
│   │   │   ├── components/          # PeggedCard, TravelCard, AirplaneTicket, Mementos
│   │   │   ├── data/                # Itinerary stops and pinboard layout constants
│   │   │   ├── textures/            # Procedural SVG data URIs (wood, cork, plaster)
│   │   │   ├── types.ts             # Domain TypeScript interfaces
│   │   │   ├── itinerary-section.tsx# High-level section orchestrator
│   │   │   └── index.ts             # Public barrel export
│   │   ├── membership/              # "Meridian Access" membership pass domain
│   │   │   ├── components/          # CardCarousel, MembershipCard, Emblem
│   │   │   ├── data/                # Destination pass datasets and configurations
│   │   │   ├── types.ts             # DestinationCard and Emblem types
│   │   │   ├── membership-section.tsx # Section orchestrator
│   │   │   └── index.ts             # Public barrel export
│   │   └── showcase/                # Visual verification & typography hierarchy
│   │       ├── blank-canvas-section.tsx
│   │       └── index.ts
│   └── lib/
│       └── utils.ts                 # cn() utility helper (clsx + tailwind-merge)
├── components.json                  # shadcn UI CLI configuration
├── eslint.config.mjs                # ESLint 9 configuration
├── next.config.ts                   # Next.js configuration
├── postcss.config.mjs               # PostCSS configuration
├── tsconfig.json                    # Strict TypeScript configuration
└── package.json
```

> [!NOTE]
> External consumers should always import domain features through their public barrel export (e.g. `import { MembershipSection } from "@/features/membership";`) rather than reaching into nested private files.

---

## Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) (v1.3 or later) installed. Alternatively, you can use Node.js 20+ with npm, pnpm, or yarn.

### 1. Clone & Install

```bash
git clone https://github.com/shridmishra/next-starter.git
cd next-starter
bun install
```

### 2. Start Development Server

```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to explore the starter.

### 3. Production Build & Linting

```bash
bun run build
bun run lint
```

---

## Design System & Styling Rules

To maintain high code quality and design consistency, this project adheres to strict frontend principles:

### 1. Zero Hardcoded Colors

> [!IMPORTANT]
> Never use hardcoded color values (hex codes like `#ffffff`, `rgb(...)`, inline styles, or arbitrary values like `bg-[#08080a]`) inside component files. Always use semantic design tokens defined in `src/app/globals.css`.

Common tokens include:
- Backgrounds: `bg-background`, `bg-card`, `bg-popover`, `bg-muted`, `bg-primary`, `bg-secondary`
- Text: `text-foreground`, `text-card-foreground`, `text-muted-foreground`, `text-primary-foreground`
- Borders: `border-border`, `border-input`

### 2. Mandatory UI Primitive Reuse

Never render raw native HTML elements (such as `<button>`, `<input>`, or `<select>`) when a corresponding component exists in `src/components/ui/`.

```tsx
// ❌ Avoid raw HTML elements
<button className="px-4 py-2 bg-black text-white">Click</button>

// ✅ Always use UI primitives
import { Button } from "@/components/ui/button";

<Button variant="default" size="default">Click</Button>
```

If styling modifications are required, customize props, extend component variants in `src/components/ui/`, or supply `className` overrides.

### 3. Smooth Scroll Synchronization

> [!TIP]
> Lenis smooth scroll and GSAP animations are coordinated in `src/components/providers/smooth-scroll-provider.tsx` through GSAP's central ticker. When creating scroll-driven GSAP triggers, use standard ScrollTrigger instances without creating redundant animation frame listeners.

---

## Available Scripts

| Command | Action |
| :--- | :--- |
| `bun run dev` | Starts the Next.js development server at `localhost:3000` |
| `bun run build` | Builds the optimized production application |
| `bun run start` | Serves the production build locally |
| `bun run lint` | Runs ESLint 9 checks across all source files |
