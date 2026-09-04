"use client";

import * as React from "react";
import { motion, Reorder, useDragControls, type Transition } from "motion/react";
import { cn } from "@/lib/utils";
import type { Stop } from "../types";
import { HANG_TILTS } from "../data/stops";
import { Clothespin } from "./icons";
import { CardFaces } from "./travel-card";
import { playPegRelease, playCardReorder } from "../sound";

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
  const isDraggingRef = React.useRef(false);
  const controls = useDragControls();

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
      dragControls={controls}
      dragListener={false}
      whileDrag={{ scale: 1.06, zIndex: 50 }}
      onDragStart={() => {
        isDraggingRef.current = true;
        setDragging(true);
        playCardReorder();
      }}
      onDragEnd={() => {
        setDragging(false);
        // Retain drag flag briefly to swallow trailing synthetic click events on touch devices
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 250);
      }}
      onPointerDown={(e) => {
        // Desktop / mouse users can initiate drag from anywhere on the card
        if (e.pointerType === "mouse") {
          controls.start(e);
        }
      }}
      onTap={() => {
        if (!isDraggingRef.current) {
          playPegRelease();
          onOpen(id);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          playPegRelease();
          onOpen(id);
        }
      }}
      className={cn(
        "relative w-32 shrink-0 select-none rounded-[1rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:w-36 !opacity-100",
        dragging ? "cursor-grabbing" : "cursor-grab",
      )}
      style={{ aspectRatio: "0.65", touchAction: "pan-y", opacity: 1 }}
      role="button"
      tabIndex={0}
      aria-label={`View ${stop.place}. Drag peg to reorder.`}
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
        <div
          className="absolute -top-7 left-1/2 z-30 flex h-11 w-12 -translate-x-1/2 cursor-grab items-center justify-center active:cursor-grabbing"
          style={{ touchAction: "none" }}
          onPointerDown={(e) => {
            controls.start(e);
          }}
          aria-label="Drag peg to reorder"
        >
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
