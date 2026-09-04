"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight01Icon } from "hugeicons-react";
import { CardCarousel } from "@/components/card-carousel";
import { DESTINATIONS, type DestinationCard } from "@/components/card-carousel/data";

const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const BENEFITS = [
  {
    title: "Doors already open",
    body: "Arrive and walk in. No calls to make, no confirmations to chase.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M14 3v18M4 21h16M6 21V6a2 2 0 0 1 2-2h6" />
        <circle cx="11.5" cy="12" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Held, never listed",
    body: "Each residence is chosen and reserved. You won't find them on a booking site.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3.5 14.6 9l6 .5-4.6 3.9 1.5 5.9L12 16.9 6.5 19.3 8 13.4 3.4 9.5l6-.5z" />
      </svg>
    ),
  },
  {
    title: "One quiet card",
    body: "A single pass carries your whole world. Swipe to see where today could go.",
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
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-[#08080a] text-white">
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
              className="inline-block size-2 rotate-45 transition-colors duration-700"
              style={{ backgroundColor: active.colors.accent }}
            />
            <span className="text-sm font-bold uppercase tracking-[0.4em]">Meridian</span>
          </div>
          <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white/40 sm:block">
            Est. MMXIX · By invitation
          </span>
        </header>

        {/* Main */}
        <div className="grid flex-1 grid-cols-1 items-center gap-14 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-0">
          {/* Copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-2 max-w-xl lg:order-1"
          >
            <motion.h1
              variants={rise}
              className="text-[2.75rem] font-black leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]"
            >
              One membership.
              <br />
              <span className="text-white/55">Every door.</span>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-6 max-w-md text-lg leading-relaxed text-white/60"
            >
              Meridian is a private club for people who would rather arrive than
              arrange. A single card, quietly opening residences and moments
              across the world.
            </motion.p>

            <motion.ul variants={rise} className="mt-10 space-y-px">
              {BENEFITS.map((b) => (
                <li
                  key={b.title}
                  className="flex items-start gap-4 border-t border-white/10 py-4 last:border-b"
                >
                  <span
                    className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors duration-700"
                    style={{ color: active.colors.accent }}
                  >
                    <span className="size-[18px] [&>svg]:size-full">{b.icon}</span>
                  </span>
                  <div>
                    <p className="text-[0.95rem] font-semibold text-white">{b.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-white/50">{b.body}</p>
                  </div>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#08080a] transition-all duration-200 hover:gap-3 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a] active:scale-[0.98]"
                style={{ boxShadow: `0 8px 30px -8px ${active.colors.glow}88` }}
              >
                Request an invitation
                <ArrowRight01Icon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
              <button
                type="button"
                className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white/80 transition-colors duration-200 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a]"
              >
                How membership works
              </button>
            </motion.div>

            <motion.p
              variants={rise}
              className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-white/35"
            >
              By invitation · 2,400 members · 40 cities
            </motion.p>
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
