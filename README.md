# Next.js Landing Page Starter Template

A production-ready Next.js App Router starter template designed for building high-converting, aesthetically refined landing pages with speed and precision.

## 🚀 Tech Stack

- **Runtime & Package Manager**: [Bun](https://bun.sh/) 1.3+
- **Framework**: [Next.js](https://nextjs.org/) 16 App Router (React 19)
- **Language**: TypeScript 5
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/postcss` & `tw-animate-css`
- **Design System**: Fully tokenized CSS custom variables with clean light-first neutral aesthetic & dark mode parity
- **Typography**: [Satoshi](https://www.fontshare.com/fonts/satoshi) webfont family (Light 300, Regular 400, Medium 500/600, Bold 700, Black 900) served locally
- **Icons**: [Hugeicons](https://hugeicons.com/) (`hugeicons-react`, `@hugeicons/react`)
- **Motion & Interaction**: Creative animation suite consisting of [GSAP](https://greensock.com/gsap/) (`@gsap/react`), [Lenis](https://lenis.darkroom.engineering/) smooth scroll, and [Motion](https://motion.dev/)
- **UI Kit**: Essential [shadcn UI](https://ui.shadcn.com/) primitives (`Button`, `Badge`, `Card`, `Dialog`, `Sheet`, `DropdownMenu`, `Input`, `Separator`, `Tooltip`)

---

## 📁 Project Structure

```
next-starter/
├── public/
│   └── fonts/
│       └── satoshi/                 # Local Satoshi webfonts (.woff2, .woff, .ttf)
├── src/
│   ├── app/
│   │   ├── globals.css              # Design tokens, Tailwind v4 theme, Satoshi font-faces, Lenis CSS
│   │   ├── layout.tsx               # Root layout loading Satoshi font, ThemeProvider, SmoothScroll
│   │   └── page.tsx                 # Home page rendering BlankCanvasSection
│   ├── components/
│   │   ├── providers/
│   │   │   ├── theme-provider.tsx   # next-themes wrapper
│   │   │   └── smooth-scroll-provider.tsx # Lenis + GSAP ticker synchronization
│   │   ├── sections/
│   │   │   └── blank-canvas-section.tsx # Starter section with typography scale & slot dropzones
│   │   ├── theme-toggle.tsx         # Hydration-safe light/dark mode switch with Hugeicons
│   │   └── ui/                      # shadcn UI components kit
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       └── tooltip.tsx
│   └── lib/
│       └── utils.ts                 # cn() utility helper (clsx + tailwind-merge)
├── components.json                  # shadcn CLI configuration
├── eslint.config.mjs                # ESLint 9 Flat Config
├── next.config.ts                   # Next.js config
├── postcss.config.mjs               # Tailwind v4 PostCSS config
├── tsconfig.json                    # Strict TypeScript configuration
└── package.json
```

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
bun install
```

### 2. Start the Development Server
```bash
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Lint
```bash
bun run build
bun run lint
```

---

## 🎨 Design System & Styling Rules

- **Zero Hardcoded Colors**: Always use semantic design tokens (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `bg-primary`, `text-primary-foreground`, `text-muted-foreground`, etc.).
- **Typography Scale**: The default font is Satoshi (`font-sans`), loaded locally for instant LCP with zero external CDN dependencies.
- **Icons**: Import icons directly from `hugeicons-react`:
  ```tsx
  import { ArrowRight01Icon, Layers01Icon } from "hugeicons-react";
  ```
- **Drop in New Sections**: The starter includes modular wireframe slots in `src/components/sections/blank-canvas-section.tsx`. You can replace the placeholder slots or add new sections under `src/components/sections/`.
