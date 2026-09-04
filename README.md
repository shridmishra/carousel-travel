<!-- prettier-ignore -->
<div align="center">

<img src="src/app/icon.svg" alt="Project Logo" width="64" height="64" />

# Next.js Creative Landing Starter

A production-ready Next.js 16 and React 19 starter template engineered for high-converting, craft-focused landing pages with tactile physics, procedural sound, and domain-driven feature architecture.

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.3+-fbf0df?style=flat-square&logo=bun&logoColor=black)](https://bun.sh/)

[Features](#features) • [Tech Stack](#tech-stack) • [Interactive Domains](#interactive-domains) • [Project Architecture](#project-architecture) • [Getting Started](#getting-started) • [Design System](#design-system--engineering-rules) • [Scripts](#available-scripts)

</div>

---

## Features

- **Domain-Driven Feature Architecture**: High modularity with self-contained feature domains (`src/features/*`) isolating components, datasets, audio engines, types, and explicit barrel exports.
- **Tactile Travel Pinboard ("The Itinerary")**: Photo-realistic pegged travel cards, clothesline rope physics, draggable reordering (`Reorder.Group`), boarding ticket reveals, and procedural SVG textures.
- **Procedural Web Audio Engine**: Zero-asset, zero-latency physical sound synthesis (card slides, 3D flips, wooden peg snaps, deck shuffles, and perforated ticket tears) synthesized natively via the Web Audio API.
- **Interactive 3D Membership Deck ("Meridian Access")**: Smooth perspective carousel showcasing destination passes with procedural guilloche line art, vector emblems, and responsive interactions.
- **Zero-CLS Local Typography**: Complete [Satoshi](https://www.fontshare.com/fonts/satoshi) webfont family (weights 300 to 900) served locally via `next/font/local` for instant LCP with zero external CDN dependencies.
- **Kinetic Motion & Interaction Suite**: Smooth scroll engine powered by [Lenis](https://lenis.darkroom.engineering/), coordinated with [GSAP](https://greensock.com/gsap/) (`@gsap/react`) tickers and [Motion](https://motion.dev/) spring physics.
- **Strict Tokenized Design System**: Zero hardcoded hex codes or arbitrary values. Native Tailwind CSS v4 variables with full theme parity and hydration safety via `next-themes`.
- **Accessible UI Kit**: Ready-to-use primitives adapted from [shadcn UI](https://ui.shadcn.com/) (`Button`, `CTAButton`, `Card`, `Badge`, `Dialog`, `Sheet`, `DropdownMenu`, `Input`, `Separator`, `Tooltip`).
- **SEO & Structured Data**: Built-in JSON-LD schemas (`Organization`, `WebSite`), dynamic viewport theme color, metadata fallbacks, and OpenGraph/Twitter card configurations.
- **Craft-Focused Aesthetics**: Designed with intentional analog restraint—no generic AI sparkle glyphs or placeholder gimmicks.

---

## Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Server Components & Static Site Generation |
| **Library** | [React 19](https://react.dev/) | Modern concurrent React primitives |
| **Runtime / Package Manager** | [Bun](https://bun.sh/) | Fast JavaScript runtime and package manager |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type checking with path aliases |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | High-performance CSS engine with `@tailwindcss/postcss` & `tw-animate-css` |
| **Motion & Physics** | [Motion](https://motion.dev/) + [GSAP](https://greensock.com/gsap/) | Physical spring gestures, layout animations, and timeline controls |
| **Audio** | [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | Procedural synthesizer for paper, wood, and tear acoustics |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) | Normalized smooth scrolling synchronized to GSAP's central ticker |
| **Icons** | [Hugeicons](https://hugeicons.com/) + [Lucide](https://lucide.dev/) | Vector icon libraries |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) | Unstyled, accessible component primitives |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) | System-aware dark and light mode provider |

---

## Interactive Domains

### 1. The Itinerary (`src/features/itinerary`)
An analog-inspired journey planner modeling physical desk artifacts:
- **Draw Pile**: Swipe or tap the top card with inertia and spring drag physics (`dragElastic`, velocity detection).
- **3D Card Flip**: Spotlight inspect state with realistic 3D perspective flip.
- **Clothesline Pinboard**: Cards snap to an SVG rope suspended with wooden pegs; drag any peg to reorder the sequence horizontally.
- **Airplane Ticket**: Full completion triggers an animated flight ticket with perforated edges, tear-away action, and deck reset.
- **Web Audio Soundscape**: Procedurally generates sound effects with zero external audio assets (pink noise filtering, bandpass curves, and gain ramps). Includes a fixed viewport sound toggle button.

### 2. Meridian Access (`src/features/membership`)
A 3D perspective card deck demonstrating tier and destination discovery:
- **Perspective Carousel**: Layered depth transforms, active card elevation, and smooth carousel navigation.
- **Vector Guilloche Patterns**: High-detail SVG background security linework and destination emblems.
- **State Synchronized Content**: Dynamic destination tags, regional details, and access metrics.

---

## Project Architecture

The codebase follows a modular feature-sliced architecture that keeps domain logic self-contained while reusing shared atomic primitives:

```
next-starter/
├── public/
│   ├── fonts/
│   │   └── satoshi/                 # Local Satoshi font files (.woff2, .woff, .ttf)
│   └── images/
│       └── itinerary/               # Optimized WebP destination photography
├── src/
│   ├── app/
│   │   ├── globals.css              # Design tokens, Tailwind v4 theme, font-face rules
│   │   ├── layout.tsx               # Root layout, fonts, providers, JSON-LD metadata
│   │   ├── page.tsx                 # Main landing page composition
│   │   ├── robots.ts                # Dynamic robots.txt configuration
│   │   ├── sitemap.ts               # Dynamic XML sitemap generator
│   │   └── icon.svg                 # Application favicon and mark
│   ├── components/
│   │   ├── common/                  # Shared utility widgets (ThemeToggle)
│   │   ├── providers/               # Context providers (Theme, SmoothScroll)
│   │   ├── sections/                # Re-exports for landing page sections
│   │   └── ui/                      # Atomic primitives (Button, Card, Dialog, Badge...)
│   ├── features/
│   │   ├── itinerary/               # "The Itinerary" travel pinboard domain
│   │   │   ├── components/          # PeggedCard, TravelCard, AirplaneTicket, Mementos
│   │   │   ├── data/                # Stops dataset, tilt angles, swipe constants
│   │   │   ├── sound/               # Procedural Web Audio engine & sound hooks
│   │   │   ├── textures/            # Procedural SVG textures (wood, cork, plaster)
│   │   │   ├── types.ts             # Domain TypeScript interfaces
│   │   │   ├── itinerary-section.tsx# Main section orchestrator
│   │   │   └── index.ts             # Public barrel export
│   │   ├── membership/              # "Meridian Access" membership pass domain
│   │   │   ├── components/          # CardCarousel, MembershipCard, Emblem
│   │   │   ├── data/                # Destination pass datasets and configurations
│   │   │   ├── types.ts             # DestinationCard and Emblem types
│   │   │   ├── membership-section.tsx # Hero + interactive pass deck section
│   │   │   ├── carousel-section.tsx # Standalone carousel view
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
> External consumers should always import domain features through their public barrel export (e.g. `import { ItinerarySection } from "@/features/itinerary";`) rather than reaching into nested private files.

---

## Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) (v1.3 or later) installed. You can also use Node.js 20+ with npm, pnpm, or yarn.

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

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Production Build & Verification

```bash
bun run build
bun run lint
```

---

## Design System & Engineering Rules

To maintain high visual craft and design consistency across all additions, this project adheres to strict frontend principles:

### 1. Zero Hardcoded Colors

> [!IMPORTANT]
> Never use hardcoded color values (hex codes like `#ffffff`, `rgb(...)`, inline styles, or arbitrary Tailwind values like `bg-[#08080a]`) inside component files. Always use semantic design tokens defined in `src/app/globals.css`.

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

If styling modifications are required, pass `className` overrides, add props, or extend component variants directly in `src/components/ui/`.

### 3. No Sparkle or Generative AI Star Glyphs

> [!CAUTION]
> Never use sparkle icons, generative AI stars, or multi-point sparkle glyphs (`Sparkles`, `Sparkle`, `Stars`, `WandSparkles`) anywhere in UI components or marketing sections.

### 4. Smooth Scroll & Animation Synchronization

> [!TIP]
> Lenis smooth scroll and GSAP animations are coordinated in `src/components/providers/smooth-scroll-provider.tsx` through GSAP's central ticker. When creating scroll-driven GSAP triggers, use standard ScrollTrigger instances without creating redundant requestAnimationFrame listeners.

---

## Available Scripts

| Command | Action |
| :--- | :--- |
| `bun run dev` | Starts the Next.js development server at `localhost:3000` |
| `bun run build` | Builds the optimized production application with TypeScript checks |
| `bun run start` | Serves the production build locally |
| `bun run lint` | Runs ESLint 9 checks across all source files |
