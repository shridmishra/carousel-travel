import * as React from "react";
import { cn } from "@/lib/utils";
import { GRAIN_URI } from "../textures";

/** A domed thumbtack seen at a slight angle, with needle + contact shadow. */
export function PushPin({ color, className }: { color: string; className?: string }) {
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
 * A strip of semi-translucent tape with torn ends and crinkle texture.
 */
export function WashiTape({
  className,
  tone = "rgba(236,230,216,0.6)",
  rotate = 0,
}: {
  className?: string;
  tone?: string;
  rotate?: number;
}) {
  const tornMask =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='20' preserveAspectRatio='none'%3E%3Cpath d='M2,3 L4,1 L3,5 L5,2 L4,7 L6,3 L58,3 L60,1 L59,6 L61,2 L60,8 L62,3 L62,17 L60,19 L61,14 L59,18 L60,13 L58,17 L6,17 L4,19 L5,14 L3,18 L4,12 L2,17 Z' fill='%23fff'/%3E%3C/svg%3E\")";
  return (
    <span
      className={cn("relative block h-[1.15rem] w-16", className)}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: `linear-gradient(180deg, rgba(255,255,255,0.22), transparent 40%, rgba(0,0,0,0.06)), ${tone}`,
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
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 46%, rgba(255,255,255,0.05) 54%, transparent 70%)",
        }}
      />
      <span
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "90px 90px" }}
      />
    </span>
  );
}

/** A pinned post-it with a curled corner and short message. */
export function StickyNote({
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
export function Stamp({
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
export function BoardingStub({
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

/** A small taped photo polaroid. */
export function MiniPolaroid({
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
export function LuggageTag({
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
      <svg viewBox="0 0 20 16" className="h-4 w-5" aria-hidden>
        <path
          d="M10 14 C 4 10 4 4 10 3 C 16 4 16 10 10 14 Z"
          fill="none"
          stroke="#8a6a3c"
          strokeWidth="1.1"
        />
      </svg>
      <div
        className="relative -mt-1 flex h-9 w-[3.4rem] items-center justify-center rounded-md px-1"
        style={{
          background: `linear-gradient(155deg, ${tone}, rgba(255,255,255,0.4))`,
          boxShadow: "0 8px 14px -8px rgba(40,28,10,0.6), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        <span className="absolute left-1/2 top-1 size-1.5 -translate-x-1/2 rounded-full border border-black/30 bg-white/70" />
        <span className="mt-1 text-[0.6rem] font-black uppercase tracking-[0.14em] text-neutral-700">
          {code}
        </span>
      </div>
    </div>
  );
}

/** A small hand-drawn ink compass rose doodle. */
export function CompassDoodle({
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
