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
import { ITINERARY, SWIPE_DISTANCE, SWIPE_VELOCITY } from "./data/stops";
import {
  WOOD_URI,
  CORK_BLOTCH_URI,
  WALL_GRAIN_URI,
  WALL_MOTTLE_URI,
  WALL_STAIN_URI,
  GRAIN_URI,
} from "./textures";
import {
  LuggageTag,
  CompassDoodle,
  WashiTape,
  Stamp,
  StickyNote,
  PushPin,
  BoardingStub,
} from "./components/mementos";
import { CardFaces } from "./components/travel-card";
import { AirplaneTicketCard } from "./components/airplane-ticket";
import { PeggedCard, CARD_SPRING } from "./components/pegged-card";

function HangingRope({
  top,
  className,
  reduce = false,
}: {
  top?: number | string;
  className?: string;
  reduce?: boolean;
}) {
  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-x-6 sm:inset-x-10", className)}
      style={top !== undefined ? { top: typeof top === "number" ? `${top}px` : top } : undefined}
      animate={reduce ? undefined : { y: [0, 1.2, 0] }}
      transition={
        reduce
          ? undefined
          : { duration: 5.5, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }
      }
      aria-hidden
    >
      <span className="absolute -left-1.5 -top-1 size-3 rounded-full bg-itinerary-pin shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
      <span className="absolute -right-1.5 -top-1 size-3 rounded-full bg-itinerary-pin shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
      <svg className="h-6 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
        <path
          d="M0,2 Q50,10 100,2"
          fill="none"
          className="stroke-itinerary-rope"
          strokeWidth="2.4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0,2 Q50,10 100,2"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="0.7"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </motion.div>
  );
}

export function ItinerarySection() {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState<string | null>(null);
  const [order, setOrder] = React.useState<string[]>([]);

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

  React.useEffect(() => {
    if (!active || alreadyRevealed) return;
    const flip = reduce ? 180 : 420;
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
      {/* Wall textures */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
        style={{ backgroundImage: WALL_STAIN_URI, backgroundSize: "900px 900px" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-multiply"
        style={{ backgroundImage: WALL_MOTTLE_URI, backgroundSize: "460px 460px" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-multiply"
        style={{ backgroundImage: WALL_GRAIN_URI, backgroundSize: "160px 160px" }}
      />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(90,70,45,0.14)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_110%_at_18%_-12%,rgba(255,252,244,0.7),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.06]" />

      {/* Edge mementos */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
        <div className="absolute left-[9%] top-20 hidden lg:block xl:left-[14%]">
          <LuggageTag code="MDR" tone="#e0a43b" rotate={-8} />
        </div>
        <div className="absolute right-[10%] top-16 hidden lg:block xl:right-[15%]">
          <CompassDoodle className="h-14 w-14 opacity-70" rotate={9} />
        </div>

      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-16 sm:px-8 lg:py-20">
        {/* Header */}
        <header className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block size-1.5 rotate-45 bg-itinerary-accent shadow-xs" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
              The Itinerary
            </span>
          </div>
          <h2 className="mt-4 text-balance text-4xl font-black leading-[1.08] tracking-[-0.035em] text-neutral-900 sm:text-5xl lg:text-6xl">
            Places you&rsquo;ll go,
            <br />
            <span className="text-neutral-900/45">with us.</span>
          </h2>
          <p className="mt-4 max-w-lg text-balance text-base font-normal leading-relaxed text-neutral-600 sm:text-lg">
            Curated journeys and private access across the globe, reserved exclusively for members.
          </p>
        </header>

        {/* The board: wooden frame + cork centre, rope strung inside */}
        <div className="mt-12 lg:mt-14">
          <div
            className="relative rounded-[1.9rem] p-3.5 shadow-[0_28px_60px_-28px_rgba(60,40,15,0.55)] sm:p-5"
            style={{ backgroundImage: "linear-gradient(158deg,#9a6a3a 0%,#734c26 46%,#5a3c20 100%)" }}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-[1.9rem] opacity-55 mix-blend-overlay"
              style={{ backgroundImage: WOOD_URI, backgroundSize: "260px 140px" }}
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[1.9rem] opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(176deg, rgba(0,0,0,0.05) 0 3px, transparent 3px 10px)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] shadow-[inset_0_2px_3px_rgba(255,255,255,0.28),inset_0_-4px_8px_rgba(0,0,0,0.4)]" />

            <div className="pointer-events-none absolute inset-0 z-20 select-none" aria-hidden>
              <div className="absolute -top-2 left-8 hidden sm:block">
                <BoardingStub from="LHR" to="KIX" rotate={-6} />
                <WashiTape rotate={-18} className="absolute -left-2 top-1 w-11" tone="rgba(240,235,222,0.8)" />
              </div>
              <div className="absolute right-9 top-0 hidden gap-1.5 sm:flex">
                <Stamp code="PAR" hue="#e0a43b" rotate={5} />
                <Stamp code="TYO" hue="#e5647a" rotate={-7} className="mt-1.5" />
              </div>
            </div>

            <div
              className="relative rounded-[1.2rem] shadow-[inset_0_2px_22px_rgba(60,38,15,0.4)] ring-1 ring-black/25"
              style={{ backgroundColor: "#c9a56e" }}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.2rem]" aria-hidden>
                <div
                  className="absolute inset-0 opacity-[0.4] mix-blend-multiply"
                  style={{ backgroundImage: GRAIN_URI, backgroundSize: "120px 120px" }}
                />
                <div
                  className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
                  style={{ backgroundImage: CORK_BLOTCH_URI, backgroundSize: "220px 220px" }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(255,240,210,0.3),transparent_55%)]" />
                <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(70,45,20,0.45)]" />


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
                {/* Row 1 rope (always visible on all screens, fixed position on desktop and mobile) */}
                <HangingRope className="top-8" reduce={!!reduce} />

                {/* Row 2 rope (mobile only, visible when >= 3 cards wrap to second row) */}
                <HangingRope
                  top={277}
                  className={cn(order.length >= 3 ? "block sm:hidden" : "hidden")}
                  reduce={!!reduce}
                />

                {/* Row 3 rope (mobile only, visible when 5 cards wrap to third row) */}
                <HangingRope
                  top={522}
                  className={cn(order.length >= 5 ? "block sm:hidden" : "hidden")}
                  reduce={!!reduce}
                />

                {order.length === 0 ? (
                  <p className="pt-16 text-center text-sm font-medium text-itinerary-text/80">
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

          {!allRevealed ? (
            <p className="mt-4 text-center text-xs font-medium tracking-wide text-neutral-800 sm:text-sm">
              <span className="hidden sm:inline">Swipe or tap the top card</span>
              <span className="sm:hidden">Tap the top card</span>
            </p>
          ) : (
            <p className="mt-4 text-center text-xs font-medium tracking-wide text-neutral-800 sm:text-sm">
              Tap anywhere on the ticket to tear &amp; replay
            </p>
          )}
        </div>
      </div>

      {/* Scrim */}
      <AnimatePresence>
        {activeStop &&
          (alreadyRevealed ? (
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

      {/* Spotlight card */}
      {activeStop && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-5">
          <motion.div
            layoutId={`stop-${activeStop.id}`}
            transition={reduce ? { duration: 0.2 } : CARD_SPRING}
            className="pointer-events-auto relative w-full max-w-[22rem] sm:max-w-[25rem]"
            style={{
              aspectRatio: "0.70",
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
