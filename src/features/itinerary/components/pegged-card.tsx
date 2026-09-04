"use client";

import * as React from "react";
import { motion, Reorder, type Transition } from "motion/react";
import { cn } from "@/lib/utils";
import type { Stop } from "../types";
import { HANG_TILTS } from "../data/stops";
import { Clothespin } from "./icons";
import { CardFaces } from "./travel-card";

export const CARD_SPRING = { type: "spring" as const, stiffness: 140, damping: 20, mass: 1.0 };
export const REPLAY_SPRING = { type: "spring" as const, stiffness: 140, damping: 20, mass: 1.0 };

/**
 * A single card pegged to the line. It's a `Reorder.Item` so it can be dragged
 * left/right to reorder the line into any sequence.
 */
export function PeggedCard({
  id,
  index,
  stop,
  seq,
  isActive,
  reduce,
  onOpen,
  transition: customTransition,
}: {
  id: string;
  index: number;
  stop: Stop;
  seq: number;
  isActive: boolean;
  reduce: boolean;
  onOpen: (id: string) => void;
  transition?: Transition;
}) {
  const tilt = HANG_TILTS[index % HANG_TILTS.length];
  const itemTransition = reduce ? { duration: 0.2 } : (customTransition || CARD_SPRING);
  const [dragging, setDragging] = React.useState(false);
  const moved = React.useRef(false);
  const start = React.useRef({ x: 0, y: 0 });

  if (isActive) {
    return (
      <Reorder.Item
        value={id}
        as="div"
        drag={false}
        layout
        transition={itemTransition}
        className="w-32 shrink-0 sm:w-36"
        style={{ aspectRatio: "0.65", visibility: "hidden" }}
      />
    );
  }

  return (
    <Reorder.Item
      data-pegged-card="true"
      value={id}
      as="div"
      layoutId={`stop-${id}`}
      transition={itemTransition}
      whileDrag={{ scale: 1.06, zIndex: 40 }}
      onDragStart={() => {
        moved.current = true;
        setDragging(true);
      }}
      onDragEnd={() => {
        setDragging(false);
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
              : { rotate: [tilt - 1.2, tilt + 1.2, tilt - 1.2] }
        }
        transition={
          dragging || reduce
            ? { duration: 0.2 }
            : {
                duration: 4.2 + (index % 3) * 0.8,
                repeat: Infinity,
                ease: [0.45, 0.05, 0.55, 0.95],
              }
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
            transition={
              reduce
                ? { duration: 0.15 }
                : { delay: 0.05, duration: 0.18, ease: [0.23, 1, 0.32, 1] }
            }
          >
            <Clothespin className="h-8 w-6 drop-shadow-[0_3px_3px_rgba(0,0,0,0.4)]" />
          </motion.div>
        </div>
      </motion.div>
    </Reorder.Item>
  );
}
