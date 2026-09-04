"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Layers01Icon,
  ArrowRight01Icon,
  CodeIcon,
  Tick02Icon,
  CommandLineIcon,
  PlusSignIcon,
  Folder01Icon,
} from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme-toggle";

const TECH_STACK_TAGS = [
  "Bun 1.3",
  "Next.js App Router",
  "TypeScript",
  "Tailwind CSS v4",
  "shadcn UI",
  "Satoshi Font",
  "Hugeicons",
  "GSAP + Lenis + Motion",
];

export function BlankCanvasSection() {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText("bun run dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen w-full bg-background px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24">
      {/* Background Subtle Grid Texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      <div className="relative mx-auto max-w-5xl space-y-16">
        {/* Navigation & Status Header */}
        <header className="flex items-center justify-between border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-xs">
              <Layers01Icon className="size-5" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-foreground">
                NEXT-STARTER
              </span>
              <p className="text-xs text-muted-foreground">
                Landing Page Starter Template
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="hidden sm:inline-flex gap-1.5 py-1">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Starter Ready
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                Clean slate configured for rapid page generation
              </TooltipContent>
            </Tooltip>
            <ThemeToggle />
          </div>
        </header>

        {/* Section 1: Typography Hierarchy (Satoshi Showcase) */}
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 font-mono uppercase tracking-wider text-xs">
              Design System // Satoshi Typography Hierarchy
            </Badge>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              [Display Headline — 900 Black]
            </p>
            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              High-performance landing pages built with Satoshi.
            </h1>
          </motion.div>

          <div className="grid gap-6 border-l-2 border-border pl-4 sm:pl-6 md:grid-cols-2">
            <div className="space-y-2">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                [H1 Headline — 700 Bold]
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Precision Typography for Modern Interfaces
              </h2>
              <p className="text-sm text-muted-foreground">
                Clear hierarchy, balanced leading, and consistent scale using local Satoshi webfonts.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                [H2 Subtitle — 500 Medium]
              </p>
              <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                Full Dark Mode & Tokenized Styling
              </h3>
              <p className="text-sm text-muted-foreground">
                Zero hardcoded colors. Everything is bound to semantic CSS variables with smooth transitions.
              </p>
            </div>
          </div>

          {/* Body & Micro-Copy Showcase */}
          <div className="grid gap-4 rounded-xl border border-border bg-card p-6 shadow-xs sm:grid-cols-3">
            <div className="space-y-1.5">
              <p className="font-mono text-xs font-semibold uppercase text-muted-foreground">
                Lead Body (18px)
              </p>
              <p className="text-base text-foreground font-medium">
                Speed-first architecture pre-wired with Bun, Tailwind v4, and shadcn UI primitives.
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="font-mono text-xs font-semibold uppercase text-muted-foreground">
                Regular Body (14px)
              </p>
              <p className="text-sm text-muted-foreground">
                Buttery smooth scroll via Lenis, creative timeline animations via GSAP, and gestures with Motion.
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="font-mono text-xs font-semibold uppercase text-muted-foreground">
                Caption & Tokens (12px)
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                --font-sans: Satoshi;
                <br />
                --color-primary: 240 5.9% 10%;
                <br />
                --radius: 0.625rem;
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Interactive Controls & Component Kit */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-semibold text-foreground">
              Essential UI Kit Verification
            </h4>
            <span className="font-mono text-xs text-muted-foreground">
              [src/components/ui/*]
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="default" className="gap-2">
              <span>Primary Button</span>
              <ArrowRight01Icon className="size-4" />
            </Button>

            <Button variant="secondary" className="gap-2">
              <Folder01Icon className="size-4" />
              <span>Secondary</span>
            </Button>

            <Button variant="outline" className="gap-2">
              <CodeIcon className="size-4" />
              <span>Outline</span>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <PlusSignIcon className="size-4" />
                  <span>Inspect Modal</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Primitive Ready</DialogTitle>
                  <DialogDescription>
                    Radix UI modal primitive wired with design tokens, responsive blur backdrop, and accessible focus management.
                  </DialogDescription>
                </DialogHeader>
                <div className="rounded-lg border border-border bg-muted/50 p-4 font-mono text-xs text-foreground">
                  <code>bun run dev</code>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCommand}
              className="font-mono text-xs gap-1.5"
            >
              {copied ? (
                <>
                  <Tick02Icon className="size-3.5 text-foreground" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <CommandLineIcon className="size-3.5 text-muted-foreground" />
                  <span>bun run dev</span>
                </>
              )}
            </Button>
          </div>

          {/* Tech stack badge pill list */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {TECH_STACK_TAGS.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Section 3: Modular Wireframe Slot Indicators */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-base font-semibold text-foreground">
                Blank Section Wireframe Slots
              </h4>
              <p className="text-sm text-muted-foreground">
                Drop your new landing page sections directly into these structured slot containers.
              </p>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              [EMPTY SECTION SLOTS]
            </span>
          </div>

          <div className="space-y-4">
            {/* Slot 01: Hero Slot */}
            <div className="group relative flex min-h-[160px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-wireframe bg-wireframe-subtle/60 p-8 text-center transition-colors hover:border-primary/40">
              <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground shadow-2xs">
                <span className="size-2 rounded-full bg-foreground" />
                Slot 01: Hero Section Dropzone
              </div>
              <p className="mt-3 max-w-md text-xs text-muted-foreground">
                Replace this placeholder with your brand hero, headline, primary call-to-action buttons, and product visual/video player.
              </p>
            </div>

            {/* Slot 02: Multi-Column Feature Grid Slot using Card primitives */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Slot 02-A", title: "Feature Showcase", desc: "Modular card for product capability highlights." },
                { label: "Slot 02-B", title: "Social Proof", desc: "Metrics, customer logos, or testimonial quote." },
                { label: "Slot 02-C", title: "Interactive Demo", desc: "Interactive widget, tabbed preview, or pricing tier." },
              ].map((slot) => (
                <Card
                  key={slot.label}
                  className="border-dashed border-2 border-wireframe bg-wireframe-subtle/40 shadow-none transition-colors hover:border-primary/40"
                >
                  <CardHeader className="p-4 pb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      [{slot.label}]
                    </span>
                    <CardTitle className="text-sm">{slot.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="text-xs">{slot.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Slot 03: CTA / Conversion Slot */}
            <div className="flex min-h-[120px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-wireframe bg-wireframe-subtle/30 p-6 text-center transition-colors hover:border-primary/40">
              <span className="font-mono text-xs font-medium text-foreground">
                [Slot 03: Conversion / Footer CTA Dropzone]
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                Email capture, pricing cards, FAQ accordion, or closing footer
              </span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <footer className="flex flex-col sm:flex-row items-center justify-between border-t border-border pt-6 text-xs text-muted-foreground gap-4">
          <p>
            Created for <span className="font-semibold text-foreground">next-starter</span>. Ready for landing page generation.
          </p>
          <p className="font-mono text-[11px]">
            Satoshi Font &bull; Tailwind v4 &bull; Bun
          </p>
        </footer>
      </div>
    </section>
  );
}
