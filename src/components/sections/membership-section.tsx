"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight01Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardCarousel } from "@/components/card-carousel";
import { DESTINATIONS, type DestinationCard } from "@/components/card-carousel/data";

const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const FEATURES = [
  {
    id: "doors",
    label: "Direct Entry",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M14 3v18M4 21h16M6 21V6a2 2 0 0 1 2-2h6" />
        <circle cx="11.5" cy="12" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "unlisted",
    label: "Off-Market",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="7.5" cy="15.5" r="4.5" />
        <path d="m10.7 12.3 8.3-8.3M15.5 7.5l2 2M17.5 5.5l2 2" />
      </svg>
    ),
  },
  {
    id: "pass",
    label: "Single Pass",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="6" width="18" height="12" rx="2.5" />
        <path d="M3 10h18M6.5 14.5h4" />
      </svg>
    ),
  },
];

export function MembershipSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState<DestinationCard>(DESTINATIONS[0]);

  const handleActiveChange = React.useCallback((item: DestinationCard) => {
    setActive(item);
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 },
    },
  };
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.7, ease: [0.22, 0.61, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-meridian-bg text-white">
      {/* Ambient wash — a faint tint that follows the active pass */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-[background] duration-1000 ease-out"
        style={{
          background: `radial-gradient(120% 90% at 78% 12%, ${active.colors.glow}22, transparent 60%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_60%_at_50%_0%,rgba(255,255,255,0.05),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "160px 160px" }}
      />
      {/* Bottom fade to seat the section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8 sm:px-8 lg:py-12">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block size-2 rotate-45 transition-colors duration-700 shadow-sm"
              style={{ backgroundColor: active.colors.accent }}
            />
            <span className="text-sm font-bold uppercase tracking-[0.4em]">Meridian</span>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-meridian-well px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/40 shadow-inset-shallow sm:flex">
            <span>By invitation</span>
          </div>
        </header>

        {/* Main */}
        <div className="grid flex-1 grid-cols-1 items-center gap-14 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-0">
          {/* Copy & Inset UI Elements */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-2 max-w-xl lg:order-1"
          >
            <motion.h1
              variants={rise}
              className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.75rem]"
            >
              One membership.
              <br />
              <span className="text-white/40">Every door.</span>
            </motion.h1>

            {/* Inset tactile UI feature dock - all three features rising active */}
            <motion.div variants={rise} className="mt-8">
              <div className="inline-flex flex-wrap items-center gap-2 rounded-2xl bg-meridian-well p-1.5 shadow-inset-well">
                {FEATURES.map((f) => (
                  <Badge
                    key={f.id}
                    variant="tactile"
                    className="h-11 rounded-xl px-4 text-xs font-semibold tracking-wide gap-2.5 transition-all duration-300 select-none"
                  >
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-full bg-meridian-well shadow-inset-shallow transition-colors duration-500"
                      style={{ color: active.colors.accent }}
                    >
                      <span className="size-3.5 [&>svg]:size-full">{f.icon}</span>
                    </span>
                    <span>{f.label}</span>
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Tactile Buttons with layered depth and shadow */}
            <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button
                type="button"
                className="group relative h-12 rounded-full bg-white px-6 text-sm font-semibold text-meridian-bg shadow-tactile-raised transition-all duration-200 hover:bg-white/90 active:scale-[0.98] active:shadow-tactile-pressed focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-meridian-bg"
                style={{
                  boxShadow: `0 14px 34px -8px ${active.colors.glow}99, inset 0 1px 0 rgba(255,255,255,1), inset 0 -2px 4px rgba(0,0,0,0.12)`,
                }}
              >
                Request invitation
                <ArrowRight01Icon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="h-12 rounded-full bg-meridian-well px-6 text-sm font-semibold text-white/80 shadow-inset-shallow transition-all duration-200 hover:bg-meridian-surface hover:text-white hover:shadow-tactile-raised active:scale-[0.98] active:shadow-tactile-pressed focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-meridian-bg"
              >
                How it works
              </Button>
            </motion.div>

            {/* Inset status pill */}
            <motion.div
              variants={rise}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-meridian-well px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40 shadow-inset-shallow"
            >
              <span
                className="size-1.5 rounded-full transition-colors duration-700"
                style={{ backgroundColor: active.colors.accent }}
              />
              <span>2,400 members · 40 cities</span>
            </motion.div>
          </motion.div>

          {/* Deck */}
          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.94, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.9, ease: [0.22, 0.61, 0.36, 1] }}
            className="order-1 flex justify-center lg:order-2"
          >
            <CardCarousel items={DESTINATIONS} onActiveChange={handleActiveChange} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
