"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SolidPlane } from "./icons";
import { GRAIN_URI } from "../textures";

export const TICKET_CLIP_PATH =
  "M 0.038 0 H 0.696 A 0.024 0.058 0 0 0 0.744 0 H 0.962 A 0.038 0.092 0 0 1 1 0.092 V 0.908 A 0.038 0.092 0 0 1 0.962 1 H 0.744 A 0.024 0.058 0 0 0 0.696 1 H 0.038 A 0.038 0.092 0 0 1 0 0.908 V 0.092 A 0.038 0.092 0 0 1 0.038 0 Z";

export const BARCODE_STRIPES = [
  3, 1, 2, 1, 4, 1, 1, 2, 3, 1, 1, 4, 2, 1, 3, 1, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1,
];

export function TravelStamp({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center text-ticket-stamp select-none shrink-0",
        className
      )}
      style={{ transform: "rotate(-6deg)" }}
      aria-hidden
    >
      <div className="flex size-14 sm:size-16 flex-col items-center justify-center rounded-full border border-dashed border-ticket-stamp/70 p-1">
        <div className="flex size-full flex-col items-center justify-center rounded-full border border-ticket-stamp/60 px-1 text-center bg-ticket-stamp/[0.04]">
          <span className="text-[0.44rem] font-black uppercase tracking-[0.14em] leading-none opacity-90">
            Meridian
          </span>
          <div className="my-0.5 flex items-center gap-1">
            <span className="h-px w-2 bg-ticket-stamp/40" />
            <SolidPlane className="size-2.5 text-ticket-stamp" />
            <span className="h-px w-2 bg-ticket-stamp/40" />
          </div>
          <span className="text-[0.48rem] font-black uppercase tracking-[0.12em] leading-none">
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}

/** Perforated torn-edge path for the left ticket body (72% width). */
export const TORN_LEFT_PATH =
  "M 0.053 0 H 0.967 A 0.033 0.058 0 0 0 1 0.058 L 0.988 0.086 L 1 0.114 L 0.988 0.141 L 1 0.169 L 0.988 0.197 L 1 0.225 L 0.988 0.252 L 1 0.280 L 0.988 0.308 L 1 0.336 L 0.988 0.363 L 1 0.391 L 0.988 0.419 L 1 0.447 L 0.988 0.474 L 1 0.502 L 0.988 0.530 L 1 0.558 L 0.988 0.585 L 1 0.613 L 0.988 0.641 L 1 0.669 L 0.988 0.696 L 1 0.724 L 0.988 0.752 L 1 0.780 L 0.988 0.807 L 1 0.835 L 0.988 0.863 L 1 0.891 L 0.988 0.918 L 1 0.942 A 0.033 0.058 0 0 0 0.967 1 H 0.053 A 0.053 0.092 0 0 1 0 0.908 V 0.092 A 0.053 0.092 0 0 1 0.053 0 Z";

/** Perforated torn-edge path for the right ticket stub (28% width). */
export const TORN_RIGHT_PATH =
  "M 0 0.058 A 0.086 0.058 0 0 0 0.086 0 H 0.863 A 0.137 0.092 0 0 1 1 0.092 V 0.908 A 0.137 0.092 0 0 1 0.863 1 H 0.086 A 0.086 0.058 0 0 0 0 0.942 L 0.026 0.918 L 0 0.891 L 0.026 0.863 L 0 0.835 L 0.026 0.807 L 0 0.780 L 0.026 0.752 L 0 0.724 L 0.026 0.696 L 0 0.669 L 0.026 0.641 L 0 0.613 L 0.026 0.585 L 0 0.558 L 0.026 0.530 L 0 0.502 L 0.026 0.474 L 0 0.447 L 0.026 0.419 L 0 0.391 L 0.026 0.363 L 0 0.336 L 0.026 0.308 L 0 0.280 L 0.026 0.252 L 0 0.225 L 0.026 0.197 L 0 0.169 L 0.026 0.141 L 0 0.114 L 0.026 0.086 L 0 0.058 Z";

export function AirplaneTicketCard({
  reduce = false,
  onTear,
}: {
  reduce?: boolean;
  onTear?: () => void;
}) {
  const rawId = React.useId();
  const cleanId = rawId.replace(/:/g, "");
  const clipId = `ticket-clip-${cleanId}`;
  const leftClipId = `torn-left-clip-${cleanId}`;
  const rightClipId = `torn-right-clip-${cleanId}`;
  const [tearing, setTearing] = React.useState(false);

  const handleTear = React.useCallback(() => {
    if (tearing) return;
    setTearing(true);
  }, [tearing]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative h-full w-full"
    >
      {/* SVG Clip Path Definitions */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={TICKET_CLIP_PATH} />
          </clipPath>
          <clipPath id={leftClipId} clipPathUnits="objectBoundingBox">
            <path d={TORN_LEFT_PATH} />
          </clipPath>
          <clipPath id={rightClipId} clipPathUnits="objectBoundingBox">
            <path d={TORN_RIGHT_PATH} />
          </clipPath>
        </defs>
      </svg>

      {/* === INTACT TICKET (shown while not tearing) === */}
      {!tearing && (
        <div className="relative h-full w-full [filter:drop-shadow(0_14px_28px_rgba(0,0,0,0.08))_drop-shadow(0_4px_10px_rgba(0,0,0,0.04))]">
          <div
            className="relative flex h-full w-full overflow-hidden bg-ticket-bg text-ticket-foreground select-none"
            style={{ clipPath: `url(#${clipId})` }}
          >
            {/* Subtle Paper Grain */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
              style={{ backgroundImage: GRAIN_URI, backgroundSize: "140px 140px" }}
            />

            {/* MAIN BODY (Left 72%) */}
            <div className="relative flex h-full w-[72%] flex-col justify-between p-4 sm:p-5">
              {/* Header */}
              <div className="flex items-center gap-2">
                <SolidPlane className="size-3 text-ticket-foreground opacity-80" />
                <span className="text-[0.56rem] font-bold uppercase tracking-[0.18em] text-ticket-muted">
                  Meridian · Boarding Pass
                </span>
              </div>

              {/* Core Content: Headline & Travel Stamp */}
              <div className="flex items-center justify-between gap-3 my-auto py-1">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-ticket-foreground sm:text-3xl leading-none">
                    Bon voyage
                  </h3>
                  <p className="mt-1.5 text-xs text-ticket-muted">
                    Your route is set.
                  </p>
                </div>

                <TravelStamp />
              </div>

              {/* Subtle footer indicator */}
              <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-ticket-muted opacity-70">
                5 Stops Confirmed
              </p>
            </div>

            {/* VERTICAL PERFORATION DIVIDER (at 72% width) */}
            <div className="relative flex h-full flex-col justify-center" aria-hidden>
              <div className="h-[75%] border-r border-dashed border-ticket-perforation" />
            </div>

            {/* TEAR-OFF STUB (Right 28%) — clickable to tear & replay */}
            <div
              className="group/stub relative flex h-full w-[28%] cursor-pointer flex-col items-center justify-between bg-ticket-stub/40 p-3 py-4 text-center transition-colors hover:bg-ticket-stub/60 sm:p-4"
              onClick={handleTear}
              role="button"
              tabIndex={0}
              aria-label="Tear ticket to replay itinerary"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleTear();
                }
              }}
            >
              <Badge
                variant="outline"
                className="h-4 rounded-[3px] border-ticket-perforation bg-ticket-bg/80 px-1.5 text-[0.48rem] font-bold uppercase tracking-wider text-ticket-muted transition-colors group-hover/stub:border-ticket-muted"
              >
                Gate 01
              </Badge>

              {/* Barcode */}
              <div className="my-auto flex flex-col items-center gap-1">
                <div className="flex h-6 items-stretch justify-center gap-[1.5px] opacity-85 sm:h-7" aria-hidden>
                  {BARCODE_STRIPES.map((w, idx) => (
                    <span
                      key={idx}
                      style={{ width: `${w}px` }}
                      className="shrink-0 rounded-[0.2px] bg-ticket-foreground"
                    />
                  ))}
                </div>
                <p className="text-[0.44rem] font-medium uppercase tracking-[0.16em] text-ticket-muted">
                  MDR · 2026
                </p>
              </div>

              {/* Replay action text on stub */}
              <div className="flex items-center justify-center rounded px-2 py-0.5 transition-all group-hover/stub:scale-105 group-hover/stub:bg-ticket-foreground/10">
                <span className="text-[0.52rem] font-black uppercase tracking-[0.2em] text-ticket-muted transition-colors group-hover/stub:text-ticket-foreground">
                  ✂ Replay
                </span>
              </div>
            </div>

            {/* Crisp Perimeter Outline (including notches) */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 1 1"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d={TICKET_CLIP_PATH}
                fill="none"
                stroke="var(--ticket-border)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      )}

      {/* === TORN SEPARATING HALVES (shown during tear animation) === */}
      {tearing && (
        <div className="relative h-full w-full">
          {/* Left Ticket Body (0% to 72% width) */}
          <motion.div
            key="torn-left"
            className="absolute left-0 top-0 bottom-0 w-[72%] origin-bottom-left [filter:drop-shadow(0_14px_30px_rgba(0,0,0,0.12))]"
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={{
              x: reduce ? -8 : -38,
              y: reduce ? 10 : 72,
              rotate: reduce ? 0 : -6,
            }}
            transition={{
              duration: reduce ? 0.25 : 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className="relative flex h-full w-full overflow-hidden bg-ticket-bg text-ticket-foreground select-none"
              style={{ clipPath: `url(#${leftClipId})` }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
                style={{ backgroundImage: GRAIN_URI, backgroundSize: "140px 140px" }}
              />
              <div className="relative flex h-full w-full flex-col justify-between p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <SolidPlane className="size-3 text-ticket-foreground opacity-80" />
                  <span className="text-[0.56rem] font-bold uppercase tracking-[0.18em] text-ticket-muted">
                    Meridian · Boarding Pass
                  </span>
                </div>
                <div className="my-auto flex items-center justify-between gap-3 py-1">
                  <div>
                    <h3 className="text-2xl font-black leading-none tracking-tight text-ticket-foreground sm:text-3xl">
                      Bon voyage
                    </h3>
                    <p className="mt-1.5 text-xs text-ticket-muted">
                      Your route is set.
                    </p>
                  </div>
                  <TravelStamp />
                </div>
                <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-ticket-muted opacity-70">
                  5 Stops Confirmed
                </p>
              </div>

              {/* Torn outline */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 1 1"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d={TORN_LEFT_PATH}
                  fill="none"
                  stroke="var(--ticket-border)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </motion.div>

          {/* Right Ticket Stub (72% to 100% width) */}
          <motion.div
            key="torn-right"
            className="absolute left-[72%] top-0 bottom-0 w-[28%] origin-top-left [filter:drop-shadow(0_14px_30px_rgba(0,0,0,0.12))]"
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={{
              x: reduce ? 8 : 56,
              y: reduce ? 10 : 96,
              rotate: reduce ? 0 : 20,
            }}
            transition={{
              duration: reduce ? 0.25 : 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={() => {
              setTearing(false);
              onTear?.();
            }}
          >
            <div
              className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-ticket-stub/50 p-3 py-4 text-center text-ticket-foreground select-none sm:p-4"
              style={{ clipPath: `url(#${rightClipId})` }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
                style={{ backgroundImage: GRAIN_URI, backgroundSize: "140px 140px" }}
              />
              <Badge
                variant="outline"
                className="h-4 rounded-[3px] border-ticket-perforation bg-ticket-bg/80 px-1.5 text-[0.48rem] font-bold uppercase tracking-wider text-ticket-muted"
              >
                Gate 01
              </Badge>
              <div className="my-auto flex flex-col items-center gap-1">
                <div className="flex h-6 items-stretch justify-center gap-[1.5px] opacity-85 sm:h-7" aria-hidden>
                  {BARCODE_STRIPES.map((w, idx) => (
                    <span
                      key={idx}
                      style={{ width: `${w}px` }}
                      className="shrink-0 rounded-[0.2px] bg-ticket-foreground"
                    />
                  ))}
                </div>
                <p className="text-[0.44rem] font-medium uppercase tracking-[0.16em] text-ticket-muted">
                  MDR · 2026
                </p>
              </div>
              <span className="text-[0.52rem] font-bold uppercase tracking-[0.18em] text-ticket-muted">
                ✂ Replay
              </span>

              {/* Torn outline */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 1 1"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d={TORN_RIGHT_PATH}
                  fill="none"
                  stroke="var(--ticket-border)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
