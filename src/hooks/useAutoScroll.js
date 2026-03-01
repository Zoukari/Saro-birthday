// ─────────────────────────────────────────────────────────
// useAutoScroll — transition fluide, pause garde la position
// Slide 50 (final) : dézoom avant + apparition avec effet
// ─────────────────────────────────────────────────────────
import { useRef, useState, useCallback, useEffect } from 'react'

const TOTAL_MS = 238_000

const easeOutCubic = t => 1 - Math.pow(1 - t, 3)
const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
const lerp = (a, b, t) => a + (b - a) * t

export function useAutoScroll(n, running, audioRef) {
  const startRef = useRef(null)
  const prevIdxRef = useRef(-1)
  const rafRef = useRef(null)
  const lastSlideProgRef = useRef(0)
  const lastProgressFracRef = useRef(0)
  const progressWhenPausedRef = useRef(-1)

  const [currentIdx, setCurrentIdx] = useState(0)
  const [slideProgress, setSlideProgress] = useState(0)
  const [progressFrac, setProgressFrac] = useState(0)

  const slideRefs = useRef([])

  const registerSlide = useCallback((idx, el) => {
    slideRefs.current[idx] = el
  }, [])

  const hideEl = useCallback(el => {
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(20%) scale(0.97)'
    el.style.pointerEvents = 'none'
  }, [])

  const renderEl = useCallback((el, p, slideIndex) => {
    if (!el) return
    const isFinalSlide = slideIndex === n - 1
    const enterEnd = 0.22
    const exitStart = 0.7
    let yPct, scale, op

    if (p < enterEnd) {
      const t = easeOutCubic(p / enterEnd)
      if (isFinalSlide) {
        scale = lerp(0.6, 1, t)
        yPct = 0
        op = lerp(0, 1, t)
      } else {
        yPct = lerp(18, 0, t)
        scale = lerp(1.03, 1, t)
        op = lerp(0.5, 1, t)
      }
    } else if (p < exitStart) {
      yPct = 0
      scale = 1
      op = 1
    } else {
      const t = easeInOutCubic((p - exitStart) / (1 - exitStart))
      if (slideIndex === n - 2) {
        scale = lerp(1, 0.72, t)
        yPct = 0
        op = lerp(1, 0.25, t)
      } else {
        yPct = lerp(0, -18, t)
        scale = lerp(1, 0.98, t)
        op = lerp(1, 0.4, t)
      }
    }
    el.style.opacity = String(op)
    el.style.transform = `translateY(${yPct}%) scale(${scale})`
    el.style.pointerEvents = p >= enterEnd && p <= exitStart ? 'auto' : 'none'
  }, [n])

  const jumpTo = useCallback(i => {
    slideRefs.current.forEach(hideEl)
    prevIdxRef.current = -1
    progressWhenPausedRef.current = -1
    startRef.current = performance.now() - (i / n) * TOTAL_MS
  }, [n, hideEl])

  useEffect(() => {
    if (!running) return

    if (progressWhenPausedRef.current >= 0) {
      startRef.current = performance.now() - progressWhenPausedRef.current * TOTAL_MS
      progressWhenPausedRef.current = -1
    }

    const tick = ts => {
      const audio = audioRef?.current
      const useAudio = running && audio && isFinite(audio.duration) && audio.duration > 0
      let raw
      if (useAudio) {
        raw = Math.min(audio.currentTime / audio.duration, 1)
      } else {
        if (startRef.current === null) startRef.current = ts
        raw = Math.min((ts - startRef.current) / TOTAL_MS, 1)
      }
      const sp = raw * n
      const ci = Math.min(Math.floor(sp), n - 1)
      const ip = sp - ci

      if (ci !== prevIdxRef.current) {
        if (prevIdxRef.current >= 0)
          hideEl(slideRefs.current[prevIdxRef.current])
        prevIdxRef.current = ci
        setCurrentIdx(ci)
      }

      renderEl(slideRefs.current[ci], ip, ci)

      if (Math.abs(ip - lastSlideProgRef.current) > 0.02) {
        lastSlideProgRef.current = ip
        setSlideProgress(ip)
      }
      if (Math.abs(raw - lastProgressFracRef.current) > 0.01) {
        lastProgressFracRef.current = raw
        setProgressFrac(raw)
      }

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        startRef.current = ts
        prevIdxRef.current = -1
        slideRefs.current.forEach(hideEl)
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (lastProgressFracRef.current >= 0 && lastProgressFracRef.current <= 1) {
        progressWhenPausedRef.current = lastProgressFracRef.current
      }
      cancelAnimationFrame(rafRef.current)
    }
  }, [running, n, hideEl, renderEl, audioRef])

  return { currentIdx, slideProgress, progressFrac, jumpTo, registerSlide }
}
