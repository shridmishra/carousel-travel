"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Stop } from "../types";
import { SolidPlane, MapPin } from "./icons";
import { GRAIN_URI } from "../textures";

/**
 * Mathematically tangent rounded corner cutout clip paths for the travel card photo.
 * Features a circular scoop around the top-right flight badge with smooth reverse
 * convex fillets connecting to the straight top and right edges (C1 tangent continuity).
 */
export const TRAVEL_CARD_CLIP_LG =
  "M 0.0561 0 L 0.8498 0 A 0.0240 0.0248 0 0 1 0.8734 0.0297 A 0.0833 0.0861 0 0 0 0.9713 0.1308 A 0.0240 0.0248 0 0 1 1 0.1552 L 1 0.9421 A 0.0561 0.0579 0 0 1 0.9439 1 L 0.0561 1 A 0.0561 0.0579 0 0 1 0 0.9421 L 0 0.0579 A 0.0561 0.0579 0 0 1 0.0561 0 Z";

export function computeCardClip(w: number, h: number, isLg: boolean) {
  const btn = isLg ? 40 : 26;
  const inset = isLg ? 6 : 4;
  const gap = isLg ? 6.0 : 4.0;
  const r_f = isLg ? 7.5 : 5.0;
  const r_c = isLg ? 17.5 : 10.0;

  const badgeRadius = btn / 2;
  const c = badgeRadius - inset; // 14 for lg, 9 for md
  const R = badgeRadius + gap;   // 26 for lg, 17 for md

  const d = c + Math.sqrt((R + r_f) ** 2 - (c - r_f) ** 2);

  const p1_x = w - d;

  const p2_x = w - (c + (R * (d - c)) / (R + r_f));
  const p2_y = c - (R * (c - r_f)) / (R + r_f);

  const p3_x = w - p2_y;
  const p3_y = c + (R * (d - c)) / (R + r_f);

  const p4_y = d;

  const n = (val: number, max: number) => (val / max).toFixed(4);

  return [
    `M ${n(r_c, w)} 0`,
    `L ${n(p1_x, w)} 0`,
    `A ${n(r_f, w)} ${n(r_f, h)} 0 0 1 ${n(p2_x, w)} ${n(p2_y, h)}`,
    `A ${n(R, w)} ${n(R, h)} 0 0 0 ${n(p3_x, w)} ${n(p3_y, h)}`,
    `A ${n(r_f, w)} ${n(r_f, h)} 0 0 1 1 ${n(p4_y, h)}`,
    `L 1 ${n(h - r_c, h)}`,
    `A ${n(r_c, w)} ${n(r_c, h)} 0 0 1 ${n(w - r_c, w)} 1`,
    `L ${n(r_c, w)} 1`,
    `A ${n(r_c, w)} ${n(r_c, h)} 0 0 1 0 ${n(h - r_c, h)}`,
    `L 0 ${n(r_c, h)}`,
    `A ${n(r_c, w)} ${n(r_c, h)} 0 0 1 ${n(r_c, w)} 0 Z`,
  ].join(" ");
}

export const TRAVEL_CARD_CLIP_MD =
  "M 0.0781 0 L 0.7607 0 A 0.0391 0.0295 0 0 1 0.7991 0.0349 A 0.1328 0.1003 0 0 0 0.9538 0.1517 A 0.0391 0.0295 0 0 1 1 0.1807 L 1 0.9410 A 0.0781 0.0590 0 0 1 0.9219 1 L 0.0781 1 A 0.0781 0.0590 0 0 1 0 0.9410 L 0 0.0590 A 0.0781 0.0590 0 0 1 0.0781 0 Z";

export function TravelCardFront({ stop, size = "md" }: { stop: Stop; size?: "md" | "lg" }) {
  const lg = size === "lg";
  const btn = lg ? 40 : 26;
  const inset = lg ? 6 : 4;
  const rawId = React.useId();
  const clipId = `travel-card-clip-${rawId.replace(/:/g, "")}`;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [clipD, setClipD] = React.useState<string>(
    lg ? TRAVEL_CARD_CLIP_LG : TRAVEL_CARD_CLIP_MD,
  );

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateClip = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w > 0 && h > 0) {
        setClipD(computeCardClip(w, h, lg));
      }
    };

    updateClip();
    const observer = new ResizeObserver(updateClip);
    observer.observe(el);
    return () => observer.disconnect();
  }, [lg]);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden bg-itinerary-card text-neutral-900 ring-1 ring-black/5",
        lg ? "rounded-[1.35rem] p-3" : "rounded-[1rem] p-2",
      )}
    >
      <div ref={containerRef} className="relative min-h-0 flex-1">
        {/* SVG Clip Path Definition for the rounded cutout corner */}
        <svg width="0" height="0" className="absolute" aria-hidden>
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path d={clipD} />
            </clipPath>
          </defs>
        </svg>

        {/* Photo container with smooth rounded cutout bay */}
        <div
          className="absolute inset-0 overflow-hidden bg-neutral-200"
          style={{ clipPath: `url(#${clipId})` }}
        >
          <Image
            src={stop.photo}
            alt={`${stop.place}, ${stop.location}`}
            fill
            sizes={lg ? "(max-width: 640px) 100vw, 400px" : "(max-width: 640px) 50vw, 220px"}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

          {!lg && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0">
              <div
                className="absolute inset-0 backdrop-blur-lg backdrop-saturate-150"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to top, #000 0%, rgba(0,0,0,0.85) 45%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to top, #000 0%, rgba(0,0,0,0.85) 45%, transparent 100%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
              <div className="relative px-2.5 pb-2.5 pt-8">
                <h3 className="truncate text-[1.05rem] font-bold leading-tight tracking-tight text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.55)]">
                  {stop.place}
                </h3>
                <p className="mt-0.5 flex items-center gap-1 text-[0.64rem] font-medium text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                  <MapPin className="size-2.5 shrink-0 text-white/75" />
                  <span className="truncate">{stop.location}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Top-rated style badge — glassy, transparent (large card only) */}
        {lg && (
          <Badge
            variant="secondary"
            className="absolute left-2.5 top-2.5 inline-flex items-center border-none bg-white/20 px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur-md"
          >
            {stop.tag}
          </Badge>
        )}

        {/* Flight badge icon, nestled in the rounded cutout corner bay */}
        <div
          className="absolute z-10 flex items-center justify-center rounded-full bg-neutral-900 text-white shadow-md select-none"
          style={{ width: btn, height: btn, top: -inset, right: -inset }}
          aria-hidden
        >
          <Plane className={lg ? "size-5" : "size-3.5"} strokeWidth={2} />
        </div>
      </div>

      <div className={cn("shrink-0", lg ? "px-1.5 pt-2.5" : "px-0.5 pt-1")}>
        {lg && (
          <>
            <div className="flex min-w-0 items-baseline justify-between gap-3">
              <h3 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight text-neutral-900 sm:text-[1.7rem]">
                {stop.place}
              </h3>
              <span className="shrink-0 text-right text-sm font-medium text-neutral-500">
                {stop.location}
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{stop.blurb}</p>
          </>
        )}

        <Button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "group/book flex w-full items-center justify-center gap-1.5 rounded-full bg-neutral-900 font-semibold text-white transition-transform active:scale-[0.98] hover:bg-neutral-800",
            lg ? "mt-2.5 h-10 text-sm" : "mt-1 h-7 text-[0.68rem]",
          )}
        >
          Book Now
          <Plane
            className={cn(
              "shrink-0 transition-transform duration-150 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover/book:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover/book:-translate-y-0.5",
              lg ? "size-4" : "size-3",
            )}
            strokeWidth={2}
          />
        </Button>
      </div>
    </div>
  );
}

export function PostcardBack({ stop, seq, size = "md" }: { stop: Stop; seq: number; size?: "md" | "lg" }) {
  const lg = size === "lg";
  const country = stop.location.split(",").pop()?.trim() || stop.location;
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-itinerary-card-back text-itinerary-text ring-1 ring-black/10",
        lg ? "rounded-[1.35rem]" : "rounded-[1rem]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-multiply"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "140px 140px" }}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-2.5 border border-dashed border-itinerary-text/35",
          lg ? "rounded-xl" : "rounded-md",
        )}
      />

      <div className="relative flex h-full flex-col justify-between p-5">
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.32em] opacity-70">
            Meridian · Travel
          </p>
          <div className="mt-1 h-px w-10 bg-itinerary-text/30" />
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] opacity-60">
            Stop {String(seq).padStart(2, "0")}
          </span>

          <div
            className="relative mt-2.5 flex size-[4.2rem] flex-col items-center justify-center rounded-full border border-dashed border-itinerary-text/45"
            style={{ transform: "rotate(-7deg)" }}
            aria-hidden
          >
            <span className="text-[0.4rem] font-bold uppercase tracking-[0.26em] opacity-60">
              Air Mail
            </span>
            <span className="mt-0.5 max-w-[3.4rem] truncate text-[0.82rem] font-black uppercase leading-none tracking-tight">
              {country}
            </span>
            <span className="mt-1 flex items-center gap-1 opacity-55">
              <span className="h-px w-2.5 bg-itinerary-text/45" />
              <SolidPlane className="size-2" />
              <span className="h-px w-2.5 bg-itinerary-text/45" />
            </span>
          </div>

          <span className="mt-2.5 text-[0.62rem] uppercase tracking-[0.24em] opacity-55">
            Sealed until opened
          </span>
        </div>

        <div className="space-y-2 pr-16">
          <div className="h-px w-full bg-itinerary-text/25" />
          <div className="h-px w-4/5 bg-itinerary-text/25" />
          <div className="h-px w-3/5 bg-itinerary-text/25" />
        </div>
      </div>
    </div>
  );
}

/**
 * Flip host. The 3D rotation is driven by Motion so it can animate on mount.
 */
export function CardFaces({
  stop,
  seq,
  faceUp,
  size = "md",
  reduce,
  spin = false,
}: {
  stop: Stop;
  seq: number;
  faceUp: boolean;
  size?: "md" | "lg";
  reduce: boolean;
  spin?: boolean;
}) {
  return (
    <div className="h-full w-full [perspective:1600px]">
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        initial={spin ? { rotateY: 0 } : false}
        animate={{ rotateY: faceUp ? 180 : 0 }}
        transition={reduce ? { duration: 0.2 } : { duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
          <PostcardBack stop={stop} seq={seq} size={size} />
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
          <TravelCardFront stop={stop} size={size} />
        </div>
      </motion.div>
    </div>
  );
}
