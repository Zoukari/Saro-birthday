// ─────────────────────────────────────────────────────────
// useAutoScroll — une slide à la fois, transition cinématique
// Glissement vertical : sortie vers le haut, entrée depuis le bas
// ─────────────────────────────────────────────────────────
import { useRef, useState, useCallback, useEffect } from 'react'

const TOTAL_MS = 238_000

const easeOutCubic = t => 1 - Math.pow(1 - t, 3)
const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
const lerp = (a, b, t) => a + (b - a) * t

export function useAutoScroll(n, running) {
  const startRef = useRef(null)
  const prevIdxRef = useRef(-1)
  const rafRef = useRef(null)
  const lastSlideProgRef = useRef(0)
  const lastProgressFracRef = useRef(0)

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
    el.style.transform = 'translateY(24%) scale(0.98)'
    el.style.pointerEvents = 'none'
  }, [])

  const renderEl = useCallback((el, p, ci) => {
    if (!el) return
    const isLastSlide = ci === n - 1
    const isPreLastSlide = ci === n - 2
    const enterEnd = 0.25
    const exitStart = 0.7
    let yPct, scale, op

    if (isLastSlide) {
      // Slide 50 : apparition avec effet (scale + fade in)
      const t = easeOutCubic(Math.min(p / 0.5, 1))
      yPct = 0
      scale = lerp(0.65, 1, t)
      op = lerp(0, 1, t)
    } else if (isPreLastSlide && p > exitStart) {
      // Avant la slide 50 : dézoom en sortie
      const t = easeInOutCubic((p - exitStart) / (1 - exitStart))
      yPct = lerp(0, -8, t)
      scale = lerp(1, 0.75, t)
      op = lerp(1, 0.4, t)
    } else {
      if (p < enterEnd) {
        const t = easeOutCubic(p / enterEnd)
        yPct = lerp(12, 0, t)
        scale = lerp(1.02, 1, t)
        op = lerp(0.6, 1, t)
      } else if (p < exitStart) {
        yPct = 0
        scale = 1
        op = 1
      } else {
        const t = easeInOutCubic((p - exitStart) / (1 - exitStart))
        yPct = lerp(0, -12, t)
        scale = lerp(1, 0.98, t)
        op = lerp(1, 0.5, t)
      }
    }
    el.style.opacity = String(op)
    el.style.transform = `translateY(${yPct}%) scale(${scale})`
    el.style.pointerEvents = !isLastSlide && p >= enterEnd && p <= exitStart ? 'auto' : 'none'
  }, [n])

  const jumpTo = useCallback(i => {
    slideRefs.current.forEach(hideEl)
    prevIdxRef.current = -1
    startRef.current = performance.now() - (i / n) * TOTAL_MS
  }, [n, hideEl])

  useEffect(() => {
    if (!running) {
      // Gel de la position au moment de la pause pour reprendre au même endroit
      const frozen = lastProgressFracRef.current
      startRef.current = performance.now() - frozen * TOTAL_MS
      return
    }

    const tick = ts => {
      if (startRef.current === null) startRef.current = ts
      const raw = Math.min((ts - startRef.current) / TOTAL_MS, 1)
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
    return () => cancelAnimationFrame(rafRef.current)
  }, [running, n, hideEl, renderEl])

  return { currentIdx, slideProgress, progressFrac, jumpTo, registerSlide }
}
