"use client";

import * as React from "react";
import {
  setSoundMuted,
  warmUpAudio,
  playCardSlide,
  playCardFlip,
  playPegSnap,
  playPegRelease,
  playCardReorder,
  playTicketTear,
  playTicketArrival,
  playDeckReset,
  playButtonClick,
} from "./itinerary-audio";

const STORAGE_KEY = "itinerary_sound_muted";

// Default sound to ON (muted = false)
let soundMutedState = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): boolean {
  return soundMutedState;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useItinerarySound() {
  const muted = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  React.useEffect(() => {
    // Clear any legacy localStorage value so sound always defaults to ON
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setSoundMuted(muted);
  }, [muted]);

  const toggleMute = React.useCallback(() => {
    warmUpAudio();
    soundMutedState = !soundMutedState;
    setSoundMuted(soundMutedState);
    if (!soundMutedState) {
      playButtonClick();
    }
    notify();
  }, []);

  return {
    muted,
    toggleMute,
    playCardSlide,
    playCardFlip,
    playPegSnap,
    playPegRelease,
    playCardReorder,
    playTicketTear,
    playTicketArrival,
    playDeckReset,
    playButtonClick,
  };
}
