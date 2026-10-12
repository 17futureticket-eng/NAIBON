"use client";

import { useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   Configuration — all tuneable without changing logic
   ───────────────────────────────────────────────────────────── */
export interface HorseGallopConfig {
  /** Master volume 0–1 */
  volume: number;
  /** Minimum scroll px/s before sound triggers */
  minVelocity: number;
  /** Scroll px/s mapped to fastest cadence */
  maxVelocity: number;
  /** Slowest stride period in ms */
  maxStridePeriodMs: number;
  /** Fastest stride period in ms */
  minStridePeriodMs: number;
  /** How many ms of no-scroll before fade starts */
  idleBeforeFadeMs: number;
  /** How long the fade-out lasts in ms */
  fadeDurationMs: number;
  /** Velocity smoothing factor 0–1 (higher = smoother but more lag) */
  smoothing: number;
}

const DEFAULTS: HorseGallopConfig = {
  volume: 0.55,
  minVelocity: 30,
  maxVelocity: 1800,
  maxStridePeriodMs: 900,
  minStridePeriodMs: 220,
  idleBeforeFadeMs: 120,
  fadeDurationMs: 600,
  smoothing: 0.82,
};

/* ─────────────────────────────────────────────────────────────
   Hoofbeat synthesiser
   One "beat" = one hoof hitting the ground.
   A stride = 4 beats with natural timing offsets (left-fore,
   right-hind, right-fore, left-hind — classic gallop pattern).
   ───────────────────────────────────────────────────────────── */

/** Beat offsets within one stride cycle (0.0 – 1.0) */
const BEAT_OFFSETS = [0.0, 0.28, 0.52, 0.72];

function synthesiseHoofbeat(ctx: AudioContext, masterGain: GainNode, intensity: number) {
  const now = ctx.currentTime;
  const vol = 0.55 + intensity * 0.45; // 0.55–1.0

  // ── Thud layer — bandpass-filtered noise ──
  const bufLen = ctx.sampleRate * 0.08;
  const buffer = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufLen; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufLen * 0.18));
  }
  const thudSrc = ctx.createBufferSource();
  thudSrc.buffer = buffer;

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 160;
  bp.Q.value = 1.4;

  const thudGain = ctx.createGain();
  thudGain.gain.setValueAtTime(vol * 1.8, now);
  thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  thudSrc.connect(bp).connect(thudGain).connect(masterGain);
  thudSrc.start(now);
  thudSrc.stop(now + 0.2);

  // ── Body resonance — low sine sweep ──
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(95, now);
  osc.frequency.exponentialRampToValueAtTime(38, now + 0.12);

  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(vol * 0.45, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

  osc.connect(oscGain).connect(masterGain);
  osc.start(now);
  osc.stop(now + 0.16);

  // ── Click transient — sharp attack ──
  const clickLen = Math.floor(ctx.sampleRate * 0.006);
  const clickBuf = ctx.createBuffer(1, clickLen, ctx.sampleRate);
  const cd = clickBuf.getChannelData(0);
  for (let i = 0; i < clickLen; i++) {
    cd[i] = (Math.random() * 2 - 1) * (1 - i / clickLen);
  }
  const clickSrc = ctx.createBufferSource();
  clickSrc.buffer = clickBuf;

  const clickGain = ctx.createGain();
  clickGain.gain.setValueAtTime(vol * 0.7, now);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

  clickSrc.connect(clickGain).connect(masterGain);
  clickSrc.start(now);
  clickSrc.stop(now + 0.015);
}

/* ─────────────────────────────────────────────────────────────
   Main hook
   ───────────────────────────────────────────────────────────── */
export function useHorseGallop(
  enabled: boolean,
  config: Partial<HorseGallopConfig> = {}
) {
  const cfg = { ...DEFAULTS, ...config };

  const ctxRef        = useRef<AudioContext | null>(null);
  const masterRef     = useRef<GainNode | null>(null);
  const rafRef        = useRef<number>(0);
  const lastScrollY   = useRef(0);
  const lastScrollT   = useRef(0);
  const smoothVel     = useRef(0);
  const lastStride    = useRef(0);    // timestamp of last stride start
  const beatIndex     = useRef(0);    // which beat in the stride we're on
  const idleTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadingOut     = useRef(false);
  const isScrolling   = useRef(false);

  // Initialise AudioContext lazily on first enable
  const initAudio = useCallback(() => {
    if (ctxRef.current) return;
    const AudioCtxClass =
      (typeof window !== "undefined" &&
        (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)) ||
      null;
    if (!AudioCtxClass) return;

    const ctx = new AudioCtxClass();
    const master = ctx.createGain();
    master.gain.setValueAtTime(cfg.volume, ctx.currentTime);
    master.connect(ctx.destination);

    ctxRef.current = ctx;
    masterRef.current = master;
  }, [cfg.volume]);

  // Fade master gain to a target value
  const setGain = useCallback((target: number, durationMs: number) => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(
      Math.max(0.0001, target),
      now + durationMs / 1000
    );
  }, []);

  const scheduleBeats = useCallback((stridePeriodMs: number, intensity: number) => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;

    const now = performance.now();
    const timeSinceStride = now - lastStride.current;

    // How far into the current stride are we?
    const strideProgress = (timeSinceStride % stridePeriodMs) / stridePeriodMs;

    // Find which beat should fire next
    for (let i = 0; i < BEAT_OFFSETS.length; i++) {
      const idx = (beatIndex.current + i) % BEAT_OFFSETS.length;
      const beatOffset = BEAT_OFFSETS[idx];
      const nextBeatProgress =
        beatOffset >= strideProgress
          ? beatOffset
          : beatOffset + 1; // wrap to next stride

      const msUntilBeat = (nextBeatProgress - strideProgress) * stridePeriodMs;

      if (msUntilBeat < 16) {
        // Fire this beat now
        synthesiseHoofbeat(ctx, master, intensity);
        beatIndex.current = (idx + 1) % BEAT_OFFSETS.length;
        break;
      }
    }
  }, []);

  // Main animation loop
  const tick = useCallback(() => {
    if (!enabled) return;

    const vel = smoothVel.current;
    const { minVelocity, maxVelocity, maxStridePeriodMs, minStridePeriodMs } = cfg;

    if (vel >= minVelocity && isScrolling.current) {
      const t = Math.min((vel - minVelocity) / (maxVelocity - minVelocity), 1);
      // Ease-in curve so slow scroll feels light
      const ease = t * t;
      const stridePeriodMs = maxStridePeriodMs - ease * (maxStridePeriodMs - minStridePeriodMs);
      const intensity = 0.25 + ease * 0.75;

      // Restore gain if we were fading
      if (fadingOut.current) {
        fadingOut.current = false;
        setGain(cfg.volume, 80);
      }

      scheduleBeats(stridePeriodMs, intensity);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [enabled, cfg, setGain, scheduleBeats]);

  // Scroll handler
  useEffect(() => {
    if (!enabled) return;

    initAudio();

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = now - lastScrollT.current;

      if (dt > 0 && dt < 200) {
        const rawVel = Math.abs(y - lastScrollY.current) / (dt / 1000);
        smoothVel.current =
          smoothVel.current * cfg.smoothing + rawVel * (1 - cfg.smoothing);
      }

      lastScrollY.current = y;
      lastScrollT.current = now;
      isScrolling.current = true;

      // Resume AudioContext if suspended (browser policy)
      if (ctxRef.current?.state === "suspended") {
        ctxRef.current.resume().catch(() => {});
      }

      // Reset idle timer
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        isScrolling.current = false;
        smoothVel.current = 0;
        fadingOut.current = true;
        setGain(0, cfg.fadeDurationMs);
      }, cfg.idleBeforeFadeMs);
    };

    // Touch support
    let touchStartY = 0;
    let touchLastT = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchLastT = performance.now();
    };
    const onTouchMove = (e: TouchEvent) => {
      const now = performance.now();
      const dy = Math.abs(e.touches[0].clientY - touchStartY);
      const dt = now - touchLastT;
      if (dt > 0) {
        const rawVel = dy / (dt / 1000);
        smoothVel.current =
          smoothVel.current * cfg.smoothing + rawVel * (1 - cfg.smoothing);
      }
      touchStartY = e.touches[0].clientY;
      touchLastT = now;
      isScrolling.current = true;

      if (ctxRef.current?.state === "suspended") {
        ctxRef.current.resume().catch(() => {});
      }
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        isScrolling.current = false;
        smoothVel.current = 0;
        fadingOut.current = true;
        setGain(0, cfg.fadeDurationMs);
      }, cfg.idleBeforeFadeMs);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(rafRef.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [enabled, cfg, initAudio, setGain, tick]);

  // Cleanup AudioContext on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      ctxRef.current?.close().catch(() => {});
    };
  }, []);
}
