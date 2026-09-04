"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import type { DestinationCard } from "../types";
import { Emblem } from "./emblem";

interface MembershipCardProps {
  item: DestinationCard;
  /** Drag progress from -1 (left) to 1 (right); drives the foil glare. */
  glare?: MotionValue<number>;
  /** 1-based position for the corner index, e.g. 2 of 5. */
  index?: number;
  total?: number;
  className?: string;
}

/** Rosette of rotated ellipses — a nod to security-print guilloché engraving. */
export function Guilloche({ color }: { color: string }) {
  const rings = Array.from({ length: 14 });
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      fill="none"
      stroke={color}
      strokeWidth={0.5}
      aria-hidden
    >
      {rings.map((_, i) => (
        <ellipse
          key={i}
          cx={100}
          cy={100}
          rx={92}
          ry={38}
          transform={`rotate(${(180 / rings.length) * i} 100 100)`}
        />
      ))}
      <circle cx={100} cy={100} r={54} strokeWidth={0.6} />
      <circle cx={100} cy={100} r={30} strokeWidth={0.6} />
    </svg>
  );
}

/** Fine-grain film texture generated inline, blended over the surface. */
const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function MembershipCard({
  item,
  glare,
  index,
  total,
  className,
}: MembershipCardProps) {
  const { colors } = item;

  const fallback = useMotionValue(0);
  const source = glare ?? fallback;
  const glareShift = useTransform(source, [-1, 1], ["135%", "-35%"]);
  const glareOpacity = useTransform(source, [-1, -0.15, 0, 0.15, 1], [0.5, 0.12, 0.06, 0.12, 0.5]);

  return (
    <div
      className={cn(
        "relative aspect-[0.68] w-full select-none overflow-hidden rounded-[1.75rem] text-white",
        "shadow-membership-card",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(150deg, ${colors.from} 0%, ${colors.via} 48%, ${colors.to} 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute -left-1/4 -top-1/3 h-2/3 w-2/3 rounded-full opacity-60 blur-2xl"
        style={{ background: `radial-gradient(circle, ${colors.accent}33, transparent 70%)` }}
      />

      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 opacity-[0.14]">
        <Guilloche color={colors.accent} />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/12" />
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-40"
        style={{
          background:
            "linear-gradient(150deg, rgba(255,255,255,0.28), transparent 22%, transparent 78%, rgba(0,0,0,0.3))",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "140px 140px" }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{
          x: glareShift,
          opacity: glareOpacity,
          background:
            "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.85) 46%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.85) 54%, transparent 80%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-70 [animation:meridian-sheen_7s_ease-in-out_infinite] mix-blend-soft-light bg-[linear-gradient(105deg,transparent_38%,rgba(255,255,255,0.35)_48%,transparent_58%)] bg-[length:300%_100%]" />

      <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span
              className="inline-block size-1.5 rotate-45"
              style={{ backgroundColor: colors.accent }}
            />
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.42em] text-white/90">
              Meridian
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm shadow-inset-rim"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              color: colors.accent,
            }}
          >
            Active
          </div>
        </div>

        <div className="mt-auto">
          <div
            className="mb-5 flex size-11 items-center justify-center rounded-xl ring-1 ring-inset ring-white/15 shadow-inset-rim"
            style={{ color: colors.accent, backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            <Emblem emblem={item.emblem} className="size-6" />
          </div>
          <p
            className="text-[0.62rem] font-semibold uppercase tracking-[0.32em]"
            style={{ color: colors.accent }}
          >
            {item.residence}
          </p>
          <h3 className="mt-1.5 text-[2.6rem] font-black leading-[0.95] tracking-[-0.03em]">
            {item.destination}
          </h3>
          <p className="mt-1 text-sm font-medium text-white/70">{item.region}</p>
        </div>

        <div className="mt-6">
          <div className="mb-3.5 h-px w-full" style={{ backgroundColor: `${colors.accent}33` }} />
          <div className="flex items-end justify-between gap-3">
            <div>
              <p
                className="text-[0.58rem] font-semibold uppercase tracking-[0.24em]"
                style={{ color: `${colors.accent}cc` }}
              >
                Member
              </p>
              <p className="mt-0.5 text-sm font-semibold text-white">{item.member}</p>
            </div>
            <div>
              <p
                className="text-[0.58rem] font-semibold uppercase tracking-[0.24em]"
                style={{ color: `${colors.accent}cc` }}
              >
                Since
              </p>
              <p className="mt-0.5 text-sm font-semibold tabular-nums text-white">{item.since}</p>
            </div>
            <div className="text-right">
              <p
                className="text-[0.58rem] font-semibold uppercase tracking-[0.24em]"
                style={{ color: `${colors.accent}cc` }}
              >
                No.
              </p>
              <p className="mt-0.5 text-xs font-semibold tabular-nums tracking-wider text-white/90">{item.serial}</p>
            </div>
          </div>
          <p className="mt-3 text-[0.62rem] font-medium tracking-wide text-white/60">
            {item.coordinates}
            {index && total ? (
              <span className="float-right tabular-nums">
                {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reverse face — the anatomy of a real membership pass                      */
/* -------------------------------------------------------------------------- */

interface MembershipCardBackProps {
  item: DestinationCard;
  index?: number;
  total?: number;
  className?: string;
}

export function MembershipCardBack({
  item,
  index,
  className,
}: MembershipCardBackProps) {
  const { colors } = item;

  return (
    <div
      className={cn(
        "relative aspect-[0.68] w-full select-none overflow-hidden rounded-[1.75rem] text-white",
        "shadow-membership-card",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(200deg, ${colors.via} 0%, ${colors.to} 60%, #050507 100%)`,
      }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 opacity-[0.1]">
        <Guilloche color={colors.accent} />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/12" />
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-40"
        style={{
          background:
            "linear-gradient(200deg, rgba(255,255,255,0.22), transparent 24%, transparent 76%, rgba(0,0,0,0.34))",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "140px 140px" }}
      />

      <div className="relative flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.42em] text-white/90">
            Meridian
          </span>
          <span
            className="text-[0.58rem] font-semibold uppercase tracking-[0.22em]"
            style={{ color: colors.accent }}
          >
            {item.tier}
          </span>
        </div>

        <div className="relative mt-6 h-11 w-[calc(100%+3rem)] -translate-x-6 overflow-hidden bg-black/70 sm:-translate-x-7 sm:w-[calc(100%+3.5rem)]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12)_20%,transparent_40%,rgba(255,255,255,0.08)_70%,transparent)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/15" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-black/60" />
        </div>

        <div className="mt-5 flex items-stretch gap-3">
          <div className="relative flex-1 overflow-hidden rounded-md bg-white/90">
            <div className="pointer-events-none absolute inset-0 opacity-60 bg-[repeating-linear-gradient(115deg,transparent_0_3px,rgba(0,0,0,0.06)_3px_4px)]" />
            <div className="relative flex h-11 items-center px-3">
              <span className="text-lg italic leading-none text-black/70 [font-family:var(--font-sans)] -rotate-2">
                {item.member}
              </span>
            </div>
          </div>
          <div className="flex w-[38%] flex-col items-end justify-center rounded-md bg-white/5 px-3 ring-1 ring-inset ring-white/10 shadow-inset-rim">
            <span className="text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-white/60">
              CVX
            </span>
            <span className="text-sm font-semibold tabular-nums text-white/90">
              {String((index ?? 1) * 137 % 1000).padStart(3, "0")}
            </span>
          </div>
        </div>

        <div className="mt-auto space-y-3 pt-6">
          <div className="flex items-center gap-2.5">
            <span
              className="flex size-8 items-center justify-center rounded-lg ring-1 ring-inset ring-white/15 shadow-inset-rim"
              style={{ color: colors.accent, backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <Emblem emblem={item.emblem} className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{item.residence}</p>
              <p className="truncate text-xs text-white/70">{item.region}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/10 pt-3">
            <div>
              <p className="text-[0.54rem] font-semibold uppercase tracking-[0.22em] text-white/55">
                Serial
              </p>
              <p className="mt-0.5 text-xs font-medium tabular-nums tracking-wider text-white/85">{item.serial}</p>
            </div>
            <div className="text-right">
              <p className="text-[0.54rem] font-semibold uppercase tracking-[0.22em] text-white/55">
                Coordinates
              </p>
              <p className="mt-0.5 text-[0.62rem] font-medium tabular-nums text-white/85">
                {item.coordinates}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
