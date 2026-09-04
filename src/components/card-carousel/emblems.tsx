import type { EmblemKey } from "./data";

interface EmblemProps {
  emblem: EmblemKey;
  className?: string;
}

/**
 * Minimal single-stroke line emblems, one per destination.
 * Drawn on a 32x32 grid, inheriting stroke via currentColor.
 */
export function Emblem({ emblem, className }: EmblemProps) {
  const common = {
    className,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (emblem) {
    case "waves":
      return (
        <svg {...common}>
          <path d="M3 12c2.6 0 2.6 2.4 5.2 2.4S10.8 12 13.4 12s2.6 2.4 5.2 2.4S21.2 12 23.8 12s2.6 2.4 5.2 2.4" />
          <path d="M3 19c2.6 0 2.6 2.4 5.2 2.4S10.8 19 13.4 19s2.6 2.4 5.2 2.4S21.2 19 23.8 19s2.6 2.4 5.2 2.4" />
          <path d="M3 26c2.6 0 2.6 2.4 5.2 2.4" opacity="0.5" />
        </svg>
      );
    case "torii":
      return (
        <svg {...common}>
          <path d="M4 8c8-2.5 16-2.5 24 0" />
          <path d="M5 12h22" />
          <path d="M8 12v16M24 12v16" />
          <path d="M8 17h16" />
        </svg>
      );
    case "arch":
      return (
        <svg {...common}>
          <path d="M9 28V16a7 7 0 0 1 14 0v12" />
          <path d="M16 9V4" />
          <path d="M13 4h6" />
          <path d="M9 28h14" />
          <path d="M16 28v-6a3 3 0 0 0-3 3" opacity="0.55" />
        </svg>
      );
    case "aurora":
      return (
        <svg {...common}>
          <path d="M6 24c1-9 4-13 6.5-13S16 18 18 18s3.5-9 6-9" opacity="0.9" />
          <path d="M9 25c1-7 3.4-10 5.4-10s2.9 6 4.6 6 2.8-7 4.8-7" opacity="0.55" />
          <path d="M4 27h24" />
        </svg>
      );
    case "peak":
      return (
        <svg {...common}>
          <path d="M3 26 13 8l5 8 3-4 8 14z" />
          <path d="m10 13 3 3 2.5-2.5" opacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
}
