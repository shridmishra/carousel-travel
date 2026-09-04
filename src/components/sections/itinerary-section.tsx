"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  Reorder,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane as LucidePlane } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Data — the stops on the journey                                           */
/* -------------------------------------------------------------------------- */

interface Stop {
  id: string;
  place: string;
  location: string;
  tag: string;
  blurb: string;
  photo: string;
  accent: string;
}

const ITINERARY: Stop[] = [
  {
    id: "cappadocia",
    place: "Cappadocia",
    location: "Göreme, Turkey",
    tag: "Top rated",
    blurb: "Dawn balloon ascent over the fairy chimneys, private launch.",
    photo: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=800&auto=format&fit=crop",
    accent: "#E8843C",
  },
  {
    id: "kyoto",
    place: "Kyoto",
    location: "Kansai, Japan",
    tag: "Member favourite",
    blurb: "A garden ryokan held for you, tea at first light.",
    photo: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    accent: "#E5647A",
  },
  {
    id: "amalfi",
    place: "Amalfi",
    location: "Campania, Italy",
    tag: "Signature",
    blurb: "Cliffside marina, a boat waiting whenever the water calls.",
    photo: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    accent: "#2E9BD6",
  },
  {
    id: "marrakech",
    place: "Marrakech",
    location: "Marrakesh-Safi, Morocco",
    tag: "Hidden gem",
    blurb: "A walled riad behind an unmarked door, courtyard to yourself.",
    photo: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=800&auto=format&fit=crop",
    accent: "#E0A43B",
  },
  {
    id: "reykjavik",
    place: "Reykjavík",
    location: "Höfuðborg, Iceland",
    tag: "Seasonal",
    blurb: "Aurora lodge off-grid, woken only if the sky performs.",
    photo: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800&auto=format&fit=crop",
    accent: "#3FB79A",
  },
];

/** Resting angles for cards hanging on the line. */
const HANG_TILTS = [-4, 3.5, -2.5, 4.5, -3.5];

const SWIPE_DISTANCE = 78;
const SWIPE_VELOCITY = 380;

/* Inline generated textures (no asset files, no network). */
const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Stretched fractal noise → streaky wood grain. */
const WOOD_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='140'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.014 0.12' numOctaves='4' seed='11' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)'/%3E%3C/svg%3E\")";

/** Low-frequency mottling → cork blotches. */
const CORK_BLOTCH_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='b'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='2' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23b)'/%3E%3C/svg%3E\")";

/** Fine high-frequency grain → painted-plaster wall tooth. */
const WALL_GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='wg'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wg)'/%3E%3C/svg%3E\")";

/** Soft low-frequency mottle → uneven plaster / paint roller cloudiness. */
const WALL_MOTTLE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='wm'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='3' seed='7' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wm)'/%3E%3C/svg%3E\")";

/** Turbulence-displaced patches → aged water stains / discoloured blotches. */
const WALL_STAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cfilter id='ws'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.006' numOctaves='4' seed='23'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.4 0 0 0 -0.55'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ws)'/%3E%3C/svg%3E\")";

/* -------------------------------------------------------------------------- */
/*  Small parts                                                               */
/* -------------------------------------------------------------------------- */




/** A solid filled aerodynamic silhouette plane icon used for buttons and stamps. */
function SolidPlane({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21 6.5c.6-.6.6-1.6 0-2.2-.6-.6-1.6-.6-2.2 0l-4.3 4.3-6.8-1.9-1.7 1.7 5 2.9-2.5 2.5-2.4-.5-1.3 1.3 3.2 1.7 1.7 3.2 1.3-1.3-.5-2.4 2.5-2.5 2.9 5 1.7-1.7-1.9-6.8L21 6.5Z" />
    </svg>
  );
}

/** A small location pin used on the compact card face. */
function MapPin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" fill="currentColor" />
    </svg>
  );
}

/** A wooden clothespin that clips the card to the line. */
function Clothespin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 30" className={className} aria-hidden>
      <rect x="6" y="1.5" width="4.2" height="27" rx="2" fill="#d8b06a" />
      <rect x="11.8" y="1.5" width="4.2" height="27" rx="2" fill="#c79a52" />
      <rect x="6" y="1.5" width="4.2" height="27" rx="2" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.5" />
      <rect x="11.8" y="1.5" width="4.2" height="27" rx="2" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.5" />
      <circle cx="11" cy="15" r="3.1" fill="none" stroke="#9a9a9a" strokeWidth="1.4" />
      <circle cx="11" cy="15" r="3.1" fill="none" stroke="#e6e6e6" strokeWidth="0.5" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Corkboard mementos — decorative, non-interactive collage pieces           */
/*                                                                            */
/*  Inspired by a travel pinboard: thumbtacks, washi tape, sticky notes,      */
/*  a boarding-pass stub, postage stamps and a hand-drawn route. All are      */
/*  pointer-events-none and paint behind the pegged cards.                    */
/* -------------------------------------------------------------------------- */

/** A domed thumbtack seen at a slight angle, with needle + contact shadow. */
function PushPin({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 26" className={className} aria-hidden>
      <rect x="11.3" y="9" width="1.4" height="14" rx="0.7" fill="#8b8f96" />
      <rect x="11.3" y="9" width="0.6" height="14" rx="0.3" fill="#c7ccd2" />
      <ellipse cx="12" cy="24" rx="2.6" ry="1" fill="rgba(0,0,0,0.28)" />
      <circle cx="12" cy="8" r="6.4" fill={color} />
      <circle cx="12" cy="8" r="6.4" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" />
      <circle cx="9.6" cy="5.6" r="2.1" fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}

/**
 * A strip of semi-translucent tape. Reads like real masking/washi tape:
 * a translucent tinted body you can see the surface through, a soft diagonal
 * sheen where light catches it, fine crinkle texture, and torn, uneven ends
 * (a slightly ragged mask on the left and right rather than a clean fade).
 */
function WashiTape({
  className,
  tone = "rgba(236,230,216,0.6)",
  rotate = 0,
}: {
  className?: string;
  tone?: string;
  rotate?: number;
}) {
  // Torn ends: an SVG mask whose left/right edges are a jagged, uneven line
  // (like tape ripped off a roll), soft in the middle so the body is solid.
  const tornMask =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='20' preserveAspectRatio='none'%3E%3Cpath d='M2,3 L4,1 L3,5 L5,2 L4,7 L6,3 L58,3 L60,1 L59,6 L61,2 L60,8 L62,3 L62,17 L60,19 L61,14 L59,18 L60,13 L58,17 L6,17 L4,19 L5,14 L3,18 L4,12 L2,17 Z' fill='%23fff'/%3E%3C/svg%3E\")";
  return (
    <span
      className={cn("relative block h-[1.15rem] w-16", className)}
      style={{
        transform: `rotate(${rotate}deg)`,
        // translucent body + soft vertical shading so the tape has body
        background: `linear-gradient(180deg, rgba(255,255,255,0.22), transparent 40%, rgba(0,0,0,0.06)), ${tone}`,
        // a very soft drop so it sits ON the surface, plus a faint inner edge
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.16), inset 0 0 0 0.5px rgba(255,255,255,0.25)",
        WebkitMaskImage: tornMask,
        maskImage: tornMask,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    >
      {/* diagonal sheen streak */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 46%, rgba(255,255,255,0.05) 54%, transparent 70%)",
        }}
      />
      {/* fine crinkle texture */}
      <span
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "90px 90px" }}
      />
    </span>
  );
}

/** A little pinned post-it with a curled corner and a short scrawl. */
function StickyNote({
  color,
  ink,
  rotate = 0,
  className,
  children,
}: {
  color: string;
  ink: string;
  rotate?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("relative h-[4.6rem] w-[4.6rem] p-2", className)}
      style={{
        transform: `rotate(${rotate}deg)`,
        backgroundColor: color,
        boxShadow: "0 8px 16px -8px rgba(50,35,12,0.55), inset 0 1px 0 rgba(255,255,255,0.35)",
      }}
    >
      <span
        className="flex h-full w-full items-center justify-center text-center text-[0.6rem] font-semibold italic leading-tight"
        style={{ color: ink }}
      >
        {children}
      </span>
      {/* curled bottom-right corner */}
      <span
        className="absolute bottom-0 right-0 h-3 w-3"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.18), transparent 60%)",
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
        }}
      />
    </div>
  );
}

/** A perforated-edge postage stamp with a tiny scene + code. */
function Stamp({
  code,
  hue,
  rotate = 0,
  className,
}: {
  code: string;
  hue: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("relative", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="p-1"
        style={{
          background: "#f3efe4",
          boxShadow: "0 4px 9px -4px rgba(40,28,10,0.6)",
          WebkitMask:
            "radial-gradient(circle 2px at 0 50%, transparent 99%, #000) 0 -3px / 100% 6px repeat-y, radial-gradient(circle 2px at 100% 50%, transparent 99%, #000) 0 -3px / 100% 6px repeat-y, radial-gradient(circle 2px at 50% 0, transparent 99%, #000) -3px 0 / 6px 100% repeat-x, radial-gradient(circle 2px at 50% 100%, transparent 99%, #000) -3px 0 / 6px 100% repeat-x, linear-gradient(#000, #000)",
          mask:
            "radial-gradient(circle 2px at 0 50%, transparent 99%, #000) 0 -3px / 100% 6px repeat-y, radial-gradient(circle 2px at 100% 50%, transparent 99%, #000) 0 -3px / 100% 6px repeat-y, radial-gradient(circle 2px at 50% 0, transparent 99%, #000) -3px 0 / 6px 100% repeat-x, radial-gradient(circle 2px at 50% 100%, transparent 99%, #000) -3px 0 / 6px 100% repeat-x, linear-gradient(#000, #000)",
        }}
      >
        <div
          className="flex h-9 w-8 flex-col items-center justify-end rounded-[2px] p-1"
          style={{ background: `linear-gradient(160deg, ${hue}, rgba(255,255,255,0.35))` }}
        >
          <span className="rounded-[1px] bg-white/80 px-1 text-[0.5rem] font-bold leading-none text-neutral-700">
            {code}
          </span>
        </div>
      </div>
    </div>
  );
}

/** A boarding-pass stub, torn on one edge. */
function BoardingStub({
  from,
  to,
  rotate = 0,
  className,
}: {
  from: string;
  to: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("relative w-24 overflow-hidden rounded-[3px]", className)}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: "#faf7ef",
        boxShadow: "0 10px 18px -10px rgba(40,28,10,0.6)",
      }}
    >
      <div className="h-1.5 w-full bg-[#2b6b6b]" />
      <div className="flex items-center justify-between px-2 py-1.5">
        <div className="leading-none">
          <p className="text-[0.72rem] font-black tracking-tight text-neutral-800">{from}</p>
          <p className="text-[0.4rem] uppercase tracking-[0.15em] text-neutral-400">from</p>
        </div>
        <svg viewBox="0 0 24 24" className="size-3 text-neutral-500" aria-hidden>
          <path
            d="M21 6.5c.6-.6.6-1.6 0-2.2-.6-.6-1.6-.6-2.2 0l-4.3 4.3-6.8-1.9-1.7 1.7 5 2.9-2.5 2.5-2.4-.5-1.3 1.3 3.2 1.7 1.7 3.2 1.3-1.3-.5-2.4 2.5-2.5 2.9 5 1.7-1.7-1.9-6.8L21 6.5Z"
            fill="currentColor"
          />
        </svg>
        <div className="text-right leading-none">
          <p className="text-[0.72rem] font-black tracking-tight text-neutral-800">{to}</p>
          <p className="text-[0.4rem] uppercase tracking-[0.15em] text-neutral-400">to</p>
        </div>
      </div>
      {/* torn perforation */}
      <div
        className="h-2 w-full"
        style={{
          background:
            "radial-gradient(circle 3px at 6px 0, transparent 98%, #c9a56e) 0 0 / 12px 8px repeat-x",
        }}
      />
    </div>
  );
}

/** A small taped photo — a stylised gradient scene, no network needed. */
function MiniPolaroid({
  scene,
  caption,
  rotate = 0,
  className,
}: {
  scene: string;
  caption: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("w-[4.6rem] bg-white p-1 pb-3", className)}
      style={{
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 10px 20px -10px rgba(40,28,10,0.6)",
      }}
    >
      <div className="h-12 w-full" style={{ background: scene }} />
      <p className="mt-1 text-center text-[0.5rem] font-semibold italic text-neutral-500">
        {caption}
      </p>
    </div>
  );
}

/** A die-cut luggage tag hung from a short knotted string. */
function LuggageTag({
  code,
  tone,
  rotate = 0,
  className,
}: {
  code: string;
  tone: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("relative flex flex-col items-center", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* knotted string loop */}
      <svg viewBox="0 0 20 16" className="h-4 w-5" aria-hidden>
        <path
          d="M10 14 C 4 10 4 4 10 3 C 16 4 16 10 10 14 Z"
          fill="none"
          stroke="#8a6a3c"
          strokeWidth="1.1"
        />
      </svg>
      {/* the tag body */}
      <div
        className="relative -mt-1 flex h-9 w-[3.4rem] items-center justify-center rounded-md px-1"
        style={{
          background: `linear-gradient(155deg, ${tone}, rgba(255,255,255,0.4))`,
          boxShadow: "0 8px 14px -8px rgba(40,28,10,0.6), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        {/* grommet eyelet */}
        <span className="absolute left-1/2 top-1 size-1.5 -translate-x-1/2 rounded-full border border-black/30 bg-white/70" />
        <span className="mt-1 text-[0.6rem] font-black uppercase tracking-[0.14em] text-neutral-700">
          {code}
        </span>
      </div>
    </div>
  );
}

/** A small hand-drawn ink compass rose doodle. */
function CompassDoodle({
  className,
  rotate = 0,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("text-[#4a3115]", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
      <circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="1.5 2" opacity="0.5" />
      {/* four-point star needle */}
      <path
        d="M24 5 L27 22 L44 24 L27 26 L24 43 L21 26 L5 24 L21 22 Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <circle cx="24" cy="24" r="1.6" fill="currentColor" />
      <text x="24" y="4.4" textAnchor="middle" fontSize="5" fontWeight="700" fill="currentColor" opacity="0.8">N</text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Card faces                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Mathematically tangent rounded corner cutout clip paths for the travel card photo.
 * Features a circular scoop around the top-right flight badge with smooth reverse
 * convex fillets connecting to the straight top and right edges (C1 tangent continuity).
 */
const TRAVEL_CARD_CLIP_LG =
  "M 0.0625 0 L 0.8294 0 A 0.0273 0.0286 0 0 1 0.8560 0.0351 A 0.0918 0.0959 0 0 0 0.9664 0.1505 A 0.0273 0.0286 0 0 1 1 0.1783 L 1 0.9347 A 0.0625 0.0653 0 0 1 0.9375 1 L 0.0625 1 A 0.0625 0.0653 0 0 1 0 0.9347 L 0 0.0653 A 0.0625 0.0653 0 0 1 0.0625 0 Z";

const TRAVEL_CARD_CLIP_MD =
  "M 0.0781 0 L 0.7726 0 A 0.0391 0.0368 0 0 1 0.8109 0.0439 A 0.1211 0.1140 0 0 0 0.9533 0.1780 A 0.0391 0.0368 0 0 1 1 0.2140 L 1 0.9265 A 0.0781 0.0735 0 0 1 0.9219 1 L 0.0781 1 A 0.0781 0.0735 0 0 1 0 0.9265 L 0 0.0735 A 0.0781 0.0735 0 0 1 0.0781 0 Z";

function TravelCardFront({ stop, size = "md" }: { stop: Stop; size?: "md" | "lg" }) {
  const lg = size === "lg";
  const btn = lg ? 40 : 26;
  const inset = lg ? 6 : 4;
  const rawId = React.useId();
  const clipId = `travel-card-clip-${rawId.replace(/:/g, "")}`;
  const clipD = lg ? TRAVEL_CARD_CLIP_LG : TRAVEL_CARD_CLIP_MD;

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden bg-itinerary-card text-neutral-900 ring-1 ring-black/5",
        lg ? "rounded-[1.35rem] p-3" : "rounded-[1rem] p-2",
      )}
    >
      <div className="relative min-h-0 flex-1">
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stop.photo}
            alt={`${stop.place}, ${stop.location}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

          {/* Compact card: place + location sit on the photo over a faded
              frosted-glass wash (progressive blur, strongest at the base and
              fading upward — not a hard-edged glass panel). */}
          {!lg && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0">
              {/* progressive frosted glass — layered blur that dissolves upward.
                  The mask ramps gradually the whole way so the blur has no hard
                  cut-off edge (which otherwise shows as a seam line across the
                  photo). */}
              <div
                className="absolute inset-0 backdrop-blur-lg backdrop-saturate-150"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to top, #000 0%, rgba(0,0,0,0.85) 45%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to top, #000 0%, rgba(0,0,0,0.85) 45%, transparent 100%)",
                }}
              />
              {/* darkening wash to seat the white text */}
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
          <LucidePlane className={lg ? "size-5" : "size-3.5"} strokeWidth={2} />
        </div>
      </div>

      <div className={cn("shrink-0", lg ? "px-1.5 pt-3" : "px-0.5 pt-1")}>
        {lg && (
          <>
            <div className="flex min-w-0 items-baseline justify-between gap-2">
              <h3 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight text-neutral-900 sm:text-[1.7rem]">
                {stop.place}
              </h3>
              <span className="shrink-0 text-right text-sm font-medium text-neutral-500">
                {stop.location}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{stop.blurb}</p>
          </>
        )}

        <Button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "group/book flex w-full items-center justify-center gap-1.5 rounded-full bg-neutral-900 font-semibold text-white transition-transform active:scale-[0.98] hover:bg-neutral-800",
            lg ? "mt-3 h-11 text-sm" : "mt-1 h-7 text-[0.68rem]",
          )}
        >
          Book Now
          <SolidPlane
            className={cn(
              "shrink-0 transition-transform duration-300 ease-out group-hover/book:translate-x-0.5",
              lg ? "size-4" : "size-3",
            )}
          />
        </Button>
      </div>
    </div>
  );
}

function PostcardBack({ stop, seq, size = "md" }: { stop: Stop; seq: number; size?: "md" | "lg" }) {
  const lg = size === "lg";
  // The country the sealed card is addressed to — a postmark hint that makes
  // each face-down card distinct without spoiling the place reveal.
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

          {/* Circular postmark — addressed to the country sealed inside, so no
              two face-down cards read the same. */}
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
 * - Deck cards: `faceUp={false}` → postcard back, static.
 * - Rope cards: `faceUp` + `spin={false}` → front, static.
 * - Spotlight (first reveal): `faceUp` + `spin` → flips back→front as it flies in.
 */
function CardFaces({
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
        transition={reduce ? { duration: 0.2 } : { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
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

/* -------------------------------------------------------------------------- */
/*  Airplane Ticket Card (Completion State - Horizontal)                      */
/* -------------------------------------------------------------------------- */

const TICKET_CLIP_PATH =
  "M 0.038 0 H 0.696 A 0.024 0.058 0 0 0 0.744 0 H 0.962 A 0.038 0.092 0 0 1 1 0.092 V 0.908 A 0.038 0.092 0 0 1 0.962 1 H 0.744 A 0.024 0.058 0 0 0 0.696 1 H 0.038 A 0.038 0.092 0 0 1 0 0.908 V 0.092 A 0.038 0.092 0 0 1 0.038 0 Z";

const BARCODE_STRIPES = [
  3, 1, 2, 1, 4, 1, 1, 2, 3, 1, 1, 4, 2, 1, 3, 1, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1,
];

function TravelStamp({ className }: { className?: string }) {
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

/** Jagged torn-edge clip path for the left side of the tear (right edge is jagged). */
const TORN_LEFT_CLIP =
  "polygon(0% 0%, 70.5% 0%, 70.5% 0%, 71.2% 3%, 70.4% 5.5%, 71.5% 8%, 70.2% 11%, 71.8% 13.5%, 70.6% 16%, 71.3% 19%, 70.1% 22%, 71.6% 24.5%, 70.3% 27%, 71.4% 30%, 70.5% 33%, 71.7% 35.5%, 70.2% 38%, 71.1% 41%, 70.8% 44%, 71.5% 47%, 70.3% 50%, 71.6% 53%, 70.4% 56%, 71.2% 59%, 70.7% 62%, 71.4% 65%, 70.1% 68%, 71.8% 70.5%, 70.5% 73%, 71.3% 76%, 70.6% 79%, 71.5% 82%, 70.2% 85%, 71.7% 87.5%, 70.4% 90%, 71.1% 93%, 70.8% 96%, 71.2% 100%, 0% 100%)";

/** Jagged torn-edge clip path for the right side of the tear (left edge is jagged). */
const TORN_RIGHT_CLIP =
  "polygon(0.8% 0%, 100% 0%, 100% 100%, 0.8% 100%, 0% 96%, 1.2% 93%, 0.3% 90%, 1.5% 87.5%, 0.2% 85%, 1.3% 82%, 0.5% 79%, 1.6% 76%, 0.3% 73%, 1.8% 70.5%, 0.1% 68%, 1.4% 65%, 0.7% 62%, 1.2% 59%, 0.4% 56%, 1.6% 53%, 0.3% 50%, 1.5% 47%, 0.8% 44%, 1.1% 41%, 0.2% 38%, 1.7% 35.5%, 0.5% 33%, 1.4% 30%, 0.3% 27%, 1.6% 24.5%, 0.2% 22%, 1.1% 19%, 0.6% 16%, 1.8% 13.5%, 0.2% 11%, 1.5% 8%, 0.4% 5.5%, 1.2% 3%, 0.5% 0%)";

function AirplaneTicketCard({
  reduce = false,
  onTear,
}: {
  reduce?: boolean;
  onTear?: () => void;
}) {
  const rawId = React.useId();
  const clipId = `ticket-clip-${rawId.replace(/:/g, "")}`;
  const [phase, setPhase] = React.useState<"intact" | "tearing" | "fading">("intact");
  const [hovering, setHovering] = React.useState(false);

  const handleTear = React.useCallback(() => {
    if (phase !== "intact") return;
    setPhase("tearing");
  }, [phase]);

  const tearDuration = reduce ? 0.3 : 0.7;

  // After the tear animation completes, transition to fading phase
  React.useEffect(() => {
    if (phase !== "tearing") return;
    const t = window.setTimeout(() => setPhase("fading"), tearDuration * 1000 + 100);
    return () => window.clearTimeout(t);
  }, [phase, tearDuration]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative h-full w-full"
    >
      {/* SVG Clip Path Definition */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={TICKET_CLIP_PATH} />
          </clipPath>
        </defs>
      </svg>

      {/* === INTACT TICKET (shown before tearing) === */}
      <AnimatePresence>
        {phase === "intact" && (
          <motion.div
            className="relative h-full w-full [filter:drop-shadow(0_14px_28px_rgba(0,0,0,0.08))_drop-shadow(0_4px_10px_rgba(0,0,0,0.04))]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.01 }}
          >
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

                  {/* Travel Rubber Stamp */}
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

              {/* TEAR-OFF STUB (Right 28%) */}
              <div
                className="relative flex h-full w-[28%] flex-col items-center justify-between bg-ticket-stub/40 p-3 py-4 sm:p-4 text-center cursor-pointer group/stub"
                onClick={handleTear}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                role="button"
                tabIndex={0}
                aria-label="Tear ticket to replay"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleTear();
                  }
                }}
              >
                <Badge
                  variant="outline"
                  className="h-4 rounded-[3px] border-ticket-perforation bg-ticket-bg/80 px-1.5 text-[0.48rem] font-bold uppercase tracking-wider text-ticket-muted"
                >
                  Gate 01
                </Badge>

                {/* Barcode */}
                <div className="flex flex-col items-center gap-1 my-auto">
                  <div className="flex h-6 sm:h-7 items-stretch justify-center gap-[1.5px] opacity-85" aria-hidden>
                    {BARCODE_STRIPES.map((w, idx) => (
                      <span
                        key={idx}
                        style={{ width: `${w}px` }}
                        className="bg-ticket-foreground shrink-0 rounded-[0.2px]"
                      />
                    ))}
                  </div>
                  <p className="text-[0.44rem] font-medium tracking-[0.16em] text-ticket-muted uppercase">
                    MDR · 2026
                  </p>
                </div>

                {/* Replay text — replaces "1st Class" */}
                <motion.span
                  className="text-[0.52rem] font-bold uppercase tracking-[0.18em] text-ticket-muted transition-colors group-hover/stub:text-ticket-foreground"
                  animate={hovering ? { x: [0, 1.5, -1, 0.5, 0] } : { x: 0 }}
                  transition={hovering ? { duration: 0.4, ease: "easeInOut" } : { duration: 0.2 }}
                >
                  ✂ Replay
                </motion.span>
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* === TORN HALVES (shown when tearing) === */}
      <AnimatePresence
        onExitComplete={() => {
          setPhase("intact");
          onTear?.();
        }}
      >
        {phase === "tearing" && (
          <>
            {/* LEFT HALF — the main boarding pass body */}
            <motion.div
              key="torn-left"
              className="absolute inset-0 origin-bottom-left [filter:drop-shadow(0_14px_28px_rgba(0,0,0,0.12))_drop-shadow(0_4px_10px_rgba(0,0,0,0.06))]"
              initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              animate={{
                x: "-12%",
                y: "18%",
                rotate: -7,
                opacity: 1,
              }}
              exit={{ opacity: 0, y: "40%" }}
              transition={{
                duration: tearDuration,
                ease: [0.32, 0, 0.67, 0],
              }}
            >
              <div
                className="relative flex h-full w-full overflow-hidden bg-ticket-bg text-ticket-foreground select-none"
                style={{ clipPath: TORN_LEFT_CLIP }}
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
                  <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-ticket-muted opacity-70">
                    5 Stops Confirmed
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT HALF — the tear-off stub */}
            <motion.div
              key="torn-right"
              className="absolute inset-0 origin-bottom-right [filter:drop-shadow(0_14px_28px_rgba(0,0,0,0.12))_drop-shadow(0_4px_10px_rgba(0,0,0,0.06))]"
              initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              animate={{
                x: "10%",
                y: "22%",
                rotate: 8,
                opacity: 1,
              }}
              exit={{ opacity: 0, y: "40%" }}
              transition={{
                duration: tearDuration,
                ease: [0.32, 0, 0.67, 0],
              }}
            >
              <div
                className="relative flex h-full w-full items-stretch overflow-hidden bg-ticket-bg text-ticket-foreground select-none"
                style={{ clipPath: TORN_RIGHT_CLIP }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
                  style={{ backgroundImage: GRAIN_URI, backgroundSize: "140px 140px" }}
                />
                {/* Spacer matching the left body width so content aligns at 72%+ */}
                <div className="w-[72%] shrink-0" />
                <div className="relative flex h-full w-[28%] flex-col items-center justify-between bg-ticket-stub/40 p-3 py-4 sm:p-4 text-center">
                  <Badge
                    variant="outline"
                    className="h-4 rounded-[3px] border-ticket-perforation bg-ticket-bg/80 px-1.5 text-[0.48rem] font-bold uppercase tracking-wider text-ticket-muted"
                  >
                    Gate 01
                  </Badge>
                  <div className="flex flex-col items-center gap-1 my-auto">
                    <div className="flex h-6 sm:h-7 items-stretch justify-center gap-[1.5px] opacity-85" aria-hidden>
                      {BARCODE_STRIPES.map((w, idx) => (
                        <span
                          key={idx}
                          style={{ width: `${w}px` }}
                          className="bg-ticket-foreground shrink-0 rounded-[0.2px]"
                        />
                      ))}
                    </div>
                    <p className="text-[0.44rem] font-medium tracking-[0.16em] text-ticket-muted uppercase">
                      MDR · 2026
                    </p>
                  </div>
                  <span className="text-[0.52rem] font-bold uppercase tracking-[0.18em] text-ticket-muted">
                    ✂ Replay
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const CARD_SPRING = { type: "spring" as const, stiffness: 240, damping: 28, mass: 0.9 };

/**
 * A single card pegged to the line. It's a `Reorder.Item` so it can be dragged
 * left/right to reorder the line into any sequence. A drag is distinguished
 * from a click by tracking pointer travel, so dragging never fires `onOpen`.
 */
function PeggedCard({
  id,
  index,
  stop,
  seq,
  isActive,
  reduce,
  onOpen,
}: {
  id: string;
  index: number;
  stop: Stop;
  seq: number;
  isActive: boolean;
  reduce: boolean;
  onOpen: (id: string) => void;
}) {
  const tilt = HANG_TILTS[index % HANG_TILTS.length];
  const [dragging, setDragging] = React.useState(false);
  const moved = React.useRef(false);
  const start = React.useRef({ x: 0, y: 0 });

  // The active card leaves an empty slot in the line (it's up in the spotlight).
  if (isActive) {
    return (
      <Reorder.Item
        value={id}
        as="div"
        drag={false}
        layout
        transition={reduce ? { duration: 0.2 } : CARD_SPRING}
        className="w-32 shrink-0 sm:w-36"
        style={{ aspectRatio: "0.65", visibility: "hidden" }}
      />
    );
  }

  return (
    <Reorder.Item
      value={id}
      as="div"
      layoutId={`stop-${id}`}
      transition={reduce ? { duration: 0.2 } : CARD_SPRING}
      whileDrag={{ scale: 1.06, zIndex: 40 }}
      onDragStart={() => {
        moved.current = true;
        setDragging(true);
      }}
      onDragEnd={() => {
        setDragging(false);
        // Let the click that follows the drag be swallowed.
        setTimeout(() => (moved.current = false), 0);
      }}
      onPointerDown={(e) => {
        moved.current = false;
        start.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerMove={(e) => {
        if (
          Math.abs(e.clientX - start.current.x) > 6 ||
          Math.abs(e.clientY - start.current.y) > 6
        ) {
          moved.current = true;
        }
      }}
      onClick={() => {
        if (!moved.current) onOpen(id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(id);
        }
      }}
      className={cn(
        "relative w-32 shrink-0 rounded-[1rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:w-36",
        dragging ? "cursor-grabbing" : "cursor-grab",
      )}
      style={{ aspectRatio: "0.65", touchAction: "none" }}
      role="button"
      tabIndex={0}
      aria-label={`View ${stop.place}. Drag to reorder.`}
    >
      <motion.div
        className="relative h-full w-full origin-top"
        animate={
          dragging
            ? { rotate: 0 }
            : reduce
              ? { rotate: tilt }
              : { rotate: [tilt - 1.1, tilt + 1.1, tilt - 1.1] }
        }
        transition={
          dragging || reduce
            ? { duration: 0.25 }
            : { duration: 4.5 + (index % 3) * 0.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div className="absolute inset-x-2 bottom-1 top-4 rounded-[1rem] bg-black/35 blur-md" />
        <div className="pointer-events-none relative h-full w-full">
          <CardFaces stop={stop} seq={seq} faceUp reduce={reduce} />
        </div>
        <div className="absolute -top-6 left-1/2 z-10 -translate-x-1/2">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={reduce ? { duration: 0.2 } : { delay: 0.18, duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Clothespin className="h-8 w-6 drop-shadow-[0_3px_3px_rgba(0,0,0,0.4)]" />
          </motion.div>
        </div>
      </motion.div>
    </Reorder.Item>
  );
}

export function ItinerarySection() {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState<string | null>(null);
  const [order, setOrder] = React.useState<string[]>([]); // reveal order → hangs L→R

  const revealed = React.useMemo(() => new Set(order), [order]);
  const activeStop = active ? ITINERARY.find((s) => s.id === active) ?? null : null;
  const alreadyRevealed = active ? revealed.has(active) : false;

  const deck = ITINERARY.filter((s) => !revealed.has(s.id) && s.id !== active);
  const topStop = deck[0];
  const allRevealed = order.length === ITINERARY.length;

  const seqOf = React.useCallback(
    (id: string) => ITINERARY.findIndex((s) => s.id === id) + 1,
    [],
  );

  const open = React.useCallback((id: string) => setActive(id), []);

  const hang = React.useCallback(() => {
    if (!active) return;
    const id = active;
    setOrder((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActive(null);
  }, [active]);

  const reset = React.useCallback(() => {
    setActive(null);
    setOrder([]);
  }, []);

  // A fresh reveal from the deck shouldn't linger at centre. Let the flip play,
  // then send it straight to the rope with no pause. Re-viewing a pegged card
  // stays open until the user dismisses it.
  React.useEffect(() => {
    if (!active || alreadyRevealed) return;
    const flip = reduce ? 220 : 820;
    const t = window.setTimeout(hang, flip);
    return () => window.clearTimeout(t);
  }, [active, alreadyRevealed, reduce, hang]);

  React.useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hang();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, hang]);

  const handleDeckDragEnd = (_e: unknown, info: PanInfo) => {
    if (!topStop) return;
    const { x, y } = info.offset;
    const { x: vx, y: vy } = info.velocity;
    const passed =
      Math.abs(x) > SWIPE_DISTANCE ||
      Math.abs(y) > SWIPE_DISTANCE ||
      Math.abs(vx) > SWIPE_VELOCITY ||
      Math.abs(vy) > SWIPE_VELOCITY;
    if (passed) open(topStop.id);
  };

  return (
    <section
      className="relative isolate min-h-screen w-full overflow-hidden text-neutral-900"
      style={{
        backgroundColor: "#ece5d7",
        backgroundImage:
          "radial-gradient(120% 90% at 15% 0%, #f3ede0 0%, #e7ddca 55%, #ddd0b6 100%)",
      }}
    >
      {/* Old painted-plaster wall the pinboard hangs on. Layers, back to front:
          discoloured stains → uneven cloudiness → fine tooth → hairline cracks
          → aged edge grime → soft daylight. */}
      {/* aged water stains / discolouration */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
        style={{ backgroundImage: WALL_STAIN_URI, backgroundSize: "900px 900px" }}
      />
      {/* uneven paint cloudiness */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-multiply"
        style={{ backgroundImage: WALL_MOTTLE_URI, backgroundSize: "460px 460px" }}
      />
      {/* fine plaster tooth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-multiply"
        style={{ backgroundImage: WALL_GRAIN_URI, backgroundSize: "160px 160px" }}
      />


      {/* aged grime settling in the corners + soft daylight from top-left */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(90,70,45,0.14)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_110%_at_18%_-12%,rgba(255,252,244,0.7),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.06]" />

      {/* Scattered mementos pinned to the wall — decorative, edge whitespace only */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
        {/* beside the title, left: a luggage tag on a string */}
        <div className="absolute left-[9%] top-20 hidden lg:block xl:left-[14%]">
          <LuggageTag code="MDR" tone="#e0a43b" rotate={-8} />
        </div>

        {/* beside the title, right: an ink compass doodle */}
        <div className="absolute right-[10%] top-16 hidden lg:block xl:right-[15%]">
          <CompassDoodle className="h-14 w-14 opacity-70" rotate={9} />
        </div>

        {/* left edge: a taped polaroid + pin */}
        <div className="absolute left-6 top-[19rem] hidden 2xl:block">
          <WashiTape rotate={-16} className="absolute -left-2 -top-2 z-10 w-12" tone="rgba(210,200,180,0.6)" />
          <MiniPolaroid
            scene="linear-gradient(155deg,#e08a4c,#c65b73 65%,#7a5cc0)"
            caption="the trip"
            rotate={-8}
          />
        </div>

        {/* left edge lower: a postage stamp */}
        <div className="absolute left-10 top-[32rem] hidden 2xl:block">
          <Stamp code="RVK" hue="#3fb79a" rotate={-9} />
        </div>

        {/* right edge upper: a sticky note */}
        <div className="absolute right-10 top-[24rem] hidden 2xl:block">
          <StickyNote color="#bfe6c9" ink="#2f6b45" rotate={6}>
            pack
            <br />
            light
          </StickyNote>
          <PushPin color="#d64a4a" className="absolute -top-3 left-1/2 h-5 w-5 -translate-x-1/2 drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)]" />
        </div>

        {/* right edge lower: a taped mini-polaroid */}
        <div className="absolute right-8 top-[40rem] hidden 2xl:block">
          <WashiTape rotate={16} className="absolute -right-1 -top-2 z-10 w-11" tone="rgba(230,120,140,0.5)" />
          <MiniPolaroid
            scene="linear-gradient(150deg,#8bc0a0,#5a86b9 70%,#e3d08c)"
            caption="the view"
            rotate={7}
          />
        </div>

        {/* bottom-left: a stray polaroid */}
        <div className="absolute bottom-28 left-10 hidden 2xl:block">
          <MiniPolaroid
            scene="linear-gradient(160deg,#6fb3d0,#b98a5a 70%,#e3c98c)"
            caption="someday"
            rotate={5}
          />
          <PushPin color="#f0b429" className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)]" />
        </div>

        {/* bottom-left lower: a yellow sticky */}
        <div className="absolute bottom-10 left-16 hidden 2xl:block">
          <StickyNote color="#fce98a" ink="#7a5c12" rotate={-7}>
            next
            <br />
            summer
          </StickyNote>
        </div>

        {/* bottom-right: a boarding stub */}
        <div className="absolute bottom-16 right-12 hidden 2xl:block">
          <BoardingStub from="JFK" to="CDG" rotate={8} />
          <PushPin color="#3a7bd5" className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)]" />
        </div>
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-16 sm:px-8 lg:py-20">
        {/* Header */}
        <header className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="flex items-center justify-center gap-2.5">
            <span className="inline-block size-2 rotate-45 bg-itinerary-accent" />
            <span className="font-sans text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-neutral-500">
              The Itinerary
            </span>
          </div>
          <h2 className="mt-5 pb-1 text-[2.75rem] font-black leading-[1.2] tracking-[-0.035em] text-neutral-900 sm:text-6xl">
            Places you&rsquo;ll go,
            <br />
            with us.
          </h2>
        </header>

        {/* The board: wooden frame + cork centre, rope strung inside */}
        <div className="mt-12 lg:mt-14">
          <div
            className="relative rounded-[1.9rem] p-3.5 shadow-[0_28px_60px_-28px_rgba(60,40,15,0.55)] sm:p-5"
            style={{ backgroundImage: "linear-gradient(158deg,#9a6a3a 0%,#734c26 46%,#5a3c20 100%)" }}
          >
            {/* wood grain */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[1.9rem] opacity-55 mix-blend-overlay"
              style={{ backgroundImage: WOOD_URI, backgroundSize: "260px 140px" }}
            />
            {/* long grain streaks */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[1.9rem] opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(176deg, rgba(0,0,0,0.05) 0 3px, transparent 3px 10px)",
              }}
            />
            {/* frame bevel */}
            <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] shadow-[inset_0_2px_3px_rgba(255,255,255,0.28),inset_0_-4px_8px_rgba(0,0,0,0.4)]" />

            {/* Mementos resting on the wooden frame itself (the border strip),
                sitting above the cork so they read as taped to the wood. */}
            <div className="pointer-events-none absolute inset-0 z-20 select-none" aria-hidden>
              {/* boarding stub taped to the top-left of the wood rail */}
              <div className="absolute -top-2 left-8 hidden sm:block">
                <BoardingStub from="LHR" to="KIX" rotate={-6} />
                <WashiTape rotate={-18} className="absolute -left-2 top-1 w-11" tone="rgba(240,235,222,0.8)" />
              </div>

              {/* stamps taped to the top-right of the wood rail */}
              <div className="absolute right-9 top-0 hidden gap-1.5 sm:flex">
                <Stamp code="PAR" hue="#e0a43b" rotate={5} />
                <Stamp code="TYO" hue="#e5647a" rotate={-7} className="mt-1.5" />
              </div>
            </div>

            {/* Cork / cardboard centre.
                No overflow-hidden here — a card flying in from centre would be
                clipped by it. Only the decorative texture layers are clipped
                (below); the card stage sits unclipped on top. */}
            <div
              className="relative rounded-[1.2rem] shadow-[inset_0_2px_22px_rgba(60,38,15,0.4)] ring-1 ring-black/25"
              style={{ backgroundColor: "#c9a56e" }}
            >
              {/* Clipped decoration layer — textures rounded to the cork's edge */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.2rem]" aria-hidden>
                {/* fine cork speckle */}
                <div
                  className="absolute inset-0 opacity-[0.4] mix-blend-multiply"
                  style={{ backgroundImage: GRAIN_URI, backgroundSize: "120px 120px" }}
                />
                {/* coarse cork mottling */}
                <div
                  className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
                  style={{ backgroundImage: CORK_BLOTCH_URI, backgroundSize: "220px 220px" }}
                />
                {/* top light + edge vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(255,240,210,0.3),transparent_55%)]" />
                <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(70,45,20,0.45)]" />

                {/* hand-drawn route, kept subtle in the lower band */}
                <svg
                  className="absolute inset-x-0 bottom-0 h-1/2 w-full opacity-[0.16]"
                  viewBox="0 0 100 30"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M10,24 C28,10 48,26 66,14 S90,10 96,18"
                    fill="none"
                    stroke="#4a3115"
                    strokeWidth="0.5"
                    strokeDasharray="2 2.4"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle cx="10" cy="24" r="1" fill="#4a3115" />
                  <circle cx="66" cy="14" r="1" fill="#4a3115" />
                </svg>

                {/* one sticky note pinned in the bottom-right corner of the cork */}
                <div className="absolute bottom-4 right-5 hidden lg:block">
                  <StickyNote color="#fce98a" ink="#7a5c12" rotate={-5}>
                    wish you
                    <br />
                    were here
                  </StickyNote>
                  <PushPin color="#d64a4a" className="absolute -top-3 left-1/2 h-5 w-5 -translate-x-1/2 drop-shadow-[0_3px_3px_rgba(0,0,0,0.35)]" />
                </div>
              </div>

              {/* Inner padded stage with the rope */}
              <div className="relative min-h-[17rem] px-5 pb-8 pt-12 sm:px-9 sm:pt-14">
                {/* Rope with a gentle sag, anchored to the frame */}
                <div className="pointer-events-none absolute inset-x-6 top-8 sm:inset-x-10">
                  <span className="absolute -left-1.5 -top-1 size-3 rounded-full bg-[#5a3c20] shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                  <span className="absolute -right-1.5 -top-1 size-3 rounded-full bg-[#5a3c20] shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                  <svg className="h-6 w-full" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden>
                    <path d="M0,2 Q50,10 100,2" fill="none" stroke="#3f2a15" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
                    <path d="M0,2 Q50,10 100,2" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>

                {order.length === 0 ? (
                  <p className="pt-16 text-center text-sm font-medium text-[#5c4a2f]/60">
                    The line is empty. Reveal a card to peg your first stop.
                  </p>
                ) : (
                  <Reorder.Group
                    axis="x"
                    values={order}
                    onReorder={setOrder}
                    as="div"
                    className="relative flex flex-wrap items-start justify-center gap-x-6 gap-y-12 pt-1 sm:gap-x-9"
                  >
                    {order.map((id, i) => (
                      <PeggedCard
                        key={id}
                        id={id}
                        index={i}
                        stop={ITINERARY.find((s) => s.id === id)!}
                        seq={seqOf(id)}
                        isActive={id === active}
                        reduce={!!reduce}
                        onOpen={open}
                      />
                    ))}
                  </Reorder.Group>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* The stack (draw pile) */}
        <div className="mt-14 flex flex-col items-center gap-6">
          {allRevealed ? (
            <div className="relative aspect-[2.4/1] w-80 sm:w-[26rem]">
              <AirplaneTicketCard reduce={!!reduce} onTear={reset} />
            </div>
          ) : (
            <div className="relative aspect-[0.72] w-48 sm:w-52">
              {deck
                .map((stop, i) => ({ stop, i }))
                .reverse()
                .map(({ stop, i }) => {
                  const isTop = i === 0;
                  const depth = i;
                  return (
                    <motion.div
                      key={stop.id}
                      layoutId={`stop-${stop.id}`}
                      transition={reduce ? { duration: 0.2 } : CARD_SPRING}
                      className={cn(
                        "absolute inset-0",
                        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
                      )}
                      style={{ zIndex: 30 - depth }}
                      drag={isTop ? true : false}
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      dragElastic={0.5}
                      dragMomentum={false}
                      onDragEnd={isTop ? handleDeckDragEnd : undefined}
                      onTap={isTop ? () => open(stop.id) : undefined}
                      whileDrag={{ scale: 1.05 }}
                      aria-hidden={!isTop}
                    >
                      <motion.div
                        className="h-full w-full"
                        animate={{
                          y: reduce ? 0 : depth * 9,
                          x: reduce ? 0 : depth * 6,
                          rotate: reduce ? 0 : depth * 2.5,
                          scale: 1 - depth * 0.045,
                        }}
                        transition={reduce ? { duration: 0.2 } : CARD_SPRING}
                      >
                        <CardFaces stop={stop} seq={seqOf(stop.id)} faceUp={false} reduce={!!reduce} />
                      </motion.div>
                    </motion.div>
                  );
                })}
            </div>
          )}

          {!allRevealed && (
            <p className="flex items-center gap-2 text-xs font-medium tracking-wide text-neutral-400">
              <span className="hidden sm:inline">Swipe or tap the top card</span>
              <span className="sm:hidden">Tap the top card</span>
              <span aria-hidden className="text-neutral-300">·</span>
              <span>{deck.length} sealed</span>
            </p>
          )}
        </div>
      </div>

      {/* Scrim — its own presence so it fades independently of the card. */}
      <AnimatePresence>
        {activeStop &&
          (alreadyRevealed ? (
            // Re-viewing a pegged card: dark modal backdrop, click to dismiss.
            <motion.div
              key="scrim"
              role="button"
              tabIndex={0}
              aria-label="Peg it to the line"
              onClick={hang}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
                  e.preventDefault();
                  hang();
                }
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.15 : 0.3 }}
              className="fixed inset-0 z-40 cursor-pointer bg-black/70"
            />
          ) : (
            // Fresh deck reveal: a light, non-interactive dim. No blur, so the
            // fly to the rope stays crisp and smooth.
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.12 : 0.22 }}
              className="pointer-events-none fixed inset-0 z-40 bg-black/35"
            />
          ))}
      </AnimatePresence>

      {/* Spotlight card — deliberately OUTSIDE AnimatePresence. It unmounts the
          instant we hang, so only one element ever owns the shared layoutId and
          the rope card animates cleanly from here. One continuous motion, no
          doubling, no glitch. */}
      {activeStop && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-5">
          <motion.div
            layoutId={`stop-${activeStop.id}`}
            transition={reduce ? { duration: 0.2 } : CARD_SPRING}
            className="pointer-events-auto relative w-full max-w-[19rem] sm:max-w-[21rem]"
            style={{
              aspectRatio: "0.72",
              filter: reduce ? undefined : "drop-shadow(0 24px 45px rgba(0,0,0,0.3))",
            }}
          >
            <CardFaces
              stop={activeStop}
              seq={seqOf(activeStop.id)}
              faceUp
              spin={!alreadyRevealed}
              size="lg"
              reduce={!!reduce}
            />
          </motion.div>
        </div>
      )}
    </section>
  );
}
