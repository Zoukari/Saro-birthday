// ─────────────────────────────────────────────────────────
// useAutoScroll — défilement vertical continu (type scroll de site)
// Un seul ruban vertical, la vue défile de haut en bas
// ─────────────────────────────────────────────────────────
import { useRef, useState, useCallback, useEffect } from 'react'

const TOTAL_MS = 238_000 // 3 min 58 s

export function useAutoScroll(n, running, stripRef) {
  const startRef = useRef(null)
  const rafRef = useRef(null)
  const lastProgressFracRef = useRef(0)

  const [currentIdx, setCurrentIdx] = useState(0)
  const [progressFrac, setProgressFrac] = useState(0)

  const jumpTo = useCallback((i) => {
    const frac = Math.min(Math.max(i / n, 0), 1)
    startRef.current = performance.now() - frac * TOTAL_MS
  }, [n])

  useEffect(() => {
    if (!running) return

    const tick = (ts) => {
      if (startRef.current === null) startRef.current = ts

      let raw = Math.min((ts - startRef.current) / TOTAL_MS, 1)
      const ci = Math.min(Math.floor(raw * n), n - 1)

      // Strip : on déplace tout le ruban verticalement (scroll fluide)
      if (stripRef?.current) {
        const y = raw * (n - 1) * 100
        stripRef.current.style.transform = `translate3d(0, -${y}vh, 0)`
      }

      setCurrentIdx(ci)

      if (Math.abs(raw - lastProgressFracRef.current) > 0.008) {
        lastProgressFracRef.current = raw
        setProgressFrac(raw)
      }

      if (raw >= 1) {
        startRef.current = ts
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [running, n, stripRef])

  return { currentIdx, slideProgress: 0, progressFrac, jumpTo, registerSlide: () => {} }
}
