"use client";

import * as React from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  type PanInfo,
} from "motion/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DestinationCard } from "../types";
import { MembershipCard, MembershipCardBack } from "./membership-card";

interface StackEntry {
  item: DestinationCard;
  uid: number;
  enterFrom: number | null;
}

type ExitIntent = { type: "fling"; dir: number } | { type: "fade" };

const VISIBLE = 4;
const SWIPE_DISTANCE = 90;
const SWIPE_VELOCITY = 420;
const FLIP_DISTANCE = 70;
const FLIP_VELOCITY = 380;

interface CardCarouselProps {
  items: DestinationCard[];
  className?: string;
  /** Render the color-reactive ambient glow behind the deck. */
  ambient?: boolean;
  /** Fires whenever the front card changes. */
  onActiveChange?: (item: DestinationCard, index: number) => void;
}

export function CardCarousel({
  items,
  className,
  ambient = true,
  onActiveChange,
}: CardCarouselProps) {
  const reduce = useReducedMotion();
  const [stack, setStack] = React.useState<StackEntry[]>(() =>
    items.map((item, i) => ({ item, uid: i, enterFrom: null }))
  );
  const uidCounter = React.useRef(items.length);
  const nextUid = React.useCallback(() => {
    uidCounter.current += 1;
    return uidCounter.current;
  }, []);
  const [exitDir, setExitDir] = React.useState(1);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const [flipped, setFlipped] = React.useState(false);

  const front = stack[0];
  const activeIndex = items.findIndex((it) => it.id === front.item.id);

  React.useEffect(() => {
    onActiveChange?.(front.item, activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [front.uid]);

  const toggleFlip = React.useCallback(() => {
    setHasInteracted(true);
    setFlipped((f) => !f);
  }, []);

  const advance = React.useCallback((dir: number) => {
    setExitDir(dir >= 0 ? 1 : -1);
    setFlipped(false);
    setStack((prev) => {
      const [first, ...rest] = prev;
      return [...rest, { item: first.item, uid: nextUid(), enterFrom: null }];
    });
  }, [nextUid]);

  const rewind = React.useCallback(() => {
    setFlipped(false);
    setStack((prev) => {
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [{ item: last.item, uid: nextUid(), enterFrom: -1400 }, ...rest];
    });
  }, [nextUid]);

  const handleNext = () => {
    setHasInteracted(true);
    advance(1);
  };
  const handlePrev = () => {
    setHasInteracted(true);
    rewind();
  };

  return (
    <div
      className={cn("relative flex w-full flex-col items-center", reduce && "meridian-reduce-safe", className)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Meridian destination passes"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNext();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrev();
        } else if (
          (e.key === "Enter" || e.key === " ") &&
          e.target === e.currentTarget
        ) {
          e.preventDefault();
          toggleFlip();
        }
      }}
      tabIndex={0}
    >
      {/* Ambient color-reactive glow */}
      {ambient && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2">
          <div
            className="absolute inset-0 rounded-full opacity-60 blur-[110px] transition-[background-color] duration-700 ease-out"
            style={{ backgroundColor: front.item.colors.glow }}
          />
        </div>
      )}

      {/* Deck */}
      <div className="relative w-full max-w-[19rem] px-1 sm:max-w-[20.5rem]">
        <div className="relative aspect-[0.68] w-full [perspective:1600px]">
          <AnimatePresence initial={false}>
            {stack.map((entry, i) => {
              if (i > VISIBLE) return null;
              return (
                <StackItem
                  key={entry.uid}
                  entry={entry}
                  depth={i}
                  total={stack.length}
                  originalIndex={items.findIndex((it) => it.id === entry.item.id)}
                  itemCount={items.length}
                  isTop={i === 0}
                  reduce={!!reduce}
                  flipped={i === 0 && flipped}
                  onFlip={toggleFlip}
                  exitIntent={i === 0 ? { type: "fling", dir: exitDir } : { type: "fade" }}
                  onDismiss={(dir) => {
                    setHasInteracted(true);
                    advance(dir);
                  }}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center gap-5">
        <NavButton label="Previous pass" onClick={handlePrev}>
          <ArrowLeft01Icon className="size-5" />
        </NavButton>

        <div className="flex items-center gap-2 rounded-full bg-meridian-well px-3 py-1.5 shadow-inset-well shadow-inset-rim" role="tablist" aria-label="Destinations">
          {items.map((it, i) => {
            const active = i === activeIndex;
            return (
              <Button
                key={it.id}
                type="button"
                variant="ghost"
                role="tab"
                aria-selected={active}
                aria-label={it.destination}
                onClick={() => {
                  if (i === activeIndex) return;
                  setHasInteracted(true);
                  setFlipped(false);
                  const steps = (i - activeIndex + items.length) % items.length;
                  setExitDir(1);
                  setStack((prev) => {
                    let arr = prev;
                    for (let s = 0; s < steps; s++) {
                      const [f, ...r] = arr;
                      arr = [...r, { item: f.item, uid: nextUid(), enterFrom: null }];
                    }
                    return arr;
                  });
                }}
                className="group relative h-2.5 rounded-full p-0 transition-all duration-300 shadow-sm"
                style={{
                  width: active ? 26 : 10,
                  backgroundColor: active ? it.colors.accent : "rgba(255,255,255,0.22)",
                }}
              >
                <span className="sr-only">{it.destination}</span>
              </Button>
            );
          })}
        </div>

        <NavButton label="Next pass" onClick={handleNext}>
          <ArrowRight01Icon className="size-5" />
        </NavButton>
      </div>

      {/* Drag hint */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-5 flex items-center gap-2 text-xs font-medium tracking-wide text-white/45"
          >
            <span className="hidden sm:inline">Drag aside to browse</span>
            <span className="sm:hidden">Swipe to browse</span>
            <span aria-hidden className="text-white/30">·</span>
            <span>tap to flip</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex size-11 items-center justify-center rounded-full text-white/80 transition-all duration-200",
        "bg-meridian-well shadow-inset-shallow shadow-inset-rim backdrop-blur-sm",
        "hover:bg-meridian-surface hover:text-white hover:shadow-tactile-raised active:scale-[0.92] active:shadow-tactile-pressed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      )}
    >
      {children}
    </Button>
  );
}

interface StackItemProps {
  entry: StackEntry;
  depth: number;
  total: number;
  originalIndex: number;
  itemCount: number;
  isTop: boolean;
  reduce: boolean;
  flipped: boolean;
  onFlip: () => void;
  exitIntent: ExitIntent;
  onDismiss: (dir: number) => void;
}

function StackItem({
  entry,
  depth,
  originalIndex,
  itemCount,
  isTop,
  reduce,
  flipped,
  onFlip,
  exitIntent,
  onDismiss,
}: StackItemProps) {
  const x = useMotionValue(entry.enterFrom ?? 0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], reduce ? [0, 0] : [-13, 13]);
  const glare = useTransform(x, [-150, 150], [-1, 1]);

  React.useEffect(() => {
    if (entry.enterFrom != null) {
      const controls = animate(x, 0, { type: "spring", stiffness: 300, damping: 32 });
      return () => controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visualDepth = Math.min(depth, VISIBLE - 1);
  const scale = 1 - visualDepth * 0.05;
  const depthY = visualDepth * 20;
  const opacity = depth >= VISIBLE ? 0 : [1, 1, 0.92, 0.7][visualDepth];
  const zIndex = 50 - depth;

  const snapBack = () => {
    animate(x, 0, { type: "spring", stiffness: 400, damping: 34 });
    animate(y, 0, { type: "spring", stiffness: 400, damping: 34 });
  };

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    const { x: ox, y: oy } = info.offset;
    const { x: vx, y: vy } = info.velocity;
    const horizontal = Math.abs(ox) >= Math.abs(oy);

    if (horizontal) {
      if (Math.abs(ox) > SWIPE_DISTANCE || Math.abs(vx) > SWIPE_VELOCITY) {
        onDismiss(ox < 0 ? -1 : 1);
        return;
      }
    } else {
      if (Math.abs(oy) > FLIP_DISTANCE || Math.abs(vy) > FLIP_VELOCITY) {
        snapBack();
        onFlip();
        return;
      }
    }
    snapBack();
  };

  return (
    <motion.div
      className="absolute inset-0 will-change-transform"
      style={{ x, y, rotate, zIndex }}
      custom={exitIntent}
      variants={{
        exit: (intent: ExitIntent) =>
          intent.type === "fling"
            ? {
              x: intent.dir * 1300,
              opacity: 0,
              transition: reduce
                ? { duration: 0.18 }
                : { duration: 0.5, ease: [0.32, 0.72, 0.28, 1] },
            }
            : { opacity: 0, scale: scale * 0.92, transition: { duration: 0.28 } },
      }}
      exit="exit"
      initial={false}
      animate={{
        scale,
        opacity,
        transition: reduce
          ? { duration: 0.2 }
          : { type: "spring", stiffness: 320, damping: 34, mass: 0.9 },
      }}
      drag={isTop ? true : false}
      dragElastic={0.16}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragMomentum={false}
      onDragEnd={isTop ? handleDragEnd : undefined}
      onTap={isTop ? onFlip : undefined}
      whileDrag={{ scale: reduce ? scale : 1.04, cursor: "grabbing" }}
      aria-hidden={!isTop}
    >
      <motion.div
        className={cn(
          "relative h-full w-full [perspective:1600px]",
          isTop ? "cursor-grab" : "pointer-events-none"
        )}
        animate={{ y: depthY }}
        transition={
          reduce
            ? { duration: 0.2 }
            : { type: "spring", stiffness: 320, damping: 34, mass: 0.9 }
        }
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={
            reduce
              ? { duration: 0.2 }
              : { type: "spring", stiffness: 260, damping: 30, mass: 0.9 }
          }
        >
          <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
            <MembershipCard
              item={entry.item}
              glare={glare}
              index={originalIndex + 1}
              total={itemCount}
            />
          </div>
          <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
            <MembershipCardBack
              item={entry.item}
              index={originalIndex + 1}
              total={itemCount}
            />
          </div>
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-black transition-opacity duration-300"
          style={{ opacity: visualDepth * 0.14 }}
        />
      </motion.div>
    </motion.div>
  );
}
