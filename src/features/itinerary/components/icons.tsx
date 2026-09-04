import * as React from "react";

/** A solid filled aerodynamic silhouette plane icon used for buttons and stamps. */
export function SolidPlane({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21 6.5c.6-.6.6-1.6 0-2.2-.6-.6-1.6-.6-2.2 0l-4.3 4.3-6.8-1.9-1.7 1.7 5 2.9-2.5 2.5-2.4-.5-1.3 1.3 3.2 1.7 1.7 3.2 1.3-1.3-.5-2.4 2.5-2.5 2.9 5 1.7-1.7-1.9-6.8L21 6.5Z" />
    </svg>
  );
}

/** A small location pin used on the compact card face. */
export function MapPin({ className }: { className?: string }) {
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
export function Clothespin({ className }: { className?: string }) {
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
