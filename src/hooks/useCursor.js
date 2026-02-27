// ─────────────────────────────────────────────────────────
// useCursor — smooth lagging cursor (dot + ring)
// ─────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react'

const lerp = (a, b, t) => a + (b - a) * t

export function useCursor(dotRef, ringRef) {
  const mouse = useRef({ x: 0, y: 0 })
  const ring  = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = e => { mouse.current.x = e.clientX; mouse.current.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    let raf
    const loop = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, .1)
      ring.current.y = lerp(ring.current.y, mouse.current.y, .1)

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x - 5}px, ${mouse.current.y - 5}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x - 15}px, ${ring.current.y - 15}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [dotRef, ringRef])
}
