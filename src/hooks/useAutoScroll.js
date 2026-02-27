// ─────────────────────────────────────────────────────────
// useAutoScroll — drives the 3:58 cinematic auto-scroll
// Returns { currentIdx, slideProgress, progressFraction, jumpTo }
// ─────────────────────────────────────────────────────────
import { useRef, useState, useCallback, useEffect } from 'react'

const TOTAL_MS = 238_000 // 3 min 58 s

const easeOut    = t => 1 - Math.pow(1 - t, 3)
const easeInOut  = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3) / 2
const lerp       = (a, b, t) => a + (b - a) * t

/**
 * @param {number}  n          - total slide count
 * @param {boolean} running    - whether animation is active
 */
export function useAutoScroll(n, running) {
  const startRef    = useRef(null)   // performance.now() of animation start
  const prevIdxRef  = useRef(-1)     // last rendered index (for forced hide)
  const rafRef      = useRef(null)

  // Last values pushed into React state — lets us throttle updates
  const lastSlideProgRef  = useRef(0)
  const lastProgressFracRef = useRef(0)

  // Exposed state
  const [currentIdx,     setCurrentIdx]     = useState(0)
  const [slideProgress,  setSlideProgress]  = useState(0)   // 0..1 within slide
  const [progressFrac,   setProgressFrac]   = useState(0)   // 0..1 total

  // Each slide element gets a setter so we can imperatively set its CSS
  // (avoids React re-render on every rAF tick — critical for 60fps)
  const slideRefs = useRef([])

  const registerSlide = useCallback((idx, el) => {
    slideRefs.current[idx] = el
  }, [])

  const hideEl = useCallback(el => {
    if (!el) return
    el.style.opacity       = '0'
    el.style.transform     = 'translateY(58px) scale(.96)'
    el.style.pointerEvents = 'none'
  }, [])

  const renderEl = useCallback((el, p) => {
    if (!el) return
    let op, ty, sc
    if (p < .12) {
      const t = easeOut(p / .12)
      op = t; ty = lerp(58, 0, t); sc = lerp(.96, 1, t)
    } else if (p < .80) {
      op = 1; ty = 0; sc = 1
    } else {
      const t = easeInOut((p - .80) / .20)
      op = 1 - t; ty = lerp(0, -50, t); sc = lerp(1, .97, t)
    }
    el.style.opacity       = String(op)
    el.style.transform     = `translateY(${ty}px) scale(${sc})`
    el.style.pointerEvents = op > .5 ? 'auto' : 'none'
  }, [])

  // jumpTo — externally jump to a specific slide index
  const jumpTo = useCallback(i => {
    // Force-hide all slides
    slideRefs.current.forEach(hideEl)
    prevIdxRef.current = -1
    const frac = i / n
    startRef.current = performance.now() - frac * TOTAL_MS
  }, [n, hideEl])

  // Main animation loop
  useEffect(() => {
    if (!running) return

    const tick = ts => {
      if (startRef.current === null) startRef.current = ts

      const raw = Math.min((ts - startRef.current) / TOTAL_MS, 1)
      const sp  = raw * n
      const ci  = Math.min(Math.floor(sp), n - 1)
      const ip  = sp - ci

      // When slide index changes → immediately hide previous
      if (ci !== prevIdxRef.current) {
        if (prevIdxRef.current >= 0) {
          hideEl(slideRefs.current[prevIdxRef.current])
        }
        prevIdxRef.current = ci
        setCurrentIdx(ci)
      }

      renderEl(slideRefs.current[ci], ip)

      // Throttle React updates to avoid re-rendering the whole UI at 60fps,
      // which can cause jank on modest machines. Only push when the values
      // have changed by a visible amount.
      const SP_EPS   = 0.02  // per-slide progress granularity
      const RAW_EPS  = 0.01  // global timeline granularity

      if (Math.abs(ip - lastSlideProgRef.current) > SP_EPS) {
        lastSlideProgRef.current = ip
        setSlideProgress(ip)
      }

      if (Math.abs(raw - lastProgressFracRef.current) > RAW_EPS) {
        lastProgressFracRef.current = raw
        setProgressFrac(raw)
      }

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        // Loop: restart
        startRef.current   = ts
        prevIdxRef.current = -1
        slideRefs.current.forEach(hideEl)
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [running, n, hideEl, renderEl])

  return { currentIdx, slideProgress, progressFrac, jumpTo, registerSlide }
}
