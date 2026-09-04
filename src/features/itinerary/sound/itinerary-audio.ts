/**
 * Procedural Web Audio API sound generator for the Itinerary section.
 * Zero external audio assets, zero latency, zero network dependency.
 * Designed for skeuomorphic tactile materials: cardstock paper, wooden clothespins, and perforated tickets.
 */

let audioCtx: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;
let isMuted = false;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

export function warmUpAudio() {
  if (typeof window === "undefined") return;
  const ctx = getContext();
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
}

if (typeof window !== "undefined") {
  const unlock = () => {
    warmUpAudio();
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
  window.addEventListener("pointerdown", unlock, { passive: true, once: true });
  window.addEventListener("keydown", unlock, { passive: true, once: true });
}

function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (noiseBuffer && noiseBuffer.sampleRate === ctx.sampleRate) {
    return noiseBuffer;
  }

  // 1 second of noise buffer
  const bufferSize = ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Pinkish-tinted noise for warmer, more natural physical paper acoustics
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    data[i] = (b0 + b1 + b2 + white * 0.5362) * 0.25;
  }

  noiseBuffer = buffer;
  return buffer;
}

export function setSoundMuted(muted: boolean) {
  isMuted = muted;
}

export function getSoundMuted(): boolean {
  return isMuted;
}

/**
 * 1. Card Slide / Draw:
 * Subtle, velvety glide of luxury cardstock paper.
 */
export function playCardSlide() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const source = ctx.createBufferSource();
  source.buffer = getNoiseBuffer(ctx);

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.setValueAtTime(1.3, now);
  filter.frequency.setValueAtTime(440, now);
  filter.frequency.exponentialRampToValueAtTime(880, now + 0.035);
  filter.frequency.exponentialRampToValueAtTime(360, now + 0.10);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.065, now + 0.022);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.10);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  source.start(now);
  source.stop(now + 0.11);
}

/**
 * 2. Card Flip / Reveal:
 * Premium, velvety soft paper flutter with warm low-frequency cardstock weight.
 * Designed for luxury stationery / heavy cotton-linen paper flipping gently in air.
 */
export function playCardFlip() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Soft air & velvet paper friction (warm bandpass, no harsh highs)
  const airSource = ctx.createBufferSource();
  airSource.buffer = getNoiseBuffer(ctx);

  const airFilter = ctx.createBiquadFilter();
  airFilter.type = "bandpass";
  airFilter.frequency.setValueAtTime(720, now);
  airFilter.frequency.exponentialRampToValueAtTime(480, now + 0.11);
  airFilter.Q.setValueAtTime(1.1, now);

  const airGain = ctx.createGain();
  airGain.gain.setValueAtTime(0.0001, now);
  airGain.gain.linearRampToValueAtTime(0.06, now + 0.02);
  airGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

  airSource.connect(airFilter);
  airFilter.connect(airGain);
  airGain.connect(ctx.destination);

  airSource.start(now);
  airSource.stop(now + 0.13);

  // 2. Secondary soft air trailing swoosh (subtle rotation follow-through)
  const trailSource = ctx.createBufferSource();
  trailSource.buffer = getNoiseBuffer(ctx);

  const trailFilter = ctx.createBiquadFilter();
  trailFilter.type = "lowpass";
  trailFilter.frequency.setValueAtTime(750, now + 0.03);
  trailFilter.frequency.exponentialRampToValueAtTime(320, now + 0.12);

  const trailGain = ctx.createGain();
  trailGain.gain.setValueAtTime(0.0001, now);
  trailGain.gain.setValueAtTime(0.0001, now + 0.03);
  trailGain.gain.linearRampToValueAtTime(0.035, now + 0.055);
  trailGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

  trailSource.connect(trailFilter);
  trailFilter.connect(trailGain);
  trailGain.connect(ctx.destination);

  trailSource.start(now + 0.03);
  trailSource.stop(now + 0.14);

  // 3. Luxurious deep cardstock body (pure sine wave, soft cushioned low thud)
  const bodyOsc = ctx.createOscillator();
  bodyOsc.type = "sine";
  bodyOsc.frequency.setValueAtTime(165, now + 0.012);
  bodyOsc.frequency.exponentialRampToValueAtTime(75, now + 0.11);

  const bodyGain = ctx.createGain();
  bodyGain.gain.setValueAtTime(0.0001, now);
  bodyGain.gain.setValueAtTime(0.0001, now + 0.012);
  bodyGain.gain.linearRampToValueAtTime(0.075, now + 0.032);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

  bodyOsc.connect(bodyGain);
  bodyGain.connect(ctx.destination);

  bodyOsc.start(now + 0.012);
  bodyOsc.stop(now + 0.13);
}

/**
 * 3. Wooden Clothespin Snap (Card Goes to Rope):
 * Warm, organic wooden peg clamping onto rope.
 * Softened attack with rich birch/cedar body and cushioned low-frequency rope settle.
 */
export function playPegSnap() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Soft, warm wooden contact (pure sine tone sweep, zero harsh treble)
  const woodOsc = ctx.createOscillator();
  woodOsc.type = "sine";
  woodOsc.frequency.setValueAtTime(540, now);
  woodOsc.frequency.exponentialRampToValueAtTime(210, now + 0.024);

  const woodGain = ctx.createGain();
  woodGain.gain.setValueAtTime(0.0001, now);
  woodGain.gain.linearRampToValueAtTime(0.085, now + 0.004);
  woodGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

  woodOsc.connect(woodGain);
  woodGain.connect(ctx.destination);
  woodOsc.start(now);
  woodOsc.stop(now + 0.035);

  // 2. Warm wood acoustic body (mellow bandpass filtered noise)
  const bodyNoise = ctx.createBufferSource();
  bodyNoise.buffer = getNoiseBuffer(ctx);

  const bodyFilter = ctx.createBiquadFilter();
  bodyFilter.type = "bandpass";
  bodyFilter.frequency.setValueAtTime(490, now);
  bodyFilter.Q.setValueAtTime(2.2, now);

  const bodyNoiseGain = ctx.createGain();
  bodyNoiseGain.gain.setValueAtTime(0.0001, now);
  bodyNoiseGain.gain.linearRampToValueAtTime(0.065, now + 0.004);
  bodyNoiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

  bodyNoise.connect(bodyFilter);
  bodyFilter.connect(bodyNoiseGain);
  bodyNoiseGain.connect(ctx.destination);
  bodyNoise.start(now);
  bodyNoise.stop(now + 0.05);

  // 3. Cushioned low-frequency rope settle (taut rope thud)
  const ropeOsc = ctx.createOscillator();
  ropeOsc.type = "sine";
  ropeOsc.frequency.setValueAtTime(125, now + 0.006);
  ropeOsc.frequency.exponentialRampToValueAtTime(58, now + 0.06);

  const ropeGain = ctx.createGain();
  ropeGain.gain.setValueAtTime(0.0001, now);
  ropeGain.gain.setValueAtTime(0.0001, now + 0.006);
  ropeGain.gain.linearRampToValueAtTime(0.06, now + 0.016);
  ropeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

  ropeOsc.connect(ropeGain);
  ropeGain.connect(ctx.destination);
  ropeOsc.start(now + 0.006);
  ropeOsc.stop(now + 0.07);
}

/**
 * 4. Card Open / Unpeg:
 * Soft wooden unpinning sound when lifting a pegged card from the line.
 */
export function playPegRelease() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(560, now + 0.025);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.06, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.04);
}

/**
 * 5. Card Reorder:
 * Gentle wooden knock when dragging/reordering cards on the line.
 */
export function playCardReorder() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(260, now);
  osc.frequency.exponentialRampToValueAtTime(130, now + 0.035);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.045);
}

/**
 * 6. Perforated Ticket Tear:
 * Realistic multi-burst paper ripping sound as the perforated stub tears away.
 */
export function playTicketTear() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const totalDuration = 0.38;

  // Friction rumble underneath the tear
  const rumbleSource = ctx.createBufferSource();
  rumbleSource.buffer = getNoiseBuffer(ctx);

  const rumbleFilter = ctx.createBiquadFilter();
  rumbleFilter.type = "lowpass";
  rumbleFilter.frequency.setValueAtTime(450, now);

  const rumbleGain = ctx.createGain();
  rumbleGain.gain.setValueAtTime(0.001, now);
  rumbleGain.gain.linearRampToValueAtTime(0.14, now + 0.06);
  rumbleGain.gain.linearRampToValueAtTime(0.12, now + 0.28);
  rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + totalDuration);

  rumbleSource.connect(rumbleFilter);
  rumbleFilter.connect(rumbleGain);
  rumbleGain.connect(ctx.destination);
  rumbleSource.start(now);
  rumbleSource.stop(now + totalDuration);

  // 14 micro-bursts along the perforation line
  const burstCount = 14;
  for (let i = 0; i < burstCount; i++) {
    const burstTime = now + (i / burstCount) * 0.34 + (Math.random() * 0.008 - 0.004);
    const burstDuration = 0.014 + Math.random() * 0.012;

    const burstSource = ctx.createBufferSource();
    burstSource.buffer = getNoiseBuffer(ctx);

    const burstFilter = ctx.createBiquadFilter();
    burstFilter.type = "bandpass";
    const centerFreq = 1800 + i * 90 + Math.random() * 400;
    burstFilter.frequency.setValueAtTime(centerFreq, burstTime);
    burstFilter.Q.setValueAtTime(3.0, burstTime);

    const burstGain = ctx.createGain();
    const burstVol = (0.12 + Math.random() * 0.08) * (i === burstCount - 1 ? 1.4 : 1.0);
    burstGain.gain.setValueAtTime(0.001, burstTime);
    burstGain.gain.linearRampToValueAtTime(burstVol, burstTime + 0.002);
    burstGain.gain.exponentialRampToValueAtTime(0.001, burstTime + burstDuration);

    burstSource.connect(burstFilter);
    burstFilter.connect(burstGain);
    burstGain.connect(ctx.destination);

    burstSource.start(burstTime);
    burstSource.stop(burstTime + burstDuration + 0.005);
  }
}

/**
 * 7. Ticket Arrival Chime:
 * Warm, elegant 3-note harmonic arpeggio when all 5 stops are completed.
 */
export function playTicketArrival() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [587.33, 739.99, 880.0]; // D5, F#5, A5 (warm D major triad)

  notes.forEach((freq, idx) => {
    const noteTime = now + idx * 0.08;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, noteTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, noteTime);
    gain.gain.linearRampToValueAtTime(0.13, noteTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.65);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(noteTime);
    osc.stop(noteTime + 0.7);
  });
}

/**
 * 8. Deck Reset:
 * Rapid cascading card flutter when resetting the deck to replay.
 */
export function playDeckReset() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const pulses = 5;

  for (let i = 0; i < pulses; i++) {
    const pulseTime = now + i * 0.038;

    const source = ctx.createBufferSource();
    source.buffer = getNoiseBuffer(ctx);

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800 + i * 140, pulseTime);
    filter.Q.setValueAtTime(2.0, pulseTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, pulseTime);
    gain.gain.linearRampToValueAtTime(0.11, pulseTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, pulseTime + 0.034);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start(pulseTime);
    source.stop(pulseTime + 0.04);
  }
}

/**
 * 9. Button Tap:
 * Clean, tactile UI feedback pop when clicking "Book Now".
 */
export function playButtonClick() {
  if (isMuted) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(620, now);
  osc.frequency.exponentialRampToValueAtTime(220, now + 0.025);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.14, now + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.035);
}
