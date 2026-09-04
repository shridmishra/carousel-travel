"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import type { DestinationCard } from "./data";
import { Emblem } from "./emblems";

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
function Guilloche({ color }: { color: string }) {
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
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function MembershipCard({
  item,
  glare,
  index,
  total,
  className,
}: MembershipCardProps) {
  const { colors } = item;

  // Stable hook order: fall back to a static motion value when no drag source.
  const fallback = useMotionValue(0);
  const source = glare ?? fallback;
  const glareShift = useTransform(source, [-1, 1], ["135%", "-35%"]);
  const glareOpacity = useTransform(source, [-1, -0.15, 0, 0.15, 1], [0.5, 0.12, 0.06, 0.12, 0.5]);

  return (
    <div
      className={cn(
        "relative aspect-[0.68] w-full select-none overflow-hidden rounded-[1.75rem] text-white",
        "shadow-[0_2px_2px_rgba(0,0,0,0.12),0_18px_40px_-12px_rgba(0,0,0,0.55)]",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(150deg, ${colors.from} 0%, ${colors.via} 48%, ${colors.to} 100%)`,
      }}
    >
      {/* Soft top-left key light */}
      <div
        className="pointer-events-none absolute -left-1/4 -top-1/3 h-2/3 w-2/3 rounded-full opacity-60 blur-2xl"
        style={{ background: `radial-gradient(circle, ${colors.accent}33, transparent 70%)` }}
      />

      {/* Guilloché engraving, tucked into the lower-right */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 opacity-[0.14]">
        <Guilloche color={colors.accent} />
      </div>

      {/* Edge sheen + inner ring for a milled, tactile edge */}
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/12" />
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-40"
        style={{
          background:
            "linear-gradient(150deg, rgba(255,255,255,0.28), transparent 22%, transparent 78%, rgba(0,0,0,0.3))",
        }}
      />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "140px 140px" }}
      />

      {/* Idle + drag-reactive foil sweep */}
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

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
        {/* Header */}
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
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              color: colors.accent,
            }}
          >
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: colors.accent, boxShadow: `0 0 8px ${colors.accent}` }}
            />
            Active
          </div>
        </div>

        {/* Center */}
        <div className="mt-auto">
          <div
            className="mb-5 flex size-11 items-center justify-center rounded-xl ring-1 ring-inset ring-white/15"
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

        {/* Footer */}
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
              <p className="mt-0.5 font-mono text-xs tabular-nums text-white/90">{item.serial}</p>
            </div>
          </div>
          <p className="mt-3 font-mono text-[0.6rem] tracking-wide text-white/45">
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
