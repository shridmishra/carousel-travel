"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight01Icon, Key01Icon } from "hugeicons-react";
import { CtaButton } from "@/components/ui/cta-button";
import { CardCarousel } from "./components/card-carousel";
import { DESTINATIONS } from "./data/destinations";
import type { DestinationCard } from "./types";

const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8 sm:px-8 lg:py-12">
        <header className="flex items-center justify-center lg:justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block size-2 rotate-45 transition-colors duration-700 shadow-sm"
              style={{ backgroundColor: active.colors.accent }}
            />
            <span className="text-sm font-bold uppercase tracking-[0.4em]">Meridian</span>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-1 items-center gap-10 py-10 sm:gap-14 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-0">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-2 max-w-xl lg:order-1"
          >
            <motion.p
              variants={rise}
              className="mb-8 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.28em] text-white/60"
            >
              <Key01Icon
                className="size-3.5 shrink-0 transition-colors duration-700"
                style={{ color: active.colors.accent }}
                aria-hidden
              />
              <span>Private travel membership</span>
            </motion.p>

            <motion.h1
              variants={rise}
              className="text-balance text-[2.5rem] font-black leading-[1.1] tracking-[-0.03em] sm:text-5xl lg:text-[3.75rem]"
            >
              One membership.
              <br />
              <span className="text-white/60">Every door.</span>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-8 max-w-md text-pretty text-base leading-relaxed text-white/70 sm:mt-10 sm:text-lg"
            >
              Direct entry to premier off-market residences worldwide from Amalfi
              to Kyoto, each one held open by a single private key.
            </motion.p>

            <motion.div variants={rise} className="mt-10 sm:mt-12 flex flex-wrap items-center gap-3 sm:gap-3.5">
              <CtaButton
                type="button"
                variant="default"
                className="h-11 sm:h-12 px-5 sm:px-6 font-semibold"
              >
                Request invitation
                <ArrowRight01Icon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </CtaButton>
              <CtaButton
                type="button"
                variant="dark"
                className="h-11 sm:h-12 px-5 sm:px-6 font-semibold"
              >
                How it works
              </CtaButton>
            </motion.div>
          </motion.div>

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
